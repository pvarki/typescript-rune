import { BaseContent } from "./types/BaseContent";
import { ComponentContent } from "./types/ComponentContent";
import { ContentActions } from "./types/ContentActions";

import {
  ObservableDestructor,
  ObservableImpl,
  ObservableListener,
  ObservableService,
} from "./services/ObservableService";
import { RuntimeContentService } from "./services/RuntimeContentService";

export enum RendererEvent {
  NAVIGATE = "navigate",
  OPEN = "open",
}

export interface RendererContext extends ObservableService<RendererEvent> {
  readonly contentService: RuntimeContentService;
  readonly contentActions: ContentActions;

  /** Defines parent component data, if any */
  readonly componentContent: ComponentContent | undefined;

  /** Defines parent state data, if any */
  readonly stateContent: BaseContent | undefined;

  createComponentContext(
    componentContent: ComponentContent,
    stateContent: BaseContent,
  ): RendererContext;

  createContextWithoutParent(): RendererContext;

  navigate(to: string): void;
  open(target: BaseContent): void;
}

/**
 * Provides context data to content renderers.
 */
export class RendererContextImpl implements RendererContext {

  private readonly _observable : ObservableImpl<RendererEvent>;

  public readonly contentService: RuntimeContentService;
  public readonly contentActions: ContentActions;
  public readonly componentContent: ComponentContent | undefined;
  public readonly stateContent: BaseContent | undefined;

  protected constructor(
    observable : ObservableImpl<RendererEvent>,
    contentService: RuntimeContentService,
    contentActions?: ContentActions,
    componentContent?: ComponentContent,
    stateContent?: BaseContent,
  ) {
    this._observable = observable;
    this.contentService = contentService;
    this.contentActions = contentActions ?? {};
    this.componentContent = componentContent ?? undefined;
    this.stateContent = stateContent ?? undefined;
  }

  public static create(
    contentService: RuntimeContentService,
    contentActions?: ContentActions,
    componentContent?: ComponentContent,
    stateContent?: BaseContent,
  ): RendererContextImpl {
    return new RendererContextImpl(
      new ObservableImpl<RendererEvent>(),
      contentService,
      contentActions,
      componentContent,
      stateContent,
    );
  }

  /**
   * Creates a new component context from previous context object.
   *
   * @param componentContent
   * @param stateContent
   */
  public createComponentContext(
    componentContent: ComponentContent,
    stateContent: BaseContent,
  ): RendererContext {
    return new RendererContextImpl(
      this._observable,
      this.contentService,
      this.contentActions,
      componentContent,
      stateContent,
    );
  }

  /**
   * Creates a new component context from previous context object.
   *
   */
  public createContextWithoutParent(): RendererContext {
    return new RendererContextImpl(
      this._observable,
      this.contentService,
      this.contentActions,
      undefined,
      undefined,
    );
  }

  public addEventListener(
    event: RendererEvent,
    listener: ObservableListener<RendererEvent>,
  ): ObservableDestructor {
    return this._observable.addEventListener(event, listener);
  }

  public navigate(to: string): void {
    this._observable.dispatchEvent(RendererEvent.NAVIGATE, to);
  }

  public open(target: BaseContent): void {
    this._observable.dispatchEvent(RendererEvent.OPEN, target);
  }
}
