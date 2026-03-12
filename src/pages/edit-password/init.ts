import {Input} from "../../blocks/input/input";
import {validateDefault, validatePassword, validatePasswordRepeat} from "../../services/validation/validators";
import type {EditPasswordContext} from "./types";
import {bindEditPasswordFormSubmit} from "./handlers";

export function initEditPasswordPage() {
    const editPasswordPage = document.querySelector('.edit-password') as HTMLElement | null

    if (!editPasswordPage) {
        return
    }

    const form = editPasswordPage.querySelector('.edit-password__form') as HTMLFormElement | null

    const passwordOldRoot = editPasswordPage.querySelector('[data-input="password-old"]') as HTMLElement | null
    const passwordRoot = editPasswordPage.querySelector('[data-input="password"]') as HTMLElement | null
    const passwordRepeatRoot = editPasswordPage.querySelector('[data-input="password-repeat"]') as HTMLElement | null

    if (!form || !passwordOldRoot || !passwordRoot || !passwordRepeatRoot) {
        return;
    }

    const passwordOldInput = new Input({
        root: passwordOldRoot,
        validator: validateDefault,
    })
    const passwordInput = new Input({
        root: passwordRoot,
        validator: validatePassword,
    })
    const passwordRepeatInput = new Input({
        root: passwordRepeatRoot,
        validator: (value:string)=>validatePasswordRepeat(value, passwordInput.getValue())
    })

    const context: EditPasswordContext = {
        editPasswordPage,
        form,
        passwordOldInput,
        passwordInput,
        passwordRepeatInput
    }

    bindEditPasswordFormSubmit(context)
}