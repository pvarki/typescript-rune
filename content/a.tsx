import { isString } from "../helpers/isString";
import { ProductContentRenderer } from "../ProductContentRenderer";
import { RendererContext } from "../RendererContextImpl";
import { BaseContent } from "../types/BaseContent";
import { BaseParentContent } from "../types/BaseParentContent";
import { CompiledRenderer } from "../types/CompiledRenderer";
import { Content } from "../types/Content";
import { RendererCompiler } from "../types/RendererCompiler";

export const a : RendererCompiler<BaseContent> = (content: BaseParentContent) : CompiledRenderer => {
  const prepareClassNameFn = ProductContentRenderer.prepareClassName(content.classes);
  const bodyFn = ProductContentRenderer.compile(content?.body);
  const prepareHrefFn = prepareAHref((content as unknown as {href ?: string}).href);
  return (context : RendererContext) => (
    <a className={prepareClassNameFn(context)}
       href={ prepareHrefFn(context) }
    >{bodyFn(context)}</a>
  );
}

/**
 *
 * @param value
 */
function prepareAHref (
  value: string | undefined,
) : (context : RendererContext) => string {
  return (context : RendererContext) => {
    if ( !value ) return "";
    if ( value.startsWith( ProductContentRenderer.ComponentParamPrefix ) && context?.componentContent && context?.stateContent ) {
      const key = value.substring( ProductContentRenderer.ComponentParamPrefix.length )
      const data : { [key : string] : Content | readonly Content[] | null | undefined } = context.stateContent as unknown as { [key : string] : Content | readonly Content[] | null | undefined };
      if ( Object.prototype.hasOwnProperty.call( data, key ) && data[key] ) {
        if ( isString( data[key] ) ) {
          return data[key] as unknown as string
        }
      }
    }
    return value
  };
}
