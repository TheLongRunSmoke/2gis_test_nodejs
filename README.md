Тестовое задание для 2gis.
------
Задание состоит в написании простого SPA чата на Node.js.

Я постарался использовать как можно меньше стороних модулей и максимально упростить код.
Использованы следующие модули:

- connect в связке с serve-static в качестве роутера
- socket.io для реализации сокетов
- mocha и chai для тестирования
Все зависимости прописаны в package.json.

На стороне клиента, применён, только, скрипт поддержки сокетов.

### Что можно улучшить?
1. В задании не ставилась цель реализовать сохранение сессии. Можно добавить, например, модуль express-session и пользоваться cookie для запоминания клиента.
2. Я не стал усложнять код хэшированием пароля. Так делать не следует.
3. Наличие пользователя не проверяется. Возможно создание нескольких пользователей с одним ником. Добавить проверку.
4. Пользовательский ввод не фильтруется. Надо экранировать потенциально опасные символы.

### Структура
- /app - содержит статические HTML файлы, стили и клиентские js скрипты. Стили собраны less, в /app/src/ находятся исходники.
- /test - тесты
- serverv.js - основной исполняемый файл

### Запуск
Приложение написано под node v4.2.2 и npm v2.14.7.

1. Установите необходимые модули:
 
    ```    
    npm install
    ```
2. Можно провести тесты:
 
    ```
    npm test
    ```
3. Запустите приложение:

    ```    
    npm start
    ```
    или
    ```
    node server
    ```
4. В консоль будет выведен адрес, откройте его на любой машине в локалной сети.

### По вопросам
shype: thelongrunsmoke

email: thelongrunsmoke@gmail.com
