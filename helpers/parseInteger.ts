import { isString } from "./isString";

export function parseInteger (value: unknown) : number | undefined {
  if (isString(value)) {
    return parseInt(value, 10);
  }
  return undefined
}
