title: "Изменения в моей GTD системе с Trello"
type: "simple"
date: 2013-05-13 18:45
tags:
- trello
- gtd
img: /trello-review/trello-main.jpg
---

С моего [предидущего поста про trello](/trello-review/) прошло чуть меньше года, за это время было сменено несколько сервисов по управлению задачами — **Wunderlist** и **Asana**. Но на них я просидел не долго и после 3 - 4х месяцев скитания снова вернулся к **trello**.

Начну пожалуй с грустного - клиент на телефоны так и не научился работать оффлайн :(

Командной работы в **trello** так воспользоваться и не довелось, да и от отдельных досок для каждого проекта пока отказался (по не надобности).

## Что нового?

На основную доску добавил еще один список: **"Scheduled / Repeated"** (Назначенные / Повторяющиеся) в нем, как понятно из названия, хранятся повторяющиеся задачи или задачи с четко установленным временем выполнения.

<section class="img">
    <a class="lightbox-target" href="{% asset_path 'scheduled-repeated.png' %}" data-size="294x271" data-desc="">
        <img src="{% asset_path 'scheduled-repeated.png' %}" alt="">
    </a>
</section>

Плюс они отсортированы по дате.

С помощью сервиса [Calendar for Trello](https://trellocalendar-francois2metz.dotcloud.com/) настроил выгрузку запланированных событий в Google Календарь и iCal.

---------------------------

## Статистика по задачам

Я большой любитель всяких там графиков и диаграмм и в один прекрасный момент я нашел скриптик для гугловских таблиц, который помогает мне строить вот такие вот графики по задачам в trello:

<section class="img">
    <a class="lightbox-target" href="{% asset_path 'stats.png' %}" data-size="1063x648" data-desc="Statistics for Trello tasks">
        <img src="{% asset_path 'stats.png' %}" alt="Statistics for Trello tasks">
    </a>
</section>

Организовать такую статистику для себя очень просто:

1) Создаем таблицу в гугло драйве

2) В Tools > Script Editor вставляем следующий код:

```js
function trelloFetch(url) {
  var key = "секретный ключ";
  var token = "токен";

  var completeUrl = "https://api.trello.com/1/" + url + "?key=" + key + "&token=" + token;

  var jsondata = UrlFetchApp.fetch(completeUrl);
  var object = Utilities.jsonParse(jsondata.getContentText());

  return object;
}

function getC52I18NMVC4BoardListCount(first) {
  var boardid = "id доски из которой будут браться задачи";
  var url_lists = "boards/" + boardid +"/lists";
  var trello_lists = trelloFetch(url_lists);

  var lists = [];
  var listnames = [];
  var listcounts = [];

  for (var i = 0; i < trello_lists.length; i++) {
    var listid = trello_lists[i].id;
    var url_cards = "lists/" + listid +"/cards";
    var trello_cards = trelloFetch(url_cards);
    var count = 0;

    for (var j = 0; j < trello_cards.length; j++) {
      count++;
    }

    listnames[i] = trello_lists[i].name;
    listcounts[i] = count;
  }

  if (first) {
    lists[0] = listnames;
    lists[1] = listcounts;
  }
  else {
    lists[0] = listcounts;
  }

  return lists;
}

function getC52I18NMVC4Values() {
  var data;
  var sheet = SpreadsheetApp.getActiveSheet();
  var counter = sheet.getRange(1, 9);
  var baserow = counter.getValue() + 4;
  var basecolumn = 2;

  sheet.getRange(baserow, basecolumn - 1).setValue(new Date());
  if (counter.getValue() == 0) {
    data = getC52I18NMVC4BoardListCount(true);
    sheet.getRange(baserow - 1, basecolumn, 2, 4).setValues(data);
  }
  else {
    data = getC52I18NMVC4BoardListCount(false);
    sheet.getRange(baserow, basecolumn, 1, 4).setValues(data);
  }

  counter.setValue(counter.getValue()+1);
}
```

3) И устанавливаем таймер для выполнения скрипта (у меня раз в 8 часов), для этого в редакторе скриптов идем в управление триггерами {% asset_img 'trigger.png' %} и добавляем новый:

<section class="img">
    <a class="lightbox-target" href="{% asset_path 'trigger_2.png' %}" data-size="796x121" data-desc="Trigger for Trello task">
        <img src="{% asset_path 'trigger_2.png' %}" alt="Trigger for Trello task">
    </a>
</section>

4) Строим график по полученным из скрипта данным средствами гугло докс.

5) Теперь нам осталось получить ключи для нашего скрипта. Идем на [генератор ключей](https://trello.com/1/appKey/generate) и копируем полученный ключ и токен в соответствующие переменные скрипта.

---------------------------

## Заключение

Подитожим: trello так и остался для меня самым удобным менеджером задач + он постоянно развивается и появляются новые фичи, такие как прикрепление к задаче файлов из Dropbox и Google Docs. Жаль IOS клиент не умеет нормально работать оффлайн, но я думаю это дело времени, пока его заменяет Clear и родные Reminders.

На этом у меня все, хотелось бы услышать ваши варианты организации GTD.
