import {Input} from "../../components/input/input";

export type EditPasswordContext = {
    editPasswordPage: HTMLElement;
    form: HTMLFormElement;
    passwordOldInput: Input;
    passwordInput: Input;
    passwordRepeatInput: Input;
}
