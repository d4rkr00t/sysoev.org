(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @author Stanislav Sysoev <@d4rkr00t>
 * @license MIT
 * @version 0.1.0
 *
 * @description
 * Event delegation library on plain JavaScript
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Dega = factory();
    }
})(this, function() {
    var _instances = [];

    /**
     * Check if elem matches to selector
     * @private
     * @param {Object} el
     * @param {String} selector — .class | #id | div
     * @return {Boolean|Undefined}
     */
    function _matchElem(el, selector) {
        if (selector.match(/^\./)) {
            return el.classList && el.classList.contains(selector.replace(/^\./, ''));
        } else if (selector.match(/^#/)) {
            return el.id === selector.replace(/^#/, '');
        } else {
            return el.tagName === selector.toUpperCase();
        }
    }

    /**
     * Search for generated event listener by original
     * @private
     * @param {Array} eventListeners — list of event listeners
     * @param {String} type — event type like 'click' | 'focus' | 'blur'
     * @param {String} selector — .class | #id | div
     * @param {Function} callback — user passed callback
     * @param {Boolean} useCapture
     * @return {Object|Boolean}
     */
    function _findEventListener(eventListeners, type, selector, callback, useCapture) {
        for (var i = 0; i < eventListeners.length; i++) {
            if (eventListeners[i].original === callback &&
                eventListeners[i].useCapture === useCapture &&
                eventListeners[i].type === type &&
                eventListeners[i].selector === selector) {
                return eventListeners[i];
            }
        }

        return false;
    }

    /**
     * Generates useCapture for event listeners, if blur or focus we should always use useCapture
     * @private
     * @param {String} type — event type like 'click' | 'focus' | 'blur'
     * @param {Boolean} useCapture — user defined useCapture
     * @return {Boolean}
     */
    function _generateUseCapture(type, useCapture) {
        return type === 'blur' || type === 'focus' || useCapture;
    }

    /**
     * Generates eventListener item for Dega._eventListeners list
     * @param {String} type — event type like 'click' | 'focus' | 'blur'
     * @param {String} selector — .class | #id | div
     * @param {Function} callback — user passed callback
     * @param {Boolean} useCapture
     */
    function _generateEventListener(type, selector, callback, useCapture) {
        return {
            type: type,
            selector: selector,
            useCapture: _generateUseCapture(type, useCapture),

            original: callback,
            generated: function(e) {
                var el = e.target;

                while (el) {
                    if (_matchElem(el, selector)) {
                        callback.call(el, e);
                        break;
                    } else {
                        el = el.parentNode;
                    }
                }
            }
        };
    }
    /**
     * Creates a new Dega Instance
     * @class
     * @param {DomElem|String} elem — dom elem or selector for document.querySelector
     */
    var Dega = function(elem) {
        if (typeof elem === 'string') {
            elem = document.querySelector(elem);
        }

        if (!(this instanceof Dega)) {
            for (var i = 0; i < _instances.length; i++) {
                if (_instances[i].elem === elem) {
                    return _instances[i];
                }
            }

            var dega = new Dega(elem);
            _instances.push(dega);
            return dega;
        }

        this.elem = elem;
        this._eventListeners = [];
    };

    /**
     * Subscribe on event
     * @param {String} type — event type like 'click' | 'focus' | 'blur'
     * @param {String} selector — .class | #id | div
     * @param {Function} callback — user passed callback
     * @param {Boolean} [useCapture]
     * @return {Dega} this
     */
    Dega.prototype.on = function(type, selector, callback, useCapture) {
        var eventListener = _generateEventListener(type, selector, callback, useCapture);

        this._eventListeners.push(eventListener);
        this.elem.addEventListener(type, eventListener.generated, eventListener.useCapture);

        return this;
    };

    /**
     * Unsubscribe from event
     * @param {String} type — event type like 'click' | 'focus' | 'blur'
     * @param {String} selector — .class | #id | div
     * @param {Function} callback — user passed callback
     * @param  {Boolean} [useCapture]
     * @return {Dega} this
     */
    Dega.prototype.off = function(type, selector, callback, useCapture) {
        useCapture = _generateUseCapture(type, useCapture);

        var eventListener = _findEventListener(this._eventListeners, type, selector, callback, useCapture);

        if (eventListener) {
            this.elem.removeEventListener(type, eventListener.generated, eventListener.useCapture);

            this._eventListeners.splice(this._eventListeners.indexOf(eventListener), 1);
        }

        return this;
    };

    return Dega;
});

},{}],2:[function(require,module,exports){
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

},{"dega":1}],3:[function(require,module,exports){
require('../components/_search/_search.js')();

},{"../components/_search/_search.js":2}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zeXNvZXYvRGV2ZWxvcG1lbnQvSmF2YVNjcmlwdC9zeXNvZXYub3JnL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9zeXNvZXYvRGV2ZWxvcG1lbnQvSmF2YVNjcmlwdC9zeXNvZXYub3JnL25vZGVfbW9kdWxlcy9kZWdhL2RlZ2EuanMiLCIvVXNlcnMvc3lzb2V2L0RldmVsb3BtZW50L0phdmFTY3JpcHQvc3lzb2V2Lm9yZy9zcmMvbGF5b3V0L2NvbXBvbmVudHMvX3NlYXJjaC9fc2VhcmNoLmpzIiwiL1VzZXJzL3N5c29ldi9EZXZlbG9wbWVudC9KYXZhU2NyaXB0L3N5c29ldi5vcmcvc3JjL2xheW91dC9qcy9mYWtlX2MwZDAwYmJkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQGF1dGhvciBTdGFuaXNsYXYgU3lzb2V2IDxAZDRya3IwMHQ+XG4gKiBAbGljZW5zZSBNSVRcbiAqIEB2ZXJzaW9uIDAuMS4wXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBFdmVudCBkZWxlZ2F0aW9uIGxpYnJhcnkgb24gcGxhaW4gSmF2YVNjcmlwdFxuICovXG5cbihmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdC5EZWdhID0gZmFjdG9yeSgpO1xuICAgIH1cbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBfaW5zdGFuY2VzID0gW107XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBlbGVtIG1hdGNoZXMgdG8gc2VsZWN0b3JcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciDigJQgLmNsYXNzIHwgI2lkIHwgZGl2XG4gICAgICogQHJldHVybiB7Qm9vbGVhbnxVbmRlZmluZWR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gX21hdGNoRWxlbShlbCwgc2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKHNlbGVjdG9yLm1hdGNoKC9eXFwuLykpIHtcbiAgICAgICAgICAgIHJldHVybiBlbC5jbGFzc0xpc3QgJiYgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKHNlbGVjdG9yLnJlcGxhY2UoL15cXC4vLCAnJykpO1xuICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdG9yLm1hdGNoKC9eIy8pKSB7XG4gICAgICAgICAgICByZXR1cm4gZWwuaWQgPT09IHNlbGVjdG9yLnJlcGxhY2UoL14jLywgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGVsLnRhZ05hbWUgPT09IHNlbGVjdG9yLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWFyY2ggZm9yIGdlbmVyYXRlZCBldmVudCBsaXN0ZW5lciBieSBvcmlnaW5hbFxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtBcnJheX0gZXZlbnRMaXN0ZW5lcnMg4oCUIGxpc3Qgb2YgZXZlbnQgbGlzdGVuZXJzXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUg4oCUIGV2ZW50IHR5cGUgbGlrZSAnY2xpY2snIHwgJ2ZvY3VzJyB8ICdibHVyJ1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciDigJQgLmNsYXNzIHwgI2lkIHwgZGl2XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sg4oCUIHVzZXIgcGFzc2VkIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB1c2VDYXB0dXJlXG4gICAgICogQHJldHVybiB7T2JqZWN0fEJvb2xlYW59XG4gICAgICovXG4gICAgZnVuY3Rpb24gX2ZpbmRFdmVudExpc3RlbmVyKGV2ZW50TGlzdGVuZXJzLCB0eXBlLCBzZWxlY3RvciwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudExpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGV2ZW50TGlzdGVuZXJzW2ldLm9yaWdpbmFsID09PSBjYWxsYmFjayAmJlxuICAgICAgICAgICAgICAgIGV2ZW50TGlzdGVuZXJzW2ldLnVzZUNhcHR1cmUgPT09IHVzZUNhcHR1cmUgJiZcbiAgICAgICAgICAgICAgICBldmVudExpc3RlbmVyc1tpXS50eXBlID09PSB0eXBlICYmXG4gICAgICAgICAgICAgICAgZXZlbnRMaXN0ZW5lcnNbaV0uc2VsZWN0b3IgPT09IHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50TGlzdGVuZXJzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyB1c2VDYXB0dXJlIGZvciBldmVudCBsaXN0ZW5lcnMsIGlmIGJsdXIgb3IgZm9jdXMgd2Ugc2hvdWxkIGFsd2F5cyB1c2UgdXNlQ2FwdHVyZVxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUg4oCUIGV2ZW50IHR5cGUgbGlrZSAnY2xpY2snIHwgJ2ZvY3VzJyB8ICdibHVyJ1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdXNlQ2FwdHVyZSDigJQgdXNlciBkZWZpbmVkIHVzZUNhcHR1cmVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIF9nZW5lcmF0ZVVzZUNhcHR1cmUodHlwZSwgdXNlQ2FwdHVyZSkge1xuICAgICAgICByZXR1cm4gdHlwZSA9PT0gJ2JsdXInIHx8IHR5cGUgPT09ICdmb2N1cycgfHwgdXNlQ2FwdHVyZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgZXZlbnRMaXN0ZW5lciBpdGVtIGZvciBEZWdhLl9ldmVudExpc3RlbmVycyBsaXN0XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUg4oCUIGV2ZW50IHR5cGUgbGlrZSAnY2xpY2snIHwgJ2ZvY3VzJyB8ICdibHVyJ1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciDigJQgLmNsYXNzIHwgI2lkIHwgZGl2XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sg4oCUIHVzZXIgcGFzc2VkIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHtCb29sZWFufSB1c2VDYXB0dXJlXG4gICAgICovXG4gICAgZnVuY3Rpb24gX2dlbmVyYXRlRXZlbnRMaXN0ZW5lcih0eXBlLCBzZWxlY3RvciwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICBzZWxlY3Rvcjogc2VsZWN0b3IsXG4gICAgICAgICAgICB1c2VDYXB0dXJlOiBfZ2VuZXJhdGVVc2VDYXB0dXJlKHR5cGUsIHVzZUNhcHR1cmUpLFxuXG4gICAgICAgICAgICBvcmlnaW5hbDogY2FsbGJhY2ssXG4gICAgICAgICAgICBnZW5lcmF0ZWQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWwgPSBlLnRhcmdldDtcblxuICAgICAgICAgICAgICAgIHdoaWxlIChlbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX21hdGNoRWxlbShlbCwgc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKGVsLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwgPSBlbC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IERlZ2EgSW5zdGFuY2VcbiAgICAgKiBAY2xhc3NcbiAgICAgKiBAcGFyYW0ge0RvbUVsZW18U3RyaW5nfSBlbGVtIOKAlCBkb20gZWxlbSBvciBzZWxlY3RvciBmb3IgZG9jdW1lbnQucXVlcnlTZWxlY3RvclxuICAgICAqL1xuICAgIHZhciBEZWdhID0gZnVuY3Rpb24oZWxlbSkge1xuICAgICAgICBpZiAodHlwZW9mIGVsZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBEZWdhKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfaW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKF9pbnN0YW5jZXNbaV0uZWxlbSA9PT0gZWxlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2luc3RhbmNlc1tpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkZWdhID0gbmV3IERlZ2EoZWxlbSk7XG4gICAgICAgICAgICBfaW5zdGFuY2VzLnB1c2goZGVnYSk7XG4gICAgICAgICAgICByZXR1cm4gZGVnYTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZWxlbSA9IGVsZW07XG4gICAgICAgIHRoaXMuX2V2ZW50TGlzdGVuZXJzID0gW107XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZSBvbiBldmVudFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIOKAlCBldmVudCB0eXBlIGxpa2UgJ2NsaWNrJyB8ICdmb2N1cycgfCAnYmx1cidcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3Ig4oCUIC5jbGFzcyB8ICNpZCB8IGRpdlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIOKAlCB1c2VyIHBhc3NlZCBjYWxsYmFja1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW3VzZUNhcHR1cmVdXG4gICAgICogQHJldHVybiB7RGVnYX0gdGhpc1xuICAgICAqL1xuICAgIERlZ2EucHJvdG90eXBlLm9uID0gZnVuY3Rpb24odHlwZSwgc2VsZWN0b3IsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKSB7XG4gICAgICAgIHZhciBldmVudExpc3RlbmVyID0gX2dlbmVyYXRlRXZlbnRMaXN0ZW5lcih0eXBlLCBzZWxlY3RvciwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpO1xuXG4gICAgICAgIHRoaXMuX2V2ZW50TGlzdGVuZXJzLnB1c2goZXZlbnRMaXN0ZW5lcik7XG4gICAgICAgIHRoaXMuZWxlbS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGV2ZW50TGlzdGVuZXIuZ2VuZXJhdGVkLCBldmVudExpc3RlbmVyLnVzZUNhcHR1cmUpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVbnN1YnNjcmliZSBmcm9tIGV2ZW50XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUg4oCUIGV2ZW50IHR5cGUgbGlrZSAnY2xpY2snIHwgJ2ZvY3VzJyB8ICdibHVyJ1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciDigJQgLmNsYXNzIHwgI2lkIHwgZGl2XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sg4oCUIHVzZXIgcGFzc2VkIGNhbGxiYWNrXG4gICAgICogQHBhcmFtICB7Qm9vbGVhbn0gW3VzZUNhcHR1cmVdXG4gICAgICogQHJldHVybiB7RGVnYX0gdGhpc1xuICAgICAqL1xuICAgIERlZ2EucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uKHR5cGUsIHNlbGVjdG9yLCBjYWxsYmFjaywgdXNlQ2FwdHVyZSkge1xuICAgICAgICB1c2VDYXB0dXJlID0gX2dlbmVyYXRlVXNlQ2FwdHVyZSh0eXBlLCB1c2VDYXB0dXJlKTtcblxuICAgICAgICB2YXIgZXZlbnRMaXN0ZW5lciA9IF9maW5kRXZlbnRMaXN0ZW5lcih0aGlzLl9ldmVudExpc3RlbmVycywgdHlwZSwgc2VsZWN0b3IsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKTtcblxuICAgICAgICBpZiAoZXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5lbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgZXZlbnRMaXN0ZW5lci5nZW5lcmF0ZWQsIGV2ZW50TGlzdGVuZXIudXNlQ2FwdHVyZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2V2ZW50TGlzdGVuZXJzLnNwbGljZSh0aGlzLl9ldmVudExpc3RlbmVycy5pbmRleE9mKGV2ZW50TGlzdGVuZXIpLCAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICByZXR1cm4gRGVnYTtcbn0pO1xuIiwidmFyIERlZ2EgPSByZXF1aXJlKCdkZWdhJyksXG5cbiAgICAkX3NlYXJjaFBhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaCcpLFxuICAgICRfc2VhcmNoRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfX2Zvcm0nKSxcbiAgICAkX3NlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9faW5wdXQnKSxcbiAgICAkX3NlYXJjaENsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaF9fY2xvc2UnKSxcblxuICAgIF9jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkX3NlYXJjaFBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJy1hY3RpdmUnKTtcbiAgICAgICAgJF9zZWFyY2hJbnB1dC5ibHVyKCk7XG4gICAgICAgICRfc2VhcmNoSW5wdXQudmFsdWUgPSAnJztcbiAgICB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgRGVnYShkb2N1bWVudCkub24oJ2NsaWNrJywgJy5zZWFyY2gtdHJpZ2dlcicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICRfc2VhcmNoUGFuZWwuY2xhc3NMaXN0LmFkZCgnLWFjdGl2ZScpO1xuICAgICAgICAkX3NlYXJjaElucHV0LmZvY3VzKCk7XG4gICAgfSk7XG5cbiAgICAkX3NlYXJjaEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICAkX3NlYXJjaElucHV0LnZhbHVlID0gJ3NpdGU6c3lzb2V2Lm9yZyAnICsgJF9zZWFyY2hJbnB1dC52YWx1ZTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX2Nsb3NlKCk7XG4gICAgICAgIH0sIDUwKTtcbiAgICB9KTtcblxuICAgICRfc2VhcmNoQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIF9jbG9zZSgpO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgICAgIF9jbG9zZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn07XG4iLCJyZXF1aXJlKCcuLi9jb21wb25lbnRzL19zZWFyY2gvX3NlYXJjaC5qcycpKCk7XG4iXX0=
