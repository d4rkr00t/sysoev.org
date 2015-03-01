title: "Подписи к изоборажениям на jQuery и CSS3 Transitions"
type: "simple"
date: 2012-11-26 19:00
description: "Пример создания всплывающих подписей для картинок на jQuery"
tags:
- html
- jquery
- css
- javascript
- transition
img: /jquery-image-captions/final.png
---

> [Демо](http://jsfiddle.net/hPs6F/)

[Скачать архив](http://s7at1c.ru/img/blog/2012-11-26_jquery-image-captions/image-captions.zip)

## Метод с jQuery

Сначала создадим простую разметку для нашего примера, пусть это будет, что-то похожее на галерею изображения.

[JsFiddle](http://jsfiddle.net/UCHpd/)

```html
<!doctype html>
<html>
    <head>
        <title>Подписи к изоборажениям на jQuery</title>

        <script type="text/javascript" src="jquery.js"></script>

        <style type="text/css">
            .wrapper {
                margin: 0 auto;
                width: 960px;
            }

            .image-container {
                position: relative;
                display: inline-block;
                overflow: hidden;
                margin: 0 4px 9px 4px;
                width: 110px;
                height: 140px;
                text-decoration: none;
            }
        </style>

    </head>
    <body>
        <div class="wrapper">
            <h1>Подписи к изоборажениям на jQuery</h1>

            <a href="#" class="image-container">
                <img src="img.png" alt="">
                <div class="top">10.11.2012</div>
                <div class="bottom">Название нашего изображения</div>
            </a>

        </div>

    </body>
</html>
```

Теперь добавим стили для подписей и спозиционируем их:

```css
.top, .bottom {
    background: url(caption-bg.png);
    color: #FFF;
    font-size: 11px;
    font-family: Arial;
}

.top {
    position: absolute;
    top: -20px;
    width: 110px;
    height: 20px;
    text-align: center;
    line-height: 20px;
}

.bottom {
    position: absolute;
    bottom: -40px;
    overflow: hidden;
    padding: 6px 9px;
    max-height: 40px;
    width: 92px;
}
```

Все готово для написания скрипта двигающего наши подсказки.

Приступим:

```js
$(function () {
    /**
     * Функция при наведении на картинку
     */
    $('.image-container').on('mouseover',function(){
        // Закешируем нужные нам елементы
        var self = $(this);
        var top = self.children('.top');
        var bottom = self.children('.bottom');

        top.animate({
            top: 0
        }, 300);
        bottom.animate({
            bottom: 0
        }, 300);
    });

    /**
     * Прячем подписи
     */
    $('.image-container').on('mouseleave',function(){
        // Закешируем нужные нам елементы
        var self = $(this);
        var top = self.children('.top');
        var bottom = self.children('.bottom');

        top.animate({
            top: -20
        }, 300);
        bottom.animate({
            bottom: -40
        }, 300);
    });
});
```

[JsFiddle](http://jsfiddle.net/FTZUb/)

Если мы оставим код таким, то, возможно вы заметили, если много раз навести и отвести курсор на картинку то получим долгоиграющую анимацию - это не хорошо. Исправим. Добавив вызов метода stop() перед animate().

[JsFiddle](http://jsfiddle.net/W96SM/)

Теперь все работает как надо.

## Метод на CSS3 Transitions

Так же создадим простую структуру для теста.

Добавим стилей из прошлой части урока, немного дополнив их нужными нам для анимации.

```html
<!doctype html>
<html>
    <head>
        <title>Подписи к изоборажениям на CSS3 Transitions</title>

        <style type="text/css">
            .wrapper {
                margin: 0 auto;
                width: 960px;
            }

            .image-tr-container {
                position: relative;
                display: inline-block;
                overflow: hidden;
                margin: 0 4px 9px 4px;
                width: 110px;
                height: 140px;
                text-decoration: none;
            }

            .image-tr-container:hover .top {
                top: 0;
            }
            .image-tr-container:hover .bottom {
                bottom: 0;
            }
            .image-tr-container .top, .image-tr-container .bottom {
                -webkit-transition-property: top, bottom;
                -webkit-transition-duration: 0.3s;
            }

            .top, .bottom {
                background: url(caption-bg.png);
                color: #FFF;
                font-size: 11px;
                font-family: Arial;
            }

            .top {
                position: absolute;
                top: -20px;
                width: 110px;
                height: 20px;
                text-align: center;
                line-height: 20px;
            }

            .bottom {
                position: absolute;
                bottom: -40px;
                overflow: hidden;
                padding: 6px 9px;
                max-height: 40px;
                width: 92px;
            }
        </style>

    </head>
    <body>
        <div class="wrapper">

            <h1>Подписи к изображениям на CSS3 Transitions</h1>
            <a href="#" class="image-tr-container">
                <img src="img.png" alt="">
                <div class="top">10.11.2012</div>
                <div class="bottom">Название нашего изображения</div>
            </a>

        </div>

    </body>
</html>
```

[JsFiddle](http://jsfiddle.net/sX4X9/)

Все готово. На CSS3 получилось заметно меньше кода :)

Еще можно убрать overflow:hidden и посмотреть как все движется на самом деле:

[JsFiddle](http://jsfiddle.net/SzcYt/)
