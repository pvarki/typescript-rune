import { BaseContent, isBaseContent } from "./BaseContent";
import { ContentType } from "./ContentType";

/**
 * Translate content type.
 */
export interface TranslateContent extends BaseContent {
  readonly type: ContentType.TRANSLATE | string;
  readonly body?: string;
}

export function createTranslateContent(body: string): TranslateContent {
  return {
    type: ContentType.TRANSLATE,
    body,
  };
}

/**
 * Returns true if the value is TranslateContent
 *
 * @param value
 */
export function isTranslateContent(value: unknown): value is TranslateContent {
  return isBaseContent(value) && value?.type === ContentType.TRANSLATE;
}
