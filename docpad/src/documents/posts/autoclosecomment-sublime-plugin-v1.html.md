---
title: "AutoCloseComment - Плагин для Sublime Text 3"
layout: "post"
date: 2013-02-10 19:00
description: "Плагин генерирующий закрывающий комментарий для блока стилей CSS"
type: "simple"
tags: sublime
img: /img/blog/2013-02-10_autoclosecomment-sublime-plugin/autoclosecomment.png
---

> Код плагина на [github](https://github.com/d4rkr00t/AutoCloseComment).

Плагин AutoCloseComment - генерирует закрывающий комментарий для блоков стилей CSS,LESS (SASS не тестировался но должно работать).

**Пример:**
```css
.my_css_class {

} /* .my_css_class */
```

## Установка

Установка плагина заключается в клонировании репозитория в папку Packages.
```
git clone https:github.com/d4rkr00t/AutoCloseComment.git AutoCloseComment
```

Позже будет доступна установка через Package Control.

## Использование

Находясь внутри фигурных скобок {  } нажать (подряд):

* CMD+Ctrl+c, CMD+Ctrl+v - на Mac
* Ctrl+Alt+c, Ctrl+Alt+v - на Windows
