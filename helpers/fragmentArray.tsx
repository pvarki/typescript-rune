import { Fragment, ReactNode } from "react";
import { ProductContentRenderer } from "../ProductContentRenderer";
import { RendererContext } from "../RendererContextImpl";
import { CompiledRenderer } from "../types/CompiledRenderer";
import { Content } from "../types/Content";

export function fragmentArray(content: readonly Content[]): CompiledRenderer {
  const fns = content.map((item: Content): CompiledRenderer => {
    return ProductContentRenderer.compile(item);
  });
  return (context: RendererContext) => (
    <>
      {fns.map((fn, index: number): ReactNode => {
        return <Fragment key={`index:${index}`}>{fn(context)}</Fragment>;
      })}
    </>
  );
}
