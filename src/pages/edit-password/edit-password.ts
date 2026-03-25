import Block, { type BlockOwnProps } from '../../core/Block';
import template from './edit-password.hbs?raw';
import './edit-password.scss';

import { Input } from '../../components/input/input';
import { mockProfile } from '../../mocks/mockProfile';
import { navigate } from '../../services/router/router';
import {
  validateDefault,
  validatePassword,
  validatePasswordRepeat,
} from '../../services/validation/validators';
import { getComponentByName } from '../../utils/getComponentByName';

interface EditPasswordPageProps extends BlockOwnProps {
  displayName: string;
  passwordRepeatValidator: (value: string) => string;
  passwordValidator: (value: string) => string;
}

export class EditPasswordPage extends Block<EditPasswordPageProps> {
  static componentName = 'EditPasswordPage';
  protected template = template;

  constructor() {
    super({
      displayName: mockProfile.displayName,
      passwordValidator: validatePassword,
      passwordRepeatValidator: validateDefault,
    });
  }

  protected componentDidMount(): void {
    const passwordInputs = this.getPasswordInputs();

    if (!passwordInputs) {
      return;
    }

    const { passwordInput, passwordRepeatInput } = passwordInputs;

    passwordInput.getField().addEventListener('blur', this.passwordBlurHandler);
    passwordRepeatInput.getField().addEventListener('blur', this.passwordBlurHandler);
  }

  protected componentWillUnmount(): void {
    const passwordInputs = this.getPasswordInputs();

    if (!passwordInputs) {
      return;
    }

    const { passwordInput, passwordRepeatInput } = passwordInputs;

    passwordInput.getField().removeEventListener('blur', this.passwordBlurHandler);
    passwordRepeatInput.getField().removeEventListener('blur', this.passwordBlurHandler);
  }

  protected events = {
    submit: (event: Event) => {
      event.preventDefault();

      const oldPasswordInput = getComponentByName(this.children, Input, 'password-old');
      const passwordInput = getComponentByName(this.children, Input, 'password');
      const passwordRepeatInput = getComponentByName(this.children, Input, 'password-repeat');

      if (!oldPasswordInput || !passwordInput || !passwordRepeatInput) {
        return;
      }

      const isOldPasswordValid = oldPasswordInput.validate();
      const isPasswordValid = passwordInput.validate();
      const isPasswordRepeatBaseValid = passwordRepeatInput.validate();
      const isPasswordsMatch = this.validatePasswordsMatch();

      if (
        !isOldPasswordValid ||
        !isPasswordValid ||
        !isPasswordRepeatBaseValid ||
        !isPasswordsMatch
      ) {
        return;
      }

      console.log({
        oldPassword: oldPasswordInput.getValue(),
        password: passwordInput.getValue(),
        passwordRepeat: passwordRepeatInput.getValue(),
      });

      navigate('/profile');
    },
  };

  private getPasswordInputs(): { passwordInput: Input, passwordRepeatInput: Input } | null {
    const passwordInput = getComponentByName(this.children, Input, 'password');
    const passwordRepeatInput = getComponentByName(
      this.children,
      Input,
      'password-repeat',
    );

    if (!passwordInput || !passwordRepeatInput) {
      return null;
    }

    return { passwordInput, passwordRepeatInput };
  }

  private passwordBlurHandler = (): void => {
    this.validatePasswordsMatch();
  };

  private validatePasswordsMatch(): boolean {
    const passwordInputs = this.getPasswordInputs();

    if (!passwordInputs) {
      return false;
    }

    const { passwordInput, passwordRepeatInput } = passwordInputs;

    const password = passwordInput.getValue();
    const passwordRepeat = passwordRepeatInput.getValue();

    if (!passwordRepeat.trim()) {
      return false;
    }

    const error = validatePasswordRepeat(passwordRepeat, password);

    if (error) {
      passwordRepeatInput.showError(error);
      return false;
    }

    passwordRepeatInput.hideError();
    return true;
  }
}
