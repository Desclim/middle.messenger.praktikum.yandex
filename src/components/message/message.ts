import Block, { type BlockOwnProps } from '../../core/Component/Block';
import template from './message.hbs?raw';
import './message.scss';

interface MessageProps extends BlockOwnProps {
  content: string;
  time: string;
  isMine: boolean;
}

export class Message extends Block<MessageProps> {
  static componentName = 'Message';
  protected template = template;

  constructor(props: MessageProps) {
    super(props);
  }
}
