import {Input} from "../../components/input/input";
import {validateDefault} from "../../services/validation/validators";
import type {EditProfileContext} from "./types";
import {bindEditProfileFormSubmit} from "./handlers";
import {mockProfile} from "../../mocks/mockProfile";

export function initEditProfilePage() {
    const editProfilePage = document.querySelector('.edit-profile') as HTMLElement | null

    if (!editProfilePage) {
        return
    }

    const form = editProfilePage.querySelector('.edit-profile__form') as HTMLFormElement | null

    const emailRoot = editProfilePage.querySelector('[data-input="email"]') as HTMLElement | null
    const loginRoot = editProfilePage.querySelector('[data-input="login"]') as HTMLElement | null
    const firstNameRoot = editProfilePage.querySelector('[data-input="first_name"]') as HTMLElement | null
    const secondNameRoot = editProfilePage.querySelector('[data-input="second_name"]') as HTMLElement | null
    const phoneRoot = editProfilePage.querySelector('[data-input="phone"]') as HTMLElement | null

    if (!form || !emailRoot || !loginRoot || !firstNameRoot || !secondNameRoot || !phoneRoot) {
        return;
    }

    const emailInput = new Input({
        root: emailRoot,
        validator: validateDefault,
        value: mockProfile.email
    })
    const loginInput = new Input({
        root: loginRoot,
        validator: validateDefault,
        value: mockProfile.login
    })
    const firstNameInput = new Input({
        root: firstNameRoot,
        validator: validateDefault,
        value: mockProfile.firstName
    })
    const secondNameInput = new Input({
        root: secondNameRoot,
        validator: validateDefault,
        value: mockProfile.secondName
    })
    const phoneInput = new Input({
        root: phoneRoot,
        validator: validateDefault,
        value: mockProfile.phone,
        mask: 'phone'
    })

    const context: EditProfileContext = {
        editProfilePage,
        form,
        secondNameInput,
        emailInput,
        firstNameInput,
        phoneInput,
        loginInput,
    }

    bindEditProfileFormSubmit(context)
}
