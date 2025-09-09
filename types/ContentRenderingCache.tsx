import { BaseContent } from "./BaseContent";
import { RendererCompiler } from "./RendererCompiler";

export interface ContentRenderingCache {
  [key : string] : RendererCompiler<BaseContent>;
}
