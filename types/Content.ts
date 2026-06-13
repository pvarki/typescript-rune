import { isArray } from "../helpers/isArray";
import { isString } from "../helpers/isString";
import { BaseContent, isBaseContent } from "./BaseContent";
import { ComponentContent } from "./ComponentContent";
import { RootContent } from "./RootContent";
import { TranslationContent } from "./TranslationContent";
import { ViewContent } from "./ViewContent";

/**
 * Any accepted dynamic content DTO type
 */
export type Content =
  | ViewContent
  | ComponentContent
  | RootContent
  | BaseContent
  | TranslationContent
  | string;

export function isContentOrArray(
  value: unknown,
): value is Content | readonly Content[] {
  if (isString(value)) {
    return true;
  }
  if (isArray(value)) {
    return value.every(isContentOrArray);
  }
  return isBaseContent(value);
}
