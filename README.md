## Запуск проекта

```
    npm install - установка зависимостей
    npm run start:dev - запуск сервера + frontend проекта
```

## Deploy

Деплой проекта осуществляется с помощью сервиса Netlify - 
[https://glowing-beijinho-2ad375.netlify.app/](https://glowing-beijinho-2ad375.netlify.app/)

Для входа можно использовать следующие данные:

Admin
```tsx
username: 'admin'
password: '123'
```

User
```tsx
username: 'admin'
password: '123'
```


## Backend

В качестве бекэнда используется [JsonServer](https://github.com/typicode/json-server) 

---

## Скрипты

- `npm run start` - Запуск frontend проекта на webpack dev server
- `npm run start:dev` - Запуск frontend проекта на webpack dev server + backend
- `npm run start:dev:server` - Запуск backend сервера
- `npm run build:prod` - Сборка проекта в dev режиме 
- `npm run build:dev` - Сборка проекта в prod режиме
- `npm run lint:ts` - Проверка файлов ts линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов линтером
- `npm run lint:scss:fix` - Проверка scss файлов линтером
- `npm run test:unit` - Запуск unit тестов с jest
- `npm run test:e2e` - Запуск e2e тестов с cypress
- `npm run prettier` - Запуск prettier для форматирования кода
- `npm run test:ui` - Запуск скриншотных тестов с loki
- `npm run test:ui:ok` - Подтверждение скриншотов для loki
- `npm run test:ui:ci` - Запуск скриншотных тестов для ci
- `npm run test:ui:json` - Генерация json отчета для скриншотных тестов 
- `npm run test:ui:html` - Генерация html отчета для скриншотных тестов
- `npm run test:ui:report` - Генерация json + html отчета для скриншотных тестов 
- `npm run storybook` - Запуск storybook
- `npm run storybook:build` - Сборка storybook'a
- `npm run remove-feature` - Запуск скрипта по удалению контента с заданной features

---

## Архитектура проекта 

Проект написан в соответствии с методологией Feature Sliced Design

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs)

## Работа с переводами

В проекте используется библиотека i18next для работы с переводами. Файлы с переводами находятся в public/locales.

Документация i18next - [https://www.i18next.com/](https://www.i18next.com/)

## Тесты 

В проекте используются 4 вида тестов:
1) Обычные unit тесты jest - `npm run test:unit`
2) Тесты на компоненты с React testing library - `npm run test:unit`
3) Скриншотное тестирование с loki - `npm run test:ui`
4) e2e тестирование с Cypress - `npm run test:e2e`

## Линтинг 

В проекте используется eslint для проверки typescript кода и stylelint для проверки файлов со стилями.

Также для строго контроля главных архитектурных принципов используется собственный eslint плагин *eslint-plugin-fsd-architecture-plugin*, который содержит 3 правила
1) path-checker - запрещает использовать абсолютные импорты в рамках одного модуля
2) layer-imports - проверяет корректность использования слоев с точки зрения FSD.
3) public-api-imports - разрешает импорт из других модулей только из public api.

Все правила, кроме layer-imports имеют auto fix.

## Storybook 

В проекте для каждого компонента описываются сторикейсы. Запросы на сервер мокаются с помощью storybook-addon-mock.

Файлы со сторикейсами находятся рядом с компонентами и имеют расширение .stories.tsx

Запустить сторибук можно командой:

- `npm run storybook`

Подробнее о [Storybook](https://storybook.js.org/)

Пример:
```tsx
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';
export default {
  title: 'shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
  children: 'Text',
  variant: 'clear',
};
export const Square = Template.bind({});
Square.args = {
  children: '>',
  variant: 'outline',
  square: true,
};
export const SquareSizeM = Template.bind({});
SquareSizeM.args = {
  children: '>',
  variant: 'outline',
  square: true,
  size: 'm',
};
export const SquareSizeL = Template.bind({});
SquareSizeL.args = {
  children: '>',
  variant: 'outline',
  square: true,
  size: 'l',
};
export const SquareSizeXL = Template.bind({});
SquareSizeXL.args = {
  children: '>',
  variant: 'outline',
  square: true,
  size: 'xl',
};
```
---

## Конфигурация проекта 

Вся конфигурация хранится в /config

- /config/babel - конфигурация babel
- /config/build - конфигурация webpack
- /config/jest - конфигурация тестовой среды
- /config/storybook - конфигурация storybook

В папке `scripts` находятся различные скрипты для рефакторинга, генерации отчетов и т.д

## CI pipeline
Конфигурация github actions /.github/workflows. В CI происходит проверка сборки проекта и сторибука, все виды тестов, линтинг

В прекоммит хуках проверяем проект линтерами, конфигурация находится в /.husky

## Работа с данными

Взаимодействие с данными осущеcтвляется с помощью redux-toolkit.

Запросы на сервер отправляются с помощью [RTK query](https://redux-toolkit.js.org/rtk-query/overview)

Для асинхронного подключения редюсеров используется [DynamicModuleLoader](/src/shared/lib/DynamicModuleLoader/DynamicModuleLoader.tsx)

## Entities

- [Article](/src/entities/Article/README.md)
- [Comment](/src/entities/Comment/README.md)
- [Country](/src/entities/Country/README.md)
- [Currency](/src/entities/Currency/README.md)
- [Notification](/src/entities/Notification/README.md)
- [Profile](/src/entities/Profile/README.md)
- [Rating](/src/entities/Rating/README.md)
- [User](/src/entities/User/README.md)

## Features

- [addNewComment](/src/features/addNewComment/README.md)
- [ArticleCommentList](/src/features/ArticleCommentList/README.md)
- [articlePageGreeting](/src/features/articlePageGreeting/README.md)
- [articleRating](/src/features/articleRating/README.md)
- [articleRecommendations](/src/features/articleRecommendations/README.md)
- [ArticleSortSelector](/src/features/ArticleSortSelector/README.md)
- [ArticlesTabFilter](/src/features/ArticlesTabFilter/README.md)
- [ArticleViewSwitcher](/src/features/ArticleViewSwitcher/README.md)
- [AuthByUsername](/src/features/AuthByUsername/README.md)
- [AvatarDropdown](/src/features/AvatarDropdown/README.md)
- [EditableProfileCard](/src/features/EditableProfileCard/README.md)
- [NotificationButton](/src/features/NotificationButton/README.md)
- [ScrollToTopButton](/src/features/ScrollToTopButton/README.md)
- [ThemeSwitcher](/src/features/ThemeSwitcher/README.md)
- [UiDesignSwitcher](/src/features/UiDesignSwitcher/README.md)

## Widgets

- [ArticleAdditionalInfo](/src/widgets/ArticleAdditionalInfo/README.md)
- [ArticlesFilter](/src/widgets/ArticlesFilter/README.md)
- [Navbar](/src/widgets/Navbar/README.md)
- [Page](/src/widgets/Page/README.md)
- [PageError](/src/widgets/PageError/README.md)
- [PageLoader](/src/widgets/PageLoader/README.md)
- [ScrollToolbar](/src/widgets/ScrollToolbar/README.md)
- [Sidebar](/src/widgets/Sidebar/README.md)

## Pages

- [AboutPage](/src/pages/AboutPage/README.md)
- [AdminPanelPage](/src/pages/AdminPanelPage/README.md)
- [ArticleEditPage](/src/pages/ArticleEditPage/README.md)
- [ArticlesDetailsPage](/src/pages/ArticlesDetailsPage/README.md)
- [ArticlesPage](/src/pages/ArticlesPage/README.md)
- [ForbiddenPage](/src/pages/ForbiddenPage/README.md)
- [MainPage](/src/pages/MainPage/README.md)
- [NotFoundPage](/src/pages/NotFoundPage/README.md)
- [ProfilePage](/src/pages/ProfilePage/README.md)
- [SettingsPage](/src/pages/SettingsPage/README.md)