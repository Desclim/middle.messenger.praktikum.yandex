import Block, {type BlockOwnProps} from '../../core/Component/Block';
import template from './settings.hbs?raw';
import './settings.scss';
import AuthController from "../../controllers/AuthController";
import {connect} from "../../core/Component/connect";
import type {objectType} from "../../types/objectType";
import type {User} from "../../types/user";
import {getAvatarUrl} from "../../utils/getAvatarUrl";
import {formatPhone} from "../../services/formats/formatPhone";
import {sanitizeUserContent} from "../../utils/sanitaizeFunctions";

interface SettingsPageProps extends BlockOwnProps {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  avatar:string
}

class SettingsPageBase extends Block<SettingsPageProps> {
  static componentName = 'SettingsPage';

  protected template = template;

  constructor(props: Partial<SettingsPageProps> = {}) {
    super({
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      display_name: '',
      phone: '',
      avatar:'',
      ...props
    });
  }

  protected events = {
    click: (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      const logoutButton = target.closest('.settings__logout');

      if (!(logoutButton instanceof HTMLButtonElement)) {
        return;
      }

      void AuthController.logout()
    },
  };
}

const mapUserToProps = (state: objectType) => {
  const user = (state.user as Partial<User> | undefined) ?? {};
  return {
    email: sanitizeUserContent(user.email),
    login: sanitizeUserContent(user.login),
    first_name: sanitizeUserContent(user.first_name),
    second_name: sanitizeUserContent(user.second_name),
    display_name: sanitizeUserContent(user.display_name),
    phone: sanitizeUserContent(user.phone ? formatPhone(user.phone) : ''),
    avatar: getAvatarUrl(user.avatar),
  };
};

export const SettingsPage = connect(mapUserToProps)(SettingsPageBase);
