import Block, {type BlockOwnProps} from '../../core/Component/Block';
import template from './edit-password.hbs?raw';
import './edit-password.scss';

import {Input} from '../../components/input/input';
import {mockProfile} from '../../mocks/mockProfile';
import {
  validateDefault,
  validatePassword,
  validatePasswordRepeat,
} from '../../services/validation/validators';
import {getComponentByName} from '../../utils/getComponentByName';
import {navigate} from "../../core/Router/navigate";
import {APP_ROUTES} from "../../core/Router/routes";

interface EditPasswordPageProps extends BlockOwnProps {
  displayName: string;
  newPasswordRepeatValidator: (value: string) => string;
  newPasswordValidator: (value: string) => string;
}

export class EditPasswordPage extends Block<EditPasswordPageProps> {
  static componentName = 'EditPasswordPage';
  protected template = template;

  constructor() {
    super({
      displayName: mockProfile.displayName,
      newPasswordValidator: validatePassword,
      newPasswordRepeatValidator: validateDefault,
    });
  }

  protected componentDidMount(): void {
    const passwordInputs = this.getPasswordInputs();

    if (!passwordInputs) {
      return;
    }

    const {newPasswordInput, newPasswordRepeatInput} = passwordInputs;

    newPasswordInput.getField().addEventListener('blur', this.passwordBlurHandler);
    newPasswordRepeatInput.getField().addEventListener('blur', this.passwordBlurHandler);
  }

  protected componentWillUnmount(): void {
    const passwordInputs = this.getPasswordInputs();

    if (!passwordInputs) {
      return;
    }

    const {newPasswordInput, newPasswordRepeatInput} = passwordInputs;

    newPasswordInput.getField().removeEventListener('blur', this.passwordBlurHandler);
    newPasswordRepeatInput.getField().removeEventListener('blur', this.passwordBlurHandler);
  }

  protected events = {
    submit: (event: Event) => {
      event.preventDefault();

      const oldPasswordInput = getComponentByName(this.children, Input, 'old_password');
      const passwordInput = getComponentByName(this.children, Input, 'new_password');
      const passwordRepeatInput = getComponentByName(this.children, Input, 'new_password_repeat');

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
        newPassword: passwordInput.getValue(),
        newPasswordRepeat: passwordRepeatInput.getValue(),
      });

      navigate(APP_ROUTES.PROFILE);
    },
  };

  private getPasswordInputs(): { newPasswordInput: Input, newPasswordRepeatInput: Input } | null {
    const newPasswordInput = getComponentByName(this.children, Input, 'new_password');
    const newPasswordRepeatInput = getComponentByName(this.children, Input, 'new_password_repeat');

    if (!newPasswordInput || !newPasswordRepeatInput) {
      return null;
    }

    return {newPasswordInput, newPasswordRepeatInput};
  }

  private passwordBlurHandler = (): void => {
    this.validatePasswordsMatch();
  };

  private validatePasswordsMatch(): boolean {
    const passwordInputs = this.getPasswordInputs();

    if (!passwordInputs) {
      return false;
    }

    const {newPasswordInput, newPasswordRepeatInput} = passwordInputs;

    const newPassword = newPasswordInput.getValue();
    const newPasswordRepeat = newPasswordRepeatInput.getValue();

    if (!newPasswordRepeat.trim()) {
      return false;
    }

    const error = validatePasswordRepeat(newPasswordRepeat, newPassword);

    if (error) {
      newPasswordRepeatInput.showError(error);
      return false;
    }

    newPasswordRepeatInput.hideError();
    return true;
  }
}
