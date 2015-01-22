---
title: "Знакомимся с Meteor"
layout: "post"
date: 2014-03-30 16:00
description: "Простое реактивное веб приложение на meteor"
type: "simple"
tags: javascript, meteor
img: /img/blog/2014-03-30_meeting-meteor/meteor-chat.png
---

Уверен, что после того, как вы попробуете Meteor возвращаться на привычные инструменты разработки будет очень тяжело! Это наверно самый большой побочный эффект от знакомства с этим замечательным фреймворком.

**Meteor** — платформа для создания веб-приложений на javascript как сервера так и клиента. Которая умеет реактивность, общий код на сервере и на клиенте, автоматическое обновление данных на странице и многое другое. Подробнее на официальном сайте [Meteor](https://www.meteor.com/).

Сегодня же, мы напишем простое приложение, скажем так "Hello World" — это будет realtime чат с простой авторизацией по логину и паролю, а также задеплоим все это дело, на сервер, который предоставляет meteor.

Сразу код приложения на [GitHub](https://github.com/d4rkr00t/helloWorldMeteorChat).

## Установка Meteor

Первым делом мы установим meteor и создадим наше приложение (сразу оговорюсь, как это делается на windows не имею ни малейшего понятий):

```
// Скачивает и устанавливает meteor
$ curl https://install.meteor.com | /bin/sh

// Создаем приложение
meteor create helloWorldMeteorChat
```

Для запуска приложения в консоле вызываем:

```
meteor
```

Да это все, что нужно для запуска простейшего приложения.

---------------------------

## Структура проекта

При создании проекты мы получаем в распоряжение следующие 3 файла

- helloWorldMeteorChat.css — стили проекта- helloWorldMeteorChat.html — наш шаблон- helloWorldMeteorChat.js — код нашего проекта
### Давайте организуем все получше.
Для начала создадим необходимые директории. В корне проекта постройте следующую структуру:
- client (код доступный только на клиенте, автоматически подключается метеором)
	- css
	- views
- models (код доступный и на клиенте и на сервере, тут будет наша модель для хранения сообщений)

### Больше структурыПереименуйте helloWorldMeteorChat.html в index.html. В папке client создайте файл chat-client.js (пока пустой).

Файл helloWorldMeteorChat.css переименовываем в chat.css и перемещаем в папку client/css.

Мы почти закончили со структурой. Осталось скачать и положить в папку client/css Twitter Bootstrap, а именно bootstrap.min.css.

Meteor сам поймет, как подключить эти файлы, так что нам ничего делать не нужно.

### Немного разметки

Просто приведу код .html файлов, с примерной разметкой для нашего чата:

index.html

```html
<head>
  <title>Awesome Meteor Realtime Chat!</title>
</head>

<body>
  {{> page }}
</body>
```

clients/views/page.html

```html
<template name="page">
  <div class="container">
    <div class="page-header row">
      <div class="col-md-7"><h2 class="text-muted">Awesome Meteor Realtime Chat!</h2></div>
      <div class="col-md-5 login-buttons-container"></div>
    </div>
  </div>
  <div class="container">
    {{> hello}}
  </div>
</template>
```

client/views/hello.html

```html
<template name="hello">
  <div class="jumbotron">
    <h1>Hello In Our Awesome Chat App!</h1>
    <p class="lead">Что бы пользоваться чатом авторизуйтесь нажав на кнопку sign in в верхнем правом углу.</p>
  </div>
</template>
```

### Авторизация

Пора подключить модули необходимые для авторизации. Для этого в терминале скомандуем следующее:

```
meteor add accounts-ui
meteor add accounts-password
```

А также удалим пакет, который позволяет делать что угодно с базой без прав доступа:

```
meteor remove insecure
```

Модуль accounts-ui создает для нас форму регистрации, авторизации и восстановления пароля. Добавим необходимый для него код в наш index.html

```html
<div class="col-md-5 login-buttons-container">{{> loginButtons }}</div>
```

А в chat.css добавим немного стилей для нашей кнопки:
```css
.login-buttons-container {
  margin-top: 26px;
  text-align: right;
}
```

Теперь у нас есть форма авторизации и регистрации, а также побочные действия — типа восстановить пароль.

<section class="img">
    <a class="lightbox-target" href="/img/blog/2014-03-30_meeting-meteor/meteor-welcome-page.png" data-size="1014x479" data-desc="Страница приветствия">
        <img src="/img/blog/2014-03-30_meeting-meteor/meteor-welcome-page.png" alt="Страница приветствия">
    </a>
</section>

### Состояние, после авторизации

В этом состоянии нам надо вывести список сообщений + форму для добавления нового сообщения. Подправим наши файлы:

page.html

```html
<template name="page">
  <div class="container">
    <div class="page-header row">
      <div class="col-md-7"><h2 class="text-muted">Awesome Meteor Realtime Chat!</h2></div>
      <div class="col-md-5 login-buttons-container">{{> loginButtons }}</div>
    </div>
  </div>
  <div class="container">
    {{#if isLoggedIn }}
      {{> chat}}
    {{else}}
      {{> hello}}
    {{/if}}
  </div>
</template>
```

Для проверки авторизован пользователь или нет создадим helper в файле chat-client.js

```html
Template.page.isLoggedIn = function () {
  return !!Meteor.user();
};
```

Еще мы создадим два шаблона: первый для самого чата, а второй для отдельного сообщения

clients/view/chat.html

```html
<template name="chat">
  <div class="messages-container">
    {{#each messages}}
      {{> message }}
    {{else}}
      <div class="well">Пока нет сообщений! Напишите сообщение в форме внизу!</div>
    {{/each}}
  </div>

  <div class="input-group">
        <input type="text" class="form-control message-text-field">
        <span class="input-group-btn">
          <button class="btn btn-default send-message" type="button">Отправить!</button>
        </span>
      </div><!-- /input-group -->
</template>
```

clients/view/message.html

```html
<template name="message">
  <div class="panel panel-default">
    <div class="panel-heading">{{ username }} <a href="{{_id}}" class="delete-message">Удалить</a></div>
    <div class="panel-body">
      {{ message }}
    </div>
    <i class="glyphicon glyphicon-trash"></i>
  </div>
</template>
```

И немного подправим наши стили:

client/css/chat.css

```css
@media (min-width: 1200px) {
  .container {
    width: 960px;
  }
}

.login-buttons-container {
  margin-top: 26px;
  text-align: right;
}

.delete-message {
  float: right;
}

.messages-container {
  max-height: 500px;
  overflow-y: auto;
  margin-bottom: 18px;
  border: 1px solid #eee;
  padding: 18px 18px 0;
}
```

Пока у нас нет ни одного сообщения мы видим заглушку:

<section class="img">
    <a class="lightbox-target" href="/img/blog/2014-03-30_meeting-meteor/meteor-empty-message-list.png" data-size="973x242" data-desc="Страница списка сообщений">
        <img src="/img/blog/2014-03-30_meeting-meteor/meteor-empty-message-list.png" alt="Страница списка сообщений">
    </a>
</section>

### Модель сообщений

Пришло время создать модель для сообщений, создадим файл messages.js в папке models и добавим в него:

```js
Messages = new Meteor.Collection('Messages');
```

Можете проверить, что пользователь пока не может создать запись в базе, так как не установлены права, для этого в консоле браузера напишите:

```js
Messages.insert({username: 'test@test.ru', message: 'Test'});
```

Получим в ответ:

```
insert failed: Access denied
```

Давайте добавим права в model/messages.js:

```js
Messages.allow({
  // Разрешаем доавлять сообщеиня только авторизованным пользователям
  insert: function (userId, message) {
    return userId && message.owner === userId;
  },
  // Разрешаем удалять сообщения, только если пользователь является его владельцом
  remove: function (userId, message) {
    console.log(userId, message.owner);
    if (message.owner !== userId) {
      return false;
    }
    return true;
  }
});
```

Теперь пользователь может добавлять и удалять, свои записи, пока что через консоль.

### Вывод сообщений

Добавим пару тестовых сообщений. Для этого нужно узнать **id** нашего пользователя, в консоли браузера выполним:

```js
Meteor.userId()
Messages.insert({username: 'your@mail.ru', message: 'Test', owner: 'z2gbvzHa7WBXuFzRC', timestamp: Date.now()});
Messages.insert({username: 'your@mail.ru', message: 'Test 2', owner: 'z2gbvzHa7WBXuFzRC', timestamp: Date.now()});
Messages.insert({username: 'your@mail.ru', message: 'Test 3', owner: 'z2gbvzHa7WBXuFzRC', timestamp: Date.now()});
```

Где owner = id который мы получили от Meteor.userId();.

Теперь перейдем непосредственно к выводу сообщений — это очень просто, добавим небольшой хелпер к нашему шаблону в файле client/chat-client.js:

```js
Template.chat.messages = function () {
  return Messages.find({},{
    sort: {
      timestamp: -1
    },
    limit: 50
  });
};
```

Сортируем сообщения от новых к старым и выводим 50 штук. И да, у нас сразу работает реактивность. Можно попробовать открыть второе окно браузера и через консоль подобавлять сообщений. Они будут сразу синхронизированы со всеми открытыми браузерами.

### Форма добавление сообщений

Выходим на финишную прямую. Добавление сообщений реализуется так же просто, как и все, что мы делали ранее, просто добавим еще один метод для нашего шаблона chat, в файл client/chat-client.js:

```js
// Метод нужен, что бы не дублировать код
var addMessage = function() {
  var message = $('.message-text-field');

  if (!message.val()) { // если поле сообщения пустое
    alert('Заполните поле сообщение!');
  } else {

	// Добавляем сообщение в базу
    Messages.insert({
      message: message.val(),
      username: Meteor.user().emails[0].address,
      timestamp: Date.now(),
      owner: Meteor.userId()
    });

    message.val('');
  }
};

// Обработчики событий клика и нажатия enter
Template.chat.events({
  // Формат записи обработчкиов событий 'тип_события селектор'
  // Добавляем сообщение по клику
  'click .send-message': function () {
    addMessage();
  },
  // Добавляем сообщение по нажатию enter
  'keydown .message-text-field': function (evt) {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      evt.stopPropagation();

      addMessage();
    }
  }
});
```

Как видно из кода выше, работа с базой на клиенте один в один повторяет работу на сервере, нам не нужно думать как отправить запрос и т.д., а мы просто используем API как у mongodb клиента.

### Удаление сообщений

Последнее чем мы сегодня займемся — это удаление сообщений. Как вы можете видеть сейчас кнопка удалить видна и на чужих сообщениях тоже, нам нужно это исправить и написать обработчики для клика по ней.

Приступим.

Для начала будем проверять является ли пользователь владельцем сообщения:

client/chat-client.js

```js
	Template.message.isOwner = function (data) {
	  return Meteor.userId() === data;
	};
```

И добавим эту проверку в шаблон message.html:

```html
<div class="panel-heading">{{ username }}
  {{#if isOwner owner}}
    <a href="#" data-id="{{_id}}" class="delete-message">Удалить</a>
  {{/if}}
</div>
```

И, наконец, обработчки клика по кнопке удалить (там же в client/chat-client.js):

```js
Template.message.events({
  'click .delete-message': function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    Messages.remove({_id: $(evt.target).data('id')});
  }
});
```

И вот, у нас готово	 удаление сообщений, которое так же мгновенно обновляется у всех пользоватлей.

### Deploy

Осталось задеплоить наше приложение, чтобы люди могли им пользоваться. В консоле выполним команду:

```
meteor deploy s7at1c-hello-world-chat.meteor.com
```

Где s7at1c-hello-world-chat.meteor.com — адрес по которому будет доступно ваше приложение.

> На этом все, надеюсь, было интересно!
