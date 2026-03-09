import {Input} from "../../blocks/input/input";

export type RegisterPageContext = {
    registerPage: HTMLElement;
    form: HTMLFormElement;
    emailInput: Input;
    usernameInput: Input;
    nameInput: Input;
    lastNameInput: Input;
    telInput: Input;
    passwordInput: Input;
    passwordRepeatInput: Input;
};