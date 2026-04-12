import Block, {type BlockOwnProps} from '../../core/Component/Block';
import template from './input.hbs?raw';
import './input.scss';
import {formatPhone} from "../../services/formats/formatPhone";
import {getValueFromMaskPhone} from "../../utils/getValueFromMaskPhone";

interface InputProps extends BlockOwnProps {
  id: string;
  name: string;
  type: string;
  label: string;
  value?: string;
  autocomplete?: string;
  ref: string;
  validator?: (value: string) => string;
  mask?: 'phone';
}

export class Input extends Block<InputProps> {
  public static componentName = 'Input';
  protected template = template;

  protected componentDidMount(): void {
    const field = this.getField();

    if (!field) {
      return;
    }

    this.updateState(field);

    if (this.props.value) {
      field.value = this.props.value;
      this.updateState(field);
    }

    field.addEventListener('blur', this.handleBlur);
    field.addEventListener('focus', this.handleFocus);
    field.addEventListener('input', this.handleInput);
  }

  protected componentWillUnmount(): void {
    const field = this.getField();

    if (!field) {
      return;
    }

    field.removeEventListener('blur', this.handleBlur);
    field.removeEventListener('focus', this.handleFocus);
    field.removeEventListener('input', this.handleInput);
  }

  public getName(): string {
    return this.props.name;
  }

  public getValue(): string {
    if (this.props.mask === 'phone') {
      return this.getField()?.value ? getValueFromMaskPhone(this.getField()?.value) : ''
    }

    return this.getField()?.value ?? '';
  }

  public showError(message: string): void {
    const error = this.getErrorElement();

    if (error) {
      error.textContent = message;
    }
  }

  public hideError(): void {
    const error = this.getErrorElement();

    if (error) {
      error.textContent = '';
    }
  }

  public validate(): boolean {
    const validator = this.props.validator;

    if (!validator) {
      this.hideError();
      return true;
    }

    const message = validator(this.getValue());

    if (message) {
      this.showError(message);
      return false;
    }

    this.hideError();
    return true;
  }

  public getField(): HTMLInputElement {
    const key = this.props.ref;
    const field = this.refs[key];

    if (!(field instanceof HTMLInputElement)) {
      throw new Error(`Поле с ref=${key} не найдено`);
    }

    return field;
  }

  private getErrorElement(): HTMLElement | null {
    const error = this.refs.error;

    return error instanceof HTMLElement ? error : null;
  }

  private updateState(field: HTMLInputElement): void {
    const root = this.element();

    if (!root) {
      return;
    }

    const isFocused = document.activeElement === field;
    const hasValue = field.value.trim().length > 0;

    root.classList.toggle('input_focused', isFocused);
    root.classList.toggle('input_filled', hasValue);
  }

  private handleBlur = (): void => {
    const field = this.getField();

    if (!field) {
      return;
    }

    this.updateState(field);
    this.validate();
  };

  private handleFocus = (): void => {
    const field = this.getField();

    if (!field) {
      return;
    }

    this.updateState(field);
    this.hideError();
  };

  private handleInput = (event: Event): void => {
    const target = event.target;

    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    if (this.props.mask === 'phone') {
      const digits = target.value.replace(/\D/g, '');
      target.value = digits.length ? formatPhone(target.value) : '';
    }

    this.updateState(target);
    this.hideError();
  };
}
