import {LoginPage} from '../../pages/login/login';
import {NotFoundPage} from '../../pages/not-found/not-found';
import {ErrorPage} from '../../pages/error/error';
import {RegisterPage} from '../../pages/register/register';
import {ChatsPage} from '../../pages/chats/chats';
import {ProfilePage} from '../../pages/profile/profile';
import {EditProfilePage} from '../../pages/edit-profile/edit-profile';
import {EditPasswordPage} from '../../pages/edit-password/edit-password';
import {renderPage} from "../renderPage/renderPage";
import Block from "../../core/Block";

const routes: Record<string, new () => Block> = {
  '/': LoginPage,
  '/404': NotFoundPage,
  '/500': ErrorPage,
  '/register': RegisterPage,
  '/chats': ChatsPage,
  '/profile': ProfilePage,
  '/edit-profile': EditProfilePage,
  '/edit-password': EditPasswordPage,
};

export function router(): void {
  const path = window.location.pathname;
  let route = routes[path];

  if (!route) {
    window.history.replaceState({}, '', '/404');
    route = routes['/404'];
  }

  if (!route) {
    return;
  }

  const page = new route();
  renderPage(page);
}

export function navigate(path: string): void {
  window.history.pushState({}, '', path);
  router();
}
