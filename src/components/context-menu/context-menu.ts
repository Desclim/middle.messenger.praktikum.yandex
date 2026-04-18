import Block, {type BlockOwnProps} from '../../core/Component/Block';
import template from './context-menu.hbs?raw';
import './context-menu.scss';

export interface ContextMenuItem {
  icon: string;
  label: string;
  action: string;
}

interface ContextMenuProps extends BlockOwnProps {
  items: ContextMenuItem[];
  isOpen?: boolean;
  onSelect?: (action: string) => void;
}

export class ContextMenu extends Block<ContextMenuProps> {
  public static componentName = 'ContextMenu';

  protected template = template;

  constructor(props: ContextMenuProps) {
    super({
      ...props,
      isOpen: props.isOpen ?? false,
    });
  }

  protected events = {
    click: (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      const trigger = target.closest('.context-menu__trigger');
      if (trigger) {
        event.stopPropagation();
        this.toggle();
        return;
      }

      const item = target.closest('.context-menu__item');
      if (item instanceof HTMLElement) {
        const action = item.dataset.action;

        if (!action) {
          return;
        }

        this.props.onSelect?.(action);
        this.close();
      }
    },
  };

  protected componentDidMount(): void {
    document.addEventListener('click', this.handleOutsideClick);
  }

  protected componentWillUnmount(): void {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  public open(): void {
    this.setProps({ isOpen: true });
  }

  public close(): void {
    this.setProps({ isOpen: false });
  }

  public toggle(): void {
    this.setProps({ isOpen: !this.props.isOpen });
  }

  private handleOutsideClick = (event: MouseEvent): void => {
    const root = this.element();
    const target = event.target;

    if (!(root instanceof HTMLElement) || !(target instanceof Node)) {
      return;
    }

    if (!root.contains(target) && this.props.isOpen) {
      this.close();
    }
  };
}
