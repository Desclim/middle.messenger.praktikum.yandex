import Block, { type BlockOwnProps } from '../../core/Component/Block';
import template from './profile-avatar.hbs?raw';
import './profile-avatar.scss';
import UsersController from '../../controllers/UsersController';

interface ProfileAvatarProps extends BlockOwnProps {
  avatar?: string;
  display_name?: string;
  showDisplayName?: boolean;
  ref?: string;
  disabled?: boolean;
}

export class ProfileAvatar extends Block<ProfileAvatarProps> {
  public static componentName = 'ProfileAvatar';

  protected template = template;

  constructor(props: ProfileAvatarProps) {
    super({
      disabled: false,
      showDisplayName: false,
      avatar: '',
      ...props,
    });
  }

  protected events = {
    change: async (event: Event) => {
      if (this.props.disabled) {
        return;
      }

      const target = event.target;

      if (!(target instanceof HTMLInputElement)) {
        return;
      }

      if (target.name !== 'avatar') {
        return;
      }

      const file = target.files?.[0];

      if (!file) {
        return;
      }

      try {
        await UsersController.updateAvatar(file);
      } catch (error) {
        console.error('Ошибка обновления аватара', error);
      }
    },
  };
}
