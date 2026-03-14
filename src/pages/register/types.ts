import {Input} from "../../blocks/input/input";

export type RegisterPageContext = {
    registerPage: HTMLElement;
    form: HTMLFormElement;
    emailInput: Input;
    loginInput: Input;
    firstNameInput: Input;
    secondNameInput: Input;
    phoneInput: Input;
    passwordInput: Input;
    passwordRepeatInput: Input;
};
