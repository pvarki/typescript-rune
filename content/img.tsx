import { isString } from "../helpers/isString";
import { ProductContentRenderer } from "../ProductContentRenderer";
import { RendererContext } from "../RendererContextImpl";
import { BaseContent } from "../types/BaseContent";
import { CompiledRenderer } from "../types/CompiledRenderer";
import { Content } from "../types/Content";
import { RendererCompiler } from "../types/RendererCompiler";

export const img : RendererCompiler<BaseContent> = (content: BaseContent) : CompiledRenderer => {
  const prepareClassNameFn = ProductContentRenderer.prepareClassName(content.classes);
  const prepareImgAltFn = prepareImgAlt((content as unknown as {alt ?: string}).alt);
  const prepareImgSrcFn = prepareImgSrc((content as unknown as {src ?: string}).src);
  return (context : RendererContext) => <img
    className={prepareClassNameFn(context)}
    alt={ prepareImgAltFn(context) }
    src={ prepareImgSrcFn(context) }
  />
}

/**
 *
 * @param value
 */
function prepareImgAlt (
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

/**
 *
 * @param value
 */
function prepareImgSrc (
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
