import type { Input } from '../../components/input/input';

export type LoginPageContext = {
    loginPage: HTMLElement;
    form: HTMLFormElement;
    loginInput: Input;
    passwordInput: Input;
};
