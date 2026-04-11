import Block, {type BlockOwnProps} from '../../core/Block';
import template from './register.hbs?raw';
import './register.scss';

import {Input} from '../../components/input/input';
import {
  validateDefault,
  validateEmail, validateLogin, validateName,
  validatePassword,
  validatePasswordRepeat, validatePhone,
} from '../../services/validation/validators';
import {getComponentByName} from '../../utils/getComponentByName';
import {navigate} from "../../services/router/router";

interface RegisterPageProps extends BlockOwnProps {
  passwordValidator: (value: string) => string;
  emailValidator: (value: string) => string;
  loginValidator: (value: string) => string;
  nameValidator: (value: string) => string;
  phoneValidator: (value: string) => string;
  passwordRepeatValidator: (value: string) => string;
}

export class RegisterPage extends Block<RegisterPageProps> {
  static componentName = 'RegisterPage';
  protected template = template;

  constructor() {
    super({
      emailValidator: validateEmail,
      loginValidator: validateLogin,
      nameValidator: validateName,
      phoneValidator: validatePhone,
      passwordValidator: validatePassword,
      passwordRepeatValidator: validateDefault,
    });
  }

  protected componentDidMount(): void {
    const passwordInputs = this.getPasswordInputs();

    if (!passwordInputs) {
      return;
    }

    const {passwordInput, passwordRepeatInput} = passwordInputs;

    passwordInput.getField().addEventListener('blur', this.passwordBlurHandler);
    passwordRepeatInput.getField().addEventListener('blur', this.passwordBlurHandler);
  }

  protected componentWillUnmount(): void {
    const passwordInputs = this.getPasswordInputs();

    if (!passwordInputs) {
      return;
    }

    const {passwordInput, passwordRepeatInput} = passwordInputs;

    passwordInput.getField().removeEventListener('blur', this.passwordBlurHandler);
    passwordRepeatInput.getField().removeEventListener('blur', this.passwordBlurHandler);
  }

  protected events = {
    submit: (event: Event) => {
      event.preventDefault();

      const emailInput = getComponentByName(this.children, Input, 'email');
      const loginInput = getComponentByName(this.children, Input, 'login');
      const firstNameInput = getComponentByName(this.children, Input, 'first_name');
      const secondNameInput = getComponentByName(this.children, Input, 'second_name');
      const phoneInput = getComponentByName(this.children, Input, 'phone');
      const passwordInput = getComponentByName(this.children, Input, 'password');
      const passwordRepeatInput = getComponentByName(this.children, Input, 'password_repeat');

      if (
        !emailInput ||
        !loginInput ||
        !firstNameInput ||
        !secondNameInput ||
        !phoneInput ||
        !passwordInput ||
        !passwordRepeatInput
      ) {
        return;
      }

      const isEmailValid = emailInput.validate();
      const isLoginValid = loginInput.validate();
      const isFirstNameValid = firstNameInput.validate();
      const isSecondNameValid = secondNameInput.validate();
      const isPhoneValid = phoneInput.validate();
      const isPasswordValid = passwordInput.validate();
      const isPasswordRepeatBaseValid = passwordRepeatInput.validate();
      const isPasswordsMatch = this.validatePasswordsMatch();

      if (
        !isEmailValid ||
        !isLoginValid ||
        !isFirstNameValid ||
        !isSecondNameValid ||
        !isPhoneValid ||
        !isPasswordValid ||
        !isPasswordRepeatBaseValid ||
        !isPasswordsMatch
      ) {
        return;
      }

      console.log({
        email: emailInput.getValue(),
        login: loginInput.getValue(),
        first_name: firstNameInput.getValue(),
        second_name: secondNameInput.getValue(),
        phone: phoneInput.getValue(),
        password: passwordInput.getValue(),
        password_repeat: passwordRepeatInput.getValue(),
      });

      navigate('/')
    },
  };

  private getPasswordInputs(): { passwordInput: Input, passwordRepeatInput: Input } | null {
    const passwordInput = getComponentByName(this.children, Input, 'password');
    const passwordRepeatInput = getComponentByName(this.children, Input, 'password_repeat');

    if (!passwordInput || !passwordRepeatInput) {
      return null;
    }

    return {passwordInput, passwordRepeatInput};
  }

  private passwordBlurHandler = (): void => {
    this.validatePasswordsMatch();
  };

  private validatePasswordsMatch(): boolean {
    const passwordInputs = this.getPasswordInputs();

    if (!passwordInputs) {
      return false;
    }

    const {passwordInput, passwordRepeatInput} = passwordInputs;

    const password = passwordInput.getValue();
    const passwordRepeat = passwordRepeatInput.getValue();

    if (!passwordRepeat.trim()) {
      return false;
    }

    const error = validatePasswordRepeat(password, passwordRepeat);

    if (error) {
      passwordRepeatInput.showError(error);
      return false;
    }

    passwordRepeatInput.hideError();
    return true;
  }
}
