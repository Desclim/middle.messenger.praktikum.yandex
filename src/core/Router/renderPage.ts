import Block from '../Component/Block';

export function renderPage(query: string, block: Block): void {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error(`Root element not found: ${query}`);
  }

  root.innerHTML = '';

  const content = block.element();

  if (!content) {
    throw new Error('Block content is empty');
  }

  root.append(content);
}
