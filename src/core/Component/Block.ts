import Handlebars from 'handlebars';

export interface BlockOwnProps {
  __children?: Array<{
    component: Block<Record<string, unknown>>;
    embed(node: DocumentFragment): void;
  }>;
  __refs?: Record<string, Element>;
}

export type EventListType = Partial<
  Record<keyof HTMLElementEventMap, (event: Event) => void>
>;

export default abstract class Block<
  Props extends BlockOwnProps = BlockOwnProps
> {
  protected abstract template: string;

  protected props = {} as Props;

  private domElement: Element | null = null;

  protected children: Block<Record<string, unknown>>[] = [];

  protected refs: Record<string, Element> = {};

  protected events: EventListType = {};

  constructor(props: Props = {} as Props) {
    this.props = props;
  }

  public element(): Element | null {
    if (!this.domElement) {
      this.render();
    }

    return this.domElement;
  }

  public setProps(props: Partial<Props>): void {
    this.props = {
      ...this.props,
      ...props,
      __children: [],
      __refs: {},
    } as Props;

    this.render();
  }

  protected componentDidMount(): void {
  }

  protected componentWillUnmount(): void {
  }

  private mountComponent(): void {
    this.attachListeners();
    this.componentDidMount();
  }

  private unmountComponent(): void {
    if (!this.domElement) {
      return;
    }

    [...this.children].reverse().forEach((child) => {
      child.unmountComponent();
    });

    this.componentWillUnmount();
    this.removeListeners();
  }

  private attachListeners(): void {
    for (const eventName in this.events) {
      const eventCallback:EventListener = this.events[eventName as keyof HTMLElementEventMap] as EventListener;

      if (typeof eventCallback === 'function' && this.domElement) {
        this.domElement.addEventListener(eventName, eventCallback);
      }
    }
  }

  private removeListeners(): void {
    for (const eventName in this.events) {
      const eventCallback:EventListener = this.events[eventName as keyof HTMLElementEventMap] as EventListener;

      if (typeof eventCallback === 'function' && this.domElement) {
        this.domElement.removeEventListener(eventName, eventCallback);
      }
    }
  }

  protected render(): void {
    this.unmountComponent();

    const fragment = this.compile();

    if (this.domElement && fragment) {
      this.domElement.replaceWith(fragment);
    }

    this.domElement = fragment;
    this.mountComponent();
  }

  private compile(): Element | null {
    const html = Handlebars.compile(this.template)(this.props);
    const templateElement = document.createElement('template');

    templateElement.innerHTML = html;
    const fragment = templateElement.content;

    if (this.props.__children) {
      this.children = this.props.__children.map((child) => child.component);

      this.props.__children.forEach((child) => {
        child.embed(fragment);
      });
    }

    const defaultRefs = this.props.__refs ?? {};

    this.refs = Array.from(fragment.querySelectorAll('[ref]')).reduce<
      Record<string, Element>
    >((acc, element) => {
      const key = element.getAttribute('ref');

      if (key) {
        acc[key] = element;
        element.removeAttribute('ref');
      }

      return acc;
    }, defaultRefs);

    return templateElement.content.firstElementChild;
  }
}
