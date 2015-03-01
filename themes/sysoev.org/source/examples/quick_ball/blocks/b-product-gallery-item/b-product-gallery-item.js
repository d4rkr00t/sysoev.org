'use strict';

var bProductGalleryItem;
bProductGalleryItem = function() {
    $('.b-product-gallery-item').fancybox({
        autoCenter: false,
        helpers: {
            overlay: {
                fixed: false,
                locked: false
            }
        }
    });
};

$(function () {
    bProductGalleryItem();
});