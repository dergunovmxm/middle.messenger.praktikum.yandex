# Middle.Messenger Sprint 1

## Прототип https://pixso.net/app/editor/A1aSTIj8tkS85v3MwW0rOA?icon_type=1&page-id=4%3A124

## Требования

Установлен `npm`
Версия `node` >= 16.16.0

## Структура проекта:

```
├── public/             #Статичные файлы
│
├──src/                    #папка проекта root
│   ├── api/            	 #папка c запросами
│   ├── app/               #папка с логикой
│   ├── assets/            #папка с assets (изображения)
│   ├── components/        #папка с компонентами
│   ├── hooks/             #папка с хуками
│   ├── interfaces/        #папка с типами и интерфейсами
│   ├── pages/             #папка со страницами приложения
│   ├── partials/          #папка с шаблонами
│   ├── router/            #папка с логикой роутера
│   ├── store/             #папка с сторами
│   ├── utils/             #папка со вспомогательными функциями, утилитами
│   ├── index.html/        #файл с точкой входа
│   └── style.scss/        #файл со стилями к стартовой странице
├──.gitignore              #файл, который содержит настройки отправки кода
├──.nvmrc                  #файл c весрией node
├──.netlify.toml           #файл c настройкаи деплоя
├──package.json            #файл содержащий список установленных библиотек
├──server.js               #файл с настроками сервера
└──vite.config.js          #файл c настройками vite
```

## Запуск

|                                    | Команда                                                                          |
| ---------------------------------- | -------------------------------------------------------------------------------- |
| Склоировать репо по ссылке         | `git clone https://github.com/dergunovmxm/middle.messenger.praktikum.yandex.git` |
| Установить зависимости             | `npm install`                                                                    |
| Сборка и запуск на localhost:3000/ | `npm run start`                                                                  |

## Домен на Netlify: https://creative-lollipop-bcce61.netlify.app/

## Страницы

#### Страница авторизации: https://rococo-puffpuff-096482.netlify.app/sign-in

#### Страница регистрации: https://rococo-puffpuff-096482.netlify.app/sign-up

#### Страница настроек профиля: https://rococo-puffpuff-096482.netlify.app/settings

#### Страница профиля: https://rococo-puffpuff-096482.netlify.app/profile

#### Страница Мессенджера: https://rococo-puffpuff-096482.netlify.app/messenger
