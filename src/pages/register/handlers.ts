import type {RegisterPageContext} from "./types";

export function bindRegisterFormSubmit(context: RegisterPageContext): void {
    context.form.addEventListener('submit', (event) => {
        handleRegisterSubmit(event, context);
    });
}

function handleRegisterSubmit(event: Event, context: RegisterPageContext): void {
    event.preventDefault();

    const emailValid = context.emailInput.validate();
    const usernameValid = context.loginInput.validate();
    const nameValid = context.firstNameInput.validate();
    const lastNameValid = context.secondNameInput.validate();
    const telValid = context.phoneInput.validate();
    const passwordValid = context.passwordInput.validate();
    const passwordRepeatValid = context.passwordRepeatInput.validate();

    if (!emailValid || !usernameValid || !nameValid || !lastNameValid || !telValid || !passwordValid || !passwordRepeatValid ) {
        return;
    }

    const values = {
        email: context.emailInput.getValue(),
        login: context.loginInput.getValue(),
        firstName: context.firstNameInput.getValue(),
        secondName: context.secondNameInput.getValue(),
        phone: context.phoneInput.getValue(),
        password: context.passwordInput.getValue(),
        passwordRepeat: context.passwordRepeatInput.getValue(),
    };

    console.log(values);
}