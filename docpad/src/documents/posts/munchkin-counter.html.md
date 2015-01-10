---
title: "Счетчик для игры Манчкин"
layout: "post"
date: 2013-06-25 17:50
description: "Простенький счетчик для игры Манчкин"
type: "simple"
tags: javascript, разное
img: /img/blog/2013-06-25_munchkin-counter/munchkin.jpg
---

Всем кто играет в Манчкин знаком подсчет уровней и силы в битвах, кто как решает эту проблему, кто записывает, кто использует дополнительные фишки. Теперь можно воспользоваться мои простым счетчиком.

> [Ссылка на github.](https://github.com/d4rkr00t/MunchkinCounter)

## Как выглядит

![Munchkin Counter](https://raw.github.com/d4rkr00t/MunchkinCounter/master/screenshot.png)

## Что умеет

- Увеличивать / Уменьшать уровень Манчкина
- Считать битвы
- Неограниченное количетсво игроков
- Приложение в одной html странице, должно работать везде

## Использование

Просто запустить файл munchkin.html в нормальном браузере

## Предустановки

Вы можете сохранить имена игроков для быстрого их добавления. Для этого в файле munchkin.html найходим:

```html
<div class="e-presets">
    <a href="#" ng-click="addMunchkin('You')">You</a>
    <a href="#" ng-click="addMunchkin('Can')">Can</a>
    <a href="#" ng-click="addMunchkin('Add')">Add</a>
    <a href="#" ng-click="addMunchkin('Own')">Own</a>
    <a href="#" ng-click="addMunchkin('Players')">Players</a>
    <a href="#" ng-click="addMunchkin('Presets')">Presets</a>
</div>
```

И меняем или добавляем персеты.

> [Еще раз ссылка на github.](https://github.com/d4rkr00t/MunchkinCounter)
