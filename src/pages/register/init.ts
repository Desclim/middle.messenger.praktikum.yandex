import {Input} from "../../blocks/input/input";
import {validateDefault, validatePassword, validatePasswordRepeat} from "../../services/validation/validators";
import type {RegisterPageContext} from "./types";
import {bindRegisterFormSubmit} from "./handlers";

export function initRegisterPage() {
    const registerPage = document.querySelector('.register') as HTMLElement | null

    if (!registerPage) {
        return
    }

    const form = registerPage.querySelector('.register__form') as HTMLFormElement | null

    const emailRoot = registerPage.querySelector('[data-input="email"]') as HTMLElement | null
    const loginRoot = registerPage.querySelector('[data-input="login"]') as HTMLElement | null
    const firstNameRoot = registerPage.querySelector('[data-input="first_name"]') as HTMLElement | null
    const secondNameRoot = registerPage.querySelector('[data-input="second_name"]') as HTMLElement | null
    const phoneRoot = registerPage.querySelector('[data-input="phone"]') as HTMLElement | null
    const passwordRoot = registerPage.querySelector('[data-input="password"]') as HTMLElement | null
    const passwordRepeatRoot = registerPage.querySelector('[data-input="password-repeat"]') as HTMLElement | null

    if (!form || !emailRoot || !loginRoot || !firstNameRoot || !secondNameRoot || !phoneRoot || !passwordRoot || !passwordRepeatRoot) {
        return;
    }

    const emailInput = new Input({
        root: emailRoot,
        validator: validateDefault
    })
    const loginInput = new Input({
        root: loginRoot,
        validator: validateDefault
    })
    const firstNameInput = new Input({
        root: firstNameRoot,
        validator: validateDefault
    })
    const secondNameInput = new Input({
        root: secondNameRoot,
        validator: validateDefault
    })
    const phoneInput = new Input({
        root: phoneRoot,
        validator: validateDefault,
        mask: 'phone'
    })
    const passwordInput = new Input({
        root: passwordRoot,
        validator: validatePassword
    })
    const passwordRepeatInput = new Input({
        root: passwordRepeatRoot,
        validator: (value:string)=>validatePasswordRepeat(value, passwordInput.getValue())
    })

    const context: RegisterPageContext = {
        registerPage,
        form,
        secondNameInput,
        emailInput,
        firstNameInput,
        passwordRepeatInput,
        phoneInput,
        loginInput,
        passwordInput
    }

    bindRegisterFormSubmit(context)
}
