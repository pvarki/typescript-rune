import { useEffect } from "react";
import { ContentInit, InitFn } from "../services/ContentInit";

export function useContentInit(init: InitFn, key = "default") {
  useEffect(() => {
    ContentInit.runOnce(key, init);
  }, [init, key]);
}
