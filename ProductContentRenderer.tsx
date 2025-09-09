import { ReactNode } from "react";
import { ErrorView } from "./components/ErrorView";

import { fragmentArray } from "./helpers/fragmentArray";
import { isArray } from "./helpers/isArray";
import { isString } from "./helpers/isString";
import { prepareClassName as prepareClassNameHelper } from "./helpers/prepareClassName";

import { RendererContext } from "./RendererContextImpl";
import { BaseContent, isBaseContent } from "./types/BaseContent";

import { CompiledRenderer } from "./types/CompiledRenderer";
import { ComponentContent } from "./types/ComponentContent";
import { Content } from "./types/Content";
import { ContentRenderingCache } from "./types/ContentRenderingCache";
import { ContentType } from "./types/ContentType";
import { RendererCompiler } from "./types/RendererCompiler";
import { createTranslateContent } from "./types/TranslateContent";

/**
 * Renders dynamic product specific content from product integration API.
 */
export class ProductContentRenderer {
  private static _cache: ContentRenderingCache = {};

  public static ComponentParamPrefix = "Component.Param.";

  /**
   * Registers a custom content type renderer.
   *
   * @param type
   * @param compiler
   */
  public static register(
    type: ContentType | string,
    compiler: RendererCompiler<BaseContent>,
  ): void {
    this._cache[type] = compiler;
  }

  /**
   *
   * @param type
   */
  public static isRegistered(type: ContentType | string): boolean {
    return Object.hasOwnProperty.call(this._cache, type);
  }

  /**
   *
   * @param type
   */
  public static getRegistered(
    type: ContentType | string,
  ): RendererCompiler<BaseContent> {
    if (!this.isRegistered(type)) {
      throw new TypeError(`type not registered: ${type}`);
    }
    return this._cache[type];
  }

  /**
   * @obsolete Use prepareClassName instead from "./content_helpers/prepareClassName"
   * @param value
   */
  public static prepareClassName(value: readonly string[] | undefined) {
    return prepareClassNameHelper(value);
  }

  /**
   * Returns a function that takes a RendererContext and returns a ReactNode.
   *
   * @param content Content or array of Content to render
   */
  public static compile(
    content: Content | readonly Content[] | null | undefined,
  ): CompiledRenderer {
    if (!content) {
      return () => <>{content}</>;
    }

    if (isString(content)) {
      const translate = this.isRegistered(ContentType.TRANSLATE)
        ? this.getRegistered(ContentType.TRANSLATE)
        : undefined;
      const translateFn = translate
        ? translate(createTranslateContent(content))
        : undefined;

      return (context: RendererContext): ReactNode => {
        if (
          content.startsWith(this.ComponentParamPrefix) &&
          context?.componentContent &&
          context?.stateContent
        ) {
          const key = content.substring(this.ComponentParamPrefix.length);
          const data: {
            [key: string]: Content | readonly Content[] | null | undefined;
          } = context.stateContent as unknown as {
            [key: string]: Content | readonly Content[] | null | undefined;
          };
          if (Object.prototype.hasOwnProperty.call(data, key) && data[key]) {
            const fn = this.compile(data[key]);
            return fn(context);
          }
        }

        if (translateFn) {
          return translateFn(context);
        }

        return <>{content}</>;
      };
    }

    if (isArray(content)) {
      return fragmentArray(content as unknown as readonly Content[]);
    }

    if (!isBaseContent(content)) {
      return () => <>Unknown: {JSON.stringify(content, null, 2)}</>;
    }

    const type = content.type;
    if (this.isRegistered(type)) {
      return this.getRegistered(type)(content);
    }

    // Implements user defined components
    return (context: RendererContext) => {
      const component: ComponentContent | undefined =
        context.contentService.getComponent(type);
      if (component) {
        const componentFn = this.compile(component);
        return (
          <>{componentFn(context.createComponentContext(component, content))}</>
        );
      }

      console.warn(`Warning! Unimplemented content type: ${content?.type}`);
      return (
        <ErrorView
          title={`${content?.type}`}
          message={"Unimplemented content type"}
        />
      );
    };
  }
}
