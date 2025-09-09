import { ProductContentRenderer } from "../ProductContentRenderer";
import { RendererContext } from "../RendererContextImpl";
import { BaseContent } from "../types/BaseContent";
import {
  BaseParentContent,
  isBaseParentContent,
} from "../types/BaseParentContent";
import { CompiledRenderer } from "../types/CompiledRenderer";
import { RendererCompiler } from "../types/RendererCompiler";

export const componentChildren : RendererCompiler<BaseContent> = (content: BaseParentContent) : CompiledRenderer => {

  // FIXME: Create customizable error component with title and message
  const errorFn = ( title: string, message: string) => <div><h3>{title}</h3><p>{message}</p></div>;

  return (context : RendererContext) => {
    if (context.stateContent === undefined) {
      console.warn(`Warning! No parent found for: ${content?.type}`);
      return errorFn(content?.type, "No parent found");
    }
    if (isBaseParentContent(context.stateContent)) {
      return ProductContentRenderer.compile(context.stateContent.body)(context.createContextWithoutParent());
    }
    console.warn(`Warning! No body found for: ${content?.type}: `, context.stateContent);
    return errorFn(content?.type, "No body found");
  }
}
