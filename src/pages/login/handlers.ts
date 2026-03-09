import type {LoginPageContext} from "./types";

export function bindLoginFormSubmit(context: LoginPageContext): void {
    context.form.addEventListener('submit', (event) => {
        handleLoginSubmit(event, context);
    });
}

function handleLoginSubmit(event: Event, context: LoginPageContext): void {
    event.preventDefault();

    const loginValid = context.loginInput.validate();
    const passwordValid = context.passwordInput.validate();

    if (!loginValid || !passwordValid) {
        return;
    }

    const values = {
        login: context.loginInput.getValue(),
        password: context.passwordInput.getValue()
    };

    console.log(values);
}