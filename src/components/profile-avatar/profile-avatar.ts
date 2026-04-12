import Block, { type BlockOwnProps } from '../../core/Component/Block';
import template from './profile-avatar.hbs?raw';
import './profile-avatar.scss';

interface ProfileAvatarProps extends BlockOwnProps {
  displayName?: string;
  showDisplayName?: boolean;
  ref?:string
}

export class ProfileAvatar extends Block<ProfileAvatarProps> {
  public static componentName = 'ProfileAvatar';

  protected template = template;

  protected events = {
    change: (event: Event) => {
      const target = event.target;

      if (!(target instanceof HTMLInputElement)) {
        return;
      }

      if (target.name !== 'avatar') {
        return;
      }

      const file = target.files?.[0] ?? null;
      console.log('Выбранный файл:', file);
    },
  };
}
