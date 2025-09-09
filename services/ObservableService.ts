
export type ObservableEvent = string;

export interface ObservableDestructor {
    (): void;
}

export interface ObservableListener<T> {
    (event: T, ...args: unknown[]): void;
}

export interface ObservableService<EventT extends ObservableEvent> {

    addEventListener(event: EventT, listener: ObservableListener<EventT>) : ObservableDestructor;

}

export interface ObservableDispatcher<EventT extends ObservableEvent> {

    dispatchEvent( event: EventT, ...args: unknown[] ): void;

}
