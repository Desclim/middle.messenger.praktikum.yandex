import {BaseYandexAPI} from '../core/HTTP/BaseAPI';
import type {User, UserProfile} from '../types/user';
import type {UpdatePasswordData} from '../types/user';

class UsersAPI extends BaseYandexAPI {
  public changeUserProfile(data: UserProfile): Promise<User> {
    return this.http.put(`${this.endpoint}/user/profile`, {
      data,
    });
  }

  public changeUserAvatar(file: File): Promise<User> {
    const formData = new FormData();
    formData.append('avatar', file);

    return this.http.put(`${this.endpoint}/user/profile/avatar`, {
      data: formData,
    });
  }

  public changeUserPassword(data: UpdatePasswordData): Promise<void> {
    return this.http.put(`${this.endpoint}/user/password`, {
      data,
    });
  }

  public search(data: { login: string }) {
    return this.http.post(`${this.endpoint}/user/search`, {data});
  }
}

export default new UsersAPI();
