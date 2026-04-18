import Block from '../core/Component/Block';

type NamedComponent = Block & {
  getName(): string;
};

export function getComponentByName<T extends NamedComponent>(
  children: Block[],
  componentClass: new (...args: never[]) => T,
  name: string,
): T | null {
  const component = children.find((child) => {
    return child instanceof componentClass && child.getName() === name;
  });

  return component instanceof componentClass ? component : null;
}
