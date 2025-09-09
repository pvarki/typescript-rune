import { ReactNode } from "react";
import { isArrayOf } from "../helpers/isArray";
import { isString } from "../helpers/isString";
import { ProductContentRenderer } from "../ProductContentRenderer";
import { RendererContext } from "../RendererContextImpl";
import { BaseContent } from "../types/BaseContent";
import { BaseParentContent } from "../types/BaseParentContent";
import { CompiledRenderer } from "../types/CompiledRenderer";
import { Content } from "../types/Content";
import { RendererCompiler } from "../types/RendererCompiler";

export const code : RendererCompiler<BaseContent> = (content: BaseParentContent) : CompiledRenderer => {

  const prepareClassNameFn = ProductContentRenderer.prepareClassName(content.classes);
  const bodyFn = ProductContentRenderer.compile(content?.body);

  const body = content?.body;
  if (isArrayOf<Content>(body)) {

    const bodyFns = body.map((item: Content) : CompiledRenderer => {
      if (isString(item)) {
        return () => <>{item}</>;
      }
      const itemFn = ProductContentRenderer.compile(item);
      return (context : RendererContext) => <>{itemFn(context)}</>;
    });

    return (context : RendererContext) =>(
      <code className={prepareClassNameFn(context)}>
        {bodyFns.map((fn) : ReactNode => fn( context ))}
      </code>
    )
  }

  if (isString(body)) {
    return (context : RendererContext) => <code className={prepareClassNameFn(context)}>{body}</code>
  }

  return (context : RendererContext) => <code className={prepareClassNameFn(context)}>{bodyFn(context)}</code>
}
