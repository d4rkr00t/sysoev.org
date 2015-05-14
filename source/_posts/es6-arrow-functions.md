title: "ES6. Стрелочные функции"
type: "simple"
description: "Первая статья из серии 'esnext' посвященная ECMAScript 6 — Arrow Functions"
date: 2015-05-16 15:20:00
tags:
- es6
- javascript
- esnext
- arrow functions
img: /es6-arrow-functions/es6-arrow-functions.svg
---
## Введение в серию
Запланировал серию статей посвященных ECMAScript 6 (2015), а в дальнейшем, возможно, и ECMAScript 7 (2016). Серия носит больше образовательный характер и служит, скорее способом самому лучше разобраться в новых возможностях и стандартах языка. По этому, скорее всего, я не расскажу чего-то нового, но постараюсь структурировать свои знания, что возможно, окажется полезным и вам.

Первая статья серии, посвящена, так называемым стрелочным функциям, как понятно из их названия, они характеризуются новым синтаксисом:

```js
var myFunc = x => x * 2;
```

Стрелочные функции, в первую очередь, созданы для решения некоторых, болевых точек традиционных Function Expressions:

* Лексическое связывание — биндинг контекста (this).
* Короткий синтаксис для анонимных функций.

### Особенности

* Связывают контекст — значение `this` определяется не тем, как и где функция вызвана, а где она была создана.
* Наследуют super от родительского контекста.
* Не имею собственного объекта arguments, а наследуют его от родительского контекста.
* Так как `this` биндится при создании функции, он не может быть изменен в дальнейшем даже с помощью `.call()`, `.apply()` и `.bind()`.
* Не могут быть использован как конструктор, кидают `TypeError` при использовании с `new`.
* Не могут быть генераторами и использовать `yield` внутри себя.
* Отсутствует `.prototype`.
* Стрелочные функции всегда анонимны.

### Общее с традиционными функциями:

* `typeof` вернет `function`
* Стрелочные функции экземпляры `Function`, так что `instanceof` для них работает также как и с традиционной функцией.
* Все возможные параметры традиционных функций (появившиеся в es6) поддерживаются и в стрелочных, то есть в них можно использовать: значения по умолчанию, destructuring, rest parameters и т.д.

## Синтаксис

```js
// Без параметров
var f1 = () => 28;

// С одним параметром
var f2 = x => x * x;

// С одним или несколькими параметрами
var f3 = (x, y) => x * y;

// Вернуть объект
var f4 = x => ({ x: x });

// С многострочным телом функции
var f5 = (x, y) => {
    var z = x * y;

    return z * z;
};
```

Стрелочные функции, тело которых не обернуто в `{}`, возвращают результат выражения, `return` в таком случае использовать нельзя, так как получим `SyntaxError`.

```js
// SyntaxError
var f3 = (x, y) => return x * y;

// Нет ошибки
var f4 = (x, y) => x * y;
var f5 = (x, y) => { return x * y };
```

Также нужно быть внимательным и не использовать стрелочные функции в декларации методов с использованием литерала объекта или `Function.prototype`:

```js
var component = {
    _privateMethod: function () {
        // do something
    },

    // this в handleAction будет указывать на глобальный объект,
    // что приведет к ошибке
    handleAction: (params) => this._privateMethod(params),

    // Если, все же, хочется писать покороче,
    // лучше использовать новый способ декларации методов
    handleAction2 (params) {
        return this._privateMethod(params);
    }
};

function Component () { }

Component.prototype._privateMethod = function () { /* do something */ };

// this в handleAction так же будет указывать на глобальный объект
Component.prototype.handleAction = () => this._privateMethod();
```

## Использование

### Связывание контекста

Связывание контекста `this` в обработчике событий или итерации по коллекциям.

Обычно в таких случая мы прибегаем к паттерну `var _this = this;` или же `.bind(this)`. С использование стрелочных функций создание callback'ов с привязанным `this` становится проще:

```js
var component = {
    // Прокидывание контекста в обработчик события
    addEventListeners: function () {
        this.$btn = document.querySelector('.btn');

        this.$btn.addEventListener('click', (e) => {
            e.preventDefault();

            this.makeSomeWork();
        });
    },

    // Итерация по коллекции с вызовом метода объекта для каждого элемента
    _processDataItem: function (item) { /* make some action with data item */ },

    prepareData: function (data) {
        data = data.map(item => this._processDataItem(item));
    }
};
```

### Короткий синтаксис

Короткий синтаксис для записи callback'ов итераторов (map, reduce и т.д.).

```js
var b = a.map(i => i * i);

a.sort((i1, i2) => i1 - i2);
```

## Транспайлеры, поддержка

Поддержку всевозможными js движками можно увидеть тут — [ECMAScript compatibility table](https://kangax.github.io/compat-table/es6/#arrow_functions).

Стоит отметить, что связывание `arguments` пока работает только в транспайлерах: Traceur, Babeljs, Clouser, и майрософтовском Edge.

Связывание `super`, также, пока работает только в выше перечисленных транспайлерах.

### Во что транспайлится

```js
// Без связывания получим вполне себе ожидаемый результат (традиционная функция). До:
var f3 = (x, y) => x * y;

// После:
var f3 = function f3(x, y) {
    return x * y;
};

// Со связыванием, код тоже очень чистый и понятный.
var component = {
    // До:
    prepareData: function (data) {
        data = data.map(item => this._processDataItem(item));
    },

    // После:
    prepareData: function prepareData(data) {
        var _this2 = this;

        data = data.map(function (item) {
            return _this2._processDataItem(item);
        });
    },

    ...
};
```

## Что еще почитать

* [ES6 draft — Arrow Function Definitions (en)]( https://people.mozilla.org/~jorendorff/es6-draft.html#sec-arrow-function-definitions)
* [TC39 wiki — Arrow Functions (en)](http://tc39wiki.calculist.org/es6/arrow-functions/)
* [Книга Kyle Simpson из серии You Don't Know JS: ES6 & Beyond (en)]( https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/ch2.md#arrow-functions)
* [Understanding ECMAScript 6 arrow functions (en)](http://www.nczonline.net/blog/2013/09/10/understanding-ecmascript-6-arrow-functions/)
* [ESNext Learning List — Arrow Functions (en)](https://github.com/d4rkr00t/ESNext-Learning#arrow-functions)
* [ECMAScript 6: arrow functions and method definitions (en)](http://www.2ality.com/2012/04/arrow-functions.html)
* [Стрелочные функции (Arrow functions) в ECMAScript 6 — хабр (ru)](http://habrahabr.ru/company/mailru/blog/213455/#_6)
