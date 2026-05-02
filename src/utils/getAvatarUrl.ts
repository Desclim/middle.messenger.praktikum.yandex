import {buildSafeResourceUrl} from "./sanitaizeFunctions";
export function getAvatarUrl(avatar: string | null | undefined): string {
    return buildSafeResourceUrl(avatar)
}
