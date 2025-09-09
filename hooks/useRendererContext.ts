import {
  useEffect,
  useState,
} from "react";
import {
  RendererContext,
  RendererContextImpl,
} from "../RendererContextImpl";
import { RuntimeContentService } from "../services/RuntimeContentService";
import { ContentActions } from "../types/ContentActions";

export function useRendererContext (
  contentService : RuntimeContentService | undefined,
  actions ?: ContentActions,
) : RendererContext | undefined {

  const [context, setContext] = useState<RendererContext | undefined>(undefined);

  useEffect( () => {
    if (!contentService) return;

    const c : RendererContext = RendererContextImpl.create(contentService, actions);
    setContext(c);
  }, [
    contentService,
    actions,
    setContext,
  ]);

  return context;
}
