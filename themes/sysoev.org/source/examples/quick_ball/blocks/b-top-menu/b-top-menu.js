'use strict';

var bTopMenu;
bTopMenu = function() {
    var positions = [],
        menu = $('.b-top-menu ul.watch'),
        eFullWidthCont = $('.b-top-menu .e-full-width-cont'),
        bCountrySwitcher = $('.b-country-switcher');

    var calcPositions;
    calcPositions = function() {
        var items = menu.find('a');
        $.each(items, function (index) {
            var href = $(items[index]).attr('href'),
                offset = $(href).offset().top;
            offset = offset > 0 ? offset - 120 : offset;
            positions.push([href, offset]);
        });
    };

    calcPositions();

    if (window.location.hash) {
        var menuByHash = menu.find('a[href="'+window.location.hash+'"]');
        if (menuByHash) {
            menu.find('a').removeClass('m-active');
            menuByHash.addClass('m-active');
        }
        if ($(window).scrollTop() > 200) {
            eFullWidthCont.addClass('m-no-top');
            bCountrySwitcher.addClass('m-menu-no-top');
            $(window).scrollTop($(window).scrollTop() - 110);
        }
    }

    $(window).on('resize', function () {
        calcPositions();
    });

    $(window).on('scroll', function () {
        var currentMenu = "#home",
            top = $(window).scrollTop();
        for (var i = 0, max = positions.length; i < max; i++) {
            if (top >= positions[i][1]) {
                currentMenu = positions[i][0];
            }
        }

        var active = menu.find('a[href="'+currentMenu+'"]');

        if (!active.hasClass('m-active')) {
            menu.find('a').removeClass('m-active');
            active.addClass('m-active');
        }

        if (top > 200) {
            eFullWidthCont.addClass('m-no-top');
            bCountrySwitcher.addClass('m-menu-no-top');
        } else {
            eFullWidthCont.removeClass('m-no-top');
            bCountrySwitcher.removeClass('m-menu-no-top');
        }
    });

    $(document).on('click', '.b-top-menu ul.watch a', function(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        var pos,
            toScroll = $(this).attr('href');
        for (var i = 0, max = positions.length; i < max; i++) {
            if (toScroll === positions[i][0]) {
                pos = positions[i][1];
            }
        }
        pos = pos > 0 ? pos + 10 : 0;
        $('html, body').animate({scrollTop: pos}, 600, function () {
            window.location.hash = toScroll;
        });
    });
};

$(function () {
    bTopMenu();
});
