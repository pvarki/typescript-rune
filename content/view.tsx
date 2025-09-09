import { ProductContentRenderer } from "../ProductContentRenderer";
import { BaseContent } from "../types/BaseContent";
import { BaseParentContent } from "../types/BaseParentContent";
import { CompiledRenderer } from "../types/CompiledRenderer";
import { RendererCompiler } from "../types/RendererCompiler";

export const view : RendererCompiler<BaseContent> = (content: BaseParentContent) : CompiledRenderer => {
  return ProductContentRenderer.compile( content.body )
}
