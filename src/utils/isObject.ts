import type {objectType} from "../types/objectType";

export function isObject(value: unknown): value is objectType {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
