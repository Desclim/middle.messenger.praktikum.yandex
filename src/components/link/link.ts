import Block, {type BlockOwnProps} from '../../core/Component/Block';
import template from './link.hbs?raw';
import './link.scss';

export interface LinkProps extends BlockOwnProps {
  label: string;
  href:string
}

export class Link extends Block<LinkProps> {
  public static componentName = 'Link';

  protected template = template;
}
