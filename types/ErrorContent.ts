import { BaseParentContent, isBaseParentContent } from "./BaseParentContent";
import { ContentType } from "./ContentType";

/**
 * Defines layout content type
 */
export interface ErrorContent extends BaseParentContent {
  readonly type: ContentType.ERROR_VIEW | string;
  readonly title?: string;
  readonly message?: string;
}

/**
 * Returns true if the value is Error
 *
 * @param value
 */
export function isErrorContent(value: unknown): value is ErrorContent {
  return isBaseParentContent(value) && value.type === ContentType.ERROR_VIEW;
}
