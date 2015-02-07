---
title: "Dega — Делегация событий на чистом JavaScript"
layout: "post"
date: 2015-02-05 23:30
description: "Микро библиотека для делегации событий на чистом javascript"
type: "simple"
tags: javascript, dega
img: /img/blog/2015-02-05_dega-event-delegation/delegate.png
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
```

Подписка на событие:
```js
Dega(document).on('click', '.link', handler);
```

Отписка от событий:
```js
Dega(document).off('click', '.link', handler);
```

Конструктор Dega самовызывающийся, так что ```new``` использовать не нужно.

<p class="-notice">
Конструктор Dega принимает два типа аргументов:
</p>

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

> Пулл-Реквесты и прочая помощь очень приветствуются.
