import AuthAPI from '../api/AuthAPI';
import store from '../core/Store/Store';
import type {SignupData, SigninData} from '../types/auth';
import {APP_ROUTES} from "../core/Router/routes";
import Router from "../core/Router/Router";

class AuthController {
  public async signup(data: SignupData): Promise<void> {
    try {
      await AuthAPI.signup(data);

      const user = await AuthAPI.getUser();
      store.setState('user', user);

      const router = new Router('#app');
      router.replace(APP_ROUTES.MESSENGER);
    } catch (error) {
      console.error('Ошибка регистрации', error);
    }
  }

  public async signin(data: SigninData): Promise<void> {
    try {
      await AuthAPI.signin(data);

      const user = await AuthAPI.getUser();
      store.setState('user', user);

      const router = new Router('#app');
      router.replace(APP_ROUTES.MESSENGER);
    } catch (error) {
      console.error('Ошибка входа', error);
    }
  }

  public async fetchUser(): Promise<void> {
    try {
      const user = await AuthAPI.getUser();
      store.setState('user', user);
    } catch (error) {
      store.setState('user', null);
      console.error('Не удалось получить пользователя', error);
    }
  }

  public async logout(): Promise<void> {
    try {
      await AuthAPI.logout();
      store.setState('user', null);

      const router = new Router('#app');
      router.replace(APP_ROUTES.LOGIN);
    } catch (error) {
      console.error('Ошибка выхода', error);
    }
  }
}

export default new AuthController();
