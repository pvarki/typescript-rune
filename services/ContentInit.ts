export type InitFn = () => void | (() => void);

export class ContentInit {
  private static _registry = new Set<string>();

  private static has(key: string) {
    return ContentInit._registry.has(key);
  }

  private static mark(key: string) {
    ContentInit._registry.add(key);
  }

  /** Runs once per tab/app lifetime (survives remounts & React 18 double-mount). */
  public static runOnce(key: string, init: InitFn) {
    if (ContentInit.has(key)) return;
    ContentInit.mark(key);
    return init();
  }
}
