/**
 * Основной файл приложения. Содержит всю основную логику.
 */

// Номер порта для локального сервера
var PORT = 8080;

// Подключаю необходимые модули
var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');
var os = require('os');

var utils = require('./modules/utils');

var users = [];    // Массив для хранения пользователей
var users_online = [];     // Пользователи онлайн

var messages = [];    // Массив для сообщений

// Объявляю и настраиваю роутер
var app = connect();
// Настройка ресолвера путей
// В целях демонстрации, подменю пути для js и css
app.use(serveStatic('./app'));
app.use('/node_modules', serveStatic('node_modules'));
app.use('/js', serveStatic('./app/js/v0.1'));
app.use('/css', serveStatic('./app/css/material'));
// Немного сахара
app.use('/test', serveStatic('test/'))
    .use('/test', serveStatic('app'));


// Запускаю сервер
var server = http.createServer(app).listen(PORT, '0.0.0.0', function (request, response) {

    // Получаю IP адресс, обычно нужен первый в выборке
    var interfaces = os.networkInterfaces();
    var listIP = [];
    for (var i in interfaces) {
        for (var k in interfaces[i]) {
            var ip = interfaces[i][k];
            if (ip.family === 'IPv4' && !ip.internal) {
                listIP.push(ip.address);
            }
        }
    }
    // Сервер доступен с любой машины в локальной сети
    console.log('Running on ' + listIP[0] + ':' + PORT);
});

// Объявляю сокеты на сервере
var io = require('socket.io')(server);

io.on('connection', function (socket) {

    // Обработчик для служебных событий
    socket.on('login', function (data) {
        if (typeof users[socket.id] === 'undefined') {
            // Проверяю логин и пароль
            if (utils.isValid(data['nickname']) && utils.isValid(data['pass'])) {
                users[socket.id] = data;
                users_online.push(data['nickname']);
                // Уведомляю пользователя о успешном входе
                socket.emit('login_res', {login: true});
                // Рассылаю новый список пользователей
                socket.emit('users', users_online.join(', '));
                socket.broadcast.emit('users', users_online.join(', '));
                // Добавляю сообщение о входе пользователя
                var mes = [Date.now(), 'Система', users[socket.id]['nickname']+' зашёл в чат.'];
                messages.unshift(mes);    // Сообщения добавляются в начало массива
                var html = utils.messagesToHTML(messages);
                // Рассылка сообщения
                socket.emit('messages', html);
                socket.broadcast.emit('messages', html);
            } else {
                // Сообщение об ошибке
                socket.emit('login_res', {login: false, error_mes: 'Длинна от 6 сиволов, только латинские буквы и цифры.'});
            }
        }
    });

    // Обработчик приема нового сообщения. Добавляет его в массив и рассылает пользователям.
    socket.on('message', function (data) {
        if (typeof users[socket.id] !== 'undefined') {
            // Данные надо фильтровать, но сдесь я не буду этого делать
            var mes = [Date.now(), users[socket.id]['nickname'], data];
            messages.unshift(mes);
            var html = utils.messagesToHTML(messages);
            socket.emit('messages', html);
            socket.broadcast.emit('messages', html);
        }
    });

    // Обработчик дисконекта сокета, срабатывает при закрытии или перезагрузки страницы.
    // Обновляет список пользователей, добавляет сообщение о выходе и рассылает новый список пользователей и сообщения.
    socket.on('disconnect', function () {
        if (typeof users[socket.id] !== 'undefined') {
            var tmp = users_online.indexOf(users[socket.id]['nickname']);
            users_online.splice(tmp, 1);
            socket.broadcast.emit('users', users_online.join(', '));
            var mes = [Date.now(), 'Система', users[socket.id]['nickname']+' покинул чат.'];
            messages.unshift(mes);
            socket.broadcast.emit('messages', utils.messagesToHTML(messages));
        }
    });
});
