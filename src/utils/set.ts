import {isObject} from "./isObject";
import type {objectType} from "../types/objectType";
import merge from "./merge";

function set(object: objectType, path: string, value: unknown): objectType {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  if (!isObject(object)) {
    return object;
  }

  const keys = path.split('.');

  const newObject = keys.reduceRight<unknown>((acc, key) => {
    return { [key]: acc };
  }, value) as objectType;

  return merge(object, newObject);
}

export default set;
