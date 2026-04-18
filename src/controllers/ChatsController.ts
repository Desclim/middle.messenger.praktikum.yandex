import ChatsAPI from "../api/ChatsAPI";
import store from "../core/Store/Store";
import {mapChatDataToChatUI} from "../utils/mapChatDataToChatUI";

class ChatsController {
  public async createChat(title: string): Promise<void> {
    await ChatsAPI.create({ title });
  }

  public async addUsersToChat(users: number[], chatId: number): Promise<void> {
    await ChatsAPI.addUsers({ users, chatId });
  }

  public async removeUsersFromChat(users: number[], chatId: number): Promise<void> {
    await ChatsAPI.removeUsers({ users, chatId });
  }

  public async getChats(): Promise<void> {
    const chats = await ChatsAPI.getChats();
    const mappedChats = chats.map(mapChatDataToChatUI);

    store.setState('chats', mappedChats);
  }

}

export default new ChatsController()
