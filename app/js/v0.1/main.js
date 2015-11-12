// Устанавливаю соединения с сервером
var socket = io(window.location.href);    // Применимо только для single page.

document.addEventListener("DOMContentLoaded", function (event) {
    // Добавляю листенер для кнопки входа
    document.querySelector('div.login #submit').addEventListener('click', function () {
        document.querySelector('div.login .form form').className = "error_hidden";
        var form = document.querySelector('div.login .form #login');
        var login = form.querySelector("[name='login']").value;
        // Пароль надо хешировать, скажем, md5.
        // js не имеет встроеной реализации, не буду уложнять
        var pw = form.querySelector("[name='pw']").value;
        if (login && pw) {
            var param = {nickname: login, pass: pw};
            socket.emit('login', param);
        }
    }, false);

    // Кнопки отправки сообщений
    document.querySelector('div.messages #send').addEventListener('click', function () {
        var mes = document.querySelector('div.messages [name="mes"]').value;
        if (mes !== '') {
            document.querySelector('div.messages [name="mes"]').value = '';
            socket.emit('message', mes);
        }
    }, false);

});

// Принимаю результат попытки входа, если успешно - скрываю оверлей, иначе показываю ошибку
socket.on('login_res', function (data) {
    if (data['login'] === true){
        document.querySelector('div.login').style.display = 'none';
    }else{
        document.querySelector('div.login .form form').setAttribute('data-content', data['error_mes']);
        document.querySelector('div.login .form form').className = "error";
    }
});

// Приём и отображений списка пользователей
socket.on('users', function (data){
    document.querySelector('div.users i').innerHTML = data;
});

// Приём и отображений сообщений
socket.on('messages', function (data){
    document.querySelector('div.messages li').innerHTML = data;
});
