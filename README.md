Веб-приложение мессенджера, разработанное в рамках курса от Яндекс Практикума.

Проект реализован как SPA (Single Page Application) без использования фреймворков.  
Навигация между страницами реализована через собственный роутер.

## Стек

- TypeScript
- Handlebars
- SCSS
- Vite
- ESLint
- Stylelint

## Архитектура

Структура проекта:

- `src/components` — переиспользуемые UI-компоненты;
- `src/blocks` — составные блоки интерфейса;
- `src/pages` — страницы приложения;
- `src/core` — базовый класс `Block` и регистрация компонентов;
- `src/services` — роутинг, рендеринг, валидация, форматирование;
- `src/utils` — вспомогательные утилиты;
- `src/mocks` — моковые данные.

## Установка

```bash
npm install
```

## Команды

Запуск в режиме разработки:

```bash
npm run dev
```

Проверка типов:

```bash
npm run typecheck
```

Линтинг TypeScript и стилей:

```bash
npm run lint
```

Сборка проекта:

```bash
npm run build
```

Сборка и запуск preview-сервера:

```bash
npm run start
```

UI брался с готового шаблона яндекса :
https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1

netlify :
https://69c4639e56b6ef000896e312--thriving-taffy-369ce1.netlify.app/
