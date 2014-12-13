var _matchElem = function(el, cls) {
    return el.classList && el.classList.contains(cls.replace(/^\./, ''));
};

/**
 * Add delegate event listener
 * @param  {Element}  elem
 * @param  {String}   cls        class name
 * @param  {String}   eventName  event name
 * @param  {Function} fn         callback
 * @return {undefined}
 */
module.exports = function(elem, cls, eventName, fn) {
    elem.addEventListener(eventName, function(e) {
        var el = e.target;

        while (true) {
            if (_matchElem(el, cls)) {
                fn.call(el, e);
                break;
            } else {
                el = el.parentNode;
            }

            if (!el) { break; }
        }
    }, false);
};
