import { BaseContent } from "./BaseContent";
import { CompiledRenderer } from "./CompiledRenderer";

/**
 * A function that takes Content (or array of Content) and returns a CompiledRenderer.
 */
export type RendererCompiler<T extends BaseContent> = {
  (content : T) : CompiledRenderer;
}
