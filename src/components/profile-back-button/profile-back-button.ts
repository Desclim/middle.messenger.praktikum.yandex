import Block, { type BlockOwnProps } from '../../core/Block';
import template from './profile-back-button.hbs?raw';
import './profile-back-button.scss';

interface ProfileBackButtonProps extends BlockOwnProps {
  href: string;
  ref:string
}

export class ProfileBackButton extends Block<ProfileBackButtonProps> {
  public static componentName = 'ProfileBackButton';

  protected template = template;
}
