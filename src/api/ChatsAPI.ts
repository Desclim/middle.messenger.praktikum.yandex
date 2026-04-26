import {BaseYandexAPI} from "../core/HTTP/BaseAPI";
import type {ChatUsersRequest, CreateChatRequest} from "../types/chats";
import type {ChatData} from "../types/chats";

class ChatsAPI extends BaseYandexAPI {
  public getChats(): Promise<ChatData[]> {
    return this.http.get(`${this.endpoint}/chats`);
  }

  public create(data: CreateChatRequest): Promise<{ id: number }> {
    return this.http.post(`${this.endpoint}/chats`, {data});
  }

  public addUsers(data: ChatUsersRequest): Promise<void> {
    return this.http.put(`${this.endpoint}/chats/users`, {data});
  }

  public removeUsers(data: ChatUsersRequest): Promise<void> {
    return this.http.delete(`${this.endpoint}/chats/users`, {data});
  }
}

export default new ChatsAPI();
