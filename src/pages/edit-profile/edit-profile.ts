import Block, {type BlockOwnProps} from '../../core/Component/Block';
import template from './edit-profile.hbs?raw';
import './edit-profile.scss';

import {Input} from '../../components/input/input';
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePhone,
} from '../../services/validation/validators';
import {getComponentByName} from '../../utils/getComponentByName';
import {navigate} from "../../core/Router/navigate";
import {APP_ROUTES} from "../../core/Router/routes";
import UsersController from "../../controllers/UsersController";
import {connect} from "../../core/Component/connect";
import type {objectType} from "../../types/objectType";
import type {User} from "../../types/user";
import {getAvatarUrl} from "../../utils/getAvatarUrl";
import {formatPhone} from "../../services/formats/formatPhone";

interface EditProfilePageProps extends BlockOwnProps {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  avatar: string;
  emailValidator?: (value: string) => string;
  loginValidator?: (value: string) => string;
  nameValidator?: (value: string) => string;
  phoneValidator?: (value: string) => string;
}

class EditProfilePageBase extends Block<EditProfilePageProps> {
  static componentName = 'EditProfilePage';

  protected template = template;

  constructor(props: Partial<EditProfilePageProps> = {}) {
    super({
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      display_name: '',
      phone: '',
      avatar: '',
      emailValidator: validateEmail,
      loginValidator: validateLogin,
      nameValidator: validateName,
      phoneValidator: validatePhone,
      ...props,
    });
  }

  protected events = {
    submit: async (event: Event) => {
      event.preventDefault();

      const emailInput = getComponentByName(this.children, Input, 'email');
      const loginInput = getComponentByName(this.children, Input, 'login');
      const firstNameInput = getComponentByName(this.children, Input, 'first_name');
      const secondNameInput = getComponentByName(this.children, Input, 'second_name');
      const displayNameInput = getComponentByName(this.children, Input, 'display_name');
      const phoneInput = getComponentByName(this.children, Input, 'phone');

      if (
        !emailInput ||
        !loginInput ||
        !firstNameInput ||
        !secondNameInput ||
        !phoneInput ||
        !displayNameInput
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

      await UsersController.updateProfile({
        email: emailInput.getValue(),
        login: loginInput.getValue(),
        first_name: firstNameInput.getValue(),
        second_name: secondNameInput.getValue(),
        phone: phoneInput.getValue(),
        display_name: displayNameInput.getValue()
      });

      navigate(APP_ROUTES.SETTINGS);
    },
  };
}

const mapUserToProps = (state: objectType) => {
  const user = (state.user as Partial<User> | undefined) ?? {};

  return {
    email: user.email ?? '',
    login: user.login ?? '',
    first_name: user.first_name ?? '',
    second_name: user.second_name ?? '',
    display_name: user.display_name ?? '',
    phone: user.phone ? formatPhone(user.phone) : '',
    avatar: getAvatarUrl(user.avatar) ?? ''
  };
};

export const EditProfilePage = connect(mapUserToProps)(EditProfilePageBase);
