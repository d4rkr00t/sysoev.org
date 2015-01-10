---
title: "Настройки Sublime Text 3"
layout: "post"
date: 2013-05-14 17:32
description: "Мои настройки sublime text 3"
type: "simple"
tags: sublime
---

## Основные настройки

Жирные названия папок:

    "bold_folder_labels": true

Стиль мигания каретки, плавный:

    "caret_style": "phase"

Не закрывать sublime когда нет открытых файлов:

    "close_windows_when_empty": false

Не создавать новое окно при запуске sublime:

    "create_window_at_startup": false

Всегда показывать кнопки свернуть блок кода (иначе появляются при наведении):

    "fade_fold_buttons": false

Паттерны для исключения папок из проекта:

    "folder_exclude_patterns":
    [
        ".svn",
        ".git"
    ]

Сглаживание шрифтов:

    "font_options":
    [
        "subpixel_antialias"
    ]

Размер шрифта:

    "font_size": 13.0

Подсвечивать текущую строку:

    "highlight_line": true

Подсвечивать измененные табы:

    "highlight_modified_tabs": true

Отступы от строки сверху и снизу:

    "line_padding_bottom": 4,
    "line_padding_top": 4

Не открывать файлы в новых окнах (удобно когда надо добавить файл или папку в текущий проект иначе создается новое коно с файлом):

    "open_files_in_new_window": false

Разрешать прокрутку ниже конца файла:

    "scroll_past_end": true

Убирать отступ по shift+tab:

    "shift_tab_unindent": true

Переводит табы в пробелы:

    "translate_tabs_to_spaces": true

Обрезать пробелы и табы на концах строк

    "trim_trailing_white_space_on_save": true


#### Весь конфиг целиком

    {
        "bold_folder_labels": true,
        "caret_style": "phase",
        "close_windows_when_empty": false,
        "color_scheme": "Packages/Tomorrow Color Schemes/Tomorrow-Night-Eighties.tmTheme",
        "create_window_at_startup": false,
        "fade_fold_buttons": false,
        "flatland_square_tabs": true,
        "folder_exclude_patterns":
        [
            ".svn",
            ".git"
        ],
        "font_options":
        [
            "subpixel_antialias"
        ],
        "font_size": 13.0,
        "highlight_line": true,
        "highlight_modified_tabs": true,
        "ignored_packages":
        [
            "Vintage"
        ],
        "line_padding_bottom": 4,
        "line_padding_top": 4,
        "open_files_in_new_window": false,
        "scroll_past_end": true,
        "shift_tab_unindent": true,
        "suppress_explicit_completions": true,
        "suppress_word_completions": true,
        "theme": "Flatland Dark.sublime-theme",
        "translate_tabs_to_spaces": true,
        "trim_trailing_white_space_on_save": true,
        "word_wrap": true
    }

## Пользовательские шорткаты (keymap)

Развенуть выделение до scope:

    { "keys": ["super+shift+|"], "command": "expand_selection", "args": {"to": "scope"} }

Переформатировать выделенный фрагмент:

    { "keys": ["super+shift+r"], "command": "reindent" }

Обновить список файлов и директорий в sidebar:

    { "keys": ["super+alt+shift+r"], "command": "refresh_folder_list" }

Открыть директорию с текущим файлом:

    { "keys": ["super+shift+o"], "command": "open_dir", "args": {"dir": "$file_path", "file": "$file_name"} },

Закладки (Bookmarks):

    { "keys": ["super+b"], "command": "toggle_bookmark" }, // Поставить / Убрать закладку
    { "keys": ["super+alt+b"], "command": "next_bookmark" }, // Перейти к следуйщей закладки
    { "keys": ["super+ctrl+b"], "command": "prev_bookmark" }, // Перейти к предидущей закладке
    { "keys": ["alt+ctrl+b"], "command": "clear_bookmarks" } // Очистить все закладки в файле

Фикс вставки:

    { "keys": ["super+v"], "command": "paste_and_indent" }, // Теперь cmd+v вставляет текст с форматирование
    { "keys": ["super+shift+v"], "command": "paste" }, // А cmd+shift+v без

#### Конфиг целиком
    [
        { "keys": ["super+shift+|"], "command": "expand_selection", "args": {"to": "scope"} },
        { "keys": ["super+shift+r"], "command": "reindent" },
        { "keys": ["super+alt+shift+r"], "command": "refresh_folder_list" },

        // Open folder in finder
        { "keys": ["super+shift+o"], "command": "open_dir", "args": {"dir": "$file_path", "file": "$file_name"} },

        // Bookmarks
        { "keys": ["super+b"], "command": "toggle_bookmark" },
        { "keys": ["super+alt+b"], "command": "next_bookmark" },
        { "keys": ["super+ctrl+b"], "command": "prev_bookmark" },
        { "keys": ["super+alt+ctrl+b"], "command": "clear_bookmarks" },

        // Pasting
        { "keys": ["super+v"], "command": "paste_and_indent" },
        { "keys": ["super+shift+v"], "command": "paste" },
    ]
