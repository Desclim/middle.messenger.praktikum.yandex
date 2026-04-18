import type {UpdatePasswordData, User, UserProfile} from "../types/user";
import store from "../core/Store/Store";
import UsersAPI from "../api/UsersAPI";

class UsersController {
  async updateProfile(data: UserProfile) {
    const user = await UsersAPI.changeUserProfile(data);
    store.setState('user', user);
  }

  async updateAvatar(file: File) {
    const user = await UsersAPI.changeUserAvatar(file);
    store.setState('user', user);
  }

  async updatePassword(data: UpdatePasswordData) {
    await UsersAPI.changeUserPassword(data);
  }
  async searchByLogin(login: string): Promise<User[]> {
    const response = await UsersAPI.search({ login });
    return response as User[];
  }
}

export default new UsersController()
