import HTTPTransport from "./HTTPTransport";

const BASE_URL = 'https://ya-praktikum.tech/api/v2';

export abstract class BaseYandexAPI {
  protected http: HTTPTransport
  protected endpoint:string

  constructor() {
    this.http = new HTTPTransport()
    this.endpoint = `${BASE_URL}`
  }
}
