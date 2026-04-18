import Block, {type BlockOwnProps} from '../../core/Component/Block';
import template from './post-message.hbs?raw';
import './post-message.scss';
import {validateDefault} from "../../services/validation/validators";

interface PostMessageProps extends BlockOwnProps {
  name: string;
  ref: string;
}

export class PostMessage extends Block<PostMessageProps> {
  static componentName = 'PostMessage';

  protected template = template;

  constructor(props: PostMessageProps) {
    super(props);
  }

  public getField(): HTMLInputElement {
    const key = this.props.ref;
    const field = this.refs[key];

    if (!(field instanceof HTMLInputElement)) {
      throw new Error(`Поле с ref=${key} не найдено`);
    }

    return field;
  }

  public getName(): string {
    return this.props.name;
  }

  public getValue(): string {
    return this.getField()?.value ?? '';
  }

  public setValue(value: string): void {
    const field = this.getField();

    field.value = value;
  }

  public validate(): boolean {
    const message = validateDefault(this.getValue())

    if (message) {
      return false
    }

    return true
  }
}
