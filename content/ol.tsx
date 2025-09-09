import { ProductContentRenderer } from "../ProductContentRenderer";
import { RendererContext } from "../RendererContextImpl";
import { BaseContent } from "../types/BaseContent";
import { BaseParentContent } from "../types/BaseParentContent";
import { CompiledRenderer } from "../types/CompiledRenderer";
import { RendererCompiler } from "../types/RendererCompiler";

export const ol : RendererCompiler<BaseContent> = (content: BaseParentContent) : CompiledRenderer => {
  const prepareClassNameFn = ProductContentRenderer.prepareClassName(content.classes);
  const bodyFn = ProductContentRenderer.compile(content?.body);
  return (context : RendererContext) => <ol className={prepareClassNameFn(context)}>{bodyFn(context)}</ol>
}
