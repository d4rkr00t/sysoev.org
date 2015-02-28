---
title: "Dega vs jQuery — замер производительности"
layout: "post"
date: 2015-02-28 19:30
description: "Простой замер скорости делегации событий Dega против jQuery"
type: "simple"
tags: javascript, dega
img: /img/blog/2015-02-05_dega-event-delegation/delegate.png
---

> [Тест на jsperf](http://jsperf.com/dega-vs-jquery-v2)

JSPerf имеет дурацкую привычку удалять тесты, так что я не знаю, как долго ссылка выше будет рабочей, поэтому добавлю пару скриншотов:

<section class="img">
    <img src="/img/blog/2015-02-28_dega-vs-jquery-perf/chrome.png" alt="csscomb for atom">
</section>

<section class="img">
    <img src="/img/blog/2015-02-28_dega-vs-jquery-perf/firefox.png" alt="csscomb for atom">
</section>

<section class="img">
    <img src="/img/blog/2015-02-28_dega-vs-jquery-perf/opera.png" alt="csscomb for atom">
</section>

<section class="img">
    <img src="/img/blog/2015-02-28_dega-vs-jquery-perf/safari.png" alt="csscomb for atom">
</section>

Все это есть и в репозитории библиотеки на [GitHub](https://github.com/d4rkr00t/Dega/tree/master/tests/perf).
