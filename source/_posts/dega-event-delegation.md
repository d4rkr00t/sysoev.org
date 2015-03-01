title: "Dega — Делегация событий на чистом JavaScript"
type: "simple"
date: 2015-02-05 23:30
description: "Микро библиотека для делегации событий на чистом javascript"
tags:
- javascript
- dega
img: /dega-event-delegation/delegate.png
---

> [GitHub](https://github.com/d4rkr00t/Dega)

<p class="-notice">
Простая библиотека всего 1.2 kb сжатая и около 620 byte gzip.
</p>

Протестирована в последних версиях Chrome, Safari и Firefox. И используется на этом блоге.

## Установка

Подключить Dega можно любым из общепринятых способов — как глобальный объект, AMD или CommonJS модуль.

### Установка через Bower:
```
bower install dega --save
```

### Установка, как npm модуль:
```
npm install dega --save
```

### Подключаем Dega, как CommonJS модуль:
```js
Dega = require('dega');
```

## Использование
```js
var handler = function(e) {
    e.preventDefault();

    console.log('event');
};

// Подписаться на событие
Dega(document).on('click', '.link', handler);

// Отписаться от события
Dega(document).off('click', '.link', handler);
```

### Конструктор

Конструктор Dega самовызывающийся, так что __new__ использовать не нужно.

#### Конструктор Dega принимает два типа аргументов:

1) HTMLElement:
```js
Dega(document)
```

2) Строка — селектор, который будет использован в document.querySelector:
```js
Dega('.class')
Dega('#id')
Dega('tag')
```

## TODO

* Удалять все обработчики событий по селектору,
* Удалять все события по типу.

> Пулл-Реквесты и прочая помощь очень приветствуются. [GitHub](https://github.com/d4rkr00t/Dega).
