export type ObservableEvent = string;

export interface ObservableDestructor {
  (): void;
}

export interface ObservableListener<T> {
  (event: T, ...args: unknown[]): void;
}

export interface ObservableService<EventT extends ObservableEvent> {
  addEventListener(
    event: EventT,
    listener: ObservableListener<EventT>,
  ): ObservableDestructor;
}

export interface ObservableDispatcher<EventT extends ObservableEvent> {
  dispatchEvent(event: EventT, ...args: unknown[]): void;
}

/**
 * A simple implementation of an observable service that allows adding event listeners and dispatching events.
 */
export class ObservableImpl<EventT extends ObservableEvent> implements ObservableService<EventT>, ObservableDispatcher<EventT> {

  private readonly _listeners : {
    [K in EventT]? : ObservableListener<EventT>[];
  };

  public constructor () {
    this._listeners = {};
  }

  public addEventListener(
    event: EventT,
    listener: ObservableListener<EventT>,
  ): ObservableDestructor {
    this._listeners[event] = this._listeners[event] ?? [];
    this._listeners[event]!.push(listener);
    return () => {
      this._listeners[event] = this._listeners[event]?.filter(
        (l) => l !== listener,
      );
    };
  }

  public dispatchEvent(event: EventT, ...args: unknown[]): void {
    const listeners = this._listeners[event];
    if (!listeners || listeners?.length === 0) {
      console.warn(`Warning! No listeners for event: ${event}`);
      return;
    }
    listeners.forEach((listener) => {
      try {
        listener(event, ...args);
      } catch (err) {
        console.error(`Error in event listener for event ${event}:`, err);
      }
    });
  }

}
