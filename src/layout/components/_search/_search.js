var Dega = require('dega'),

    $_searchPanel = document.querySelector('.search'),
    $_searchForm = document.querySelector('.search__form'),
    $_searchInput = document.querySelector('.search__input'),
    $_searchClose = document.querySelector('.search__close'),

    _close = function() {
        $_searchPanel.classList.remove('-active');
        $_searchInput.blur();
        $_searchInput.value = '';
    };

module.exports = function() {

    Dega(document).on('click', '.search-trigger', function(e) {
        e.preventDefault();

        $_searchPanel.classList.add('-active');
        $_searchInput.focus();
    });

    $_searchForm.addEventListener('submit', function(e) {
        $_searchInput.value = 'site:sysoev.org ' + $_searchInput.value;

        setTimeout(function() {
            _close();
        }, 50);
    });

    $_searchClose.addEventListener('click', function(e) {
        _close();
    });

    document.addEventListener('keydown', function(e) {
        if (e.keyCode === 27) {
            _close();
        }
    });

};
