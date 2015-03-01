title: "Firefox и position: relative на ячейки таблицы"
type: "simple"
date: 2014-02-18 12:20
tags:
- css
- html
- firefox
img: /firefox-position-relative-td/firefox.png
---

Случайно, сегодня столкнулся с такой проблемкой. Нужно было повесить изображение со статусом поверх картники в таблице, сделал position: relative для ячейки, для картинки position: absolute в хроме и старой опере все работало отлично, но когда я открыл страницу в firefox, то увидел что моя картинка далеко за границей ячейки.

Странно, но, что ж поделаешь, добавил дополниьтельную обертку в виде дива с position: relative и все стало работать, как и должно.

В общем избегайте position: relative на ячейке таблицы.

[JSFiddle с примером](http://jsfiddle.net/2phd5/3/)

А вот результат в картинках для chrome и firefox соответсвтенно:

<section class="img">
    <div class="img__img-cont">
        <a class="lightbox-target" href="{% asset_path 'chrome.png' %}" data-size="570x115" data-desc="Chrome position:relative on td">
            <img src="{% asset_path 'chrome.png' %}" alt="Chrome position:relative on td">
        </a>
    </div>
    <div class="img__desc">
        Chrome position:relative on td
    </div>
</section>

<section class="img">
    <div class="img__img-cont">
        <a class="lightbox-target" href="{% asset_path 'firefox.png' %}" data-size="570x115" data-desc="Firefox position:relative on td">
            <img src="{% asset_path 'firefox.png' %}" alt="Firefox position:relative on td">
        </a>
    </div>
    <div class="img__desc">
        Firefox position:relative on td
    </div>
</section>
