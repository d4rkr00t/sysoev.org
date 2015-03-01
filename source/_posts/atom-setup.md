title: "Мой setup для Atom"
type: "simple"
date: 2015-02-05 23:30
description: "Настройки, плагины, темы и т.д."
tags:
- atom
img: /atom-setup/atom.png
---

## Как выглядит
<section class="img">
    <a class="lightbox-target"
       href="{% asset_path 'screenshot.png' %}"
       data-size="1440x873"
       data-desc="Мой setup для Atom">
        <img src="{% asset_path 'screenshot.png' %}" alt="Мой setup для Atom">
    </a>
</section>

## Тема

В данный момент использую светлую тему, недавно появившуюся в Atom — One Light. Есть ее темный аналог One Dark, также любителям темных тем советую посмотреть на Neutron UI (правда, он давно не обновлялся и atom ругается на некоторые классы, которые уже deprecated, но есть мой [форк](https://github.com/d4rkr00t/neutron-ui) где это поправлено).

## Кастомные стили
```less
/* скрываем скроллбар в редакторе, так как положения скролла видно в minimap */
atom-text-editor::shadow .vertical-scrollbar {
  opacity: 0;
  width: 0;
}

/* стили для подсветки строки и делающие невидимые символы чуть менее заметными */
atom-text-editor::shadow {
  .cursor-line {
    background: rgba(0, 0, 0, .04);
  }

  .invisible-character {
    opacity: 0.4;
  }
}
```
## Плагины

### advanced-new-file
Помогает быстро создавать файлы, жмем CMD + Alt + N, пишем путь в строку ввода, получаем файл.

### atom-beautify
Автоматически форматирует код для языков: HTML, CSS, JavaScript, JSON, PHP, Ruby, Python, Java, C, C++, C#, Objective-C, CoffeeScript, TypeScript, SQL.

### atom-color-highlight
Подсвечивает цвета в коде. Даже умеет переменные, правда, если они в том же файле.
<section class="img">
    <img src="{% asset_path 'atom-color-highlight.png' %}" alt="atom-color-highlight">
</section>

### atom-ternjs
Умный автокомплит для JavaScript. Периодически он меня устает и я его выключаю.

### auto-detect-indention
Автоматически определяет настройки отступов в открытом файле.

### autocomplete-plus
Более удобный autocomplete, показывает подсказки в момент набора текста. А также дополнения к нему:
* autocomplete-path — для путей
* autocomplete-snippets — для сниппетов

### autoprefixer
Собственно autoprefixer, использую когда нужно быстро сгенерировать префиксы для css свойств, и не хочется настраивать autoprefixer для этого отдельно.

### color-picker
Позволяет тюнить или выбирать цвета.
<section class="img">
    <img src="{% asset_path 'color-picker.png' %}" alt="color-picker">
</section>

### compare-files
Создает diff для двух файлов в редакторе.

### css-comb
[Мой плагин](/css-comb-atom/) для интеграции csscomb в atom.
<section class="img">
    <img src="https://cloud.githubusercontent.com/assets/200119/5740596/e244b8f6-9c15-11e4-8263-a31909ddd47e.gif" alt="csscomb for atom">
</section>

### docblockr
Добавляет DocBlock комментарии для Javascript, PHP, ActionScript, CoffeeScript, Java, Objective C, C и C++ вида:
```
/**
 * Generates eventListener item for Dega._eventListeners list
 * @param {String} type — event type like 'click' | 'focus' | 'blur'
 * @param {String} selector — .class | #id | div
 * @param {Function} callback — user passed callback
 * @param {Boolean} useCapture
 */
```

### Emmet
Бывший zencoding. Думаю в представлении не нуждается.

### file-icons
Иконки с типами файлов для боковой панели:
<section class="img">
    <img src="{% asset_path 'file-icons.png' %}" alt="file-icons">
</section>

### linter
Линтер, что тут добавишь, проверяет синтаксис, находит всякие мелкие опечатки, а также codestyle. К линтеру есть множество плагинов, я использую следующие:
* linter-csslint
* linter-htmllint
* linter-jscs
* linter-jshint
* linter-jsonlint
* linter-jsx (но он сейчас не работает, давно не обновлялся)

### minimap
Карта кода как в sublime text.

### project-manager
Менеджер проектов, позволяет запомнить папку как проект и быстро вернуться к ней.

### remember-session
Запоминает текущие состояние редактора и восстанавливает открытые файлы после закрытия атома.

### tab-control
Позволяет быстро менять настройки отступов в текущей вкладке.

### toggle-quotes
Помогает быстро менять одинарные кавычки на двойные и обратно.
* ctrl + shift + '

### view-tail-large-files
С помощью этого плагина, наконец, можно хотя бы просматривать файлы больше 2мб в атоме.

### Дополнительные пакеты для языков
* bemhtml
* react
* stylus
* language-dot(подсветка всяких .bash_profile и .gitconfig и им подобных)
* language-ejs
* language-html-swig
