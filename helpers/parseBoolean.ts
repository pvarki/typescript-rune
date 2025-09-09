import { isBoolean } from "./isBoolean";
import { isString } from "./isString";

export function parseBoolean(value: unknown): boolean {
  if (isString(value)) {
    return value.toLowerCase() == "true";
  }
  if (isBoolean(value)) {
    return value == true;
  }
  return false;
}
