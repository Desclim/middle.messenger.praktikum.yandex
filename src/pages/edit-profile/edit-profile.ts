import Block, {type BlockOwnProps} from '../../core/Component/Block';
import template from './edit-profile.hbs?raw';
import './edit-profile.scss';

import {Input} from '../../components/input/input';
import {mockProfile} from '../../mocks/mockProfile';
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePhone,
} from '../../services/validation/validators';
import {getComponentByName} from '../../utils/getComponentByName';
import {navigate} from "../../core/Router/navigate";
import {APP_ROUTES} from "../../core/Router/routes";

interface EditProfilePageProps extends BlockOwnProps {
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  displayName: string;
  phone: string;
  emailValidator: (value: string) => string;
  loginValidator: (value: string) => string;
  nameValidator: (value: string) => string;
  phoneValidator: (value: string) => string;
}

export class EditProfilePage extends Block<EditProfilePageProps> {
  static componentName = 'EditProfilePage';

  protected template = template;

  constructor() {
    super({
      email: mockProfile.email,
      login: mockProfile.login,
      firstName: mockProfile.firstName,
      secondName: mockProfile.secondName,
      displayName: mockProfile.displayName,
      phone: mockProfile.phone,
      emailValidator: validateEmail,
      loginValidator: validateLogin,
      nameValidator: validateName,
      phoneValidator: validatePhone,
    });
  }

  protected events = {
    submit: (event: Event) => {
      event.preventDefault();

      const emailInput = getComponentByName(this.children, Input, 'email');
      const loginInput = getComponentByName(this.children, Input, 'login');
      const firstNameInput = getComponentByName(this.children, Input, 'first_name');
      const secondNameInput = getComponentByName(this.children, Input, 'second_name');
      const phoneInput = getComponentByName(this.children, Input, 'phone');

      if (
        !emailInput ||
        !loginInput ||
        !firstNameInput ||
        !secondNameInput ||
        !phoneInput
      ) {
        return;
      }

      const isEmailValid = emailInput.validate();
      const isLoginValid = loginInput.validate();
      const isFirstNameValid = firstNameInput.validate();
      const isSecondNameValid = secondNameInput.validate();
      const isPhoneValid = phoneInput.validate();

      if (
        !isEmailValid ||
        !isLoginValid ||
        !isFirstNameValid ||
        !isSecondNameValid ||
        !isPhoneValid
      ) {
        return;
      }

      console.log({
        email: emailInput.getValue(),
        login: loginInput.getValue(),
        first_name: firstNameInput.getValue(),
        second_name: secondNameInput.getValue(),
        phone: phoneInput.getValue(),
      });

      navigate(APP_ROUTES.PROFILE);
    },
  };
}
