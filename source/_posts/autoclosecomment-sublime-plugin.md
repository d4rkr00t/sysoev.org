title: "AutoCloseComment - Плагин для Sublime Text 3"
type: "simple"
date: 2013-02-10 19:00
description: "Плагин генерирующий закрывающий комментарий для блока стилей CSS"
tags:
- sublime
img: /autoclosecomment-sublime-plugin/autoclosecomment.png
---

> Код плагина на [github](https://github.com/d4rkr00t/AutoCloseComment).

Плагин AutoCloseComment - генерирует закрывающий комментарий для блоков стилей CSS,LESS (SASS не тестировался но должно работать).

{% codeblock Пример lang:css %}
.my_css_class {

} /* .my_css_class */
{% endcodeblock %}

## Установка

Установка плагина заключается в клонировании репозитория в папку Packages.
```
git clone https//:github.com/d4rkr00t/AutoCloseComment.git AutoCloseComment
```

Позже будет доступна установка через Package Control.

## Использование

Находясь внутри фигурных скобок {  } нажать (подряд):

* CMD+Ctrl+c, CMD+Ctrl+v - на Mac
* Ctrl+Alt+c, Ctrl+Alt+v - на Windows
