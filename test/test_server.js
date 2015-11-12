/**
 * Тесты для сервера.
 */

var assert = require('assert');
var utils = require('../modules/utils');

// Каждое условие проверят только один кейс

describe("Валидация логина", function() {

    it("Логин валидный и больше 6 символов", function() {
        assert.equal(utils.isValid('asdfasdf'), true);
    });

    it("Логин меньше 6 символов", function() {
        assert.equal(utils.isValid('asdf'), false);
    });

    it("Логин 6 символов", function() {
        assert.equal(utils.isValid('qwerty'), true);
    });

    it("Логин 16 символов", function() {
        assert.equal(utils.isValid('1234567890123456'), true);
    });

    it("Логин больше 16 символов", function() {
        assert.equal(utils.isValid('1234567890123456w'), false);
    });

    it("Логин с запрещеными символами", function() {
        assert.equal(utils.isValid('as=%4df'), false);
    });
});

describe("Выборка имен из многомерного именованого массива", function() {

    it("Один пользователь", function() {
        var data = { 'LCnDs1ov2fbRQ_gaAAAA': { 'nickname': 'first', 'pass': '12341234123' }};
        assert.equal(utils.getNicknames(data), 'first' );
    });

    it("Более одного пользователя", function() {
        var data = { 'LCnDs1ov2fbRQ_gaAAAA': { 'nickname': 'first', 'pass': '12341234123' },  'laksdnajngkjnfgjdf': { 'nickname': 'second', 'pass': '12341234123' } };
        assert.equal(utils.getNicknames(data), 'first, second' );
    });

});

describe("Преобразование timestamp в дату и время", function() {

    it("1447310165882 = 11:36:05 12.10.2015", function() {
        var data = 1447310165882;
        assert.equal(utils.timestampToDate(data), '11:36:05 12.10.2015' );
    });

});