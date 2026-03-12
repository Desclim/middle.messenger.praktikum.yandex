import type {EditPasswordContext} from "./types";

export function bindEditPasswordFormSubmit(context: EditPasswordContext): void {
    context.form.addEventListener('submit', (event) => {
        handleEditPasswordSubmit(event, context);
    });
}

function handleEditPasswordSubmit(event: Event, context: EditPasswordContext): void {
    event.preventDefault();

    const passwordOldValid = context.passwordOldInput.validate();
    const passwordValid = context.passwordInput.validate();
    const passwordRepeatValid = context.passwordRepeatInput.validate();

    if (!passwordOldValid || !passwordValid || !passwordRepeatValid ) {
        return;
    }

    const values = {
        passwordOld: context.passwordOldInput.getValue(),
        password: context.passwordInput.getValue(),
        passwordRepeat: context.passwordRepeatInput.getValue(),
    };

    console.log(values);
}