import { ErrorView } from "../components/ErrorView";
import { BaseContent } from "../types/BaseContent";
import { CompiledRenderer } from "../types/CompiledRenderer";
import { ErrorContent } from "../types/ErrorContent";
import { RendererCompiler } from "../types/RendererCompiler";

export const errorView : RendererCompiler<BaseContent> = (content: ErrorContent) : CompiledRenderer => {
  const title = content?.title ?? '';
  const message = content?.message ?? '';
  return () => <ErrorView title={title} message={message} />
}
