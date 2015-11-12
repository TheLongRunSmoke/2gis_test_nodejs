/**
 * Согласно названию, файл содержит различные вспомогательные функции.
 */

/**
 * Проверяет строку. Должна содержать только буквы и цифры. Длина от 6 до 16 символов.
 * @param str - строка для валидации
 * @returns {boolean} - true если всё в порядке
 */
module.exports.isValid = function(str){
    if (str.length < 6){
        return false;
    }
    if (str.length > 16){
        return false;
    }
    var regexp = /^[a-z0-9]+$/i;
    return regexp.test(str);
};

/**
 * Возвращает список пользователей
 * @param data - массив пользователе
 * @returns {string} - форматированная строка со списком ников
 */
module.exports.getNicknames = function(data){
    var user_nicknames = [];
    for (var user in data) user_nicknames.push(data[user]['nickname']);
    if (user_nicknames.length > 1){
        return user_nicknames.join(', ');
    }else{
        return user_nicknames[0];
    }
};

/**
 * Вовращает массив сообщений преобразованый в HTML.
 * @param messages - массив сообщений
 * @returns {string} - HTML
 */
module.exports.messagesToHTML = function(messages){
    var result = '';
    for (var i in messages){
        result += '<ul><b>'+messages[i][1]+' в '+timestampToDate(Number(messages[i][0]))+':<\/b><br\/><p>'+messages[i][2]+'<\/p><\/ul>';
    }
    return result;
};

/**
 * Преобразует UNIXtimestamp в читабельное время и дату.
 * @param timestamp
 * @returns {string}
 */
function timestampToDate(timestamp){

    function leadZero(int){ return (int<10)? '0' + int : int}

    var dateObj = new Date(timestamp);
    var time = [ leadZero(dateObj.getHours()), leadZero(dateObj.getMinutes()), leadZero(dateObj.getSeconds()) ];
    var dateArray = [ leadZero(dateObj.getDate()), leadZero(dateObj.getMonth()) , dateObj.getFullYear() ];
    return time.join(':')+' '+dateArray.join('.');
}

module.exports.timestampToDate = timestampToDate;