import {validateLogin, validatePassword} from "../../services/validation/validators";
import type {LoginPageContext} from "./types";
import {bindLoginFormSubmit} from "./handlers";

import {Input} from "../../blocks/input/input";

export function initLoginPage(): void {
    const loginPage = document.querySelector('.login') as HTMLElement | null;

    if (!loginPage) return;

    const form = loginPage.querySelector('.login__form') as HTMLFormElement | null;

    const loginRoot = loginPage.querySelector('[data-input="login"]') as HTMLElement | null;
    const passwordRoot = loginPage.querySelector('[data-input="password"]') as HTMLElement | null;

    if (!loginRoot || !passwordRoot || !form) return;

    const loginInput = new Input({
        root: loginRoot,
        validator: validateLogin
    });

    const passwordInput = new Input({
        root: passwordRoot,
        validator: validatePassword,
    });

    const context: LoginPageContext = {
        loginPage,
        form,
        loginInput,
        passwordInput
    };

    bindLoginFormSubmit(context);
}
