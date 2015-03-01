title: "ProjectsList - Плагин для Sublime Text 3"
type: "simple"
date: 2013-01-30 11:00
description: "ProjectsList - Простой плагин проектов для Sublime Text 2"
tags:
- sublime
img: /sublime-text-3-plugin-projects-list/projects_list_intro.jpg
---

> Плагин для Sublime Text 3 - ProjectsList ([github](https://github.com/d4rkr00t/ProjectsList))

После просмотра хорошего курса по Sublime Text 2 от Nettuts возникла необходимость в создании плагина, который мог бы быстро открыть предустановленный набор папок и файлов в редакторе и избавил бы меня от работы с, не очень удобным на мой взгляд, встроенным механизмом проектов.

Раньше мой рабочий процесс выглядел так: в sublime были загружены все часто используемые проекты и работа велась простым сворачиванием/разворачиванием списка файлов в конкретной папке, но это лишало следующих преимуществ работы с sublime:

- Быстрое открытие файлов в проекте (cmd+P/ctrl+P)
- Автодополнения имен файлов в css/html и т.д. (плагин AutoFileName)
- Быстрое создание файлов (плагин AdvancedNewFile)

Поиск готовых плагинов не дал результата, и тогда я решил попробовать себя в создании расширений для Sublime Text 3. Результат получен, код закомичен, что в итоге:

## Что умеет ProjectsList

- Открывать предустановленные в настройках плагина проект
- Проекты разделены по ОС
- Открывать стартовый набор файлов в каждом проекте
- Присоединять проект к уже открытому

## Установка

Установка плагина заключается в клонировании репозитория в папку Packages.

```
git clone https://github.com/d4rkr00t/ProjectsList.git ProjectsList
```

Чуть позже будет возможность установить через Package Control

## Настройка

Тут все очень просто, жмем cmd+shift+p (ctrl+shift+p) пишем Manage Projects и открываем настройки проектов. Формат для записи проектов такой:
```json
{
     "projects_windows": [
         {
            "name":"Project Name",
            "paths": ["folder append", "second folder append", ...],
            "open_on_start": ["file opened on start", "second file append on start", ...]
         },
         {
            "name":"Project Name 2",
            "paths": ["folder append", "second folder append", ...],
            "open_on_start": ["file opened on start", "second file append on start", ...]
         }
    ],
     "projects_linux": [
         {
            "name":"Project Name",
            "paths": ["folder append", "second folder append", ...],
            "open_on_start": ["file opened on start", "second file append on start", ...]
         }
     ],
     "projects_osx": [
         {
            "name":"Project Name",
            "paths": ["folder append", "second folder append", ...],
            "open_on_start": ["file opened on start", "second file append on start", ...]
         }
     ]
}
```

- name - название проекта
- paths - массив со списком директорий проекта
- open_on_start - массив с файлами открывающимися на старте проекта

## Использование

Так же с помощью cmd+shift+p (ctrl+shift+p) вызываем команду Open Project - для открытия проекта или Append Project для присоединения проекта к текущему.

Буду очень признателен за фидбек, особенно от пользователей Linux так как там не тестировалось.

> Еще раз [github](https://github.com/d4rkr00t/ProjectsList)
