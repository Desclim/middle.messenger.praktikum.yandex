import {BASE_URL} from "../core/HTTP/BaseAPI";
export function getAvatarUrl(avatar: string | null | undefined): string {
  if (!avatar) {
    return '';
  }

  if (avatar.startsWith(`${BASE_URL}/resources/`)) {
    return avatar
  }

  return `${BASE_URL}/resources/${avatar}`;
}
