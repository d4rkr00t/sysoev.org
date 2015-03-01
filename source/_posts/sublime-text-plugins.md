title: "Плагины Sublime Text 3"
type: "simple"
date: 2013-05-14 17:31
description: "Список полезных плагинов для sublime text 3"
tags:
- sublime
---

### AdvancedNewFile

Позволяет быстро создавать файлы исопльзуя строку ввода. Пишем путь получаем там файл.

- cmd+alt+n — создать файл/папку

### All Autocomplete

Автодополнение из всех открытых файлов.

### AngularJS

AngularJS дополнение кода, сниппеты, переход к определению(go to definition) поиск и т.д.  [Подробнее на github.](https://github.com/angular-ui/AngularJS-sublime-package)

### AutoFileName

Подставляет имена файлов из папок проекта, например при наборе src="" в img и т.д.

### BracketHighlighter

Подсвечивает открывающие и закрывающие скобки и кавычки.

<section class="img">
    <a class="lightbox-target" href="{% asset_path 'brackets-highlighter.png' %}" data-size="105x65" data-desc="BracketHighlighter for Sublime Text 3">
        <img src="{% asset_path 'brackets-highlighter.png' %}" alt="BracketHighlighter for Sublime Text 3">
    </a>
</section>

### CSScomb JS

Сортирует и группирует правила css.

### CTags

Поддержка автодоплнения с использованием CTags.

### DocBlockr

Добавляет DocBlock комментарии для Javascript, PHP, ActionScript, CoffeeScript, Java, Objective C, C и C++ вида:

```js
/**
 * [foobar description]
 * @param  {[type]} baz [description]
 * @param  {[type]} quux [description]
 * @return {[type]}
 */
function foobar (baz, quux) { }
```

Использовать просто /** и tab или enter.

### Emmet

Бывшый zencoding. Думаю в представлении не нуждается.

- cmd + ` — удалить тег
- ctrl + up/down — увеличить/уменьшить число на 1
- alt + up/down — увеличить/уменьшить число на 0.1
- cmd + alt + up/down — увеличить/уменьшить число на 10
- cmd + shift + / — умное закомментирование тегов и блоков
- cmd + shift + . — выбрать следующий элемент
- cmd + shift + , — выбрать предидущий элемент
- shift + ctrl + d — encode / decode data uri
- ctrl + j — выделить содержимое html тега вместе с <></>
- ctrl + d — выделить содержимое html тега без <></>
- shift + ctrl + i — обновить размер изображения
- ctrl + alt + left/right — предидущаие/следующие место редактирования

### FileDiffs

Сравнивает два файла.

### GitGutter

Подсвечивает изменения в файле.

<section class="img">
    <a class="lightbox-target" href="{% asset_path 'gitgutter.png' %}" data-size="291x177" data-desc="GitGutter for Sublime Text 3">
        <img src="{% asset_path 'gitgutter.png' %}" alt="GitGutter for Sublime Text 3">
    </a>
</section>

### Gutter Color

Подсвечивает цвет в css рядом с номером строки.

<section class="img">
    <a class="lightbox-target" href="{% asset_path 'gutter-color.png' %}" data-size="302x222" data-desc="Gutter Color for Sublime Text 3">
        <img src="{% asset_path 'gutter-color.png' %}" alt="Gutter Color for Sublime Text 3">
    </a>
</section>

### ImageMagick

Показывает в статус баре размер и разрешение картинки.

<section class="img">
    <a class="lightbox-target" href="{% asset_path 'imagemagick.png' %}" data-size="244x41" data-desc="ImageMagick for Sublime Text 3">
        <img src="{% asset_path 'imagemagick.png' %}" alt="ImageMagick for Sublime Text 3">
    </a>
</section>

### JSON Reindent

Автоматическое форматирование JSON.

### SideBarEnhancements

Добавляет множество полезных фич:

- Очень сильно расширяет список команд в сайдбаре.
- Позволяет скопировать путь до файла строкой и тегом a или link или script.
- И т.д.

Лучше почитать тут: [https://github.com/titoBouzout/SideBarEnhancements](https://github.com/titoBouzout/SideBarEnhancements)

### SublimeLinter

Проверка синтаксиса для множества языков программирования.

#### И еще к нему пачка дополнительных плагинов:

**SublimeLinter-annotations** — Подсвечивает TODO, FIXME комментарии в коде.

**SublimeLinter-contrib-scss-lint** — Проверка синтаксиса для Sass.

**SublimeLinter-csslint** — Проверка css с помощью csslint.

**SublimeLinter-jshint** — Проверка javascript с помощью jshint.

### Tag

Коллекция плагинов для работы с html тегами. Множество возможностей читайте в readme или на [гитхабе.](https://github.com/SublimeText/Tag)

### Terminal

- cmd + shift + t — запускает терминал в папке из которой открыт текущий файл

### TernJS

Типа умный анализатор + автодополнение для JavaScript.

### Плагины для поддержки синтаксиса и дополнительные сниппеты

HTML5, JavaScript & NodeJS Snippets, jQuery, LESS, SCSS, NodeJS, Stylus, Twig
