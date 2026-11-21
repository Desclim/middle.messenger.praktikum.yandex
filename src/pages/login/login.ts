import Block, {type BlockOwnProps} from '../../core/Component/Block';
import template from './login.hbs?raw';
import './login.scss';

import {Input} from '../../components/input/input';
import {validateLogin, validatePassword} from '../../services/validation/validators';
import {getComponentByName} from "../../utils/getComponentByName";
import AuthController from "../../controllers/AuthController";
import {sanitizeUserContent} from "../../utils/sanitaizeFunctions";

interface LoginPageProps extends BlockOwnProps {
  loginValidator: (value: string) => string;
  passwordValidator: (value: string) => string;
}

export class LoginPage extends Block<LoginPageProps> {
  static componentName = 'LoginPage';
  protected template = template;

  constructor() {
    super({
      loginValidator: validateLogin,
      passwordValidator: validatePassword,
    });
  }

  protected events = {
    submit: (event: Event) => {
      event.preventDefault();
      const loginInput = getComponentByName(this.children, Input, 'login');
      const passwordInput = getComponentByName(this.children, Input, 'password');

      if (!loginInput || !passwordInput) {
        return;
      }

      const isLoginValid = loginInput.validate();
      const isPasswordValid = passwordInput.validate();

      if (!isLoginValid || !isPasswordValid) {
        return;
      }

      void AuthController.signin({
        login: sanitizeUserContent(loginInput.getValue()),
        password: sanitizeUserContent(passwordInput.getValue()),
      })
    },
  };
}
