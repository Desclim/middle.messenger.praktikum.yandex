import Router from "./Router";
import type {AppPathname} from "./routes";

export function navigate(path:AppPathname):void {
  new Router('#app').go(path)
}
