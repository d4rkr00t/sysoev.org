'use strict';

var bHero;
bHero = function() {
    $(document).on('click', '.b-hero .b-button', function(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        var href = $(this).attr('href');

        $('html, body').animate({scrollTop: $(href).offset().top-100}, 600, function () {
            window.location.hash = href;
        });
    });

    $(document).on('click', '.b-hero .e-move-down', function(evt) {
        evt.preventDefault();
        evt.stopPropagation();

        var moveDistance = $('#moveDownTarget').offset().top - 100;

        $('html, body').animate({scrollTop: $(document).scrollTop() + moveDistance}, 300);
    });
};

$(function () {
    bHero();
});