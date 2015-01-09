require('../components/_search/_search.js')();

var PhotoSwipe = require('../components/_photoswipe/photoswipe.min.js'),
    PhotoSwipeUI_Default = require('../components/_photoswipe/photoswipe-ui-default.min.js'),
    delegateEvent = require('../components/_delegate-event/_delegate-event.js'),

    pswpElement = document.querySelector('.pswp'),

    openPhotoSwipe = function(e) {
        e.preventDefault();

        var item, size, gallery;

        size = this.getAttribute('data-size').split('x');

        items = [{
            src: this.href,
            w: size[0],
            h: size[1],
            title: this.getAttribute('data-desc')
        }];

        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, {});
        gallery.init();
    };

delegateEvent(document, '.lightbox-target', 'click', openPhotoSwipe);
