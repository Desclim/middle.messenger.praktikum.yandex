import { expect } from 'chai';
import Block, { type BlockOwnProps } from './Block';
import {resetDom, setupDom} from "../../test-utils/setupMockDOM";

interface TestComponentProps extends BlockOwnProps {
  text: string;
  onClick?: () => void;
}

class TestComponent extends Block<TestComponentProps> {
  public static componentName = 'TestComponent';
  protected template = '<button class="test-button" ref="button">{{text}}</button>';

  public componentDidMountCount = 0;
  public componentWillUnmountCount = 0;

  constructor(props: TestComponentProps = { text: '' }) {
    super(props);

    this.events = {
      click: () => this.props.onClick?.(),
    };
  }

  protected componentDidMount(): void {
    this.componentDidMountCount += 1;
  }

  protected componentWillUnmount(): void {
    this.componentWillUnmountCount += 1;
  }
}

describe('Block', () => {
  beforeEach(() => {
    setupDom();
  });

  afterEach(() => {
    resetDom();
  });

  it('рендер компонента с переданными props', () => {
    const component = new TestComponent({ text: 'Создать' });

    const element = component.element();

    expect(element?.textContent).to.equal('Создать');
  });

  it('обновляет DOM при вызове setProps', () => {
    const component = new TestComponent({ text: 'До' });

    const firstElement = component.element();

    component.setProps({ text: 'После' });

    const secondElement = component.element();

    expect(secondElement).to.not.equal(firstElement);
  });

  it('вызывает componentDidMount только при первом рендере', () => {
    const component = new TestComponent({ text: 'Первый рендер' });

    component.element();
    component.setProps({ text: 'Повторный рендер' });

    expect(component.componentDidMountCount).to.equal(1);
  });

  it('вызывает componentWillUnmount при destroy', () => {
    const component = new TestComponent({ text: 'Удалить' });

    component.element();
    component.destroy();

    expect(component.componentWillUnmountCount).to.equal(1);
  });

  it('удаляет элемент из DOM при destroy', () => {
    const component = new TestComponent({ text: 'Удалить' });
    const root = document.querySelector('#app');

    const element = component.element();

    if (element) {
      root?.append(element);
    }

    expect(root?.textContent).to.equal('Удалить');

    component.destroy();

    expect(root?.textContent).to.equal('');
  });

  it('снимает обработчики событий при destroy', () => {
    let clickCount = 0;

    const component = new TestComponent({
      text: 'Удалить',
      onClick: () => {
        clickCount += 1;
      },
    });

    const element = component.element();

    element?.dispatchEvent(new window.Event('click'));

    component.destroy();

    element?.dispatchEvent(new window.Event('click'));

    expect(clickCount).to.equal(1);
  });
});
