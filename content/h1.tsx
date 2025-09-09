import { ProductContentRenderer } from "../ProductContentRenderer";
import { RendererContext } from "../RendererContextImpl";
import { BaseContent } from "../types/BaseContent";
import { BaseParentContent } from "../types/BaseParentContent";
import { CompiledRenderer } from "../types/CompiledRenderer";
import { RendererCompiler } from "../types/RendererCompiler";

export const h1 : RendererCompiler<BaseContent> = (content: BaseParentContent) : CompiledRenderer => {
  const prepareClassNameFn = ProductContentRenderer.prepareClassName(content.classes);
  const bodyFn = ProductContentRenderer.compile(content?.body);
  return (context : RendererContext) => <h1 className={prepareClassNameFn(context)}>{bodyFn(context)}</h1>
}
