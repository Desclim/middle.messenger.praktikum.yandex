import {BaseYandexAPI} from "../core/HTTP/BaseAPI";
import type {SigninData, SignupData} from "../types/auth";
import type {User} from "../types/user";

class AuthAPI extends BaseYandexAPI {
  public signup(data: SignupData): Promise<{ id: number }> {
    return this.http.post<{ id: number }>(`${this.endpoint}/auth/signup`, {data});
  }

  public signin(data: SigninData): Promise<void> {
    return this.http.post<void>(`${this.endpoint}/auth/signin`, {data});
  }

  public getUser(): Promise<User> {
    return this.http.get<User>(`${this.endpoint}/auth/user`).then((user)=>({
      ...user,
      display_name: user?.display_name || user?.first_name
    }));
  }

  public logout(): Promise<void> {
    return this.http.post<void>(`${this.endpoint}/auth/logout`);
  }
}

export default new AuthAPI()
