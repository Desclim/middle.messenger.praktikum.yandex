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
    const usernameRoot = registerPage.querySelector('[data-input="username"]') as HTMLElement | null
    const nameRoot = registerPage.querySelector('[data-input="name"]') as HTMLElement | null
    const lastNameRoot = registerPage.querySelector('[data-input="last-name"]') as HTMLElement | null
    const telRoot = registerPage.querySelector('[data-input="tel"]') as HTMLElement | null
    const passwordRoot = registerPage.querySelector('[data-input="password"]') as HTMLElement | null
    const passwordRepeatRoot = registerPage.querySelector('[data-input="password-repeat"]') as HTMLElement | null

    if (!form || !emailRoot || !usernameRoot || !nameRoot || !lastNameRoot || !telRoot || !passwordRoot || !passwordRepeatRoot) {
        return;
    }

    const emailInput = new Input({
        root: emailRoot,
        validator: validateDefault
    })
    const usernameInput = new Input({
        root: usernameRoot,
        validator: validateDefault
    })
    const nameInput = new Input({
        root: nameRoot,
        validator: validateDefault
    })
    const lastNameInput = new Input({
        root: lastNameRoot,
        validator: validateDefault
    })
    const telInput = new Input({
        root: telRoot,
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

    emailInput.bindEvents()
    usernameInput.bindEvents()
    nameInput.bindEvents()
    lastNameInput.bindEvents()
    telInput.bindEvents()
    passwordInput.bindEvents()
    passwordRepeatInput.bindEvents()

    const context: RegisterPageContext = {
        registerPage,
        form,
        lastNameInput,
        emailInput,
        nameInput,
        passwordRepeatInput,
        telInput,
        usernameInput,
        passwordInput
    }

    bindRegisterFormSubmit(context)
}