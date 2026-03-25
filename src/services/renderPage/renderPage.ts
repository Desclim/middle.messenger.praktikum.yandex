import Block from '../../core/Block';

export function renderPage(block: Block): void {
  const app = document.querySelector('#app');

  if (!app) {
    throw new Error('id app не найден');
  }

  app.innerHTML = '';

  const content = block.element();

  if (content) {
    app.appendChild(content);
  }
}
