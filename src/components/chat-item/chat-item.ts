import Block, { type BlockOwnProps } from '../../core/Component/Block';
import template from './chat-item.hbs?raw';
import './chat-item.scss';

interface ChatItemProps extends BlockOwnProps {
  id: number;
  title: string;
  message: string;
  time: string;
  active?: boolean;
  unread?: number;
  avatar?: string | null;
  onClick?: (chatId: string) => void;
}

export class ChatItem extends Block<ChatItemProps> {
  static componentName = 'ChatItem';
  protected template = template;
}
