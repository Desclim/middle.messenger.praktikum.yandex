import Block, { type BlockOwnProps } from '../../core/Component/Block';
import template from './action-modal.hbs?raw';
import './action-modal.scss';

interface ActionModalProps extends BlockOwnProps {
  isOpen: boolean;
  title: string;
  buttonText: string;
  inputId: string;
  inputName: string;
  inputLabel: string;
  onClose?: () => void;
  onSubmit?: (value: string) => Promise<void> | void;
}

export class ActionModal extends Block<ActionModalProps> {
  static componentName = 'ActionModal';
  protected template = template;

  constructor(props: ActionModalProps) {
    super(props);
  }

  protected events = {
    click: (event: Event) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      if (target.classList.contains('modal-overlay')) {
        this.props.onClose?.();
      }
    },

    submit: async (event: Event) => {
      event.preventDefault();

      const input = this.element()?.querySelector(
        `input[name="${this.props.inputName}"]`
      );

      if (!(input instanceof HTMLInputElement)) {
        return;
      }

      const value = input.value.trim();

      if (!value) {
        return;
      }

      try {
        await this.props.onSubmit?.(value);
        input.value = '';
        this.props.onClose?.();
      } catch (error) {
        console.error('Ошибка при отправке формы модалки', error);
      }
    },
  };
}
