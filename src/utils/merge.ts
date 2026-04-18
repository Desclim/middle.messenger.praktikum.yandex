import {isObject} from "./isObject";
import type {objectType} from "../types/objectType";

export function merge(lhs: objectType, rhs: objectType): objectType {
  const result: objectType = {...lhs}

  Object.keys(rhs).forEach((key) => {
    const leftValue = lhs[key]
    const rightValue = rhs[key]

    if (isObject(leftValue) && isObject(rightValue)) {
      result[key] = merge(leftValue, rightValue)
    } else {
      result[key] = rightValue
    }
  })

  return result
}

export default merge;
