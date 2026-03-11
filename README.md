# Дипломный проект курса «React»

[![Build & Deploy](https://github.com/dm-morozov/netology_77_react-diploma-project/actions/workflows/web.yaml/badge.svg)](https://github.com/dm-morozov/netology_77_react-diploma-project/actions/workflows/web.yaml)

Интернет-магазин обуви `Bosa Noga`, выполненный в рамках дипломного проекта курса Netology по React. Проект собран на `React + TypeScript + Redux Toolkit + Redux-Saga` и повторяет функциональность, заданную в учебном ТЗ: каталог, поиск, карточка товара, корзина, оформление заказа, обработка загрузки и ошибок.

## Демо

- Frontend: https://dm-morozov.github.io/netology_77_react-diploma-project/
- Backend (Render API): https://netology-76-react-redux-saga.onrender.com/api/
- Репозиторий: https://github.com/dm-morozov/netology_77_react-diploma-project

## Что реализовано

- Постраничный роутинг на `React Router`
- Общий `MainLayout` c `Header`, баннером, контентной областью и `Footer`
- Страницы:
  - главная
  - каталог
  - о магазине
  - контакты
  - карточка товара
  - корзина
  - 404
- Глобальный поиск в шапке с переходом на `/catalog.html?q=...`
- Каталог с категориями, поиском и догрузкой товаров по `offset`
- Блок `Хиты продаж`
- Страница товара с загрузкой данных по `id`, выбором размера и количества
- Корзина с хранением в `localStorage`
- Оформление заказа через `POST /api/order`
- Отдельные `loader` и `error` состояния для сетевых запросов
- Обработка нестабильного backend-сценария через `flaky`-режим

## Стек

- `React 19`
- `TypeScript`
- `Vite`
- `React Router`
- `Redux Toolkit`
- `Redux-Saga`
- `ESLint`
- `Bootstrap`

## Архитектура

Проект построен по модульному принципу. Логика разделена на уровни, чтобы код было проще читать, поддерживать и расширять.

```text
src/
  app/                # store, saga, typed hooks
  components/         # переиспользуемые UI-компоненты
  domain/             # API, типы, утилиты, storage
  features/           # Redux slices + sagas по бизнес-функциям
  layout/             # основной layout приложения
  pages/              # страницы маршрутов
```

Основной поток данных в асинхронных сценариях:

```text
Компонент -> dispatch(action) -> saga -> API -> success/error action -> reducer -> обновление UI
```

Такой подход помог отделить:

- UI-логику компонентов
- глобальное состояние
- побочные эффекты и HTTP-запросы
- доменные типы и API-функции

## Чему я научился в проекте

- Строить SPA-приложение с маршрутизацией и layout-структурой
- Организовывать состояние через `Redux Toolkit`
- Выносить асинхронную логику в `Redux-Saga`
- Понимать цепочку `dispatch -> saga -> reducer -> render`
- Работать с query-параметрами URL для поиска
- Реализовывать пошаговую загрузку данных через `offset`
- Хранить корзину в `localStorage` и синхронизировать ее с Redux
- Обрабатывать состояния `loading / success / error`
- Писать более структурированный и переиспользуемый код

## Особенности реализации

- Для каталога и категорий используются отдельные feature-модули
- Для страницы товара выделен отдельный `ProductDetails` feature
- В корзине одна позиция определяется как связка `товар + размер`
- Цена фиксируется в момент добавления товара в корзину
- При успешном заказе корзина очищается и в Redux, и в `localStorage`
- Для битых изображений добавлены fallback-картинки
- Для `404` ответа API выводится понятное сообщение `Товар не найден`

## Установка и запуск

### Frontend

```bash
yarn install
yarn dev
```

Приложение будет доступно по адресу:

```bash
http://localhost:5173
```

### Backend

```bash
cd backend
yarn install
yarn start
```

Backend будет доступен по адресу:

```bash
http://localhost:7070
```

## Переменные окружения

Локально frontend использует:

```env
VITE_API_BASE_URL=http://localhost:7070/api
```

Для production используется:

```env
VITE_API_BASE_URL=https://netology-76-react-redux-saga.onrender.com/api/
```

## Проверка нестабильного сервера

Чтобы проверить, как приложение ведет себя при задержках и ошибках, можно запустить backend в специальном режиме:

```bash
cd backend
yarn install
yarn flaky
```

Для PowerShell эквивалентная команда:

```powershell
$env:APP_DELAY="true"; $env:APP_ERROR="true"; node src/index.mjs
```

Этот режим использовался для проверки:

- отдельных loader для разных блоков
- отображения ошибок пользователю
- повторной отправки запросов без перезагрузки страницы

## Скрипты

Корень проекта:

```bash
yarn dev
yarn build
yarn preview
yarn lint
yarn lint:fix
yarn backend
```

Папка `backend`:

```bash
yarn start
yarn flaky
```

## Что было важно в этом дипломе

Проект выполнялся не как набор случайных компонентов, а как учебная система, в которой было важно понять:

- как проектировать структуру приложения
- как разделять ответственность между слоями
- как работает асинхронный поток данных
- как постепенно превращать статичную верстку в работающий интерфейс

Главная цель этого проекта для меня была не только в том, чтобы получить рабочий результат, но и в том, чтобы разобраться, почему код устроен именно так.

## Контакты

Если у вас есть замечания, идеи по улучшению или вопросы по проекту:

- [LinkedIn](https://www.linkedin.com/in/dm-morozov/)
- [Telegram](https://t.me/dem2014)
- [GitHub](https://github.com/dm-morozov/)
