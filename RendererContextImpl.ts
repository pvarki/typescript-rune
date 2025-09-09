import { BaseContent } from "./types/BaseContent";
import { ComponentContent } from "./types/ComponentContent";
import { ContentActions } from "./types/ContentActions";

import {
    ObservableDestructor,
    ObservableListener,
    ObservableService,
} from "./services/ObservableService";
import { RuntimeContentService } from "./services/RuntimeContentService";

export interface RendererContext extends ObservableService<RendererEvent> {
    readonly contentService    : RuntimeContentService;
    readonly contentActions    : ContentActions;

    /** Defines parent component data, if any */
    readonly componentContent  : ComponentContent | undefined;

    /** Defines parent state data, if any */
    readonly stateContent  : BaseContent | undefined;

    createComponentContext (
        componentContent : ComponentContent,
        stateContent : BaseContent,
    ) : RendererContext;

    createContextWithoutParent () : RendererContext;

    navigate (to: string) : void;
    open (target: BaseContent) : void;
}

export enum RendererEvent {
    NAVIGATE = "navigate",
    OPEN = "open",
}

/**
 * Provides context data to content renderers.
 */
export class RendererContextImpl implements RendererContext {

    private readonly _listeners : { [K in RendererEvent]?: ObservableListener<RendererEvent>[] } = {};

    public readonly contentService    : RuntimeContentService;
    public readonly contentActions    : ContentActions;
    public readonly componentContent  : ComponentContent | undefined;
    public readonly stateContent      : BaseContent | undefined;

    protected constructor (
        contentService    : RuntimeContentService,
        contentActions   ?: ContentActions,
        componentContent ?: ComponentContent,
        stateContent     ?: BaseContent,
    ) {
        this.contentService = contentService;
        this.contentActions = contentActions ?? {};
        this.componentContent = componentContent ?? undefined;
        this.stateContent = stateContent ?? undefined;
    }

    public static create (
        contentService    : RuntimeContentService,
        contentActions   ?: ContentActions,
        componentContent ?: ComponentContent,
        stateContent     ?: BaseContent,
    ) : RendererContextImpl {
        return new RendererContextImpl(
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
    public createComponentContext (
        componentContent : ComponentContent,
        stateContent     : BaseContent,
    ) : RendererContext {
        return new RendererContextImpl(
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
    public createContextWithoutParent () : RendererContext {
        return new RendererContextImpl(
            this.contentService,
            this.contentActions,
            undefined,
            undefined,
        );
    }

    public addEventListener(event: RendererEvent, listener: ObservableListener<RendererEvent>) : ObservableDestructor {
        this._listeners[event] = this._listeners[event] ?? [];
        this._listeners[event]!.push(listener);
        return () => {
            this._listeners[event] = this._listeners[event]?.filter(l => l !== listener);
        };
    }

    public _dispatchEvent( event: RendererEvent, ...args: unknown[] ): void {
        const listeners = this._listeners[event];
        if (!listeners || listeners?.length === 0) {
            console.warn(`Warning! No listeners for event: ${event}`);
            return;
        }
        listeners.forEach( listener => {
            try {
                listener(event, ...args);
            } catch (err) {
                console.error(`Error in event listener for event ${event}:`, err);
            }
        });
    }

    public navigate (to: string) : void {
        this._dispatchEvent(RendererEvent.NAVIGATE, to);
    }

    public open (target: BaseContent) : void {
        this._dispatchEvent(RendererEvent.OPEN, target);
    }

}
