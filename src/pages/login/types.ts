import type { Input } from '../../blocks/input/input';

export type LoginPageContext = {
    loginPage: HTMLElement;
    form: HTMLFormElement;
    loginInput: Input;
    passwordInput: Input;
};