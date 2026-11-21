import { BASE_URL } from '../core/HTTP/BaseAPI';

const RESOURCE_PATH_REGEXP = /^(?!.*\.\.)(?!\/\/)[a-zA-Z0-9/_@.+-]+$/;

const resourceBaseUrl = `${BASE_URL}/resources/`;

function stripHtmlTags(value: string): string {
  const template = document.createElement('template');

  template.innerHTML = value;

  return template.content.textContent ?? '';
}

export function sanitizeUserContent(value: unknown): string {
  return stripHtmlTags(String(value ?? ''));
}

export function sanitizeResourceUrl(value: unknown): string {
  const url = String(value ?? '').trim();

  if (!url) {
    return '';
  }

  try {
    const parsedUrl = new URL(url);
    const parsedBaseUrl = new URL(BASE_URL);

    const isCorrectResource =
      parsedUrl.protocol === 'https:' &&
      parsedUrl.origin === parsedBaseUrl.origin &&
      parsedUrl.pathname.startsWith('/api/v2/resources/');

    return isCorrectResource ? parsedUrl.toString() : '';
  } catch {
    return '';
  }
}

export function buildSafeResourceUrl(path: unknown): string {
  const rawPath = String(path ?? '').trim();

  if (!rawPath) {
    return '';
  }

  const safeUrl = sanitizeResourceUrl(rawPath);

  if (safeUrl) {
    return safeUrl;
  }

  if (!RESOURCE_PATH_REGEXP.test(rawPath)) {
    return '';
  }

  return `${resourceBaseUrl}${rawPath.replace(/^\/+/, '')}`;
}
