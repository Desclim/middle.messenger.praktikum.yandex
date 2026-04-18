import './styles/global.scss';
import {registryComponents} from "./core/Component/registerComponents";
import Router from "./core/Router/Router";
import {LoginPage} from "./pages/login/login";
import {NotFoundPage} from "./pages/not-found/not-found";
import {ErrorPage} from "./pages/error/error";
import {SignupPage} from "./pages/sign-up/sign-up";
import {MessengerPage} from "./pages/messenger/messenger";
import {SettingsPage} from "./pages/settings/settings";
import {EditProfilePage} from "./pages/edit-profile/edit-profile";
import {EditPasswordPage} from "./pages/edit-password/edit-password";
import {navigate} from "./core/Router/navigate";
import AuthController from "./controllers/AuthController";
import type {AppPathname} from "./core/Router/routes";

registryComponents()

document.addEventListener('click', (event: MouseEvent) => {
  const target = event.target as HTMLElement | null;
  const link = target?.closest('[data-link]') as HTMLAnchorElement | null;

  if (!link) {
    return;
  }

  event.preventDefault();

  const href = link.getAttribute('href');

  if (!href) {
    return;
  }

  navigate(href as AppPathname)
});

window.addEventListener('DOMContentLoaded', async () => {
  await AuthController.fetchUser()

  const router = new Router('#app')

  router
    .use('/', LoginPage)
    .use('/404', NotFoundPage)
    .use('/500', ErrorPage)
    .use('/sign-up', SignupPage)
    .use('/messenger', MessengerPage)
    .use('/settings', SettingsPage)
    .use('/edit-profile', EditProfilePage)
    .use('/edit-password', EditPasswordPage)
    .start();
});
