title: "Фильтруем блоки с помощью jQuery"
type: "simple"
date: 2012-12-29 11:00
description: "Пример создания эффекта фильтруемых блоков для портфолио на jQuery"
tags:
- jquery
- javascript
- css
img: /jquery-blocks-filter/jquery-blocks-filter.jpg
---

Сейчас для сайтов с портфолио стали популярен эффект филтруемых блоков. Когда пользователь выбирает тип работы, например: "сайты" и все что не относится к этой категории плавно исчезает.

И финальный результат:

[Результат на jsFiddle](http://jsfiddle.net/CJY3b/)

Сегодня мы научимся создавать подобный эффект силами только jQuery, без дополнительных плагинов.

## Начнем

И так, первое что мы сделаем это создадим структуру нашего будущего портфолио. Пусть у нас будет 12 работ в 3-х категориях: "site", "design", "app". Создадим html файл со следующей разметкой:

```html
<!doctype html>
<html>
    <head>
        <title>Фильтруемые блоки на jQuery</title>

        <style type="text/css">
            .container {
                margin: 0 auto;
                width: 960px;
            }

            #nav {
                margin: 0 0 18px 0;
                padding: 0;
                list-style: none;
            }
            #nav li {
                display: inline;
            }
            #nav li a {
                padding: 1px 12px;
                background-color: #bbb;
                color: #fff;
                text-decoration: none;
                font-size: 13px;
                -webkit-border-radius: 12px;
                        border-radius: 12px;
            }
            #nav li a:hover {
                background-color: #aaa;
            }
            #nav li .active {
                background-color: #999;
            }

            .bl {
                float: left;
                display: block;
                margin: 0 18px 18px 0;
                padding-top: 100px;
                width: 200px;
                height: 150px;
                background-color: #999;
                color: #fff;
                text-decoration: none;
                font-size: 28px;
                font-family: Arial;
                text-align: center;
            }

            .bl.site {
                background-color: #4c95c8;
            }
            .bl.design {
                background-color: #7abf00;
            }
            .bl.app {
                background-color: #e59500;
            }

        </style>

    </head>

    <body>

        <div class="container">

            <ul id="nav">
                <li><a href="#all" class="active">All</a></li>
                <li><a href="#site">Site</a></li>
                <li><a href="#design">Design</a></li>
                <li><a href="#app">App</a></li>
            </ul>

            <div class="blocks">

                <a href="#" class="bl site">
                    Site
                </a>
                <a href="#" class="bl design">
                    Design
                </a>
                <a href="#" class="bl site">
                    Site
                </a>
                <a href="#" class="bl app">
                    App
                </a>
                <a href="#" class="bl design">
                    Design
                </a>
                <a href="#" class="bl site">
                    Site
                </a>
                <a href="#" class="bl app">
                    App
                </a>
                <a href="#" class="bl site">
                    Site
                </a>
                <a href="#" class="bl app">
                    App
                </a>
                <a href="#" class="bl design">
                    Design
                </a>
                <a href="#" class="bl design">
                    Design
                </a>
                <a href="#" class="bl design">
                    Design
                </a>

            </div> <!-- /.blocks -->

        </div> <!-- /.container -->

    </body>
</html>
```

Вспомогательные классы такие как: app, design, site нужны нам для фильтрации.

[Результат на jsFiddle](http://jsfiddle.net/FG6BU/)

С разметкой закончили, переходим к JavaScript'у.

---------------------------

## Добавим жизни

Для начала подключим jQuery к нашей странице. И первое что мы сделаем - это переключение стиля у выбранного пункта меню, так же будем менять хэш тег в адресной строке браузера - это поможет нам при возврате пользователь по истории назад автоматически отфильтровывать ненужные работы.

```js
$(function(){

    $('#nav a').on('click', function () {
        var el = $(this);
        var all_a = $('#nav a');

        all_a.removeClass('active');
        el.addClass('active');

        window.location.hash = el.attr('href');

        return false;
    });

});
```

[Результат на jsFiddle](http://jsfiddle.net/S2U75/)

Теперь сделаем функцию фильтрации наших блоков:

```js
function filterBlocks (tag) {
    // Уберем ненужную нам #
    var tag = tag.replace('#','');
    var all = false;

    if (tag === "all") {
        all = true;
    };

    // Элементы которые будут спрятаны
    if (!all) {
        var hide_el = $('.bl:not(.'+tag+')');
    };

    // Элементы которые будут показаны
    if (all) {
        var show_el = $('.bl');
    } else {
        var show_el = $('.bl.'+tag);
    }

    var anim_time = 700;
    // Если анимация первый раз то компенсируем задержку на старте
    if (first) {
        anim_time = 0;
        first = false;
    };

    // Показываем остальные элементы
    show_el.show();
    show_el.stop().animate({
        width: 200,
    }, anim_time, function () {
        show_el.stop().animate({
            opacity: 1,
        }, 700);

        if (!all) {
            // Плавно исчезаем элементы и потом скрываем их совсем
            hide_el.stop().animate({
                opacity: 0,
            }, 700, function() {
                hide_el.stop().animate({
                    width: 0,
                }, 1000, function() {
                    hide_el.hide();
                });
            });
        } else {
            first = true;
        }

    });
}
```

Добавим вызов функции filterBlocks в событие click меню. А так же добавим переменную var first = true; в начало нашего события onLoad. Весь js код теперь выглядит так:

```js
$(function(){

    var first = true;

    $('#nav a').on('click', function () {
        var el = $(this);
        var all_a = $('#nav a');

        all_a.removeClass('active');
        el.addClass('active');

        window.location.hash = el.attr('href');

        filterBlocks(el.attr('href'));

        return false;
    });

    function filterBlocks (tag) {
        // Уберем ненужную нам #
        var tag = tag.replace('#','');
        var all = false;

        if (tag === "all") {
            all = true;
        };

        // Элементы которые будут спрятаны
        if (!all) {
            var hide_el = $('.bl:not(.'+tag+')');
        };

        // Элементы которые будут показаны
        if (all) {
            var show_el = $('.bl');
        } else {
            var show_el = $('.bl.'+tag);
        }

        var anim_time = 700;
        // Если анимация первый раз то компенсируем задержку на старте
        if (first) {
            anim_time = 0;
            first = false;
        };

        // Показываем остальные элементы
        show_el.show();
        show_el.stop().animate({
            width: 200,
        }, anim_time, function () {
            show_el.stop().animate({
                opacity: 1,
            }, 700);

            if (!all) {
                // Плавно исчезаем элементы и потом скрываем их совсем
                hide_el.stop().animate({
                    opacity: 0,
                }, 700, function() {
                    hide_el.stop().animate({
                        width: 0,
                    }, 1000, function() {
                        hide_el.hide();
                    });
                });
            } else {
                first = true;
            }
        });
    }
});
```

[Результат на jsFiddle](http://jsfiddle.net/WVpbz/)

Нам осталось сделать проверку на наличие хэш тега в url и фильтровать портфолио при загрузки страницы. Это нужно когда пользователь вернулся назад в истории браузера и хочет сразу получить отфильтрованное портфолио. Вот как выглядит код для такой проверки:

```js
// Получаем hash из url браузера
var hash = window.location.hash;
if (hash) {
    if (hash != "#all") {
        first = false;
    };

    // Делаем активным правильный пункт меню
    $('#nav a').removeClass('active');
    $('a[href="'+hash+'"]').addClass('active');

    filterBlocks(hash);
};
```

В окончательную функцию filterBlocks были внесены мелкие изменения, они необходимы для правки багов возникших в процессе тестирование анимации, убирают баг при быстрых кликах по разным пунктам меню. Полный код выглядит так:

```js
$(function(){
    var first = true;

    // Получаем hash из url браузера
    var hash = window.location.hash;
    if (hash) {
        if (hash != "#all") {
            first = false;
        };

        // Делаем активным правильный пункт меню
        $('#nav a').removeClass('active');
        $('a[href="'+hash+'"]').addClass('active');

        filterBlocks(hash);
    };

    $('#nav a').on('click', function () {
        var el = $(this);
        var all_a = $('#nav a');

        all_a.removeClass('active');
        el.addClass('active');

        window.location.hash = el.attr('href');

        filterBlocks(el.attr('href'));

        return false;
    });

    function filterBlocks (tag) {
        // Уберем ненужную нам #
        var tag = tag.replace('#','');
        var all = false;

        if (tag === "all") {
            all = true;
        };

        // Элементы которые будут спрятаны
        if (!all) {
            var hide_el = $('.bl:not(.'+tag+')');
            hide_el.stop(); // ИЗМЕНЕНИЕ: предварительная остановка анимаций
        };

        // Элементы которые будут показаны
        if (all) {
            var show_el = $('.bl');
        } else {
            var show_el = $('.bl.'+tag);
        }
        show_el.stop(); // ИЗМЕНЕНИЕ: предварительная остановка анимаций

        var anim_time = 700;
        // Если анимация первый раз то компенсируем задержку на старте
        if (first) {
            anim_time = 0;
            first = false;
        };

        // Показываем остальные элементы
        show_el.show();
        show_el.stop().animate({
            width: 200,
        }, anim_time, function () {

            show_el.stop().animate({
                opacity: 1,
            }, anim_time); // ИЗМЕНЕНИЕ: Подключим компенсацию и в этой анимации

            if (!all) {
                // Плавно исчезаем элементы и потом скрываем их совсем
                hide_el.stop().animate({
                    opacity: 0,
                }, 700, function() {
                    hide_el.stop().animate({
                        width: 0,
                    }, 1000, function() {
                        hide_el.hide();
                    });
                });
            } else {
                first = true;
            }

        });
    }
});
```

[Результат на jsFiddle](http://jsfiddle.net/CJY3b/)

<p class="-notice">The End. Комментарии приветствуются!</p>
