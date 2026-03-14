import type {EditProfileContext} from "./types";


export function bindEditProfileFormSubmit(context: EditProfileContext): void {
    context.form.addEventListener('submit', (event) => {
        handleEditSubmit(event, context);
    });
}

function handleEditSubmit(event: Event, context: EditProfileContext): void {
    event.preventDefault();

    const emailValid = context.emailInput.validate();
    const loginValid = context.loginInput.validate();
    const firstNameValid = context.firstNameInput.validate();
    const secondNamValid = context.secondNameInput.validate();
    const phoneValid = context.phoneInput.validate();

    if (!emailValid || !loginValid || !firstNameValid || !secondNamValid || !phoneValid ) {
        return;
    }

    const values = {
        email: context.emailInput.getValue(),
        username: context.loginInput.getValue(),
        firstName: context.firstNameInput.getValue(),
        secondName: context.secondNameInput.getValue(),
        phone: context.phoneInput.getValue(),
    };

    console.log(values);
}
