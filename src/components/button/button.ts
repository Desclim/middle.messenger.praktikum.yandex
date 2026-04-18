import Block, {type BlockOwnProps} from '../../core/Component/Block';
import template from './button.hbs?raw';
import './button.scss';

export interface ButtonProps extends BlockOwnProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  name?: string;
  form?: string;
}

export class Button extends Block<ButtonProps> {
  public static componentName = 'Button';

  protected template = template;
}
