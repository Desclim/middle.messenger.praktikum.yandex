import Block, {type BlockOwnProps} from '../../core/Block';
import template from './chat-content.hbs?raw';
import './chat-content.scss';
import type {Chat} from '../../pages/chats/type';
import {getComponentByName} from "../../utils/getComponentByName";
import {PostMessage} from "../../components/post-message/post-message";

interface ChatContentProps extends BlockOwnProps {
  selectedChat: Chat | null;
}

export class ChatContent extends Block<ChatContentProps> {
  static componentName = 'ChatContent';
  protected template = template;

  constructor(props: ChatContentProps) {
    super(props);
  }

  protected componentDidMount(): void {
    this.scrollToBottom();
  }

  protected events = {
    submit: (event: Event) => {
      event.preventDefault();
      if (!this.props.selectedChat) {
        return;
      }

      const messageInput = getComponentByName(this.children, PostMessage, 'message')

      if (!messageInput) {
        return;
      }

      const isMessageValid = messageInput?.validate()

      if (!isMessageValid) {
        return;
      }

      console.log({
        chatId: this.props.selectedChat.id,
        message: messageInput.getValue(),
      });

      messageInput.setValue('')
    },
  };

  private scrollToBottom(): void {
    requestAnimationFrame(() => {
      const rootChatContent = this.refs['chat-content'];

      if (!(rootChatContent instanceof HTMLElement)) {
        return;
      }

      const messagesContainer = rootChatContent.querySelector('.chat-content__messages');

      if (!(messagesContainer instanceof HTMLElement)) {
        return;
      }

      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
  }
}
