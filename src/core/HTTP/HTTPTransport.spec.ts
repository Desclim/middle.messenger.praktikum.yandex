import {expect} from 'chai';
import HTTPTransport from './HTTPTransport';

type RequestBody = Document | XMLHttpRequestBodyInit | null | undefined;

class MockXMLHttpRequest {
  public static request: MockXMLHttpRequest | null = null;

  public method = '';
  public url = '';
  public withCredentials = false;
  public requestHeaders: Record<string, string> = {};
  public sentData: RequestBody = null;
  public status = 200;
  public statusText = '';
  public responseText = '';
  public response: unknown = null;
  public responseType: XMLHttpRequestResponseType = '';
  public timeout = 0;
  public onload: (() => void) | null = null;
  public onabort: (() => void) | null = null;
  public onerror: (() => void) | null = null;
  public ontimeout: (() => void) | null = null;
  private responseHeaders: Record<string, string> = {};

  constructor() {
    MockXMLHttpRequest.request = this;
  }

  public open(method: string, url: string): void {
    this.method = method;
    this.url = url;
  }

  public send(data?: RequestBody): void {
    this.sentData = data;
  }

  public setRequestHeader(key: string, value: string): void {
    this.requestHeaders[key] = value;
  }

  public getResponseHeader(key: string): string | null {
    return this.responseHeaders[key.toLowerCase()] ?? null;
  }

  public respond(
    status: number,
    headers: Record<string, string>,
    body: string,
  ): void {
    this.status = status;
    this.responseText = body;
    this.responseHeaders = Object.fromEntries(
      Object.entries(headers).map(([key, value]) => [
        key.toLowerCase(),
        value,
      ]),
    );

    this.onload?.();
  }
}

const originalXMLHttpRequest = globalThis.XMLHttpRequest;

function getRequest(): MockXMLHttpRequest {
  const request = MockXMLHttpRequest.request;

  if (!request) {
    throw new Error('XMLHttpRequest не создан');
  }

  return request;
}

describe('HTTPTransport', () => {
  beforeEach(() => {
    MockXMLHttpRequest.request = null;

    globalThis.XMLHttpRequest = MockXMLHttpRequest as unknown as typeof XMLHttpRequest;
  });

  afterEach(() => {
    globalThis.XMLHttpRequest = originalXMLHttpRequest;
  });

  describe('GET-запрос', () => {
    it('добавляет query-параметры в URL', async () => {
      const transport = new HTTPTransport();

      const responsePromise = transport.get<{ ok: boolean }>('/api/chats', {
        data: {
          limit: 10,
          offset: 0,
        },
      });

      const request = getRequest();

      request.respond(200, {'Content-Type': 'application/json'}, '{"ok":true}');

      expect(request.method).to.equal('GET');
      expect(request.url).to.equal('/api/chats?limit=10&offset=0');
      expect(await responsePromise).to.deep.equal({ok: true});
    });

    it('включает отправку cookie', async () => {
      const transport = new HTTPTransport();

      const responsePromise = transport.get<{ id: number }>('/api/user');

      const request = getRequest();

      request.respond(200, {'Content-Type': 'application/json'}, '{"id":1}');

      expect(request.withCredentials).to.equal(true);
      expect(await responsePromise).to.deep.equal({id: 1});
    });
  });

  describe('POST-запрос', () => {
    it('отправляет объект в формате JSON', async () => {
      const transport = new HTTPTransport();

      const responsePromise = transport.post<string>('/api/chats', {
        data: {
          title: 'new chat'
        },
      });

      const request = getRequest();

      request.respond(201, {'Content-Type': 'text/plain'}, 'created');

      expect(request.method).to.equal('POST');
      expect(request.sentData).to.equal('{"title":"new chat"}');
      expect(await responsePromise).to.equal('created');
    });

    it('устанавливает Content-Type для JSON', async () => {
      const transport = new HTTPTransport();

      const responsePromise = transport.post<{ ok: boolean }>('/api/chats', {
        data: {
          title: 'new chat'
        },
      });

      const request = getRequest();

      request.respond(200, {'Content-Type': 'application/json'}, '{"ok":true}');

      expect(request.requestHeaders['Content-Type']).to.equal('application/json');
      expect(await responsePromise).to.deep.equal({ok: true});
    });

    it('не перезаписывает переданный Content-Type', async () => {
      const transport = new HTTPTransport();

      const responsePromise = transport.post<string>('/api/chats', {
        headers: {
          'Content-Type': 'text/plain',
        },
        data: {
          title: 'new chat',
        },
      });

      const request = getRequest();

      request.respond(200, {'Content-Type': 'text/plain'}, 'ok');

      expect(request.requestHeaders['Content-Type']).to.equal('text/plain');
      expect(await responsePromise).to.equal('ok');
    });
  });

  describe('Обработка ответа', () => {
    it('возвращает объект при JSON-ответе', async () => {
      const transport = new HTTPTransport();

      const responsePromise = transport.get<{ id: number }>('/api/user');

      const request = getRequest();

      request.respond(200, {'Content-Type': 'application/json'}, '{"id":123}');

      expect(await responsePromise).to.deep.equal({id: 123});
    });

    it('возвращает строку при текстовом ответе', async () => {
      const transport = new HTTPTransport();

      const responsePromise = transport.get<string>('/api/text');

      const request = getRequest();

      request.respond(200, {'Content-Type': 'text/plain'}, 'ok');

      expect(await responsePromise).to.equal('ok');
    });

    it('отклоняет промис при ошибочном статусе', async () => {
      const transport = new HTTPTransport();

      const responsePromise = transport.get('/api/error');

      const request = getRequest();

      request.statusText = 'Internal Server Error';
      request.respond(500, {'Content-Type': 'text/plain'}, 'fail');

      try {
        await responsePromise;
        throw new Error('Request should be rejected');
      } catch (error) {
        expect(error).to.deep.include({
          status: 500,
          statusText: 'Internal Server Error',
          response: 'fail',
        });
      }
    });

    it('отклоняет промис, если метод запроса не передан', async () => {
      const transport = new HTTPTransport();

      try {
        await transport.request('/api');
        throw new Error('Request should be rejected');
      } catch (error) {
        expect(error).to.be.instanceOf(Error);
        expect((error as Error).message).to.equal('HTTP method is required');
      }
    });
  });

  describe('Сетевые ошибки', () => {
    it('отклоняет промис при network error', async () => {
      const transport = new HTTPTransport();

      const responsePromise = transport.get('/api/network-error');

      const request = getRequest();

      request.onerror?.();

      try {
        await responsePromise;
        throw new Error('Request should be rejected');
      } catch (error) {
        expect(error).to.deep.include({
          reason: 'Network error',
        });
      }
    });

    it('отклоняет промис при timeout', async () => {
      const transport = new HTTPTransport();

      const responsePromise = transport.get('/api/timeout', {
        timeout: 1000,
      });

      const request = getRequest();

      request.ontimeout?.();

      try {
        await responsePromise;
        throw new Error('Request should be rejected');
      } catch (error) {
        expect(error).to.deep.include({
          reason: 'Request timeout',
          timeout: 1000,
        });
      }
    });

    it('отклоняет промис при abort', async () => {
      const transport = new HTTPTransport();

      const responsePromise = transport.get('/api/abort');

      const request = getRequest();

      request.onabort?.();

      try {
        await responsePromise;
        throw new Error('Request should be rejected');
      } catch (error) {
        expect(error).to.deep.include({
          reason: 'Request aborted',
        });
      }
    });
  });
});
