import { useMemo } from "react";

import { CompiledRenderer } from "../types/CompiledRenderer";
import { Content } from "../types/Content";

import {
  ProductContentRenderer,
} from "../ProductContentRenderer";

export function useCompileContent (content: Content | readonly Content[] | null | undefined) : CompiledRenderer {
  return useMemo(() => ProductContentRenderer.compile(content), [content]);
}
