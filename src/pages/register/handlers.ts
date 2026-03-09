import type {RegisterPageContext} from "./types";

export function bindRegisterFormSubmit(context: RegisterPageContext): void {
    context.form.addEventListener('submit', (event) => {
        handleRegisterSubmit(event, context);
    });
}

function handleRegisterSubmit(event: Event, context: RegisterPageContext): void {
    event.preventDefault();

    const emailValid = context.emailInput.validate();
    const usernameValid = context.usernameInput.validate();
    const nameValid = context.nameInput.validate();
    const lastNameValid = context.lastNameInput.validate();
    const telValid = context.telInput.validate();
    const passwordValid = context.passwordInput.validate();
    const passwordRepeatValid = context.passwordRepeatInput.validate();

    if (!emailValid || !usernameValid || !nameValid || !lastNameValid || !telValid || !passwordValid || !passwordRepeatValid ) {
        return;
    }

    const values = {
        email: context.emailInput.getValue(),
        username: context.usernameInput.getValue(),
        name: context.nameInput.getValue(),
        lastName: context.lastNameInput.getValue(),
        tel: context.telInput.getValue(),
        password: context.passwordInput.getValue(),
        passwordRepeat: context.passwordRepeatInput.getValue(),
    };

    console.log(values);
}