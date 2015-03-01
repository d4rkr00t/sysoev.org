title: "Позиционируем фиксированный блок с ограничением по ширине"
type: "simple"
date: 2013-07-01 10:20
tags:
- html
- css
---

**Задача:** Сделать фиксированно спозиционированному блоку возможность двигаться по ширине в пределах заданных нами величин.

## Решение

Для решения такой задачи нам потребуется всего лишь обернуть наш фиксированный блок в два других один с **position: relative**, второй **absolute** и позиционировать именно слой с **position: absolute**.

### HTML наших блоков

```html
<div class="fixed_with_limit__container">
    <div class="fixed_with_limit__container2">
        <div class="fixed_with_limit__fixed_block">
            I`m fixed block!
        </div>
    </div>
</div>
```

### CSS для блоков

CSS для наших блоков будет предельно простым:

```css
.fixed_with_limit__container {
    position: relative;
    max-width: 1000px;
    min-width: 300px;
}
.fixed_with_limit__container2 {
    position: absolute;
    right: 156px;
}
.fixed_with_limit__fixed_block {
    background: #5dd09d;
    padding: 10px 20px;
    position: fixed;
    color: #fff;
}
```

Первый блок **fixed_with_limit__container** как раз и работает нашим ограничителем — допустимая ширина 1000px, минимальная 300px.

Второй блок с классом **fixed_with_limit__container2** — служит для позиционирования нашего третьего блока относительно первого.

<p class="-notice">
<b>Важно:</b> не позиционировать блок с <b>fixed</b>, а то его позиционирование пересилит два предидущих.
</p>

> В итоге получим: [пример работы](/examples/fixed_with_limit/index.html)
