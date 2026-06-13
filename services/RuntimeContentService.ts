import {
  ComponentContent,
  isComponentContent,
} from "../types/ComponentContent";
import { RootContent, isRootContent } from "../types/RootContent";
import { Content } from "../types/Content";
import { ContentType } from "../types/ContentType";
import { TranslationCollection } from "../types/TranslationCollection";
import { isTranslationContent } from "../types/TranslationContent";
import { TranslationData } from "../types/TranslationData";
import { isViewContent, ViewContent } from "../types/ViewContent";

export interface PublicEventCallback {
  (): void;
}

export interface PublicEventDestructor {
  (): void;
}

/**
 * A service to manage dynamic content.
 */
export interface RuntimeContentService {
  /** Get the name of the service */
  getName(): string;

  /**
   * Initialize the service with some data.
   *
   * @param items
   */
  setContent(items: readonly Content[]): void;

  /**
   * Fetch a view by name.
   *
   * @param name
   */
  getView(name: string): ViewContent | undefined;

  /**
   * Fetch a component by name.
   *
   * @param name
   */
  getComponent(name: string): ComponentContent | undefined;

  /**
   * Fetch any top-level item by name and optional type.
   *
   * @param name
   * @param type
   */
  getItem(name: string, type?: ContentType): RootContent | undefined;

  /**
   * Returns dynamic translations from the product content JSON
   */
  getTranslations(lang: string): TranslationData;

  /**
   * Returns all view names available
   */
  getAllViewNames(): readonly string[];
}

/**
 * @inheritDoc
 */
export class RuntimeContentServiceImpl implements RuntimeContentService {
  protected _name: string;
  protected _items: readonly Content[];

  protected constructor(name: string, items: readonly Content[]) {
    this._name = name;
    this._items = items;
  }

  /**
   * Create service instance
   */
  public static create(
    name: string,
    items?: readonly Content[],
  ): RuntimeContentService {
    return new RuntimeContentServiceImpl(name, items ?? []);
  }

  /**
   * @inheritDoc
   */
  public setContent(items: readonly Content[]): void {
    this._items = items;
  }

  /**
   * @inheritDoc
   */
  public getName(): string {
    return this._name;
  }

  /**
   * @inheritDoc
   */
  public getView(name: string): ViewContent | undefined {
    return this._items.find(
      (item: Content) => isViewContent(item) && item.name === name,
    ) as ViewContent | undefined;
  }

  /**
   * @inheritDoc
   */
  public getComponent(name: string): ComponentContent | undefined {
    return this._items.find(
      (item: Content) => isComponentContent(item) && item?.name === name,
    ) as ComponentContent | undefined;
  }

  /**
   * @inheritDoc
   */
  public getItem(name: string, type?: ContentType): RootContent | undefined {
    if (type) {
      return this._items.find(
        (item: Content) =>
          isRootContent(item) && item.name === name && item.type === type,
      ) as RootContent | undefined;
    }
    return this._items.find(
      (item: Content) => isRootContent(item) && item.name === name,
    ) as RootContent | undefined;
  }

  public getTranslations(lang: string): TranslationData {
    const translations = this._getTranslations();
    return Object.prototype.hasOwnProperty.call(translations, lang)
      ? translations[lang]
      : {};
  }

  /**
   * @inheritDoc
   */
  public getAllViewNames(): readonly string[] {
    const found = this._items.filter((item: Content) =>
      isViewContent(item),
    ) as readonly ViewContent[];
    return found.map((item: ViewContent): string => item.name);
  }

  private _getTranslations(): TranslationCollection {
    let ret: TranslationCollection = {};
    this._items.forEach((item: Content): void => {
      if (isTranslationContent(item)) {
        Object.keys(item.data).forEach((lang: string): void => {
          if (Object.prototype.hasOwnProperty.call(ret, lang)) {
            ret = {
              ...ret,
              [lang]: {
                ...ret[lang],
                ...item.data[lang],
              },
            };
          } else {
            ret = {
              ...ret,
              [lang]: item.data[lang],
            };
          }
        });
        ret = { ...ret, ...item.data };
      }
    });
    return ret;
  }
}
