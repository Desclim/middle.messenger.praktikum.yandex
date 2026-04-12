import Block from '../../core/Component/Block';
import template from './search.hbs?raw';
import './search.scss';
import type {BlockOwnProps} from '../../core/Component/Block';

interface SearchProps extends BlockOwnProps {
  name: string;
  ref: string;
  value?: string;
  placeholder?: string;
}

export class Search extends Block<SearchProps> {
  public static componentName = 'Search';
  protected template = template;

  constructor(props: SearchProps) {
    super({
      placeholder: 'Поиск',
      ...props,
    });
  }

  protected componentDidMount(): void {
    const field = this.getField();

    this.updateState(field);

    if (this.props.value) {
      field.value = this.props.value;
      this.updateState(field);
    }

    field.addEventListener('focus', this.handleFocus);
    field.addEventListener('blur', this.handleBlur);
    field.addEventListener('input', this.handleInput);
  }

  protected componentWillUnmount(): void {
    const field = this.getField();

    field.removeEventListener('focus', this.handleFocus);
    field.removeEventListener('blur', this.handleBlur);
    field.removeEventListener('input', this.handleInput);
  }

  public getName(): string {
    return this.props.name;
  }

  public getValue(): string {
    return this.getField().value;
  }

  public setValue(value: string): void {
    const field = this.getField();

    field.value = value;
    this.updateState(field);
  }

  public clear(): void {
    this.setValue('');
  }

  public getField(): HTMLInputElement {
    const key = this.props.ref;
    const field = this.refs[key];

    if (!(field instanceof HTMLInputElement)) {
      throw new Error(`Поле поиска с ref=${key} не найдено`);
    }

    return field;
  }

  private updateState(field: HTMLInputElement): void {
    const root = this.element();

    if (!root) {
      return;
    }

    const isFocused = document.activeElement === field;
    const hasValue = field.value.trim().length > 0;

    root.classList.toggle('search_focused', isFocused);
    root.classList.toggle('search_filled', hasValue);
  }

  private handleFocus = (): void => {
    const field = this.getField();
    this.updateState(field);
  };

  private handleBlur = (): void => {
    const field = this.getField();
    this.updateState(field);
  };

  private handleInput = (event: Event): void => {
    const target = event.target;

    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    this.updateState(target);
  };
}
