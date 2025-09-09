import { ProductContentRenderer } from "../ProductContentRenderer";
import { RendererContext } from "../RendererContextImpl";
import { BaseContent } from "../types/BaseContent";
import { CompiledRenderer } from "../types/CompiledRenderer";
import { RendererCompiler } from "../types/RendererCompiler";

export const br : RendererCompiler<BaseContent> = (content: BaseContent) : CompiledRenderer => {
  const prepareClassNameFn = ProductContentRenderer.prepareClassName(content.classes);
  return (context : RendererContext) => <br className={prepareClassNameFn(context)} />
}
