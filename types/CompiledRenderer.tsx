import { ReactNode } from "react";
import { RendererContext } from "../RendererContextImpl";

/**
 * A function that takes a RendererContext and returns a ReactNode.
 */
export type CompiledRenderer = {
  (context: RendererContext): ReactNode;
};
