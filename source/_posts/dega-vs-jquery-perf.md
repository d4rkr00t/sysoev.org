title: "Dega vs jQuery — замер производительности"
type: "simple"
date: 2015-02-28 19:30
description: "Простой замер скорости делегации событий Dega против jQuery"
tags:
- javascript
- dega
img: /dega-event-delegation/delegate.png
---

> [Тест на jsperf](http://jsperf.com/dega-vs-jquery-v2)

JSPerf имеет дурацкую привычку удалять тесты, так что я не знаю, как долго ссылка выше будет рабочей, поэтому добавлю пару скриншотов:

<section class="img">
    <a class="lightbox-target" href="{% asset_path 'chrome.png' %}" data-size="970x371">
        <img src="{% asset_path 'chrome.png' %}">
    </a>
</section>

<section class="img">
    <a class="lightbox-target" href="{% asset_path 'firefox.png' %}" data-size="970x365">
        <img src="{% asset_path 'firefox.png' %}">
    </a>
</section>

<section class="img">
    <a class="lightbox-target" href="{% asset_path 'opera.png' %}" data-size="974x370">
        <img src="{% asset_path 'opera.png' %}">
    </a>
</section>

<section class="img">
    <a class="lightbox-target" href="{% asset_path 'safari.png' %}" data-size="972x372">
        <img src="{% asset_path 'safari.png' %}">
    </a>
</section>

Все это есть и в репозитории библиотеки на [GitHub](https://github.com/d4rkr00t/Dega/tree/master/tests/perf).
