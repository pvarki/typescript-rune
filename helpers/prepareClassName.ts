import { isString } from "./isString";
import { ProductContentRenderer } from "../ProductContentRenderer";
import { RendererContext } from "../RendererContextImpl";
import { Content } from "../types/Content";

/**
 *
 * @param value
 */
export function prepareClassName(
  value: readonly string[] | undefined,
): (context: RendererContext) => string {
  return (context: RendererContext) => {
    if (!value) return "";

    return value
      .map((item: string): string => {
        if (
          item.startsWith(ProductContentRenderer.ComponentParamPrefix) &&
          context?.componentContent &&
          context?.stateContent
        ) {
          const key = item.substring(
            ProductContentRenderer.ComponentParamPrefix.length,
          );
          const data: {
            [key: string]: Content | readonly Content[] | null | undefined;
          } = context.stateContent as unknown as {
            [key: string]: Content | readonly Content[] | null | undefined;
          };
          if (
            Object.prototype.hasOwnProperty.call(data, key) &&
            isString(data[key])
          ) {
            return data[key] as unknown as string;
          }
        }
        return item;
      })
      .join(" ");
  };
}
