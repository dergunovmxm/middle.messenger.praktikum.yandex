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
│   ├── assets/            #папка с assets (изображения)
│   ├──pages/              #папка со страницами приложения
│   ├── partials/          #папка с шаблонами
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

| 	                                  | Команда                                                                           |
|-------------------------------------|-----------------------------------------------------------------------------------|
| Склоировать репо по ссылке          | `git clone https://github.com/dergunovmxm/middle.messenger.praktikum.yandex.git`  | 
| Установить зависимости              | `npm install`                                                                     |                                                               
| Сборка и запуск на localhost:3000/  | `npm run start`                                                                   |                                                        


## Домен на Netlify: https://creative-lollipop-bcce61.netlify.app/

## Страницы
#### Страница не найдена: https://creative-lollipop-bcce61.netlify.app/pages/notfound/
#### Страница ошибки сервера: https://creative-lollipop-bcce61.netlify.app/pages/servererror/
#### Страница авторизации: https://creative-lollipop-bcce61.netlify.app/pages/auth/
#### Страница регистрации: https://creative-lollipop-bcce61.netlify.app/pages/register/
#### Страница профиля: https://creative-lollipop-bcce61.netlify.app/pages/profile/
#### Страница Мессенджера (в след спринте): https://creative-lollipop-bcce61.netlify.app/pages/messenger/

