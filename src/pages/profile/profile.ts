import Block, {type BlockOwnProps} from '../../core/Block';
import template from './profile.hbs?raw';
import './profile.scss';
import {mockProfile} from '../../mocks/mockProfile';
import {navigate} from '../../services/router/router';

interface ProfilePageProps extends BlockOwnProps {
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  displayName: string;
  phone: string;
}

export class ProfilePage extends Block<ProfilePageProps> {
  static componentName = 'ProfilePage';

  protected template = template;

  constructor() {
    super({
      email: mockProfile.email,
      login: mockProfile.login,
      firstName: mockProfile.firstName,
      secondName: mockProfile.secondName,
      displayName: mockProfile.displayName,
      phone: mockProfile.phone
    });
  }

  protected events = {
    click: (event: Event) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      const logoutButton = target.closest('.profile__logout');

      if (!(logoutButton instanceof HTMLButtonElement)) {
        return;
      }

      navigate('/');
    },
  };
}
