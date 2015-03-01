title: "Интересный вопрос по CSS"
type: "simple"
date: 2012-07-14 08:24
description: "Вопрос по css"
tags:
- css
---

Сколько слов будет выделенно красным после обработки браузером следющего кода:

```html
<!doctype html>
<html>
    <head>
        <title>Вопрос по  CSS</title>
        <style type="text/css">
            ​B:first-child {
                color: red;
            }​
        </style>
    </head>
    <body>
        <b>Donec quam</b><div>ultricies <b>nec</b>, pellentesue<b>eu</b>, pretium <p><b>quis</b></p>, sem.</div>​​​​​​​​​​​​​​​​​​​​​ Nulla consequat massa quis enim. Donec pede justo, fringilla<b>​vel</b>​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​, aliquet<span>nec, <b>​vulpitate</b>​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​ <b>eget</b>​​​​​​​​​​​​​​​​​​​​, <b>arcu</b>​​​​​​​​​​​​​​​​​​​</span>.<p><b>Lorem ipsum</b> dolor sit amet, <b>consectetuer</b> adipiscing<b>elit</b>​</p>​
    </body>
</html>
```

Ответ пишите в комментариях.

<p class="-notice">Самым ленивым ссылка на ответ:
    <a href="http://jsfiddle.net/TEhNN/">http://jsfiddle.net/TEhNN/</a>
</p>
