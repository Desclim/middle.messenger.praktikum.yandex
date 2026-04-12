import type {objectType} from "../../types/objectType";

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

type MethodsType = typeof METHODS[keyof typeof METHODS];



type RequestOptions = {
  headers?: Record<string, string>;
  method?: MethodsType;
  data?: unknown;
  timeout?: number;
  responseType?: XMLHttpRequestResponseType;
};

function queryStringify(data: objectType): string {
  const entries = Object.entries(data).filter(([_, value]) => value !== undefined && value !== null);

  if (entries.length === 0) {
    return '';
  }

  const query = entries
    .map(([key, value]) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    })
    .join('&');

  return `?${query}`;
}

export default class HTTPTransport {
  get = <TResponse>(url: string, options: Omit<RequestOptions, 'method'> = {}): Promise<TResponse> => {
    return this.request<TResponse>(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  post = <TResponse>(url: string, options: Omit<RequestOptions, 'method'> = {}): Promise<TResponse> => {
    return this.request<TResponse>(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  put = <TResponse>(url: string, options: Omit<RequestOptions, 'method'> = {}): Promise<TResponse> => {
    return this.request<TResponse>(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  delete = <TResponse>(url: string, options: Omit<RequestOptions, 'method'> = {}): Promise<TResponse> => {
    return this.request<TResponse>(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = <TResponse>(url: string, options: RequestOptions = {}, timeout = 5000): Promise<TResponse> => {
    const {
      headers = {},
      method,
      data,
      responseType,
    } = options;

    return new Promise<TResponse>((resolve, reject) => {
      if (!method) {
        reject(new Error('HTTP method is required'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && data && typeof data === 'object'
          ? `${url}${queryStringify(data as objectType)}`
          : url
      );

      xhr.withCredentials = true;

      if (responseType) {
        xhr.responseType = responseType;
      }

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          let response: unknown;

          if (xhr.responseType) {
            response = xhr.response;
          } else {
            try {
              const contentType = xhr.getResponseHeader('Content-Type');

              if (contentType && contentType.includes('application/json')) {
                response = JSON.parse(xhr.responseText);
              } else {
                response = xhr.responseText;
              }
            } catch {
              response = xhr.responseText;
            }
          }

          resolve(response as TResponse);
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
            response: xhr.responseText,
            request: xhr,
          });
        }
      };

      xhr.onabort = () =>
        reject({
          reason: 'Request aborted',
          request: xhr,
        });

      xhr.onerror = () =>
        reject({
          reason: 'Network error',
          request: xhr,
        });

      xhr.timeout = timeout;

      xhr.ontimeout = () =>
        reject({
          reason: 'Request timeout',
          timeout: timeout,
          request: xhr,
        });

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else if (typeof data === 'object') {
        if (!headers['Content-Type']) {
          xhr.setRequestHeader('Content-Type', 'application/json');
        }

        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(String(data));
      }
    });
  };
}
