import { expect } from 'chai';
import Block, { type BlockOwnProps } from '../Component/Block';
import store from '../Store/Store';
import Router from './Router';
import { APP_ROUTES } from './routes';
import {resetDom, setupDom} from "../../test-utils/setupMockDOM";

class LoginPage extends Block<BlockOwnProps> {
  protected template = '<main>login page</main>';
}

class MessengerPage extends Block<BlockOwnProps> {
  public static componentWillUnmountCount = 0;

  protected template = '<main>messenger page</main>';

  protected componentWillUnmount(): void {
    MessengerPage.componentWillUnmountCount += 1;
  }
}

class NotFoundPage extends Block<BlockOwnProps> {
  protected template = '<main>not found page</main>';
}

class SettingsPage extends Block<BlockOwnProps> {
  protected template = '<main>settings page</main>';
}

function createRouter(): Router {
  return new Router('#app')
    .use(APP_ROUTES.LOGIN, LoginPage)
    .use(APP_ROUTES.MESSENGER, MessengerPage)
    .use(APP_ROUTES.SETTINGS, SettingsPage)
    .use(APP_ROUTES.NOT_FOUND, NotFoundPage)
}

function getAppTextContent(): string {
  return document.querySelector('#app')?.textContent ?? '';
}

function resetRouter(): void {
  Reflect.set(Router, '__instance', undefined);
}

function resetStore(): void {
  Reflect.set(store, 'state', {});
}

describe('Router', () => {
  beforeEach(() => {
    MessengerPage.componentWillUnmountCount = 0;

    resetRouter();
    resetStore();
  });

  afterEach(() => {
    resetRouter();
    resetStore();
    resetDom();
  });

  it('рендерит страницу по текущему pathname', () => {
    setupDom(APP_ROUTES.LOGIN);

    const router = createRouter();

    router.start();

    expect(window.location.pathname).to.equal(APP_ROUTES.LOGIN);
    expect(getAppTextContent()).to.equal('login page');
  });

  it('переходит на новый маршрут через go', () => {
    setupDom(APP_ROUTES.MESSENGER);
    store.setState('user', { id: 1 });

    const router = createRouter();

    router.start();
    router.go(APP_ROUTES.SETTINGS);

    expect(window.location.pathname).to.equal(APP_ROUTES.SETTINGS);
    expect(getAppTextContent()).to.equal('settings page');
  });

  it('не делает повторный переход, если pathname не изменился', () => {
    setupDom(APP_ROUTES.MESSENGER);
    store.setState('user', { id: 1 });

    const router = createRouter();

    router.start();
    router.go(APP_ROUTES.MESSENGER);

    expect(window.location.pathname).to.equal(APP_ROUTES.MESSENGER);
    expect(getAppTextContent()).to.equal('messenger page');
    expect(MessengerPage.componentWillUnmountCount).to.equal(0);
  });

  it('вызывает leave у текущего маршрута при переходе', () => {
    setupDom(APP_ROUTES.MESSENGER);
    store.setState('user', { id: 1 });

    const router = createRouter();

    router.start();
    router.go(APP_ROUTES.SETTINGS);

    expect(MessengerPage.componentWillUnmountCount).to.equal(1);
  });

  it('редиректит неавторизованного пользователя с приватного маршрута на login', () => {
    setupDom(APP_ROUTES.MESSENGER);

    createRouter().start();

    expect(window.location.pathname).to.equal(APP_ROUTES.LOGIN);
    expect(getAppTextContent()).to.equal('login page');
  });

  it('редиректит авторизованного пользователя с login на messenger', () => {
    setupDom(APP_ROUTES.LOGIN);
    store.setState('user', { id: 1 });

    createRouter().start();

    expect(window.location.pathname).to.equal(APP_ROUTES.MESSENGER);
    expect(getAppTextContent()).to.equal('messenger page');
  });

  it('рендерит 404 для неизвестного маршрута', () => {
    setupDom('/unknown');

    createRouter().start();

    expect(window.location.pathname).to.equal('/unknown');
    expect(getAppTextContent()).to.equal('not found page');
  });
});
