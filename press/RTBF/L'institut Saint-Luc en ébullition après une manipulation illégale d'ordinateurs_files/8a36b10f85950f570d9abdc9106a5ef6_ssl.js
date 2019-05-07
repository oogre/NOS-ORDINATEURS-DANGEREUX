
// File: /js/news/common/public/static/js/module/ad/inreadContainer.js
(function (root, app) {
  'use strict';

  /* globals define, exports, require */

  if (typeof define === 'function' && define.amd) {
    // Asynchronous Module Definition (AMD) (e.g. requirejs)
    require([], app);
  } else if (typeof exports === 'object') {
    // CommonJS style (e.g. Browserify)
    app();
  } else {
    // Global definition (e.g. RTBF)
    app();
  }
})(this, function () {
  'use strict';

  /* global $ */

  var $body = $('body');
  var $firstParagraph = $body.find('.js-article-paragraph-list:first p:first');

  if ($firstParagraph.length) {
    $('<div></div>', {
      'class': 'js-ad js-ad-inread-container'
    }).insertAfter($firstParagraph);
  }
});
;
// File: /js/rtbf/www/public/static/js/jquery/plugins/jquery.cookie.js
/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
;
// File: /js/news/common/public/static/js/RTBF/utils.js
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

// eslint-disable-next-line no-use-before-define
var RTBF = RTBF || {};

(function ($, window, document, RTBF) {
  /* globals jQuery */

  var Utils = (function () {
    function Utils() {
      _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
      key: 'isIOS',
      value: function isIOS() {
        return /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase());
      }
    }, {
      key: 'isAndroid',
      value: function isAndroid() {
        return /android/i.test(navigator.userAgent.toLowerCase());
      }
    }, {
      key: 'isWindowsPhone',
      value: function isWindowsPhone() {
        return /windows phone/i.test(navigator.userAgent.toLowerCase());
      }
    }, {
      key: 'isFacebookApp',
      value: function isFacebookApp() {
        return /fban|fbav/i.test(navigator.userAgent.toLowerCase());
      }
    }, {
      key: 'isMobile',
      value: function isMobile() {
        var indicator = RTBF.Utils.getIndicator();

        return indicator.css('font-family').indexOf('xs') > -1;
      }
    }, {
      key: 'isTablet',
      value: function isTablet() {
        var indicator = RTBF.Utils.getIndicator();

        return indicator.css('font-family').indexOf('sm') > -1;
      }
    }, {
      key: 'isDesktop',
      value: function isDesktop() {
        var indicator = RTBF.Utils.getIndicator();

        return indicator.css('font-family').indexOf('md') > -1;
      }
    }, {
      key: 'getIndicator',
      value: function getIndicator() {
        var indicator = $('body>.www-state-indicator');

        return indicator.length ? indicator : $('<b>').addClass('www-state-indicator').appendTo('body');
      }
    }, {
      key: 'onBreakpoint',
      value: function onBreakpoint(cb, format) {
        var handler = function handler() {
          // Ignore if the format doesn't match.
          if (format && RTBF.Utils.getFormat() !== format) {
            return;
          }

          cb();
        };

        var attach = function attach() {
          RTBF.Utils.getIndicator().on('transitionend', handler);
        };

        var detach = function detach() {
          RTBF.Utils.getIndicator().off('transitionend', handler);
        };

        // Automatic attach.
        attach();

        return detach;
      }
    }, {
      key: 'getFormat',
      value: function getFormat() {
        if (RTBF.Utils.isMobile()) return 'mobile';
        if (RTBF.Utils.isTablet()) return 'tablet';
        return 'desktop';
      }
    }, {
      key: 'noTouch',
      value: function noTouch() {
        return $('html').hasClass('no-touch');
      }
    }, {
      key: 'isRetina',
      value: function isRetina() {
        // @see https://github.com/joaocunha/modernizr-retina-test
        var dpr = window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI || 1;

        return dpr > 1;
      }
    }, {
      key: 'throttle',

      /**
       * Ensure the methods calls are separeted by at least the given threshold.
       *
       * e.g. Perform a task every 100 ms on scroll events.
       *
       *      $('body').on('scroll', RTBF.Utils.throttle(func, 100));
       *
       *      -> reduce the amount of calls but still perform the task every so often.
       *
       * @param {Function} fn
       * @param {int} threshhold
       * @param {mixed} context
       * @return {Function}
       */
      value: function throttle(fn, threshhold, context) {
        threshhold = threshhold || 250;
        context = context || this;

        var last = false;

        return function () {
          var args = arguments;
          var now = Date.now();

          if (last && now < last + threshhold) return;

          last = now;
          fn.apply(context, args);
        };
      }
    }, {
      key: 'debounce',

      /**
       * Ensure the methods is called only if it has not been called again during the given delay.
       *
       * e.g. Perform a task at the last resize event.
       *
       *      $('body').on('resize', RTBF.Utils.debounce(func, 100));
       *
       *      -> reduce the amount of calls to one, right at the end of a window resizing process.
       *      -> After 100 ms, the task can be called again if a resize is performed.
       *
       * @param {Function} fn
       * @param {int} delay
       * @param {mixed} context
       * @return {Function}
       */
      value: function debounce(fn, delay, context) {
        delay = delay || 250;
        context = context || this;

        var timer = false;

        return function () {
          var args = arguments;

          clearTimeout(timer);

          timer = setTimeout(function () {
            fn.apply(context, args);
          }, delay);
        };
      }
    }, {
      key: 'jQueryfy',

      /**
       * Create a plugin jQuery based on a Class.
       *
       * Usage:
       * ------
       *
       * $(selector).name(settings, callback)
       *
       * where:
       *   selector: a valid jQuery selector or object.
       *   name: the plugin name given during the jQueryfication.
       *   settings: an object containing all the plugin options.
       *   callback: an optional callback which will be called for each successfully instanciated plugins.
       *
       * Once a plugin is instanciate, it cannot be instanciate again.
       * If the case occurs, the dom element is simply ignored and the callback is not called.
       *
       * The plugin automatically exposes special methods:
       *   - get: return the plugin instance (e.g. `$(selector).name('get');`).
       *   - instance: apply a callback on every matching instances (e.g. `$(selector).name('instance', callback);`).
       *   - destroy: remove completly the plugin (e.g. `$(selector).name('destroy');`)
       *
       * WARNING: You should wisely choose your plugin name in order to avoid any possible conflict in jQuery AND
       *          in the object data.
       *
       * Requirements:
       * -------------
       * The given class needs to implements a method called factory which
       * receives a dom element and a settings object and returns either
       * a configured class instance or false if the instanciation failed.
       *
       * [Optional] If the class implements a method called 'destroy', it will be
       * automatically called upon plugin destruction.
       *
       * @param {string} name
       * @param {Class} Class
       * @return {void}
       */
      value: function jQueryfy(name, Class) {
        // Already defined plugin.
        if (jQuery.fn[name]) {
          console.log('This jQuery plugin already exists: ' + name);
          return;
        }

        var plugin = {};
        var prefix = 'js-has-';

        plugin[name] = function (settings, cb) {
          if (!settings) settings = {};

          // No settings provided but a callback is defined.
          if (typeof settings === 'function') {
            cb = settings;
            settings = {};
          }

          // Return the plugin instance for the first matching element.
          if (settings === 'get') {
            return this.first().data(name);
          }

          return this.each(function () {
            var $this = $(this);
            var instance = $this.data(name);

            if ($.isPlainObject(settings)) {
              // Avoid to instanciate a plugin twice.
              if (!instance) {
                instance = Class.factory($this, settings);

                if (!instance) {
                  console.log('Impossible to instanciate ' + name, settings);
                  return true;
                }

                // Store the instance in the DOM element data for easy retrieval.
                $this.data(name, instance);

                // Mark the node
                $this.addClass(prefix + name);

                if (cb) cb.call($this, instance);
              }
            } else if (typeof settings === 'string' && instance) {
              switch (settings) {
                case 'instance':
                  cb.call($this, instance);
                  break;
                case 'destroy':
                  if (instance.destroy) instance.destroy();
                  $this.removeData(name);
                  $this.removeClass(prefix + name);
                  break;
                default:
                  console.log('Unrecognized method: ' + settings);
                  break;
              }
            } else {}
          });
        };

        jQuery.extend(true, jQuery.fn, plugin);
      }
    }, {
      key: 'getQueryParams',
      value: function getQueryParams() {
        var qs = arguments[0] === undefined ? window.location.search : arguments[0];

        qs = qs.split('+').join(' ');

        var params = {};
        var tokens = undefined;
        var re = /[?&]?([^=]+)=([^&]*)/g;

        // eslint-disable-next-line no-cond-assign
        while (tokens = re.exec(qs)) {
          params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }

        return params;
      }
    }, {
      key: 'dateToW3C',
      value: function dateToW3C(date) {
        var tzo = -date.getTimezoneOffset();
        var dif = tzo >= 0 ? '+' : '-';

        var pad = function pad(num) {
          var norm = Math.abs(Math.floor(num));

          return (norm < 10 ? '0' : '') + norm;
        };

        return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + 'T' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds()) + dif + pad(tzo / 60) + ':' + pad(tzo % 60);
      }
    }, {
      key: 'getServerTime',

      /**
       * Get the current server time.
       * @param {Boolean} refresh Whether the time has to be refreshed from the server or not.
       * @return {Date}
       */
      value: function getServerTime() {
        var refresh = arguments[0] === undefined ? false : arguments[0];

        /**
         * Maximum acceptable delay between client and server.
         * The difference is ignored if lower than this value.
         * @type {Number}
         */
        var delay = 5000;

        /**
         * Data key.
         * @type {String}
         */
        var key = 'rtbf_countdown_delta';

        /**
         * Return the time based on the server time from the body data.
         * @return {Date|Boolean}
         */
        var local = function local() {
          var date = false;
          var time = $('body').data('server-time');

          if (time) {
            date = new Date(parseInt(time, 10) * 1000);
            if (isNaN(date.getTime())) date = null // invalid time
            ;
          }

          return date;
        };

        /**
         * Return the time based on the server time from the API.
         * @return {Date|Boolean}
         */
        var server = function server() {
          var date = false;

          $.ajax({
            url: 'https://www.rtbf.be/api/time',
            type: 'get',
            dataType: 'json',
            async: false,
            success: function success(data) {
              if (data.error) return;

              var date = new Date(data.timestamp * 1000);

              if (isNaN(date.getTime())) date = null // invalid time
              ;
            }
          });

          return date;
        };

        var delta = parseInt($('body').data(key), 10);
        var now = new Date();

        if (isNaN(delta) || refresh) {
          var time = local() || server() || now;

          delta = time - now;
          $('body').data(key, delta);
        }

        if (Math.abs(delta) < delay) return now;
        return new Date(now.getTime() + delta);
      }
    }, {
      key: 'watchtower',

      /**
       * Detect clicks (or touchend) outside the container and trigger the callback.
       * @param {jQuery} $container
       * @param {string} sector [optional] Reduce the watch to the given sector describe as a jQuery selector.
       * @param {Function} callback
       */
      value: function watchtower($container, sector, callback) {
        // Handle optional sector parameter.
        if (arguments.length < 3) {
          callback = sector;
          sector = null;
        }

        // Create an unique uuid for the watchtower.
        var uuid = (Math.random() + 1).toString(36).substring(7);

        // Control variable (fix concurrence issue if the breakout method is called immediatly)
        var cancel = false;

        // Unbind events.
        var unbind = function unbind() {
          cancel = true;
          $('html').off('.' + uuid);
          $container.off('.' + uuid);
        };

        // Unbind events, end the watch and trigger the callback.
        var breakout = function breakout() {
          unbind();
          if (callback) callback();
        };

        // Unbind events, end the watch.
        var release = function release() {
          unbind();
        };

        // Mark events from the container for later.
        $container.on('click.' + uuid + ' ' + 'touchend.' + uuid, sector, function (e) {
          // Attach to the orginalEvent which is the only element not modified between handlers.
          if (e.originalEvent) e.originalEvent.through = true;
        });

        // Wait for the next tick (ignore the first click event)
        setTimeout(function () {
          if (cancel) return;

          // And now my watch begins.
          $('html').on('click.' + uuid + ' ' + 'touchend.' + uuid, function (e) {
            // If the event is marked, let go since it's from the container itself.
            if (e.originalEvent && e.originalEvent.through) return true;

            // Otherwise it's a breakout.
            breakout();
          });
        }, 0);

        return {
          breakout: breakout,
          release: release
        };
      }
    }, {
      key: 'repeat',

      /**
       * Repeat a string source for given number of time.
       * @param {string} source
       * @param {int} count
       * @return {string}
       */
      value: function repeat(source, count) {
        var res = '';

        for (var i = 0; i < count; i++) {
          res += source;
        }

        return res;
      }
    }, {
      key: 'leftPad',

      /**
       * Left pad the given string.
       * @param {string} source
       * @param {int} length
       * @param {string} pad
       * @return {string}
       */
      value: function leftPad(source, length, pad) {
        return source.length < length ? RTBF.Utils.repeat(pad, length - source.length) + source : source;
      }
    }, {
      key: 'uuid',

      /**
       * Generate a random uuid.
       * @return {string}
       */
      value: function uuid() {
        var p8 = function p8(s) {
          var p = (Math.random().toString(16) + '000000000').substr(2, 8);

          return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
        };

        return p8() + p8(true) + p8(true) + p8();
      }
    }, {
      key: 'ellipse',
      value: function ellipse(textToTruncate, indexWhereToCut) {
        if (textToTruncate.length <= indexWhereToCut) {
          return textToTruncate;
        }

        var textArray = textToTruncate.split(' ');
        var truncatedText = '';

        for (var i = 0; i < textArray.length; i++) {
          var stringToAdd = textArray[i];

          if (truncatedText.length + stringToAdd.length <= indexWhereToCut) {
            truncatedText += stringToAdd + ' ';
          }
        }

        return truncatedText.substr(0, truncatedText.length - 1) + '...';
      }
    }]);

    return Utils;
  })();

  RTBF.Utils = Utils;
  RTBF.Utils.getIndicator();
})(jQuery, window, document, RTBF);

// No instance available or no valid settings given.
;
// File: /js/news/common/public/static/js/RTBF/location.js
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (root, factory) {
  'use strict';

  /* globals define, module, exports */

  if (typeof define === 'function' && define.amd) {
    // Asynchronous Module Definition (AMD) (e.g. requirejs)
    define([], factory);
  } else if (typeof exports === 'object') {
    // CommonJS style (e.g. Browserify)
    module.exports = factory();
  } else {
    // Global definition (e.g. RTBF)
    root.RTBF = root.RTBF || {};
    root.RTBF.location = factory();
  }
})(this, function () {
  'use strict';

  /**
   * Static helper class for hash.
   * @type {Object}
   */
  var Hash = {
    parse: function parse(hash) {
      var hashes = hash.substring(1).split('&');
      var tray = {};

      for (var i in hashes) {
        if (!hashes[i]) continue;

        var _hashes$i$split = hashes[i].split('=');

        var _hashes$i$split2 = _slicedToArray(_hashes$i$split, 2);

        var _name = _hashes$i$split2[0];
        var _hashes$i$split2$1 = _hashes$i$split2[1];
        var value = _hashes$i$split2$1 === undefined ? 1 : _hashes$i$split2$1;

        tray[decodeURIComponent(_name)] = decodeURIComponent(value);
      }

      return tray;
    },
    stringify: function stringify(tray) {
      var hashes = [];

      for (var _name2 in tray) {
        hashes.push(encodeURIComponent(_name2) + '=' + encodeURIComponent(tray[_name2]));
      }

      return hashes.length ? '#' + hashes.join('&') : '';
    }
  };

  var Search = {
    parse: function parse(search) {
      var qs = search.split('+').join(' ');

      var params = {};
      var tokens = false;
      var re = /[?&]?([^=]+)=([^&]*)/g;

      // eslint-disable-next-line no-cond-assign
      while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
      }

      return params;
    },

    stringify: function stringify(params) {
      var queries = [];

      for (var _name3 in params) {
        queries.push(encodeURIComponent(_name3) + '=' + encodeURIComponent(params[_name3]));
      }

      return queries.length ? '?' + queries.join('&') : '';
    }
  };

  var Location = (function () {
    /**
     * Constructor.
     * @param {string} location The reference location.
     */

    function Location() {
      var location = arguments[0] === undefined ? '' : arguments[0];

      _classCallCheck(this, Location);

      var anchor = document.createElement('a');

      // Use the anchor as a url parser.
      anchor.href = location;

      this._href = anchor.href;
      this._protocol = anchor.protocol; // => "http:"
      this._hostname = anchor.hostname; // => "example.com"
      this._port = anchor.port; // => "3000"
      this._pathname = anchor.pathname; // => "/pathname/"
      this._search = anchor.search; // => "?search=test"
      this._hash = anchor.hash; // => "#hash"

      // Fix: IE doesn't include the leading slash in pathname for some reason...
      if (this._pathname.charAt(0) !== '/') this._pathname = '/' + this._pathname;
    }

    _createClass(Location, [{
      key: 'href',
      get: function () {
        return this._protocol + '//' + this._hostname + (this._port ? ':' + this._port : '') + this._pathname + this._search + this._hash;
      }
    }, {
      key: 'protocol',
      get: function () {
        return this._protocol;
      }
    }, {
      key: 'hostname',
      get: function () {
        return this._hostname;
      }
    }, {
      key: 'port',
      get: function () {
        return this._port;
      }
    }, {
      key: 'pathname',
      get: function () {
        return this._pathname;
      }
    }, {
      key: 'hash',
      value: function hash(name, value) {
        var tray = Hash.parse(this._hash);

        if (typeof name === 'undefined') return tray;
        if (typeof value === 'undefined') return tray[name];

        tray[name] = value;
        if (value === null) delete tray[name];

        this._hash = Hash.stringify(tray);

        return this;
      }
    }, {
      key: 'search',
      value: function search(name, value) {
        var params = Search.parse(this._search);

        if (typeof name === 'undefined') return params;
        if (typeof value === 'undefined') return params[name];

        params[name] = value;
        if (value === null) delete params[name];

        this._search = Search.stringify(params);

        return this;
      }
    }]);

    return Location;
  })();

  return function (location) {
    return new Location(location);
  };
});
;
// File: /js/news/common/public/static/js/RTBF/loader.js
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/**
* Loader class
* Depends: RTBF.Utils, loadJS and loadCSS from filamentgroup
**/

// eslint-disable-next-line no-use-before-define
var RTBF = RTBF || {};

(function ($, window, document, RTBF, loadCSS, loadJS) {
  /* globals jQuery, loadCSS, onloadCSS, loadJS */
  // Every lazyloaded css will be inserted before the last head element.
  var lastHeadElement = $('head').children().last().get(0);

  var Loader = (function () {
    function Loader() {
      _classCallCheck(this, Loader);
    }

    _createClass(Loader, [{
      key: 'css',
      value: function css(paths, cb) {
        var _this = this;

        if (paths.length < 1) return cb ? cb() : void 0;

        var path = paths.shift();

        onloadCSS(loadCSS(path, lastHeadElement), function () {
          _this.css(paths, cb);
        });
      }
    }, {
      key: 'js',
      value: function js(paths, cb) {
        var _this2 = this;

        if (paths.length < 1) return cb ? cb() : void 0;

        var path = paths.shift();

        loadJS(path, function () {
          _this2.js(paths, cb);
        });
      }
    }]);

    return Loader;
  })();

  RTBF.loader = new Loader();
})(jQuery, window, document, RTBF, loadCSS, loadJS);
;
// File: /js/news/common/public/static/js/RTBF/storage.js
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (root, factory) {
  'use strict';

  // Global definition (e.g. RTBF)
  root.RTBF = root.RTBF || {};
  root.RTBF.storage = factory();
})(this, function () {
  'use strict';

  var STORE_PLACE = 'sessionStorage';
  var KEY_SUFFIX_EXPIRATION = '_expiration';
  var KEY_SUFFIX_VALUE = '_value';
  var CONVERT_MS_TO_SECS = 1000;

  var Storage = (function () {
    function Storage() {
      _classCallCheck(this, Storage);
    }

    _createClass(Storage, [{
      key: 'set',
      value: function set(key, value, expiration) {
        if (!window.hasOwnProperty(STORE_PLACE)) {
          return undefined;
        }

        try {
          window[STORE_PLACE].setItem(key + KEY_SUFFIX_EXPIRATION, expiration * CONVERT_MS_TO_SECS);
          window[STORE_PLACE].setItem(key + KEY_SUFFIX_VALUE, value);
        } catch (e) {}
      }
    }, {
      key: 'get',
      value: function get(key) {
        if (!window.hasOwnProperty(STORE_PLACE)) {
          return undefined;
        }

        var expiration = window[STORE_PLACE].getItem(key + KEY_SUFFIX_EXPIRATION);

        if (!expiration) {
          return undefined;
        }

        if (expiration < new Date().getTime()) {
          this.remove(key);
          return undefined;
        }
        return window[STORE_PLACE].getItem(key + KEY_SUFFIX_VALUE);
      }
    }, {
      key: 'remove',
      value: function remove(key) {
        if (!window.hasOwnProperty(STORE_PLACE)) {
          return undefined;
        }
        window[STORE_PLACE].removeItem(key + KEY_SUFFIX_EXPIRATION);
        window[STORE_PLACE].removeItem(key + KEY_SUFFIX_VALUE);
      }
    }]);

    return Storage;
  })();

  return new Storage();
});

// private browsing ¯\_(ツ)_/¯
;
// File: /js/news/common/public/static/js/RTBF/sso.js
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (root, factory) {
  'use strict';

  /* globals define, module, exports */

  if (typeof define === 'function' && define.amd) {
    // Asynchronous Module Definition (AMD) (e.g. requirejs)
    define([], factory);
  } else if (typeof exports === 'object') {
    // CommonJS style (e.g. Browserify)
    module.exports = factory();
  } else {
    // Global definition (e.g. RTBF)
    root.RTBF = root.RTBF || {};
    root.RTBF.sso = factory();
  }
})(this, function () {
  'use strict';

  /* globals RTBF, $, store, sessionStorage, FileReader, atob */

  var sso = null;

  var ERROR_CODE_UNAUTHORIZED = 401;
  var ERROR_CODE_FORBIDDEN = 403;
  var ERROR_CODE_TOO_MANY_REQUESTS = 429;
  var ERROR_CODE_NO_RESPONSE = 444;
  var ERROR_CODE_CLIENT_CLOSED_REQUEST = 499;
  var ERROR_CODE_SERVICE_UNAVAILABLE = 503;

  var PRIVATE_NAVIGATION = 'Private';

  var CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache.

  var SOCIAL_PROVIDERS = ['facebook', 'googleplus'];

  var PARENTAL_CONTROL_DISABLED_INTERVAL = 3 * 60 * 60 * 1000;

  var PIN_CAPPING_MAX = 3;
  var PIN_CAPPING_SPAN = 5 * 60 * 1000;
  var PIN_CAPPING_KEY = 'parental_control.capping';

  var endOfTime = new Date(2030, 11, 31, 1, 0, 0, 0);

  /**
   * Ajax request helper.
   * @param {string} type The request type (GET, POST, PUT, DELETE, ...).
   * @param {Object} api The requested api.
   * @param {Object} params The request params.
   * @param {Function} cb The node-like callback.
   */
  var request = function request(type, api, params, cb) {
    var xhrFields = {};
    var specificHeaders = {};

    if (api.secure) {
      xhrFields.withCredentials = true;

      // we need a value with no meaning xD, just to check if we have a CSRF token
      specificHeaders = { 'X-CSRF-Token': '19900521fa48a71680d43be33023f9b2' };
    }

    $.ajax(api.url, {
      type: type,
      data: params,
      xhrFields: xhrFields,
      headers: specificHeaders
    }, 'json').then(function (data) {
      if (data && data.code) {
        cb(data);
        return;
      }

      cb(null, data);
    }).fail(function (jqXHR, message, code) {
      cb(jqXHR.responseJSON || {
        code: code,
        message: jqXHR.responseText || message
      });
    });
  };

  /**
   * This class handles sso stuff.
   */

  var Sso = (function () {
    function Sso() {
      _classCallCheck(this, Sso);

      // Logger
      this.logger = RTBF.debug.logger('sso').remote();

      // List of api urls.
      this.apis = {
        login: {
          url: 'https://www.rtbf.be/api/sso/login',
          secure: true
        },
        logout: {
          url: 'https://www.rtbf.be/api/sso/logout',
          secure: true
        },
        fetch: {
          url: 'https://www.rtbf.be/api/sso/fetch',
          secure: true
        },
        update: {
          url: 'https://www.rtbf.be/api/sso/update',
          secure: true
        },
        'delete': {
          url: 'https://www.rtbf.be/api/sso/delete',
          secure: true
        },
        finalize: {
          url: 'https://www.rtbf.be/api/sso/finalize',
          secure: true
        },
        satisfy: {
          url: 'https://www.rtbf.be/api/sso/satisfy',
          secure: true
        },
        screenset: {
          url: 'https://www.rtbf.be/api/sso/screenset',
          secure: false
        },
        scope: {
          url: 'https://www.rtbf.be/api/sso/scope',
          secure: false
        },
        error: {
          url: 'https://www.rtbf.be/api/sso/error',
          secure: false
        },
        enrich: {
          url: 'https://www.rtbf.be/api/sso/enrich',
          secure: true
        },
        otp: {
          generate: {
            url: 'https://www.rtbf.be/api/sso/otp/generate',
            secure: true
          },
          verify: {
            url: 'https://www.rtbf.be/api/sso/otp/verify',
            secure: true
          }
        },
        pin: {
          create: {
            url: 'https://www.rtbf.be/api/sso/pin/create',
            secure: true
          },
          reset: {
            url: 'https://www.rtbf.be/api/sso/pin/reset',
            secure: true
          }
        }
      };

      // Context configuration.
      this.context = {
        authentication: {
          name: 'authentication',
          set: 'sso-authentication',
          screens: {
            login: 'sso-login',
            login_pending: 'sso-login-pending',
            link: 'sso-link',
            forgotten_password: 'sso-forgotten-password',
            forgotten_password_success: 'sso-forgotten-password-success',
            forgotten_password_error: 'sso-forgotten-password-error',
            register: 'sso-register',
            register_pending: 'sso-register-pending',
            register_verified: 'sso-register-verified',
            register_complete: 'sso-register-complete',
            verified: 'sso-register-verified',
            reset_password: 'sso-reset-password',
            reset_password_success: 'sso-reset-password-success',
            reset_password_error: 'sso-reset-password-error',
            finalize: 'sso-finalize',
            finalize_success: 'sso-finalize-success',
            finalize_error: 'sso-finalize-error',
            'switch': 'sso-switch',
            error: 'sso-error'
          }
        },
        profile: {
          name: 'profile',
          set: 'sso-profile',
          screens: {
            info: 'sso-info',
            newsletter: 'sso-newsletter',
            change_password: 'sso-change-password',
            portability: 'sso-portability',
            affinity: 'sso-affinity',
            parental_control: 'sso-parental-control'
          }
        },
        popup: 'sso-popup-container'
      };

      // Event handlers.
      this.events = {};

      // Hooks handlers.
      this.hooks = {};

      // Fetch promise.
      this.promise = null;

      // Mode complete.
      this.complete = false;

      // Access queue.
      this.queue = [];

      // Cached user.
      this.user = null;

      // Cached scope.
      this.scopes = {};

      // Popup allowed.
      this.popup = true;

      // Promise for the gigya library.
      this.gigya = $.Deferred();

      // Gigya script.
      this.gigyaScriptUrl = $('#sso-gigya-script').data('url');

      // Gigya api key.
      this.gigyaApiKey = $('#sso-gigya-script').data('key');

      // Gigya cookie name
      this.gigyaCookieName = 'glt_' + this.gigyaApiKey;

      // Clean cache if missing session cookies.
      if (!$.cookie(this.gigyaCookieName) || !$.cookie('PHPSESSID')) {
        this.clean();
      }

      // Clean session if missing gigya cookie.
      // NOTE: This is a fix for disappearing gigya cookie,
      //       which makes the user disconnected to giya
      //       but connected to us (incoherent state).
      if (!$.cookie(this.gigyaCookieName) && $.cookie('PHPSESSID')) {
        $.cookie('PHPSESSID', null);
      }

      // Restore cache.
      var cache = this.data();

      if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
        this.user = cache;
        this.complete = cache.isComplete;
      }
    }

    _createClass(Sso, [{
      key: 'initialize',

      /**
       * Initialize sso.
       */
      value: function initialize() {
        var _this = this;

        // No popup on facebook In App Browser.
        this.popup = !RTBF.Utils.isFacebookApp();

        // Asynchronous loading of the gigya script.
        RTBF.loader.js([this.gigyaScriptUrl], function () {
          // Resolve with the now available global gigya library.
          _this.gigya.resolve(window.gigya);
        });

        // Listen to gigya events.
        this.gigya.then(function (gigya) {
          gigya.accounts.addEventHandlers({
            onLogin: function onLogin(response) {
              if (response.errorCode) {
                _this.trigger('error', {
                  code: ERROR_CODE_SERVICE_UNAVAILABLE,
                  message: 'Error Gigya on Login: ' + response.errorMessage + '[' + response.errorCode + ']'
                });
                return;
              }

              _this.login(response.UID, response.UIDSignature, response.signatureTimestamp, false, function (err) {
                if (err) {
                  _this.trigger('error', {
                    code: err.code,
                    message: err.message + ' (login)'
                  });
                  return;
                }

                // Remember me forever if logged in using social providers.
                if (SOCIAL_PROVIDERS.indexOf(response.provider) > -1) {
                  _this.remember(true);
                }
              });
            },
            onLogout: function onLogout(response) {
              if (response.errorCode) {
                _this.trigger('error', {
                  code: ERROR_CODE_SERVICE_UNAVAILABLE,
                  message: 'Error Gigya on Logout: ' + response.errorMessage + '[' + response.errorCode + ']'
                });
              }
            }
          });

          // Since the onLogin event is not triggered at the end of the POST redirect authflow,  perform an autologin manually.
          if (RTBF.location().search('authflow_autologin')) {
            _this.autologin(function (err) {
              if (err) {
                _this.trigger('error', {
                  code: err.code,
                  message: err.message + ' (authflow autologin)'
                });
              }
            });
          }
        });

        // Move popup container from footer to content.
        $('#' + this.context.popup).remove().appendTo($('main').length ? 'main' : '#content');

        // Patch user status update.
        var patch = function patch(emitter) {
          // Invalid the current user data.
          _this.user = null;

          // Restore the cache since it has been updated by a parent or a child.
          var cache = _this.data();

          if (cache) {
            _this.user = cache;
            _this.complete = cache.isComplete;
          }

          _this.trigger('data', { from: 'patch' });
          _this.broadcast(emitter);
        };

        this.on('upcast', patch);
        this.on('downcast', patch);

        // Handling unexpected error (any error that occur while no callback were available to report the failure)
        this.on('error', function (err) {
          _this.error(err);
        });
      }
    }, {
      key: 'upcast',

      // ///////////////////////////////////////////////////////////////////// //
      // ////////////////// E V E N T S   A N D   H O O K S ////////////////// //
      // ///////////////////////////////////////////////////////////////////// //

      /**
       * Broadcast upward an update in the user connection status.
       * @param {Window} window
       */
      value: function upcast(window, emitter) {
        try {
          if (!window) return;
          if (!window.parent) return;
          if (window === window.parent) return;
          if (!window.parent.RTBF) return;
          if (!window.parent.RTBF.sso) return;
          if (window.parent === emitter) return;

          window.parent.RTBF.sso.trigger('upcast', window);
        } catch (e) {}
      }
    }, {
      key: 'downcast',

      /**
       * Broadcast downward an update in the user connection status.
       * @param {Window} window
       * @param {Window} emitter
       */
      value: function downcast(window, emitter) {
        $('iframe').each(function () {
          try {
            if (this.contentWindow === emitter) return;
            if (!this.contentWindow.RTBF) return;
            if (!this.contentWindow.RTBF.sso) return;

            this.contentWindow.RTBF.sso.trigger('downcast', window);
          } catch (e) {}
        });
      }
    }, {
      key: 'broadcast',

      /**
       * Broadcast an update in the user connection status.
       * @param  {Window} window
       * @param  {Window} emitter
       */
      value: function broadcast(emitter) {
        this.upcast(window, emitter);
        this.downcast(window, emitter);
      }
    }, {
      key: 'on',

      /**
       * Add the given handler for the given event name.
       * @param {string} event
       * @param {Function} handler
       */
      value: function on(event, handler) {
        // Initialize empty event handlers.
        if (!this.events[event]) this.events[event] = [];

        this.events[event].push(handler);
      }
    }, {
      key: 'off',

      /**
       * Remove the given handler from the event handlers.
       * @param {string} event
       * @param {Function} handler
       */
      value: function off(event, handler) {
        // Ignore empty event handlers.
        if (!this.events[event]) return;

        var index = this.events[event].indexOf(handler);

        if (index > -1) {
          this.events[event].splice(index, 1);
        }
      }
    }, {
      key: 'trigger',

      /**
       * Trigger an event.
       * @param {string} event
       * @param {object} payload
       */
      value: function trigger(event, payload) {
        var handlers = this.events[event];

        // Ignore empty event handlers.

        if (!handlers) return;

        // Create a copy to avoid any side effet produced by the handler (e.g. calling the off method)
        var copy = [].concat(_toConsumableArray(handlers));

        for (var i in copy) {
          copy[i](payload);
        }
      }
    }, {
      key: 'subscribe',

      /**
       * Add the given handler to the hook handlers for the given screen.
       * @param {string} hook
       * @param {string} screen
       * @param {Function} handler
       */
      value: function subscribe(hook, screen, handler) {
        // Initialize empty hooks handlers.
        if (!this.hooks[hook]) this.hooks[hook] = {};
        if (!this.hooks[hook][screen]) this.hooks[hook][screen] = [];

        this.hooks[hook][screen].push(handler);
      }
    }, {
      key: 'unsubscribe',

      /**
       * Remove the given handler from the hook handlers for the given screen.
       * @param {string} hook
       * @param {string} screen
       * @param {Function} handle
       */
      value: function unsubscribe(hook, screen, handler) {
        // Ignore empty hook handlers.
        if (!this.hooks[hook]) return;
        if (!this.hooks[hook][screen]) return;

        var index = this.hooks[hook][screen].indexOf(handler);

        if (index > -1) {
          this.hooks[hook][screen].splice(index, 1);
        }
      }
    }, {
      key: 'publish',

      /**
       * Publish a hook.
       * @param {string} hook
       * @param {string} screen
       * @param {object} payload
       * @return {boolean} Whether the publication has been validated by every handlers or not.
       */
      value: function publish(hook, screen, payload) {
        // Ignore empty hook handlers.
        if (!this.hooks[hook]) return true;
        if (!this.hooks[hook][screen]) return true;

        var handlers = this.hooks[hook][screen];

        for (var i in handlers) {
          if (handlers[i](payload) === false) return false;
        }

        return true;
      }
    }, {
      key: 'inject',

      // ///////////////////////////////////////////////////////////////////// //
      // ////////////////////////////// F O R M S //////////////////////////// //
      // ///////////////////////////////////////////////////////////////////// //

      /**
       * Inject user information into the given form.
       *
       * Note that radio button cannot be handled since we need to have an empty name
       * for gigya to ignore it and radio are name based.
       *
       * @param {jQuery} $form
       */
      value: function inject($form) {
        var user = this.user;
        var $inputs = $form.find('select, input, textarea').filter('[data-rtbf-name]');

        $inputs.each(function () {
          var $input = $(this);
          var type = $input.attr('type') || 'select';
          var name = $input.data('rtbf-name');

          // Handle dotted notation
          var val = user;
          var pieces = name.split('.');
          for (var i in pieces) {
            // Break if missing data.
            if (!val.hasOwnProperty(pieces[i])) {
              val = null;
              break;
            }

            val = val[pieces[i]];
          }

          switch (type) {
            case 'hidden':
            case 'text':
            case 'date':
              $input.val(val);
              break;
            case 'checkbox':
              $input.prop('checked', !!val);
              break;
            case 'select':
              $input.find(':selected').prop('selected', false);
              $input.find('[value="' + val + '"]').prop('selected', true);
              break;
            default:
              console.log('Argh, ' + type + ' is not recognized as a valid field type.');
              break;
          }
        });
      }
    }, {
      key: 'extract',

      /**
       * Extract additional user information from the given form.
       *
       * Note that radio button cannot be handled since we need to have an empty name
       * for gigya to ignore it and radio are name based.
       *
       * @param {jQuery} $form
       */
      value: function extract($form) {
        var user = this.user;
        var $inputs = $form.find('select, input, textarea').filter('[data-rtbf-name]');

        $inputs.each(function () {
          var $input = $(this);
          var type = $input.attr('type') || 'select';
          var name = $input.data('rtbf-name');
          var val = null;

          switch (type) {
            case 'hidden':
            case 'text':
            case 'date':
            case 'select':
              val = $input.val();
              break;
            case 'checkbox':
              val = $input.is(':checked') ? 1 : 0;
              break;
            default:
              console.log('Argh, ' + type + ' is not recognized as a valid field type.');
              break;
          }

          // Handle dotted notation
          var dest = user;
          var pieces = name.split('.');
          var key = pieces.pop();

          for (var i in pieces) {
            dest = dest[pieces[i]];
          }dest[key] = val;
        });
      }
    }, {
      key: 'validate',

      /**
       * Validate the given form
       * @param {jQuery} $form
       */
      value: function validate($form) {
        // Reset form validation classes.
        $form.find('.is-error').removeClass('is-error');
        $form.find('.js-sso-form-invalid').addClass('hidden');

        // Add .is-error on .form-group for invalid fields.
        $form.find('.gigya-error, .js-rtbf-error:visible').closest('.form-group').addClass('is-error');

        // Show form invalid message.
        if ($form.find('.gigya-error').length) {
          $form.find('.js-sso-form-invalid').removeClass('hidden');
        }
      }
    }, {
      key: 'open',

      // ///////////////////////////////////////////////////////////////////// //
      // ///////////////////// U S E R   I N T E R F A C E /////////////////// //
      // ///////////////////////////////////////////////////////////////////// //

      /**
       * Open a screen set.
       * @param {string} set
       * @param {string} container
       * @param {string} screen [optional]
       * @param {Object} options [optional]
       */
      value: function open(set, container, screen) {
        var _this2 = this;

        var options = arguments[3] === undefined ? {} : arguments[3];

        var $container = $('#' + container);

        // If no popup allowed, use the redirect authflow.
        if (!this.popup) {
          var origin = RTBF.location().search('redirect');

          // Add a custom parameter to notify when the POST redirect authflow ends.
          var redirect = RTBF.location(origin).search('authflow_autologin', '1').href;

          options = $.extend(options, {
            authFlow: 'redirect',
            redirectMethod: 'post',
            redirectURL: redirect
          });
        }

        this.gigya.then(function (gigya) {
          gigya.accounts.showScreenSet($.extend({
            screenSet: set,
            startScreen: screen,
            containerID: container,
            onBeforeScreenLoad: function onBeforeScreenLoad(e) {
              var $screen = $('#' + e.nextScreen);
              var $template = $('[data-screenset-element-id=' + e.nextScreen + ']');

              // Ignore if the same screen is already present in the page.
              if ($screen.length) return false;

              return _this2.publish('load', e.nextScreen, {
                $screen: $screen,
                $template: $template,
                $container: $container,
                container: container,
                next: function next() {
                  _this2.open(set, container, e.nextScreen, options);
                }
              });
            },
            onAfterScreenLoad: function onAfterScreenLoad(e) {
              var $screen = $('#' + e.currentScreen);
              var $form = $screen.find('form:first');
              var scope = $container.attr('data-sso-scope') || RTBF.Utils.getQueryParams().scope;
              var isRegisterScreen = e.currentScreen === _this2.context.authentication.screens.register;

              // Adapt the screen for popup style.
              // NOTE: this can't be extracted since it need the container name.
              if (container === _this2.context.popup) {
                $screen.removeClass('is-static').addClass('is-active');

                // Open the popup at the saved offset.
                $screen.children().first().css('top', $container.data('top'));

                // Pause video on the page.
                try {
                  $('body').trigger($.Event('externalPlayerVideoMessage', { action: 'pause' }));
                } catch (e) {
                  _this2.error({
                    code: 500,
                    message: e.message + ' (onAfterScreenLoad)'
                  });
                }
              } else {
                $screen.removeClass('sso-popup--xs');
              }

              // Validate the next tick (let gigya do its part) after submit.
              $form.on('submit', function () {
                setTimeout(function () {
                  _this2.validate($form);
                }, 0);
              });

              // Scroll to view.
              $('html, body').animate({
                scrollTop: $container.data('top') || 0
              }, 0);

              // Inject user data into the form.
              _this2.inject($form);

              // Inject referrer field.
              var $referrer = $form.find('[name="referrer"]');

              if ($referrer.length) {
                var referrer = RTBF.Utils.getQueryParams().redirect;

                // If the container contains a saved referrer.
                if ($container.attr('data-sso-referrer')) {
                  // Get the referrer from the container data.
                  referrer = $container.attr('data-sso-referrer');
                }

                if (!referrer) referrer = window.location.href;

                $referrer.val(referrer);
              }

              // Empty email is always an error except on register screen.
              if (!isRegisterScreen) {
                $form.find('[data-gigya-name="email"]').filter(function () {
                  return $(this).val() === '';
                }).attr('data-required', 'true').removeClass('gigya-valid').addClass('gigya-error');
              }

              var rest = function rest() {
                // Validate the form
                _this2.validate($form);

                // Display dirty notification.
                if (_this2.user && _this2.user.dirty) {
                  (function () {
                    var $dirty = null;

                    for (var i in _this2.user.dirty) {
                      var _name = _this2.user.dirty[i];
                      var $input = $form.find('[data-rtbf-name="' + _name + '"], [data-gigya-name="' + _name + '"]');

                      if ($input.length) {
                        $dirty = $input.closest('.form-group').find('.js-sso-dirty');

                        // Show dirty message.
                        $dirty.removeClass('hidden');
                      }
                    }

                    var callback = function callback() {
                      _this2.user.dirty = [];
                      if ($dirty) $dirty.addClass('hidden');
                      _this2.off('update', callback);
                    };

                    _this2.on('update', callback);
                  })();
                }

                _this2.trigger('screen', e.currentScreen);
                _this2.publish('loaded', e.currentScreen, { $screen: $screen, $form: $form, $container: $container, container: container, scope: scope });
              };

              // Display scoped text.
              // TODO: this is not dependent on the scope but on the site, it could be handled in the screenset api.
              var $text = $screen.find('.js-sso-scope-text[data-sso-scope="' + scope + '"]').removeClass('hidden');

              // If no text use "rtbf" scope.
              if (!$text.length) {
                $screen.find('.js-sso-scope-text[data-sso-scope="rtbf"]').removeClass('hidden');
              }

              if (scope) {
                // Display scoped blocks.
                $screen.find('.js-sso-scope-block[data-sso-scope="' + scope + '"]').removeClass('hidden');

                // Display required field in forms.
                _this2.scope(scope, function (err, data) {
                  if (err) {
                    _this2.trigger('error', {
                      code: err.code,
                      message: err.message + ' (scope)'
                    });
                    return;
                  }

                  // If there is data for the scope (empty data is a valid scope with no requirements)
                  if (data) {
                    // Mark as required scope field.
                    // NOTE: this is a hack to use Gigya form validation, it would be wise
                    //       to refactor this and handle validation completely on our side
                    //       to have a better control on the implementation.
                    $.each(data.required, function (i, field) {
                      var $required = $form.find('[data-gigya-name="' + field + '"]').filter(function () {
                        var $this = $(this);

                        if ($this.is(':radio')) {
                          // Required only if no radio button are checked.
                          return $this.closest('.form-group').find(':checked').length === 0;
                        }

                        if ($this.is(':checkbox')) {
                          return !$this.is(':checked');
                        }

                        return $(this).val() === '';
                      }).attr('data-required', 'true');

                      // Display hidden required fields.
                      $required.parents('.hidden').removeClass('hidden');

                      // Marks as error except on register screen.
                      if (!isRegisterScreen) {
                        $required.removeClass('gigya-valid').addClass('gigya-error');
                      }
                    });
                  }

                  rest();
                });

                return;
              }

              rest();
            },
            onBeforeSubmit: function onBeforeSubmit(e) {
              var $screen = $('#' + e.screen);
              var $form = $screen.find('form:first');

              // Screen list where we are performing the update ourself.
              var updatableScreens = [_this2.context.profile.screens.info, _this2.context.profile.screens.newsletter, _this2.context.profile.screens.portability, _this2.context.profile.screens.affinity];

              if (e.form !== 'gigya-profile-form' || updatableScreens.indexOf(e.screen) === -1) {
                return _this2.publish('submit', e.screen, { $screen: $screen, $form: $form, $container: $container, container: container });
              }

              if (_this2.publish('submit', e.screen, { formData: e.formData, $screen: $screen, $form: $form, $container: $container, container: container })) {
                _this2.extract($form);

                // Map Gigya formData to Rtbf user.
                var mapping = {
                  prefix: 'data.prefix',
                  referrer: 'data.referrer',
                  address: 'profile.address',
                  birthDay: 'profile.birthDay',
                  birthMonth: 'profile.birthMonth',
                  birthYear: 'profile.birthYear',
                  city: 'profile.city',
                  country: 'profile.country',
                  firstname: 'profile.firstName',
                  gender: 'profile.gender',
                  lastname: 'profile.lastName',
                  phone: 'profile.phones.number',
                  zip: 'profile.zip'
                };

                // NOTE: this is necessary to have the correct information for the update call.
                for (var rtbfKey in mapping) {
                  var gigyaKey = mapping[rtbfKey];
                  if (!e.formData.hasOwnProperty(gigyaKey)) {
                    continue;
                  }
                  _this2.user[rtbfKey] = e.formData[gigyaKey];
                }

                _this2.update(function (err) {
                  if (err) {
                    _this2.trigger('error', {
                      code: err.code,
                      message: err.message + ' (update)'
                    });
                    return;
                  }

                  _this2.publish('submitted', e.screen, { $screen: $screen, $form: $form, $container: $container, container: container });
                });
              }

              return false;
            },
            onAfterSubmit: function onAfterSubmit(e) {
              var $screen = $('#' + e.screen);
              var $form = $screen.find('form:first');

              // Ignore error submit.
              if (e.response.errorCode) return;

              _this2.publish('submitted', e.screen, { $screen: $screen, $form: $form, $container: $container, container: container });
            },
            onFieldChanged: function onFieldChanged(e) {
              var $screen = $('#' + e.screen);
              var $form = $screen.find('form:first');
              // validate the next tick (let gigya do its part) after change.
              setTimeout(function () {
                _this2.validate($form);
              }, 0);

              _this2.publish('fieldChanged', e.screen, { $screen: $screen, $form: $form, $container: $container, container: container });
            }
          }, options));
        });
      }
    }, {
      key: 'close',

      /**
       * Close a screen set.
       * @param {string} set
       * @param {string} container
       */
      value: function close(set, container) {
        if (!container) {
          for (var i in this.context) {
            this.close(this.context[i].set, set);
          }return;
        }

        this.gigya.then(function (gigya) {
          gigya.accounts.hideScreenSet({
            set: set,
            containerID: container
          });
        });
      }
    }, {
      key: 'showLoginScreen',

      /**
       * Show the login screen.
       * @param {string} container
       */
      value: function showLoginScreen(container) {
        this.open(this.context.authentication.set, container, this.context.authentication.screens.login);
      }
    }, {
      key: 'showRegisterScreen',

      /**
       * Show the register screen.
       * @param {string} container
       */
      value: function showRegisterScreen(container) {
        this.open(this.context.authentication.set, container, this.context.authentication.screens.register, {
          customLang: {
            email_already_exists: 'Vous êtes déjà inscrit avec cette adresse mail. Connectez-vous'
          }
        });
      }
    }, {
      key: 'showVerifiedScreen',

      /**
       * Show the register screen.
       * @param {string} container
       */
      value: function showVerifiedScreen(container) {
        var _this3 = this;

        // Clean previous user in case of login with an other account.
        this.clean();

        this.refresh(false, function (err) {
          // If impossible to connect or there is no regToken (therefore an error occured)
          if (err || !RTBF.Utils.getQueryParams().regToken) {
            _this3.open(_this3.context.authentication.set, container, _this3.context.authentication.screens.error);
            return;
          }

          _this3.open(_this3.context.authentication.set, container, _this3.context.authentication.screens.verified);
        });
      }
    }, {
      key: 'showResetScreen',

      /**
       * Show the reset screen.
       * @param {string} container
       */
      value: function showResetScreen(container) {
        this.open(this.context.authentication.set, container, this.context.authentication.screens.reset);
      }
    }, {
      key: 'showFinalizeScreen',

      /**
       * Show the finalize screen.
       * @param {string} container
       */
      value: function showFinalizeScreen(container) {
        this.open(this.context.authentication.set, container, this.context.authentication.screens.finalize);
      }
    }, {
      key: 'showInfoScreen',

      /**
       * Show the profile screen.
       * @param {string} container
       */
      value: function showInfoScreen(container) {
        var _this4 = this;

        this.refresh(true, function (err) {
          if (err) {
            _this4.trigger('error', {
              code: err.code,
              message: err.message + ' (info)'
            });
            return;
          }

          _this4.open(_this4.context.profile.set, container, _this4.context.profile.screens.info);
        });
      }
    }, {
      key: 'showChangePasswordScreen',

      /**
       * Show the change password screen.
       * @param {string} container
       */
      value: function showChangePasswordScreen(container) {
        this.open(this.context.profile.set, container, this.context.profile.screens.change_password);
      }
    }, {
      key: 'showPortabilityScreen',

      /**
       * Show the portability screen.
       * @param {string} container
       */
      value: function showPortabilityScreen(container) {
        this.open(this.context.profile.set, container, this.context.profile.screens.portability);
      }
    }, {
      key: 'showParentalControlScreen',

      /**
       * Show the parental control screen.
       * @param {string} container
       */
      value: function showParentalControlScreen(container) {
        var _this5 = this;

        this.refresh(this.complete, function (err) {
          if (err) {
            _this5.trigger('error', {
              code: err.code,
              message: err.message + ' (parental_control)'
            });
            return;
          }

          _this5.open(_this5.context.profile.set, container, _this5.context.profile.screens.parental_control);
        });
      }
    }, {
      key: 'showAffinityScreen',

      /**
       * Show the affinity screen.
       * @param {string} container
       */
      value: function showAffinityScreen(container) {
        this.open(this.context.profile.set, container, this.context.profile.screens.affinity);
      }
    }, {
      key: 'showNewsletterScreen',

      /**
       * Show the newsletter screen.
       * @param {string} container
       */
      value: function showNewsletterScreen(container) {
        var _this6 = this;

        this.refresh(true, function (err, user) {
          if (err) {
            _this6.trigger('error', {
              code: err.code,
              message: err.message + ' (newsletter)'
            });
            return;
          }

          // Show the error screen if the user newsletters are missing.
          if (!user.newsletters) {
            _this6.open(_this6.context.authentication.set, container, _this6.context.authentication.error);
            return;
          }

          _this6.open(_this6.context.profile.set, container, _this6.context.profile.screens.newsletter);
        });
      }
    }, {
      key: 'showSwitchScreen',
      value: function showSwitchScreen(container) {
        this.open(this.context.authentication.set, container, this.context.authentication.screens['switch']);
      }
    }, {
      key: 'showErrorScreen',

      /**
       * Show the error screen.
       */
      value: function showErrorScreen(container) {
        this.open(this.context.authentication.set, container, this.context.authentication.screens.error);
      }
    }, {
      key: 'showRegistrationScreen',

      /**
       * Continue the registration process.
       *
       * NOTE: This is used in facebook inApp browser.
       *
       * @param {string} errorCode
       * @param {string} regToken
       * @param {string} container
       */
      value: function showRegistrationScreen(errorCode, regToken, container) {
        var screens = {
          206001: this.context.authentication.screens.register_complete,
          206002: this.context.authentication.screens.login_pending,
          403043: this.context.authentication.screens.link
        };

        var screen = screens[errorCode];

        // If no screen, trigger an error and do nothing.
        if (!screen) {
          this.trigger('error', {
            code: 500,
            message: 'Unexpected errorCode [' + errorCode + '] (registration)'
          });
          return;
        }

        this.open(this.context.authentication.set, container, screen, {
          regToken: regToken
        });
      }
    }, {
      key: 'access',

      /**
       * Open the access popup.
       *
       * - access(register, redirect, scope, cb);
       * - access(redirect, scope, cb);
       * - access(scope, cb);
       * - access(cb);
       *
       * NOTE: if no popups are allowed, the callback is never called!
       *
       * @param {boolean} register [optional]
       * @param {string} redirect [optional]
       * @param {string} scope [optional]
       * @param {Function} cb
       */
      value: function access(register, redirect, scope, cb) {
        var _this7 = this;

        // Handle optional parameters.
        if (arguments.length < 2) {
          cb = register;
          scope = null;
          redirect = null;
          register = false;
        } else if (arguments.length < 3) {
          cb = redirect;
          scope = register;
          redirect = null;
          register = false;
        } else if (arguments.length < 4) {
          cb = scope;
          scope = redirect;
          redirect = register;
          register = false;
        }

        var $popup = $('#' + this.context.popup);
        var onLogin = false;
        var onUpdate = false;

        // Do nothing if already open.
        if ($popup.data('open')) {
          this.queue.push(function () {
            _this7.access(register, redirect, scope, cb);
          });

          return;
        }

        // Mark as open.
        $popup.data('open', true);

        // Set the referrer in popup data.
        if (redirect) $popup.attr('data-sso-referrer', redirect);else $popup.removeAttr('data-sso-referrer');

        // Set the scope in popup data.
        if (scope) $popup.attr('data-sso-scope', scope);else $popup.removeAttr('data-sso-scope');

        // Set the top offset in popup data.
        $popup.data('top', $(window).scrollTop());

        // Redirect to access page.
        var settle = function settle() {
          var location = RTBF.location();

          // If already on access page, do nothing.
          if (location.pathname === '/acces') {
            return;
          }

          var href = RTBF.location('/acces').search('redirect', window.location.href).search('scope', scope).search('register', register ? '1' : '0').href;

          window.location.href = href;
        };

        // Open the login/register popup if necessary.
        var connect = function connect(next) {
          _this7.fetch(function (err) {
            if (err) {
              // Unrecoverable error.
              if (err.code !== ERROR_CODE_UNAUTHORIZED) {
                next(err);
                return;
              }

              // If no popup allowed, use the redirect authflow.
              if (!_this7.popup) {
                settle();
                return;
              }

              _this7.screenset(_this7.context.authentication.name, function (err) {
                if (err) {
                  next(err);
                  return;
                }

                if (register) {
                  _this7.showRegisterScreen(_this7.context.popup);
                } else {
                  _this7.showLoginScreen(_this7.context.popup);
                }

                onLogin = function () {
                  _this7.close(_this7.context.authentication.set, _this7.context.popup);
                  _this7.off('login', onLogin);
                  next();
                };

                _this7.on('login', onLogin);
              });

              return;
            }

            next();
          });
        };

        // Open the profile popup if necessary.
        var satisfy = function satisfy(next) {
          // Do nothing if empty scope.
          if (!scope) {
            next();
            return;
          }

          request('GET', _this7.apis.satisfy, {
            scope: scope
          }, function (err, granted) {
            if (err) {
              next(err);
              return;
            }

            if (!granted) {
              // If no popup allowed, use the redirect authflow.
              if (!_this7.popup) {
                settle();
                return;
              }

              _this7.screenset(_this7.context.profile.name, function (err) {
                if (err) {
                  next(err);
                  return;
                }

                _this7.showInfoScreen(_this7.context.popup);

                onUpdate = function () {
                  _this7.close(_this7.context.profile.set, _this7.context.popup);
                  _this7.off('update', onUpdate);
                  next();
                };

                _this7.on('update', onUpdate);
              });

              return;
            }

            next();
          });
        };

        // Close popups.
        var close = function close() {
          if (onLogin) {
            _this7.close(_this7.context.authentication.set, _this7.context.popup);
            _this7.off('login', onLogin);
          }

          if (onUpdate) {
            _this7.close(_this7.context.profile.set, _this7.context.popup);
            _this7.off('update', onUpdate);
          }

          $('html').off('.sso');
          $popup.data('open', false);

          // Dequeue the access request queue.
          if (!_this7.queue.length) return;
          _this7.queue.shift()();
        };

        // Listen to close button.
        $('html').on('click.sso', '.js-sso-popup-close', function (e) {
          e.preventDefault();

          close();

          // eslint-disable-next-line standard/no-callback-literal
          cb({
            code: ERROR_CODE_CLIENT_CLOSED_REQUEST,
            message: 'Closed'
          });
        });

        // ///////////////////////////
        // Access control process. //
        // ///////////////////////////

        // Check user connection status.
        connect(function (err) {
          if (err) {
            // Retry if logout.
            if (err.code === ERROR_CODE_UNAUTHORIZED) {
              _this7.user = null;
              close();
              _this7.access(scope, cb);
              return;
            }

            close();
            cb(err);
            return;
          }

          // Check user scope status.
          satisfy(function (err) {
            if (err) {
              // Retry if logout.
              if (err.code === ERROR_CODE_UNAUTHORIZED) {
                _this7.user = null;
                close();
                _this7.access(scope, cb);
                return;
              }

              close();
              cb(err);
              return;
            }

            close();
            cb();
          });
        });
      }
    }, {
      key: 'data',

      // ///////////////////////////////////////////////////////////////////// //
      // ////////////////////////////// D A T A ////////////////////////////// //
      // ///////////////////////////////////////////////////////////////////// //

      /**
       * Get the last known connected user information.
       *
       * This is a synchronous version of `fetch` and might contains obselete data.
       * Use carefully for non-sensitive information.
       *
       * @return {string}
       */
      value: function data() {
        return this.user || store.get('sso');
      }
    }, {
      key: 'isConnected',

      /**
       * Return true if the user is connected.
       *
       * NOTE: This is known to be problematic at start up time.
       *       Either wait a user action before using it or use `fetch` instead.
       *
       * @returns {boolean}
       */
      value: function isConnected() {
        return !!$.cookie(this.gigyaCookieName);
      }
    }, {
      key: 'uid',

      /**
       * Get the user id
       * @return {string}
       */
      value: function uid() {
        var uid = null;

        // If user logged, the user id is the gigya id.
        var data = this.data();

        if (data) {
          uid = data.gigyaId;
          return uid;
        }

        // Retrieve from the localstorage
        uid = store.get('sso.uid');

        // If no uid defined, generate one and saved it in the localstorage
        if (!uid) {
          uid = RTBF.Utils.uuid();

          try {
            store.set('sso.uid', uid);
          } catch (e) {
            // private browsing ¯\_(ツ)_/¯
            uid = PRIVATE_NAVIGATION;
          }
        }

        return uid;
      }
    }, {
      key: 'sid',

      /**
       * Get the session id.
       * @return {string}
       */
      value: function sid() {
        var sid = null;

        // Retrieve from the sessionStorage
        if (sessionStorage) {
          sid = sessionStorage.getItem('sso.sid');
        }

        // If no sid defined, generate one and saved it in the sessionStorage
        if (!sid) {
          sid = RTBF.Utils.uuid();

          try {
            sessionStorage.setItem('sso.sid', sid);
          } catch (e) {
            // private browsing ¯\_(ツ)_/¯
            sid = PRIVATE_NAVIGATION;
          }
        }

        return sid;
      }
    }, {
      key: 'remember',

      /**
       * Set the remember me.
       * @param {boolean} forever
       */
      value: function remember(forever) {
        var data = {
          name: this.gigyaCookieName,
          value: $.cookie(this.gigyaCookieName),
          params: {
            domain: '.rtbf.be',
            expires: forever ? endOfTime : null,
            path: '/'
          }
        };

        $.cookie(data.name, data.value, data.params);
        this.trigger('cookie-remember', data);
      }
    }, {
      key: 'clean',

      /**
       * Clean user information and cache.
       */
      value: function clean() {
        this.user = null;

        try {
          store.remove('sso');
        } catch (e) {}
      }
    }, {
      key: 'clear',

      /**
       * Clear user information, cache, cookie and uid/sid.
       */
      value: function clear() {
        this.clean();

        try {
          store.remove('sso.uid');

          if (sessionStorage) {
            sessionStorage.removeItem('sso.sid');
          }
        } catch (e) {}

        this.trigger('data', { from: 'clear' });
        this.broadcast(window);
      }
    }, {
      key: 'login',

      // ///////////////////////////////////////////////////////////////////// //
      // /////////////////////////////// A P I /////////////////////////////// //
      // ///////////////////////////////////////////////////////////////////// //

      /**
       * Login the current user.
       *
       * NOTE: The gigya call is performed using the form and not the apis (see showLoginScreen).
       *       Therefore you can use this method only if the user is logged in with Gigya.
       *
       * @param {string} uid
       * @param {string} signature
       * @param {string} timestamp
       * @param {boolean} complete
       * @param {Function} cb
       */
      value: function login(uid, signature, timestamp, complete, cb) {
        var _this8 = this;

        request('POST', this.apis.login, {
          gigyaId: uid,
          signature: signature,
          timestamp: timestamp
        }, function (err) {
          if (err) {
            cb(err);
            return;
          }

          // clear user informations.
          _this8.clear();

          // Fetch data to ensure the login was performed correctly.
          //
          // NOTE: Consider the following workflow
          //
          //       fetch -> refresh -> fresh -> autologin -> login -> refresh
          //
          //       The second refresh is queued and doesn't actually trigger a request.
          //       Therefore, a fresh is required here.
          _this8.fresh(complete, function (err, user) {
            if (err) {
              cb(err);
              return;
            }

            _this8.trigger('login');
            cb(null, user);
          });
        });
      }
    }, {
      key: 'autologin',

      /**
       * Autologin the current user.
       *
       * NOTE: This method can only be used if the user is logged in with Gigya (see login).
       *
       * @param {Object} cookie The name and value of the session cookie. [optional]
       * @param {boolean} complete [optional]
       * @param {Function} cb
       */
      value: function autologin(cookie, complete, cb) {
        var _this9 = this;

        // Handle optional parameters.
        if (arguments.length < 2) {
          cb = cookie;
          complete = null;
          cookie = null;
        } else if (arguments.length < 3) {
          cb = complete;
          complete = cookie;
          cookie = null;
        }

        if (cookie) {
          var data = {
            name: cookie.name,
            value: cookie.value,
            params: {
              domain: '.rtbf.be',
              expires: endOfTime,
              path: '/'
            }
          };

          $.cookie(data.name, data.value, data.params);
          this.trigger('cookie-finalize', data);
        }

        this.gigya.then(function (gigya) {
          var cookies = document.cookie;
          gigya.accounts.getAccountInfo({
            callback: function callback(response) {
              if (response.errorCode) {
                _this9.trigger('error-autologin-gigya', {
                  response: response,
                  cookiesBefore: cookies,
                  cookiesAfter: document.cookie
                });
                // eslint-disable-next-line standard/no-callback-literal
                cb({
                  code: ERROR_CODE_UNAUTHORIZED,
                  message: 'Error Gigya getAccountInfo: ' + response.errorMessage + '[' + response.errorCode + ']'
                });
                return;
              }

              _this9.login(response.UID, response.UIDSignature, response.signatureTimestamp, complete, function (err, user) {
                if (err) {
                  cb(err);
                  return;
                }

                _this9.trigger('autologin');
                cb(err, user);
              });
            }
          });
        });
      }
    }, {
      key: 'logout',

      /**
       * Logout the current user.
       * @param {Function} cb
       *
       * Note that, whereas the login calls Gigya api first then
       * RTBF api, the logout calls RTBF api first and then Gigya.
       *
       * Gigya Login -> RTBF Login -> RTBF Logout -> Gigya Logout
       *
       * This is to avoid inconsistant state where the user is logged
       * out on Gigya side but still logged in on RTBF side.
       * This case is problematic because the PHP api will still respond
       * with user information but the JS api will not therefore creating
       * a weird state where the user can acces his account page but can't
       * see or modify anything.
       */
      value: function logout(cb) {
        var _this10 = this;

        request('POST', this.apis.logout, {}, function (err) {
          if (err) {
            cb(err);
            return;
          }

          _this10.gigya.then(function (gigya) {
            gigya.accounts.logout({
              callback: function callback(response) {
                if (response.errorCode) {
                  // eslint-disable-next-line standard/no-callback-literal
                  cb({
                    code: ERROR_CODE_SERVICE_UNAVAILABLE,
                    message: 'Error Gigya Logout: ' + response.errorMessage + '[' + response.errorCode + ']'
                  });

                  return;
                }

                // Clear user informations.
                _this10.clear();
                _this10.trigger('logout');

                cb();
              }
            });
          });
        });
      }
    }, {
      key: 'fetch',

      /**
       * Get the connected user information.
       *
       * This method returns a cached version if possible and refresh it otherwhise.
       *
       * @param {boolean} complete [optional]
       * @param {Function} cb
       */
      value: function fetch(complete, cb) {
        // Handle optional parameters.
        if (arguments.length < 2) {
          cb = complete;
          complete = false;
        }

        // Avoid making request if not connected.
        if (!this.isConnected()) {
          // eslint-disable-next-line standard/no-callback-literal
          cb({
            code: ERROR_CODE_UNAUTHORIZED,
            message: 'Anonymous'
          });
          return;
        }

        // If there is a cached user matching the mode, returns immediatly.
        if (this.user && (!complete || this.complete)) {
          cb(null, this.user);
          return;
        }

        this.refresh(complete, cb);
      }
    }, {
      key: 'refresh',

      /**
       * Refresh the connected user information.
       *
       * Trigger a request for a fresh user using a promise to only have one concurrent request at most.
       *
       * @param {boolean} complete
       * @param {Function} cb
       */
      value: function refresh(complete, cb) {
        var _this11 = this;

        // If already a promise and no complete or already in complete mode, queue the request.
        if (this.promise && (!complete || this.complete)) {
          this.promise.then(cb);
          return;
        }

        // Mark as complete mode.
        if (complete) {
          this.complete = true;
        }

        // Create a new promise.
        var promise = $.Deferred();

        // Save the promise.
        this.promise = promise;

        // Clean the promise on resolve.
        this.promise.then(function () {
          if (_this11.promise !== promise) return;
          _this11.promise = null;
        });

        // Chain the callback.
        this.promise.then(cb);

        // Fetch a fresh user.
        this.fresh(complete, function (err, user) {
          if (err) {
            // Clear user information to simulate a logout after an error.
            // NOTE: Just clean on client side error (no error code) and hope for a smooth recovering.
            if (err.code) {
              _this11.clear();
            } else {
              _this11.clean();
            }

            promise.resolve(err);
            return;
          }

          // Cache results only if no cached user or the result is complete and is worth an overwrite.
          if (!_this11.user || complete || !_this11.complete) {
            _this11.user = user;
            _this11.user.dirty = [];
            _this11.user.timestamp = Date.now();
            _this11.user.isComplete = complete;

            try {
              store.set('sso', user);
            } catch (e) {}
          }

          _this11.trigger('data', { from: 'fresh' });
          _this11.broadcast(window);

          promise.resolve(null, user);
        });
      }
    }, {
      key: 'fresh',

      /**
       * Get a fresh user information.
       * @param {boolean} complete
       * @param {Function} cb
       */
      value: function fresh(complete, cb) {
        var _this12 = this;

        var data = {};

        if (complete) {
          data.complete = 1;
        }

        request('GET', this.apis.fetch, data, function (err, user) {
          // If session is outdated, try to auto-log
          if (err && err.code === ERROR_CODE_UNAUTHORIZED) {
            _this12.trigger('error-fresh', { err: err });

            _this12.autologin(complete, function (err, user) {
              if (err) {
                cb(err);
                return;
              }

              cb(err, user);
            });

            return;
          }

          cb(err, user);
        });
      }
    }, {
      key: 'update',

      /**
       * Update the additional user information.
       * @param {Function} cb
       */
      value: function update(cb) {
        var _this13 = this;

        var source = RTBF.Utils.getQueryParams().source || $('body').data('site') + '_account';

        request('POST', this.apis.update, Object.assign({}, this.user, {
          _source: source,
          _referrer: document.referrer
        }), function (err) {
          if (err) {
            cb(err);
            return;
          }

          // Refresh the user
          _this13.refresh(_this13.complete, function (err) {
            if (err) {
              cb(err);
              return;
            }

            _this13.trigger('update');
            cb();
          });
        });
      }
    }, {
      key: 'thumbnail',

      /**
       * Update the user thumbnail.
       * @param {File} file
       * @param {Function} cb
       */
      value: function thumbnail(file, cb) {
        var _this14 = this;

        // Don't even try after 3MB to avoid freezing the browser (gigya takes a long time processing the request)
        if (!file.size || file.size / 1024 / 1024 > 3) {
          // eslint-disable-next-line standard/no-callback-literal
          cb({
            code: ERROR_CODE_SERVICE_UNAVAILABLE,
            message: 'File too large.'
          });
          return;
        }

        var reader = new FileReader();

        reader.onload = function (e) {
          _this14.gigya.then(function (gigya) {
            gigya.accounts.setProfilePhoto({
              photoBytes: e.target.result.replace(/^data:image\/(.*?);base64,/, ''),
              publish: true,
              callback: function callback(response) {
                if (response.errorCode) {
                  // eslint-disable-next-line standard/no-callback-literal
                  cb({
                    code: ERROR_CODE_SERVICE_UNAVAILABLE,
                    message: 'Error Gigya on SetProfilePhoto: ' + response.errorMessage + '[' + response.errorCode + ']'
                  });

                  return;
                }

                _this14.refresh(_this14.complete, function () {
                  cb();
                });
              }
            });
          });
        };

        reader.readAsDataURL(file);
      }
    }, {
      key: 'reset',

      /**
       * Reset the password.
       * @param {string} token
       * @param {string} password
       * @param {Function} cb
       */
      value: function reset(token, password, cb) {
        var _this15 = this;

        this.gigya.then(function (gigya) {
          gigya.accounts.resetPassword({
            passwordResetToken: token,
            newPassword: password,
            callback: function callback(response) {
              if (response.errorCode) {
                // eslint-disable-next-line standard/no-callback-literal
                cb({
                  code: ERROR_CODE_UNAUTHORIZED,
                  message: 'Error Gigya resetPassword: ' + response.errorMessage + '[' + response.errorCode + ']'
                });
                return;
              }

              // Gigya invalid the user credentials, therefore we logout the user.
              _this15.logout(function () {
                cb();
              });
            }
          });
        });
      }
    }, {
      key: 'finalize',

      /**
       * Finalize the registration.
       * @param {string} token
       * @param {string} password
       * @param {Function} cb
       */
      value: function finalize(token, password, cb) {
        request('POST', this.apis.finalize, {
          token: token,
          password: password
        }, cb);
      }
    }, {
      key: 'delete',

      /**
       * Delete the current user.
       * @param {Function} cb
       */
      value: function _delete(cb) {
        var _this16 = this;

        request('POST', this.apis['delete'], {
          gigyaId: this.user.gigyaId
        }, function (err) {
          if (err) {
            cb(err);
            return;
          }

          // Clear user informations.
          _this16.clear();

          cb();
        });
      }
    }, {
      key: 'scope',

      /**
       * Retrieve scope information.
       * @param {string} scope
       * @param {Function} cb
       */
      value: function scope(_scope, cb) {
        var _this17 = this;

        // Already fetched.
        if (typeof this.scopes[_scope] !== 'undefined') {
          cb(null, this.scopes[_scope]);
          return;
        }

        request('GET', this.apis.scope, {
          scope: _scope
        }, function (err, data) {
          if (err) {
            cb(err);
            return;
          }

          _this17.scopes[_scope] = data;

          cb(null, data);
        });
      }
    }, {
      key: 'screenset',

      /**
       * Load screenset into the page.
       * @param {string} set
       * @param {Function} cb
       */
      value: function screenset(set, cb) {
        var $set = $('#' + this.context[set].set);

        // Already loaded screens.
        if ($set.hasClass('is-loaded')) {
          cb();
          return;
        }

        request('GET', this.apis.screenset, {
          set: set
        }, function (err, response) {
          if (err) {
            cb(err);
            return;
          }

          // Parse html.
          var $screens = $(response.html).children();

          $screens.each(function () {
            var $screen = $(this);
            var $prev = $set.children('#' + $screen.attr('id'));

            // Remove previous version of the screen.
            if ($prev.length) $prev.remove();

            // Insert screens into screenset.
            $set.append($screen);
          });

          // Load CSS
          RTBF.loader.css(response.css, function () {
            // Load JS
            RTBF.loader.js(response.js, function () {
              // Mark as loaded.
              $set.addClass('is-loaded');

              cb();
            });
          });
        });
      }
    }, {
      key: 'jwt',

      /**
       * Get a JSON Web Token for the connected user.
       * @param {Function} cb
       */
      value: function jwt(cb) {
        this.gigya.then(function (gigya) {
          gigya.accounts.getJWT({
            callback: function callback(response) {
              if (response.errorCode) {
                // eslint-disable-next-line standard/no-callback-literal
                cb({ code: response.errorCode, message: 'gigya getJWT error: ' + response.errorMessage });
                return;
              }

              var _response$id_token$split = response.id_token.split('.');

              var _response$id_token$split2 = _slicedToArray(_response$id_token$split, 2);

              var content = _response$id_token$split2[1];

              var decodedContent = JSON.parse(atob(content));

              cb(null, response.id_token, decodedContent.exp);
            }
          });
        });
      }
    }, {
      key: 'enrich',

      /**
       * Set the enrichment.
       * @param {string} action
       * @param {string} resource
       * @param {boolean} dismiss
       * @param {Function} cb
       */
      value: function enrich(action, resource, dismiss, cb) {
        var _this18 = this;

        var params = {
          action: action,
          resource: resource,
          dismiss: dismiss ? 1 : 0
        };

        request('POST', this.apis.enrich, params, function (err) {
          if (err) {
            cb(err);
            return;
          }

          // Refresh the user
          _this18.refresh(_this18.complete, function (err) {
            if (err) {
              cb(err);
              return;
            }

            cb();
          });
        });
      }
    }, {
      key: 'affinities',

      /**
       * Update the affinities of a user
       * @param affinities
       * @param cb
       */
      value: function affinities(_affinities, cb) {
        // erase previous content with fresh content
        RTBF.sso.user.enrichAffinities = _affinities;

        RTBF.sso.update(function (err) {
          if (err) {
            // If this happens it means we have access to a restricted page without being connected.
            cb(err);
            return;
          }

          cb();
        });
      }
    }, {
      key: 'sendSmsCode',

      /**
       * Send sms code.
       * @param {Function} cb
       */
      value: function sendSmsCode(cb) {
        request('POST', this.apis.otp.generate, {}, function (err, response) {
          if (err) {
            cb(err);
            return;
          }

          try {
            // Save the current otp id.
            store.set('sso.otpId', response.id);
          } catch (e) {}

          cb();
        });
      }
    }, {
      key: 'verifySmsCode',

      /**
       * Verify sms code.
       * @param {string} code
       * @param {Function} cb
       */
      value: function verifySmsCode(code, cb) {
        var _this19 = this;

        request('POST', this.apis.otp.verify, {
          id: store.get('sso.otpId'),
          code: code
        }, function (err, response) {
          if (err) {
            cb(err);
            return;
          }

          if (response.valid) {
            try {
              // Reset the save otp id.
              store.remove('sso.otpId');
            } catch (e) {}
          }

          // Refresh the user
          _this19.refresh(_this19.complete, function (err) {
            if (err) {
              cb(err);
              return;
            }

            cb(null, response.valid);
          });
        });
      }
    }, {
      key: 'exitOtpId',

      /**
       * WTF is this ? exists maybe ?
       */
      value: function exitOtpId() {
        return !!store.get('sso.otpId');
      }
    }, {
      key: 'checkPin',

      /**
       * Check PIN.
       * @param {String} pin
       * @param {Function} cb
       */
      value: function checkPin(pin, cb) {
        var capping = store.get(PIN_CAPPING_KEY) || {};
        var count = capping.count || 0;
        var at = capping.at || 0;

        if (at + PIN_CAPPING_SPAN < Date.now()) {
          count = 0;
        }

        if (count >= PIN_CAPPING_MAX) {
          // eslint-disable-next-line standard/no-callback-literal
          cb({
            code: ERROR_CODE_TOO_MANY_REQUESTS,
            message: 'PIN capping reached'
          });
          return;
        }

        store.set(PIN_CAPPING_KEY, {
          count: ++count,
          at: at || Date.now()
        });

        if (this.user.pin !== pin) {
          // Display the capping error instead of invalid pin at the 3rd try.
          if (count >= PIN_CAPPING_MAX) {
            // eslint-disable-next-line standard/no-callback-literal
            cb({
              code: ERROR_CODE_TOO_MANY_REQUESTS,
              message: 'PIN capping reached'
            });
            return;
          }

          // eslint-disable-next-line standard/no-callback-literal
          cb({
            code: ERROR_CODE_FORBIDDEN,
            message: 'Invalid PIN'
          });
          return;
        }

        // Reset PIN capping.
        store.remove(PIN_CAPPING_KEY);

        cb();
      }
    }, {
      key: 'createPin',

      /**
       * Create a new PIN.
       * @param {String} pin
       * @param {Function} cb
       */
      value: function createPin(pin, cb) {
        var _this20 = this;

        request('POST', this.apis.pin.create, {
          pin: pin
        }, function (err, response) {
          if (err) {
            cb(err);
            return;
          }

          _this20.refresh(_this20.complete, cb);
        });
      }
    }, {
      key: 'changePin',

      /**
       * Change the user PIN.
       * @param {String} cb
       */
      value: function changePin(pin, cb) {
        var _this21 = this;

        var saved = this.user.pin;

        this.user.pin = pin;

        this.update(function (err) {
          if (err) {
            _this21.user.pin = saved;
            cb(err);
            return;
          }

          // Reset PIN capping.
          store.remove(PIN_CAPPING_KEY);

          cb();
        });
      }
    }, {
      key: 'resetPin',

      /**
       * Reset the user PIN.
       * @param {Function} cb
       */
      value: function resetPin(cb) {
        var _this22 = this;

        request('POST', this.apis.pin.reset, {}, function (err, response) {
          if (err) {
            cb(err);
            return;
          }

          _this22.refresh(_this22.complete, function (err) {
            if (err) {
              cb(err);
              return;
            }

            // Reset PIN capping.
            store.remove(PIN_CAPPING_KEY);

            cb();
          });
        });
      }
    }, {
      key: 'changeParentalControl',

      /**
       * Change parental control.
       * @param {String} parentalControl
       * @param {Function} cb
       */
      value: function changeParentalControl(parentalControl, cb) {
        var _this23 = this;

        var savedParentalControl = this.user.parentelControl;
        var savedParentalControlDisabled = this.user.parentalControlDisabled;

        this.user.parentalControl = parentalControl;
        this.user.parentalControlDisabled = null;

        this.update(function (err) {
          if (err) {
            _this23.user.parentalControl = savedParentalControl;
            _this23.user.parentalControl = savedParentalControlDisabled;
            cb(err);
            return;
          }

          cb();
        });
      }
    }, {
      key: 'disableParentalControl',

      /**
       * Disable the parental control.
       * @param {Function} cb
       */
      value: function disableParentalControl(cb) {
        var _this24 = this;

        // Disable for 3h.
        this.user.parentalControlDisabled = RTBF.Utils.dateToW3C(new Date(Date.now() + PARENTAL_CONTROL_DISABLED_INTERVAL));

        this.update(function (err) {
          if (err) {
            _this24.user.parentalControlDisabled = null;
            cb(err);
            return;
          }

          cb();
        });
      }
    }, {
      key: 'error',

      /**
       * Log an error.
       * @param {Object} err
       */
      value: function error(err) {
        this.logger.error(err.message, {
          code: err.code,
          uid: this.uid(),
          data: err.data
        });
      }
    }]);

    return Sso;
  })();

  sso = new Sso();

  // Export error codes.
  sso.ERROR_CODE_UNAUTHORIZED = ERROR_CODE_UNAUTHORIZED;
  sso.ERROR_CODE_FORBIDDEN = ERROR_CODE_FORBIDDEN;
  sso.ERROR_CODE_TOO_MANY_REQUESTS = ERROR_CODE_TOO_MANY_REQUESTS;
  sso.ERROR_CODE_NO_RESPONSE = ERROR_CODE_NO_RESPONSE;
  sso.ERROR_CODE_CLIENT_CLOSED_REQUEST = ERROR_CODE_CLIENT_CLOSED_REQUEST;
  sso.ERROR_CODE_SERVICE_UNAVAILABLE = ERROR_CODE_SERVICE_UNAVAILABLE;

  // Temporary fix for inclusion order (wait for gigya).
  $(function () {
    sso.initialize();

    // Listen for click on restricted link.
    $('body').on('click', '.js-sso-restricted', function (e) {
      e.preventDefault();

      var $link = $(this);

      // If the elem is only a wrapper.
      if (!$link.is('[href], [data-sso-redirect], [data-sso-scope]')) {
        $link = $link.find('[href], [data-sso-redirect], [data-sso-scope]');
      }

      var redirect = $link.attr('href') || $link.attr('data-sso-redirect');
      var scope = $link.attr('data-sso-scope');

      sso.access(redirect, scope, function (err) {
        if (err) return;
        window.location.href = redirect;
      });
    });

    // Load iframe after subscription if needed
    var src = RTBF.Utils.getQueryParams().iframe_src;
    var id = RTBF.Utils.getQueryParams().iframe_id;

    if (src && id) {
      $('#' + id).attr('src', src);
    }
  });

  return sso;
});
// Open the error screen in the popup.
// NOTE: This is not robust enought to be live (false positive).
// this.showErrorScreen(this.context.error);

// Not an RTBF iframe.

// Not an RTBF iframe.

// ios in private browsing ¯\_(ツ)_/¯

// ios in private browsing ¯\_(ツ)_/¯

// private browsing ¯\_(ツ)_/¯

// private browsing ¯\_(ツ)_/¯

// ios in private browsing ¯\_(ツ)_/¯
;
// File: /js/news/common/public/static/js/RTBF/sso-debug.js
$(function () {
  /* globals RTBF, $, store, gigya */

  var MAX = 5;
  var logger = RTBF.debug.logger('sso').remote();
  var pageStart = window.performance.timing ? window.performance.timing.domInteractive : null;
  var $body = $('body');

  var entry = {
    canonical: window.location.href,
    gigyaCookieName: RTBF.sso.gigyaCookieName,
    gigyaCookie: $.cookie(RTBF.sso.gigyaCookieName),
    phpsessidCookie: $.cookie('PHPSESSID'),
    cookies: document.cookie,
    pageStart: pageStart,
    connected: RTBF.sso.isConnected(),
    ssoUid: RTBF.sso.uid(),
    events: []
  };

  var save = function save(entry) {
    var history = store.get('sso.history') || [];

    history.push(entry);

    if (history.length > MAX) {
      history.shift();
    }

    store.set('sso.history', history);
  };

  var amend = function amend(entry) {
    var history = store.get('sso.history');
    var index = history.length - 1;

    history[index < 0 ? 0 : index] = entry;
    store.set('sso.history', history);
  };

  var buildEvent = function buildEvent(type, data) {
    var event = {};

    event[type] = data; // event type first or unreadable in console
    event.timing = window.performance.now();
    event.cookies = document.cookie;
    event.ssoUid = RTBF.sso.uid();

    return event;
  };

  // quick fix no log from embed
  if (window.location.href.indexOf('auvio/embed') > -1) {
    return;
  }

  save(entry);

  // problematic behavior -> log
  if (!entry.connected) {
    var _history = store.get('sso.history');

    if (_history.length > 1 && _history[_history.length - 2].connected) {
      var counter = (store.get('sso.history.disconnection.counter') || 0) + 1;

      store.set('sso.history.disconnection.counter', counter);

      logger.error('Unexpected disconnection', {
        history: _history,
        cookieRemember: store.get('sso.history.cookie.remember'),
        cookieFinalize: store.get('sso.history.cookie.finalize'),
        cookieGigHasGmid: store.get('gig_hasGmid'),
        cookieHasGmid: store.get('hasGmid'),
        alreadyMigrated: _history[_history.length - 2].pageStart > 1549886400000,
        disconnectionCounter: counter,
        moreThanOneDisconnection: counter > 1
      });
    }
  }

  $body.on('ad-start', function () {
    RTBF.ad.testPartners().then(function () {
      entry.adBlock = false;
    }).fail(function () {
      entry.adBlock = true;
    }).always(function () {
      amend(entry);
    });
  });

  RTBF.sso.on('login', function () {
    entry.events.push(buildEvent('login', true));
    amend(entry);
  });

  RTBF.sso.on('logout', function () {
    entry.events.push(buildEvent('logout', true));
    amend(entry);
  });

  RTBF.sso.on('autologin', function () {
    entry.events.push(buildEvent('autologin', true));
    amend(entry);
  });

  RTBF.sso.on('error', function (e) {
    entry.events.push(buildEvent('error', e));
    amend(entry);
  });

  RTBF.sso.on('update', function () {
    entry.events.push(buildEvent('update', true));
    amend(entry);
  });

  RTBF.sso.on('screen', function (screen) {
    entry.events.push(buildEvent('screen', screen));
    amend(entry);
  });

  RTBF.sso.on('data', function (context) {
    entry.events.push(buildEvent('data', context));
    amend(entry);
  });

  RTBF.sso.on('cookie-remember', function (data) {
    store.set('sso.history.cookie.remember', data);
    entry.events.push(buildEvent('cookie-remember', data));
    amend(entry);
  });

  RTBF.sso.on('cookie-finalize', function (data) {
    store.set('sso.history.cookie.finalize', data);
    entry.events.push(buildEvent('cookie-finalize', data));
    amend(entry);
  });

  RTBF.sso.on('error-autologin-gigya', function (context) {
    entry.events.push(buildEvent('error-autologin-gigya', {
      gigya: {
        isReady: gigya.isReady,
        __initialized: gigya.__initialized
      },
      context: context
    }));
    amend(entry);
  });

  RTBF.sso.on('error-fresh', function (e) {
    entry.events.push(buildEvent('error-fresh', { e: e }));
    amend(entry);
  });
});
// XMLHttpRequest HOOK - heresy
// const open = XMLHttpRequest.prototype.open
// const send = XMLHttpRequest.prototype.send
//
// XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {
//   this._url = url
//   open.call(this, method, url, async, user, pass)
// }
//
// XMLHttpRequest.prototype.send = function (data) {
//   let self = this
//   let oldOnReadyStateChange
//   let url = this._url
//
//   function onReadyStateChange () {
//     if (self.readyState === 4 /* complete */) {
//       entry.events.push(buildEvent('xhr', {url: url}))
//       amend(entry)
//     }
//
//     if (oldOnReadyStateChange) {
//       oldOnReadyStateChange()
//     }
//   }
//
//   if (this.addEventListener) {
//     this.addEventListener('readystatechange', onReadyStateChange, false)
//   } else {
//     oldOnReadyStateChange = this.onreadystatechange
//     this.onreadystatechange = onReadyStateChange
//   }
//
//   send.call(this, data)
// }
;
// File: /js/news/common/public/static/js/vendor/bootstrap/3.3.4/bootstrap.min.js
/*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.4",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.4",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery);
;
// File: /js/news/common/public/static/js/vendor/fontfaceobserver/fontfaceobserver.js
(function(){'use strict';function f(a){this.a=k;this.b=void 0;this.d=[];var b=this;try{a(function(a){l(b,a)},function(a){m(b,a)})}catch(c){m(b,c)}}var k=2;function n(a){return new f(function(b,c){c(a)})}function p(a){return new f(function(b){b(a)})}
function l(a,b){if(a.a===k){if(b===a)throw new TypeError("Promise settled with itself.");var c=!1;try{var d=b&&b.then;if(null!==b&&"object"===typeof b&&"function"===typeof d){d.call(b,function(b){c||l(a,b);c=!0},function(b){c||m(a,b);c=!0});return}}catch(e){c||m(a,e);return}a.a=0;a.b=b;q(a)}}function m(a,b){if(a.a===k){if(b===a)throw new TypeError("Promise settled with itself.");a.a=1;a.b=b;q(a)}}
function q(a){setTimeout(function(){if(a.a!==k)for(;a.d.length;){var b=a.d.shift(),c=b[0],d=b[1],e=b[2],b=b[3];try{0===a.a?"function"===typeof c?e(c.call(void 0,a.b)):e(a.b):1===a.a&&("function"===typeof d?e(d.call(void 0,a.b)):b(a.b))}catch(g){b(g)}}},0)}f.prototype.e=function(a){return this.c(void 0,a)};f.prototype.c=function(a,b){var c=this;return new f(function(d,e){c.d.push([a,b,d,e]);q(c)})};
function r(a){return new f(function(b,c){function d(c){return function(d){g[c]=d;e+=1;e===a.length&&b(g)}}var e=0,g=[];0===a.length&&b(g);for(var h=0;h<a.length;h+=1)a[h].c(d(h),c)})}function s(a){return new f(function(b,c){for(var d=0;d<a.length;d+=1)a[d].c(b,c)})};window.Promise||(window.Promise=f,window.Promise.resolve=p,window.Promise.reject=n,window.Promise.race=s,window.Promise.all=r,window.Promise.prototype.then=f.prototype.c,window.Promise.prototype["catch"]=f.prototype.e);}());

(function(){'use strict';function h(a){function b(){document.body?a():setTimeout(b,0)}b()};function v(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.f=document.createElement("span");this.e=document.createElement("span");this.d=-1;this.b.style.cssText="display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;";this.c.style.cssText="display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;";
this.e.style.cssText="display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;";this.f.style.cssText="display:inline-block;width:200%;height:200%;";this.b.appendChild(this.f);this.c.appendChild(this.e);this.a.appendChild(this.b);this.a.appendChild(this.c)}function w(a,b,c){a.a.style.cssText="min-width:20px;min-height:20px;display:inline-block;position:absolute;width:auto;margin:0;padding:0;top:-999px;left:-999px;white-space:nowrap;font-size:100px;font-family:"+b+";"+c}
function x(a){var b=a.a.offsetWidth,c=b+100;a.e.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.d!==b?(a.d=b,!0):!1}function y(a,b){a.b.addEventListener("scroll",function(){x(a)&&null!==a.a.parentNode&&b(a.d)},!1);a.c.addEventListener("scroll",function(){x(a)&&null!==a.a.parentNode&&b(a.d)},!1);x(a)};function z(a,b){var c=b||{};this.family=a;this.style=c.style||"normal";this.variant=c.variant||"normal";this.weight=c.weight||"normal";this.stretch=c.stretch||"stretch";this.featureSettings=c.featureSettings||"normal"}var B=null;
z.prototype.a=function(a,b){var c=a||"BESbswy",C=b||3E3,k="font-style:"+this.style+";font-variant:"+this.variant+";font-weight:"+this.weight+";font-stretch:"+this.stretch+";font-feature-settings:"+this.featureSettings+";-moz-font-feature-settings:"+this.featureSettings+";-webkit-font-feature-settings:"+this.featureSettings+";",g=document.createElement("div"),l=new v(c),m=new v(c),n=new v(c),d=-1,e=-1,f=-1,q=-1,r=-1,t=-1,p=this;return new Promise(function(a,b){function c(){null!==g.parentNode&&g.parentNode.removeChild(g)}
function u(){if(-1!==d&&-1!==e||-1!==d&&-1!==f||-1!==e&&-1!==f)if(d===e||d===f||e===f){if(null===B){var b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);B=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))}B?d===q&&e===q&&f===q||d===r&&e===r&&f===r||d===t&&e===t&&f===t||(c(),a(p)):(c(),a(p))}}h(function(){function a(){if(Date.now()-D>=C)c(),b(p);else{var A=document.hidden;if(!0===A||void 0===A)d=l.a.offsetWidth,e=m.a.offsetWidth,f=n.a.offsetWidth,
u();setTimeout(a,50)}}var D=Date.now();w(l,"sans-serif",k);w(m,"serif",k);w(n,"monospace",k);g.appendChild(l.a);g.appendChild(m.a);g.appendChild(n.a);document.body.appendChild(g);q=l.a.offsetWidth;r=m.a.offsetWidth;t=n.a.offsetWidth;a();y(l,function(a){d=a;u()});w(l,p.family+",sans-serif",k);y(m,function(a){e=a;u()});w(m,p.family+",serif",k);y(n,function(a){f=a;u()});w(n,p.family+",monospace",k)})})};window.FontFaceObserver=z;window.FontFaceObserver.prototype.check=z.prototype.a;}());

;
// File: /js/news/common/public/static/js/init.js
/**
 * Depends: jQuery
 */

(function(){

  $.support.cors = true;

})();
;
// File: /js/news/common/public/static/js/webfonts.js
(function( w ){
    // if the class is already set, we're good.
    var webFontsLoadedClassName = 'js-webfonts-loaded';
    if( w.document.documentElement.className.indexOf( webFontsLoadedClassName ) > -1 ){
        return;
    }
    var fontSansReg   = new w.FontFaceObserver( 'Source Sans Pro',  { weight: 400 });
    var fontSansSemi  = new w.FontFaceObserver( 'Source Sans Pro',  { weight: 600 });
    var fontSansBold  = new w.FontFaceObserver( 'Source Sans Pro',  { weight: 700 });
    var fontSerifReg  = new w.FontFaceObserver( 'Source Serif Pro', { weight: 400 });
    var fontSerifSemi = new w.FontFaceObserver( 'Source Serif Pro', { weight: 600 });
    var fontSerifBold = new w.FontFaceObserver( 'Source Serif Pro', { weight: 700 });
    w.Promise
        .all([fontSansReg.check(), fontSansSemi.check(), fontSansBold.check(), fontSerifReg.check(), fontSerifSemi.check(), fontSerifBold.check()])
        .then(function(){
            w.document.documentElement.className += ' ' + webFontsLoadedClassName;
            // Create a cookie fonts-loaded
            var cookieName = 'fonts-loaded';
            w.document.cookie = encodeURIComponent(cookieName) + "=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; domain=rtbf.be; path=/";
        });
}( this ));
;
// File: /js/rtbf/www/public/static/js/RTBF/UI/RtbfPopUp.js
// Generated by CoffeeScript 1.9.1
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (function($) {
    var RtbfPopUp;
    RtbfPopUp = (function() {
      function RtbfPopUp(element, options) {
        this.open = bind(this.open, this);
        this.element = $(element);
        this.settings = $.extend({}, $.fn.RtbfPopUp.settings, options);
        this.load();
      }

      RtbfPopUp.prototype.load = function() {
        return this.element.on('click.popup', this.settings.selector, (function(_this) {
          return function(event) {
            event.preventDefault();
            return _this.open(event.currentTarget);
          };
        })(this));
      };

      RtbfPopUp.prototype.open = function(target) {
        var $target, left, popupFeatures, popupHeight, popupLeft, popupName, popupTop, popupURL, popupWidth, top;
        $target = $(target);
        if ($target.data("busy")) {
          return;
        }
        $target.data("busy", true);
        popupURL = target.href || $target.data("href") || this.settings.windowURL;
        popupName = target.name || $target.data("name") || this.settings.windowName;
        popupWidth = $target.attr('relwidth') || $target.data("width") || this.settings.width;
        popupHeight = $target.attr('relheight') || $target.data("height") || this.settings.height;
        popupLeft = this.settings.left;
        popupTop = this.settings.top;
        if (this.settings.centerBrowser) {
          if ($.browser.msie) {
            top = (window.screenTop - 120) + (((document.documentElement.clientHeight + 120) / 2) - (popupHeight / 2));
            left = window.screenLeft + (((document.body.offsetWidth + 20) / 2) - (popupWidth / 2));
          } else {
            top = window.screenY + ((window.outerHeight / 2) - (popupHeight / 2));
            left = window.screenX + ((window.outerWidth / 2) - (popupWidth / 2));
          }
        } else if (this.settings.centerScreen) {
          top = (screen.height - popupHeight) / 2;
          left = (screen.width - popupWidth) / 2;
        }
        popupFeatures = "height=" + popupHeight;
        popupFeatures += ",width=" + popupWidth;
        popupFeatures += ",toolbar=" + this.settings.toolbar;
        popupFeatures += ",scrollbars=" + this.settings.scrollbars;
        popupFeatures += ",status=" + this.settings.status;
        popupFeatures += ",resizable=" + this.settings.resizable;
        popupFeatures += ",location=" + this.settings.location;
        popupFeatures += ",menuBar=" + this.settings.menubar;
        popupFeatures += ",left=" + left;
        popupFeatures += ",top=" + top;
        window.open(popupURL, popupName, popupFeatures).focus();
        return $target.data("busy", false);
      };

      return RtbfPopUp;

    })();
    $.fn.RtbfPopUp = function(options) {
      return this.each(function() {
        var $element, data, rtbfPopUp, selector;
        $element = $(this);
        data = $element.data('rtbf.popup') || [];
        selector = !(options != null ? options.selector : void 0) ? "noselector" : options.selector;
        if (data[selector] !== true) {
          rtbfPopUp = new RtbfPopUp(this, options);
          data[selector] = true;
          return $element.data("rtbf.popup", data);
        }
      });
    };
    return $.fn.RtbfPopUp.settings = {
      centerBrowser: 0,
      centerScreen: 0,
      height: 500,
      left: 0,
      location: 0,
      menubar: 0,
      resizable: 0,
      scrollbars: 0,
      status: 0,
      selector: false,
      width: 500,
      windowName: null,
      windowURL: null,
      top: 0,
      toolbar: 0
    };
  })(jQuery);

}).call(this);

;
// File: /js/rtbf/www/public/static/js/common/popup.js
$(document).ready(function(){
	if ($.fn.RtbfPopUp) {

		$('.js-popup-custom').each(function() {
			$(this).RtbfPopUp({
				centerBrowser: 1
			});
		});

		$('body').RtbfPopUp({
			selector: '.js-popup-newsletter-preview',
			width: 840,
			height: 600,
			centerBrowser: 1,
			resizable: 1,
			scrollbars: 1
		});

		$('body').RtbfPopUp({
			selector : '.js-popup-live-sound',
			width:495,
			height:400,
			centerBrowser:1
		});

		$('body').RtbfPopUp({
			selector : '.js-popup-podcast-sound',
			width:500,
			height:410,
			centerBrowser:1
		});

		$('body').RtbfPopUp({
			selector : '.js-popup-live-radio',
			width:1080,
			height:840,
			centerBrowser:1,
			scrollbars: 1
		});

		$('body').RtbfPopUp({
			selector : '.js-popup-live-webcam',
			width:640,
			height:480,
			centerBrowser:1
		});

		$('body').RtbfPopUp({
			selector: '.js-popup-live-center',
			width:1200,
			height:752,
			centerBrowser: 1,
			resizable: 1,
			scrollbars: 1
		});

		$('body').RtbfPopUp({
			selector : '.js-popup-share-facebook',
			width:670,
			height:370,
			centerBrowser:1
		});

		$('body').RtbfPopUp({
			selector : '.js-popup-share-twitter',
			width:540,
			height:240,
			centerBrowser:1
		});


	}
});
;
// File: /js/news/common/public/static/js/RTBF/block.js
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/**
* Block class
* Depends: RTBF.Utils, RTBF.loader
**/

// eslint-disable-next-line no-use-before-define
var RTBF = RTBF || {};

(function ($, window, document, RTBF) {
  var _this = this;

  /* globals jQuery */
  /**
   * Class Block
   */

  var Block = (function () {
    function Block($elem, lazyload, devices) {
      _classCallCheck(this, Block);

      this._placeholder = $elem;
      this._elem = false;
      this._lazyload = lazyload;
      this._devices = devices;

      this.prepare();
    }

    _createClass(Block, [{
      key: 'valid',

      /**
       * Return whether the block is valid and can be loaded.
       * @return boolean
       */
      value: function valid() {
        if (RTBF.Utils.isMobile() && this._devices.indexOf('xs') < 0) return false;
        if (RTBF.Utils.isTablet() && this._devices.indexOf('sm') < 0) return false;
        if (RTBF.Utils.isDesktop() && (this._devices.indexOf('md') < 0 && this._devices.indexOf('lg') < 0)) return false;
        return true;
      }
    }, {
      key: 'enqueue',

      /**
       * Add the block to the loading queue.
       * @return this
       */
      value: function enqueue() {
        Block.queue.push(this._placeholder);
        Block.fetch();
        return this;
      }
    }, {
      key: 'prepare',

      /**
       * Prepare a block for loading.
       * @return this
       */
      value: function prepare() {
        var _this2 = this;

        // If already loaded or not a valid device, return.
        if (!this._placeholder || !this.valid()) return;

        // If not lazyload, immediatly enqueue the block.
        if (!this._lazyload) return this.enqueue();

        this._placeholder.on('lazybeforeunveil', function () {
          _this2.enqueue();
        });

        this._placeholder.addClass('lazyload');

        return this;
      }
    }, {
      key: 'load',

      /**
       * Load the given HTML and replace the placeholder.
       * @param string html
       * @return this
       */
      value: function load(html) {
        this._elem = $(html);
        this._elem.data('block-uuid', this._placeholder.data('uuid'));

        // Insert right after the placeholder.
        this._placeholder.after(this._elem);

        // Remove placeholder to avoid treating the block twice.
        this._placeholder.remove();
        this._placeholder = false;

        return this;
      }
    }], [{
      key: 'factory',

      /**
       * Factory for the jQueryfication.
       */
      value: function factory($elem, settings) {
        var defaults = {
          lazyload: !!$elem.data('lazyload'),
          devices: $elem.data('devices') ? $elem.data('devices') : ['xs', 'sm', 'md', 'lg']
        };

        var options = $.extend({}, defaults, settings);

        return new Block($elem, options.lazyload, options.devices);
      }
    }]);

    return Block;
  })();

  // Block loading queue.
  Block.queue = [];

  /**
   * Fetch every block in the loading queue.
   *
   * The funciton collects call closer than 100 ms in order to batch the block
   * loading in one call.
   */
  Block.fetch = RTBF.Utils.debounce(function () {
    var params = [];
    var placeholders = {};
    var elems = [];
    var batch = 3;

    // Empty the queue and prepare the parameters.
    while (Block.queue.length && batch--) {
      var placeholder = Block.queue.shift();

      params.push({
        uuid: placeholder.data('uuid'),
        type: placeholder.data('type'),
        settings: placeholder.data('settings'),
        cache: placeholder.data('cache')
      });

      placeholders[placeholder.data('uuid')] = placeholder;
    }

    // API call for all the blocks.
    $.get('https://www.rtbf.be/news/api/block', { data: params }, function (data) {
      // Load HTML.
      for (var uuid in data.blocks) {
        if (!placeholders[uuid]) {
          console.log('No placeholder for the block ' + uuid);
          continue;
        }

        // Load the block using the plugin instance of the placeholder.
        elems.push(placeholders[uuid].data('block').load(data.blocks[uuid])._elem);
      }

      // Load CSS
      RTBF.loader.css(data.css, function () {
        // Load JS
        RTBF.loader.js(data.js, function () {
          // Trigger an event to notify that each blocks are ready to use.
          elems.forEach(function (elem) {
            elem.trigger('blockready', {
              container: elem.parent()
            });
          });
        });
      });
    }, 'json');

    if (Block.queue.length) {
      Block.fetch();
    } else {
      $('.js-block').find('.js-blocks-loading').remove();
    }
  }, 100);

  RTBF.Block = Block;

  RTBF.Utils.jQueryfy('block', RTBF.Block);

  // Remove extra block in sidebar
  // TODO: This is an exception for the siderbar
  //       and it's poluting the js.
  var size = 0;
  var height = $('.js-main-container').height();

  if (height > 1700) size = 2;else if (height > 750) size = 1;
  $('.js-sidebar-top .js-sidebar-widgets .js-block').slice(size).remove();

  // Initialize every block on the page.
  $('.js-block').block();

  // Retry loading remaining blocks.
  // e.g. format mobile => load only some of the block
  //      resize to format desktop => load blocks that were not loaded but need to be now
  var refresh = RTBF.Utils.debounce(function () {
    $('.js-block').each(function () {
      var block = $(_this).data('block');

      if (!block) return;
      block.prepare();
    });
  }, 200);

  $(window).on('resize', refresh);

  // Load blocks newly inserted
  $('body').on('contentinserted', function () {
    $('.js-block').block();
  });
})(jQuery, window, document, RTBF);
;
// File: /js/news/common/public/static/js/RTBF/infinite.js
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

// eslint-disable-next-line no-use-before-define
var RTBF = RTBF || {};

(function ($, window, document, RTBF) {
  /* globals jQuery */
  /**
   * Class Infinite
   *
   * Handle infinite scroll or unpagination using user interaction.
   *
   * Example:
   *
   * ```js
   * $('container_selector').infinite(function (instance) {
   *   ////////////////////////////////
   *   //// CHOOSE MANUAL VS. AUTO ////
   *   ////////////////////////////////
   *
   *   // Auto mode, listen the scroll event. [DEFAULT]
   *   instance.auto();
   *
   *   // Manual mode, wait for call to the reveal method.
   *   instance.manual();
   *
   *   $('button_selector').on('click', function () {
   *     // Reveal the next page.
   *     instance.reveal();
   *   });
   *
   *   ///////////////////////////////
   *   //// CHOOSE SYNC VS. ASYNC ////
   *   ///////////////////////////////
   *
   *   // Sync mode, everything is already in the page. [DEFAULT]
   *   instance.sync();
   *
   *   // Async mode, use an api to retreive data.
   *   intance.api(url, params, function renderer(data) {
   *     // Render the data in the DOM.
   *     // Return the number of data receive.
   *     // When 0 is returned, the infinite is stopped unless resume is called.
   *   });
   *
   *   ///////////////////////////
   *   //// DEFINE A REVEALER ////
   *   ///////////////////////////
   *
   *   instance.revealer(function () {
   *     // Display the next set of element.
   *     // Return the number of element displayed.
   *     //
   *     // In sync mode:
   *     //
   *     // When 0 is returned, the infinite is stopped unless resume is called.
   *     //
   *     // In async mode:
   *     //
   *     // When 0 is returned, a new api call is performed.
   *     // You can omit the revealer if the renderer is already displaying the data.
   *     // Note that in that case a new page equals to an api call.
   *   });
   * });
   * ```
   */

  var Infinite = (function () {
    function Infinite($elem) {
      var $scrollable = arguments[1] === undefined ? $(document) : arguments[1];

      _classCallCheck(this, Infinite);

      /**
       * The container with the scroll bar.
       */
      this._scrollable = $scrollable;

      /**
       * The items container.
       */
      this._elem = $elem;

      /**
       * Whether the scroll is automatically trigger with the scroll or use a user made action.
       */
      this._auto = true;

      /**
       * Whether the content is load synchronously or asynchronously.
       */
      this._sync = true;

      /**
       * Whether the content is currently seeked.
       */
      this._seeking = false;

      /**
       * Whether there is no more content.
       */
      this._end = false;

      /**
       * Method revealing the new "page" of content.
       *
       * The method should return a truthy value in case of success and falsy value if no more items are available.
       * In that case, and if sync is false, a request is send to the api and the revealer is called upon reponse reception.
       */
      this._revealer = false;

      /**
       * Object containing async api parameters.
       *
       * url: string or a function that returns a string.
       * params: object or a function that returns an object.
       * renderer: function that add items to the dom (preferably hidden) and returns a falsy value if there is no more data to expect.
       * before: function called before the request [optional]
       * after: function called after the request [optional]
       */
      this._api = false;

      // Default to automatic mode.
      this.auto();
    }

    _createClass(Infinite, [{
      key: 'wrap',

      /**
       * Ensure a variable is a function.
       * @param {Object|Function} constant
       * @return {Function}
       */
      value: function wrap(constant) {
        if (typeof constant === 'function') return constant;
        return function () {
          return constant;
        };
      }
    }, {
      key: 'bind',

      /**
       * Attach events.
       * @return {this}
       */
      value: function bind() {
        if (this._auto) this._scrollable.on('scroll.infinite', RTBF.Utils.debounce(this.scroll, 100, this));
        return this;
      }
    }, {
      key: 'unbind',

      /**
       * Detach events.
       * @return {this}
       */
      value: function unbind() {
        this._scrollable.off('.infinite');
        return this;
      }
    }, {
      key: 'destroy',

      /**
       * Destroy the infinite instance.
       * @return {void}
       */
      value: function destroy() {
        this.unbind();
        this._elem = false // decr ref count for gc.
        // Don't return $this coz the object is not meant to be used again.
        ;
      }
    }, {
      key: 'auto',

      /**
       * Active the automatic infinite scroll.
       * @param {Boolean} auto
       * @return {this}
       */
      value: function auto() {
        var _auto = arguments[0] === undefined ? true : arguments[0];

        this._auto = _auto;
        return this.unbind().bind();
      }
    }, {
      key: 'manual',

      /**
       * Deactive the automatic infinite scroll.
       * @param {Boolean} manual
       * @return {this}
       */
      value: function manual() {
        var _manual = arguments[0] === undefined ? true : arguments[0];

        return this.auto(!_manual);
      }
    }, {
      key: 'sync',

      /**
       * Active synchronous behavior.
       * @param {Boolean} sync
       * @return {this}
       */
      value: function sync() {
        var _sync = arguments[0] === undefined ? true : arguments[0];

        this._sync = _sync;
        return this;
      }
    }, {
      key: 'async',

      /**
       * Active asynchronous behavior.
       * @param {Boolean} async
       * @return {this}
       */
      value: function async() {
        var _async = arguments[0] === undefined ? true : arguments[0];

        return this.sync(!_async);
      }
    }, {
      key: 'resume',

      /**
       * Resume the infinite scroll.
       * @return {this}
       */
      value: function resume() {
        this._end = false;
        return this;
      }
    }, {
      key: 'stop',

      /**
       * Stop the infinite scroll.
       * @return {this}
       */
      value: function stop() {
        this._end = true;
        return this;
      }
    }, {
      key: 'revealer',

      /**
       * Getter/Setter revealer function.
       * @param {Function} fn
       * @return {this|Function}
       */
      value: function revealer(fn) {
        if (typeof fn === 'undefined') return this._revealer;
        this._revealer = fn;
        return this;
      }
    }, {
      key: 'api',

      /**
       * Getter/Setter api data.
       * @param {string|function} url
       * @param {Object|function} params
       * @param {function} renderer
       * @param {Object} options
       * @return {this|Object}
       */
      value: function api(url, params, renderer) {
        var options = arguments[3] === undefined ? {} : arguments[3];

        if (typeof url === 'undefined') return this._api;

        this.async();

        this._api = {
          url: this.wrap(url),
          params: this.wrap(params),
          renderer: renderer,
          before: options.before,
          after: options.after
        };
        return this;
      }
    }, {
      key: 'seek',

      /**
       * Seek more content.
       *
       * The function prevents to overlap with itself.
       *
       * @param {Boolean} preload
       * @return {this}
       */
      value: function seek() {
        var _this = this;

        if (this._seeking) return this;

        var api = this.api();

        this._seeking = true;
        if (api.before) api.before();

        $.get(api.url(), api.params(), 'json').always(function () {
          _this._seeking = false;
        }).then(function (items) {
          if (!api.renderer(items)) return _this.stop();
          $('body').trigger('contentinserted', { container: _this._elem });
          if (_this._revealer) _this.reveal();
        }).always(function () {
          if (api.after) api.after();
        });

        return this;
      }
    }, {
      key: 'reveal',

      /**
       * Reveal one "page" of new content.
       * @return {this}
       */
      value: function reveal() {
        if (this._end) return this;
        if (this._revealer && this._revealer()) return this;
        if (!this._sync) return this.seek();

        // There is no more backlog items and we can't look for more
        return this.stop();
      }
    }, {
      key: 'scroll',

      /**
       * Reveal more content if the user scroll far enough.
       * @return {this}
       */
      value: function scroll() {
        /**
         * NOTE:
         *   this._scrollable.scrollTop() : the scrollable container scroll top position (usually document)
         *
         *   +
         *
         *   $(window).height() * 2 : the window heigh multiple by a preload factor (here 1.0)
         *
         *   >=
         *
         *   this._elem.offset().top + this._elem.height(): the element bottom position
         *
         */
        if (this._scrollable.scrollTop() + $(window).height() * 2 >= this._elem.offset().top + this._elem.height()) {
          this.reveal();
        }

        return this;
      }
    }], [{
      key: 'factory',
      value: function factory($elem, settings) {
        var defaults = {
          scrollable: $(document)
        };

        var options = $.extend({}, defaults, settings);

        return new Infinite($elem, options.scrollable);
      }
    }]);

    return Infinite;
  })();

  RTBF.Infinite = Infinite;

  RTBF.Utils.jQueryfy('infinite', RTBF.Infinite);
})(jQuery, window, document, RTBF);
;
// File: /js/news/common/public/static/js/more.js
(function ($) {
  /**
   * Initialize infinite scroll in manual and sync mode.
   *
   * The infinite object is instanciated upon the first button click.
   */
  $('body').off('click.widget-more').on('click.widget-more', '.js-widget-more', function (e) {
    e.preventDefault();

    var $button = $(this);
    var $container = $button.closest('.js-item-container');
    var $archive = $container.find('.js-widget-archive');

    $button.blur();


    function revealItems (container) {
      var $items = container.find('.js-item.hidden');
      var amount = RTBF && RTBF.Utils && RTBF.Utils.isDesktop() ? 8 : 4;

      $items.slice(0, amount).removeClass('hidden');
      if (!$items.slice(amount).length) $container.find('.js-widget-more, .js-widget-archive').toggleClass('hidden');

      return $items.slice(amount).length;
    }


    function revealItemsWithDivider (container) {
      var $items = container.find('.js-widget-divider.hidden').eq(1).prevAll('.hidden');

      if (!$items.length) {
        $items = container.children('.hidden');
        $button.hide();
        $archive.removeClass('hidden');
      }

      return $items.removeClass('hidden').length;
    }


    $container.infinite(function (instance) {
      var $this = $(this);
      var hasDividers = $this.hasClass('js-has-dividers');
      
      instance
        .manual()
        .revealer(function () {
          return hasDividers ? revealItemsWithDivider($this) : revealItems($this);
        });

      // Make the requested reveal.
      instance.reveal();

      $button.click(function () { instance.reveal(); });
    });

  });

})(jQuery);
;
// File: /js/news/common/public/static/js/scrolltotop.js
$(function () {
  
  // SCROLL TO TOP BUTTON
  var scrollBtn = $('.js-scroll-to-top');
  var isActive = false;

  function checkScroll () {
  if ($(this).scrollTop() > 350) {
    if (!isActive) {
    isActive = true;
    scrollBtn.addClass('active');
    }
  } else {
    if (isActive) {
    isActive = false;
    scrollBtn.removeClass('active');
    }
  }
  }

  $(window).on('scroll', function (evt) {
    checkScroll();
  });

  scrollBtn.on('click', function (evt) {
    var ua = navigator.userAgent;
    var windowsPhoneDevice = /(Windows Phone)/gi.test(ua);
    if (!windowsPhoneDevice) {
      evt.preventDefault();
      $('html, body').animate({
          scrollTop: $('#top').offset().top },
      'slow');
    }
  });

  checkScroll();

});

;
// File: /js/news/common/public/static/js/vendor/adhese/adhese.novastajax.min.js
function Adhese(){return this.config={debug:!1},this.request={},this.requestExtra=[],this.ads=[],(this.that=this).helper=new this.Helper,this.detection=new this.Detection,this}if(Adhese.prototype.Ad=function(e,t,i){return this.format=i&&i.format?i.format:t,this.options=e.helper.merge({write:!1},i),this.uid=t,this.safeframe=!(!i||!i.safeframe)&&i.safeframe,null!=this.options.position&&(this.uid=this.options.position+this.format),this},Adhese.prototype.init=function(e){if(this.config.debug=e.debug,this.helper.log("Adhese: initializing..."),this.config.jquery="undefined"!=typeof jQuery,e.account){this.config.account=e.account;var t="http:";"file:"!=window.location.protocol&&(t=window.location.protocol),this.config.host=t+"//ads-"+e.account+".adhese.com/",this.config.poolHost=t+"//pool-"+e.account+".adhese.com/",this.config.clickHost=t+"//click-"+e.account+".adhese.com/",this.config.previewHost="https://"+e.account+"-preview.adhese.org/",this.config.hostname=void 0}else if(e.host){this.config.host=e.host;var i=document.createElement("a");i.href=this.config.host,this.config.hostname=i.hostname}for(var n in e.previewHost&&(this.config.previewHost=e.previewHost),e.location&&"function"==typeof e.location?(this.config.location=e.location(),this.helper.log('options.location=="function"')):e.location&&"string"==typeof e.location?(this.config.location=e.location,this.helper.log('options.location=="string"')):this.config.location="testlocation",void 0===e.safeframe||0==e.safeframe?this.config.safeframe=!1:(this.config.safeframe=e.safeframe,this.initSafeFrame(e.safeframeContainerID)),this.registerRequestParameter("rn",Math.round(1e4*Math.random())),"function"==typeof Fingerprint&&this.registerRequestParameter("fp",new Fingerprint({canvas:!0}).get()),this.registerRequestParameter("pr",window.devicePixelRatio||1),void 0!==e.referrer&&1!=e.referrer||this.registerRequestParameter("re",this.helper.stringToHex(document.referrer.substr(0,200))),void 0!==e.url&&1!=e.url||this.registerRequestParameter("ur",this.helper.stringToHex(window.location.href)),this.userAgent=this.helper.getUserAgent(),this.userAgent)this.registerRequestParameter("br",this.userAgent[n]);"function"==typeof this.Detection&&(this.registerRequestParameter("dt",this.detection.device()),this.registerRequestParameter("br",this.detection.device())),this.config.previewExclusive=!1,e.previewExclusive&&(this.config.previewExclusive=e.previewExclusive),this.checkPreview(),this.checkAdheseInfo(),this.checkVisible&&(addEventListener("load",this.checkVisible.bind(this),!1),addEventListener("scroll",this.checkVisible.bind(this),!1)),this.helper.log("Adhese: initialized with config:",JSON.stringify(this.config))},Adhese.prototype.initSafeFrame=function(e){this.safeframe||(this.safeframe=e?new this.SafeFrame(this.config.poolHost,e):new this.SafeFrame(this.config.poolHost))},Adhese.prototype.registerRequestParameter=function(e,t){var i=this.request[e];i||(i=new Array),i.push(t),this.request[e]=i},Adhese.prototype.removeRequestParameter=function(e,t){var i=this.request[e];if(i){var n=i.indexOf(t);-1!=n&&i.splice(n,1)}},Adhese.prototype.addRequestString=function(e){this.requestExtra.push(e)},Adhese.prototype.tag=function(e,t){var i=this;this.helper.log(e,JSON.stringify(t)),t&&t.safeframe&&(t.safeframeContainerID?this.initSafeFrame(t.safeframeContainerID):this.initSafeFrame());var n=new this.Ad(this,e,t);if(this.previewActive){var r=this.previewFormats;for(var o in r)if(o==e){var s=r[e],a=new this.Ad(this,e,t);a.adType=e,a.ext="js";var c="";a.options.write||(c="json/"),a.swfSrc=i.config.previewHost+"/creatives/preview/"+c+"tag.do?id="+s.creative+"&slotId="+s.slot,a.width=s.width,a.height=s.height,n=a,addEventListener("load",i.showPreviewSign.bind(i))}}return n.options.slotName=this.getSlotName(n),this.ads.push([e,n]),n.options.write&&(0==this.config.previewExclusive||1==this.config.previewExclusive&&n.swfSrc)&&this.write(n),n},Adhese.prototype.write=function(e){if(this.config.safeframe||e.safeframe){var t="";t=this.previewActive&&e.swfSrc?e.swfSrc:this.getRequestUri(e,{type:"json"}),this.helper.log("Adhese.write: request uri: "+t+", safeframe enabled");var i=this.safeframe.containerID;AdheseAjax.request({url:t,method:"get",json:!0}).done(function(e){adhese.safeframe.addPositions(e);for(var t=e.length-1;0<=t;t--)adhese.safeframe.render(e[t][i])})}else{t="";t=this.previewActive&&e.swfSrc?e.swfSrc:this.getRequestUri(e,{type:"js"}),this.helper.log("Adhese.write: request uri: "+t),document.write('<script type="text/javascript" src="'+t+'"><\/script>')}},Adhese.prototype.track=function(e){this.helper.addTrackingPixel(e)},Adhese.prototype.trackByUrl=function(e){this.helper.addTrackingPixel(e)},Adhese.prototype.getMultipleRequestUri=function(e,t){var i=this.config.host;switch(t||(t={type:"js"}),t.type){case"json":i+="json/";break;case"jsonp":t.callbackFunctionName||(t.callbackFunctionName="callback"),i+="jsonp/"+t.callbackFunctionName+"/";break;default:i+="ad/"}for(var n=e.length-1;0<=n;n--){var r=e[n];(!r.swfSrc||r.swfSrc&&-1==r.swfSrc.indexOf("preview"))&&(i+="sl"+this.getSlotName(r)+"/")}for(var o in this.request){for(var s=o,a=0;a<this.request[o].length;a++)s+=this.request[o][a]+(this.request[o].length-1>a?";":"");i+=s+"/"}for(n=0,o=this.requestExtra;n<o.length;n++)o[n]&&(i+=o[n]+"/");return i+="?t="+(new Date).getTime()},Adhese.prototype.getSlotName=function(e){return e.options.position&&e.options.location?u=e.options.location+e.options.position:e.options.position?u=this.config.location+e.options.position:e.options.location?u=e.options.location:u=this.config.location,u+"-"+e.format},Adhese.prototype.getRequestUri=function(e,t){if(t.preview&&1==t.preview)return e.swfSrc;var i=[e];return this.getMultipleRequestUri(i,t)},Adhese.prototype.syncUser=function(e,t){"rubicon"==e?this.rubiconUserSync(t):"improvedigital"==e?this.improvedigitalUserSync(t):"pubmatic"==e?this.pubmaticUserSync(t):"spotx"==e&&this.spotxUserSync(t)},Adhese.prototype.getSfPreview=function(e){for(var i=this,t=e.length-1;0<=t;t--){var n=e[t];n.swfSrc&&-1<n.swfSrc.indexOf("tag.do")&&AdheseAjax.request({url:i.getRequestUri(n,{type:"json",preview:!0}),method:"get",json:!0}).done(function(e){i.safeframe.addPositions(e);for(var t=e.length-1;0<=t;t--)i.safeframe.render(e[t].adType)})}},Adhese.prototype.getSfAds=function(e){var i=this;AdheseAjax.request({url:i.getMultipleRequestUri(e,{type:"json"}),method:"get",json:!0}).done(function(e){i.safeframe.addPositions(e);for(var t=e.length-1;0<=t;t--)i.safeframe.render(e[t].adType)}),i.getSfPreview(e)},Adhese.prototype.registerResponse=function(e,t){adhese.responses||(adhese.responses=new Object),adhese.responses[e]=t},Adhese.prototype.Helper=function(){this.oslist=[{string:navigator.userAgent,subString:"Windows Phone",identity:"WindowsPhone"},{string:navigator.userAgent,subString:"Windows NT 10.0",identity:"Windows10"},{string:navigator.userAgent,subString:"Windows NT 6.3",identity:"Windows8.1"},{string:navigator.userAgent,subString:"Windows NT 6.2",identity:"Windows8"},{string:navigator.userAgent,subString:"Windows NT 6.1",identity:"Windows7"},{string:navigator.userAgent,subString:"Windows NT 6.0",identity:"WindowsVista"},{string:navigator.userAgent,subString:"Windows NT 5.1",identity:"WindowsXP"},{string:navigator.userAgent,subString:"Windows 98",identity:"Windows98"},{string:navigator.userAgent,subString:"Android",identity:"Android"},{string:navigator.userAgent,subString:"iPhone",identity:"iOS"},{string:navigator.userAgent,subString:"iPad",identity:"iOS"},{string:navigator.platform,subString:"Mac",identity:"OSX"},{string:navigator.platform,subString:"Linux",identity:"Linux"}],this.browserlist=[{string:navigator.userAgent,subString:"Trident/7",identity:"Explorer",versionSearch:"rv"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"}]},Adhese.prototype.Helper.prototype.log=function(){this.logObjs=this.logObjs||{},this.logs=this.logs||[];for(var e="",t=(new Date).getTime(),i=0,n=arguments;i<n.length;i++)n[i]&&(e+=n[i]+" ");this.logObjs[t]=logObj={msg:e},this.logs.push([t,arguments]),window.location.search.match("debug")&&console.log(t,arguments)},Adhese.prototype.Helper.prototype.debug=function(){for(var e in this.logs){var t=this.logs[e];console.log(t[0],t[1])}},Adhese.prototype.Helper.prototype.debugTable=function(){"function"==typeof console.table&&console.table(this.logObjs)},Adhese.prototype.Helper.prototype.getMetaTagContent=function(e,t){},Adhese.prototype.Helper.prototype.getQueryStringParameter=function(e){var t=RegExp("[?&]"+key+"=([^&]*)").exec(window.location.search);return t?decodeURIComponent(t[1].replace(/\+/g," ")):default_},Adhese.prototype.Helper.prototype.addTrackingPixel=function(e){var t=document.createElement("img");t.src=e,t.style.height="1px",t.style.width="1px",t.style.margin="-1px",t.style.border="0",t.style.position="absolute",t.style.top="0",document.body.appendChild(t)},Adhese.prototype.Helper.prototype.getScreenProperties=function(){var e=new Object;return e.width=window.innerWidth?window.innerWidth:document.body.offsetWidth,e.height=window.innerHeight?window.innerHeight:document.body.offsetHeight,e},Adhese.prototype.Helper.prototype.addEvent=function(e,t,i,n){void 0===n&&(n=window),n.addEventListener?n.addEventListener(e,function(){t(i)},!1):n.attachEvent&&n.attachEvent("on"+e,function(){t(i)})},Adhese.prototype.Helper.prototype.removeEvent=function(e,t,i){window.removeEventListener?window.removeEventListener(e,t,!1):window.detachEvent&&window.detachEvent("on"+e,t)},Adhese.prototype.Helper.prototype.getAbsoluteOffset=function(e){var t={top:0,left:0};if(void 0!==e)for(t.left=0,t.top=0;e;e=e.offsetParent)t.left+=e.offsetLeft,t.top+=e.offsetTop;return t},Adhese.prototype.Helper.prototype.getUserAgent=function(){var e={};return e.browser=this.searchString(this.browserlist)||"unknownBrowser",e.browserVersion=e.browser+this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"unknownVersion",e.os=this.searchString(this.oslist)||"unknownOS",e},Adhese.prototype.Helper.prototype.searchString=function(e){for(var t=0;t<e.length;t++){var i=e[t].string,n=e[t].prop;if(this.versionSearchString=e[t].versionSearch||e[t].identity,i){if(-1!=i.indexOf(e[t].subString))return e[t].identity}else if(n)return e[t].identity}},Adhese.prototype.Helper.prototype.searchVersion=function(e){var t=e.indexOf(this.versionSearchString);if(-1!=t)return parseFloat(e.substring(t+this.versionSearchString.length+1))},Adhese.prototype.Helper.prototype.merge=function(e,t){var i={};for(var n in e)i[n]=e[n];for(var n in t)i[n]=t[n];return i},Adhese.prototype.Helper.prototype.stringToHex=function(t,i){try{i=unescape(encodeURIComponent(t)).split("").map(function(e){return e.charCodeAt(0).toString(16)}).join("")}catch(e){i=t,console.log("invalid text input: ",e,t)}return i},Adhese.prototype.Helper.prototype.hexToString=function(t,i){try{i=decodeURIComponent(t.replace(/(..)/g,"%$1"))}catch(e){i=t,console.log("invalid hex input: ",e,t)}return i},Adhese.prototype.Helper.prototype.createCookie=function(e,t,i){var n="";if(i){var r=new Date;r.setTime(r.getTime()+24*i*60*60*1e3-60*r.getTimezoneOffset()*1e3),n="; expires="+r.toUTCString()}document.cookie=e+"="+t+n+"; path=/"},Adhese.prototype.Helper.prototype.readCookie=function(e){for(var t=e+"=",i=document.cookie.split(";"),n=0;n<i.length;n++){for(var r=i[n];" "==r.charAt(0);)r=r.substring(1,r.length);if(0==r.indexOf(t))return r.substring(t.length,r.length)}return null},Adhese.prototype.Helper.prototype.eraseCookie=function(e){this.createCookie(e,"",-1)},Adhese.prototype.Helper.prototype.eatsCookie=function(){return this.createCookie("adheseTestCookie","",1),null!=this.readCookie("adheseTestCookie")&&(this.eraseCookie("adheseTestCookie"),!0)},Adhese.prototype.Helper.prototype.getMetaContent=function(e){for(var t=document.getElementsByTagName("META"),i=[],n=t.length-1;0<=n;n--){var r=t[n];r&&(r.name===e||r.getAttribute("property")===e)&&r.content&&i.push(r.content)}return i},Adhese.prototype.Helper.prototype.adhElementInViewport=function(e){if("string"==typeof e&&(e=document.getElementById(e)),e){var t=e.getBoundingClientRect();return 0<=t.top&&0<=t.left&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)}return!1},Adhese.prototype.checkPreview=function(){if(this.previewFormats={},!this.config.previewHost)return!1;if(-1!=window.location.search.indexOf("adhesePreview")){this.helper.log("checking for preview");var e=window.location.search.substring(1),t=e.match(/adhesePreviewCreativeId/g).length,n=e.split("&"),r="",o="",s="",a="",c=0,d=0,h=[];-1!=e.indexOf("adhesePreviewExclusive=true")&&(this.config.previewExclusive=!0),-1!=e.indexOf("adhesePreviewExclusive=false")&&(this.config.previewExclusive=!1);for(var f=0;f<n.length;f++)if("adhesePreviewCreativeId"==n[f].split("=")[0]&&(r=unescape(n[f].split("=")[1])),"adhesePreviewSlotId"==n[f].split("=")[0]&&(o=n[f].split("=")[1]),"adhesePreviewCreativeTemplate"==n[f].split("=")[0]&&(s=n[f].split("=")[1],h.push(s)),"adhesePreviewTemplateFile"==n[f].split("=")[0]&&(a=n[f].split("=")[1]),"adhesePreviewWidth"==n[f].split("=")[0]&&(c=n[f].split("=")[1]),"adhesePreviewHeight"==n[f].split("=")[0]&&(d=n[f].split("=")[1]),"adhesePreviewCreativeKey"==n[f].split("=")[0]&&1<t){if(""!=o&&""!=h[0])for(i in h){s=h[i];this.previewFormats[s]={slot:o,creative:r,templateFile:a,width:c,height:d}}h=[]}if(1==t)for(var l=0;l<h.length;l++)this.previewFormats[h[l]]={slot:o,creative:r,templateFile:a,width:c,height:d};r=[];for(k in this.previewFormats)r.push(k+","+this.previewFormats[k].creative+","+this.previewFormats[k].slot+","+this.previewFormats[k].template+","+this.previewFormats[k].width+","+this.previewFormats[k].height);this.helper.createCookie("adhese_preview",r.join("|"),0),this.previewActive=!0}else if(this.helper.readCookie("adhese_preview")){var p=this.helper.readCookie("adhese_preview").split("|");for(f=0;f<p.length;f++){r=p[f].split(",");this.previewFormats[r[0]]={creative:r[1],slot:r[2],template:r[3],width:r[4],height:r[5]}}this.previewActive=!0}},Adhese.prototype.showPreviewSign=function(){var e=document.createElement("DIV");e.innerHTML='<div id="adhPreviewMessage" style="cursor:pointer;font-family:Helvetica,Verdana; font-size:12px; text-align:center; background-color: #000000; color: #FFFFFF; position:fixed; top:10px;left:10px;padding:10px;z-index:9999;width: 100px;"><b>Adhese preview active.</br> Click to disable</div>',document.body.appendChild(e),this.helper.addEvent("click",this.closePreviewSign.bind(this),e,e)},Adhese.prototype.closePreviewSign=function(){this.helper.eraseCookie("adhese_preview"),-1!=location.search.indexOf("adhesePreviewCreativeId")?location.href=location.href.split("?")[0]:location.reload()},Adhese.prototype.checkAdheseInfo=function(){if(-1==window.location.search.indexOf("adheseInfo=true"))return!1;addEventListener("load",this.showInfoSign.bind(this))},Adhese.prototype.showInfoSign=function(){var e=document.createElement("DIV"),t='<div id="adhInfoMessage" style="cursor:pointer;font-family:Helvetica,Verdana; font-size:12px; text-align:center; background-color: lightgrey; color: black; position:fixed; top:10px;right:10px;padding:10px;z-index:9999;width:auto; max-width:300px; opacity:0.9; border:2px #9e9e9e solid">';for(x in t+="<b>Adhese Request Info</b></br>- Click to disable -</br>",t+="</br><b>Location code:</b></br>",t+=adhese.config.location+"</br>",t+="</br><b>Format code(s):</b></br>",adhese.ads)t+=adhese.ads[x][0]+"</br>";for(x in t+="</br><b>Targeting:</b></br>",adhese.request)"ur"!=x&&"rn"!=x&&"re"!=x&&"pr"!=x&&"fp"!=x&&(t+="<b>"+x+": </b>"+adhese.request[x]+"</br>");t+="</div>",e.innerHTML=t,document.body.appendChild(e),this.helper.addEvent("click",this.closeInfoSign.bind(this),e,e)},Adhese.prototype.closeInfoSign=function(){document.getElementById("adhInfoMessage").style.display="none"},Adhese.prototype.Detection=function(){return this},Adhese.prototype.Detection.prototype.device=function(e){return(e=e||window.navigator.userAgent).match(/webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile Safari|SymbianOS/i)&&!e.match(/Android/i)?this.deviceType="phone":e.match(/Mobile/i)&&e.match(/Android/i)?this.deviceType="phone":e.match(/iPad|Android|Tablet|Silk/i)?this.deviceType="tablet":this.deviceType="desktop",this.deviceType},function(e,t,i){"undefined"!=typeof module&&module.exports?module.exports=i():"function"==typeof define&&define.amd?define(i):t.Fingerprint=i()}(0,this,function(){"use strict";var e=function(e){var s,t;s=Array.prototype.forEach,t=Array.prototype.map,this.each=function(e,t,i){if(null!==e)if(s&&e.forEach===s)e.forEach(t,i);else if(e.length===+e.length){for(var n=0,r=e.length;n<r;n++)if(t.call(i,e[n],n,e)==={})return}else for(var o in e)if(e.hasOwnProperty(o)&&t.call(i,e[o],o,e)==={})return},this.map=function(e,n,r){var o=[];return null==e?o:t&&e.map===t?e.map(n,r):(this.each(e,function(e,t,i){o[o.length]=n.call(r,e,t,i)}),o)},"object"==typeof e?(this.hasher=e.hasher,this.screen_resolution=e.screen_resolution,this.canvas=e.canvas,this.ie_activex=e.ie_activex):"function"==typeof e&&(this.hasher=e)};return e.prototype={get:function(){var e=[];(e.push(navigator.userAgent),e.push(navigator.language),e.push(screen.colorDepth),this.screen_resolution)&&(void 0!==this.getScreenResolution()&&e.push(this.getScreenResolution().join("x")));return e.push((new Date).getTimezoneOffset()),e.push(this.hasSessionStorage()),e.push(this.hasLocalStorage()),e.push(!!window.indexedDB),document.body?e.push(typeof document.body.addBehavior):e.push("undefined"),e.push(typeof window.openDatabase),e.push(navigator.cpuClass),e.push(navigator.platform),e.push(navigator.doNotTrack),e.push(this.getPluginsString()),this.canvas&&this.isCanvasSupported()&&e.push(this.getCanvasFingerprint()),this.hasher?this.hasher(e.join("###"),31):this.murmurhash3_32_gc(e.join("###"),31)},murmurhash3_32_gc:function(e,t){var i,n,r,o,s,a,c,d;for(i=3&e.length,n=e.length-i,r=t,s=3432918353,a=461845907,d=0;d<n;)c=255&e.charCodeAt(d)|(255&e.charCodeAt(++d))<<8|(255&e.charCodeAt(++d))<<16|(255&e.charCodeAt(++d))<<24,++d,r=27492+(65535&(o=5*(65535&(r=(r^=c=(65535&(c=(c=(65535&c)*s+(((c>>>16)*s&65535)<<16)&4294967295)<<15|c>>>17))*a+(((c>>>16)*a&65535)<<16)&4294967295)<<13|r>>>19))+((5*(r>>>16)&65535)<<16)&4294967295))+((58964+(o>>>16)&65535)<<16);switch(c=0,i){case 3:c^=(255&e.charCodeAt(d+2))<<16;case 2:c^=(255&e.charCodeAt(d+1))<<8;case 1:r^=c=(65535&(c=(c=(65535&(c^=255&e.charCodeAt(d)))*s+(((c>>>16)*s&65535)<<16)&4294967295)<<15|c>>>17))*a+(((c>>>16)*a&65535)<<16)&4294967295}return r^=e.length,r=2246822507*(65535&(r^=r>>>16))+((2246822507*(r>>>16)&65535)<<16)&4294967295,r=3266489909*(65535&(r^=r>>>13))+((3266489909*(r>>>16)&65535)<<16)&4294967295,(r^=r>>>16)>>>0},hasLocalStorage:function(){try{return!!window.localStorage}catch(e){return!0}},hasSessionStorage:function(){try{return!!window.sessionStorage}catch(e){return!0}},isCanvasSupported:function(){var e=document.createElement("canvas");return!(!e.getContext||!e.getContext("2d"))},isIE:function(){return"Microsoft Internet Explorer"===navigator.appName||!("Netscape"!==navigator.appName||!/Trident/.test(navigator.userAgent))},getPluginsString:function(){return this.isIE()&&this.ie_activex?this.getIEPluginsString():this.getRegularPluginsString()},getRegularPluginsString:function(){return this.map(navigator.plugins,function(e){var t=this.map(e,function(e){return[e.type,e.suffixes].join("~")}).join(",");return[e.name,e.description,t].join("::")},this).join(";")},getIEPluginsString:function(){if(window.ActiveXObject){return this.map(["ShockwaveFlash.ShockwaveFlash","AcroPDF.PDF","PDF.PdfCtrl","QuickTime.QuickTime","rmocx.RealPlayer G2 Control","rmocx.RealPlayer G2 Control.1","RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)","RealVideo.RealVideo(tm) ActiveX Control (32-bit)","RealPlayer","SWCtl.SWCtl","WMPlayer.OCX","AgControl.AgControl","Skype.Detection"],function(e){try{return new ActiveXObject(e),e}catch(e){return null}}).join(";")}return""},getScreenResolution:function(){return[screen.height,screen.width]},getCanvasFingerprint:function(){var e=document.createElement("canvas"),t=e.getContext("2d"),i="http://valve.github.io";return t.textBaseline="top",t.font="14px 'Arial'",t.textBaseline="alphabetic",t.fillStyle="#f60",t.fillRect(125,1,62,20),t.fillStyle="#069",t.fillText(i,2,15),t.fillStyle="rgba(102, 204, 0, 0.7)",t.fillText(i,4,17),e.toDataURL()}},e}),Adhese.prototype.Events=function(){},Adhese.prototype.Events.prototype.add=function(e,t,i){i||(i=window),window.addEventListener?i.addEventListener(e,t,!1):window.attachEvent&&i.attachEvent("on"+e,t)},Adhese.prototype.Events.prototype.remove=function(e,t,i){i||(i=window),window.removeEventListener?i.removeEventListener(e,t,!1):window.attachEvent&&i.detachEvent("on"+e,t)},Adhese.prototype.criteoUserSync=function(e){if(e&&e.nid){var t=e.nid,i="cto_rtt";crtg_content=function(e){var t,i,n,r=document.cookie.split(";");for(t=0;t<r.length;t++)if(i=r[t].substr(0,r[t].indexOf("=")),n=r[t].substr(r[t].indexOf("=")+1),(i=i.replace(/^\s+|\s+$/g,""))==e)return unescape(n);return""}(i);var n=Math.floor(99999999999*Math.random()),r="https://rtax.criteo.com/delivery/rta/rta.js?netId="+escape(t);r+="&cookieName="+escape(i),r+="&rnd="+n,r+="&varName=crtg_content";var o=document.createElement("script");return o.type="text/javascript",o.src=r,o.async=!0,0<document.getElementsByTagName("head").length?document.getElementsByTagName("head")[0].appendChild(o):0<document.getElementsByTagName("body").length&&document.getElementsByTagName("body")[0].appendChild(o),crtg_content}},Adhese.prototype.genericUserSync=function(e){if(e&&e.url&&e.syncName){var t=e.syncName+"_uid_last_sync";if(null!=typeof e.onload&&""!=e.onload||(e.onload=!0),-1==document.cookie.indexOf(t)||!e.syncRefreshPeriod){if(e.onload?e.iframe?this.helper.addEvent("load",this.appendSyncIframe,e):this.helper.addEvent("load",this.appendSyncPixel,e):e.iframe?this.appendSyncIframe(e):this.appendSyncPixel(e),e.syncRefreshPeriod){var i=new Date;i.setDate(i.getDate()+1),i.setHours(0),i.setMinutes(0),i.setSeconds(0);var n=i.getTime()-(new Date).getTime();this.helper.createCookie(t,n,n/e.syncRefreshPeriod)}this.config&&this.config.hostname&&((new Image).src="https://user-sync.adhese.com/handlers/"+e.syncName+"/user_sync_discovery?domain="+this.config.hostname)}}},Adhese.prototype.appendSyncIframe=function(e){var t=document.createElement("IFRAME");t.setAttribute("id","sync_iframe_"+e.syncName),t.setAttribute("height","0"),t.setAttribute("width","0"),t.setAttribute("marginwidth","0"),t.setAttribute("marginheight","0"),t.setAttribute("frameborder","0"),t.setAttribute("scrolling","no"),t.setAttribute("style","border: 0px; display: none;"),t.setAttribute("src",e.url),document.body.appendChild(t)},Adhese.prototype.appendSyncPixel=function(e){var t=document.createElement("IMG");t.setAttribute("id","sync_pixel_"+e.syncName),t.setAttribute("height","0"),t.setAttribute("width","0"),t.setAttribute("style","border: 0px; display: none;"),t.setAttribute("src",e.url),document.body.appendChild(t)},Adhese.prototype.improvedigitalUserSync=function(e){var t=1,i="user-sync.adhese.com";e&&e.partner_id&&""!=e.partner_id&&(t=e.partner_id),e&&e.domain&&""!=e.domain&&(i=e.domain),e&&e.onload&&""!=e.onload?onload=e.onload:onload=!0,this.genericUserSync({url:"https://ad.360yield.com/server_match?partner_id="+t+"&r=https%3A%2F%2F"+i+"%2Fhandlers%2Fimprovedigital%2Fuser_sync%3Fu%3D%7BPUB_USER_ID%7D",syncName:"improvedigital",iframe:!0,onload:onload})},Adhese.prototype.pubmaticUserSync=function(e){e&&e.pubmatic_publisher_id&&this.genericUserSync({url:"https://ads.pubmatic.com/AdServer/js/user_sync.html?p="+e.pubmatic_publisher_id+"&predirect=https%3a%2f%2fuser-sync.adhese.com%2fhandlers%2fpubmatic%2fuser_sync%3fu%3d",syncName:"pubmatic",iframe:!0})},Adhese.prototype.rubiconUserSync=function(e){e&&e.rp_account&&""!=e.rp_account&&this.genericUserSync({url:"https://secure-assets.rubiconproject.com/utils/xapi/multi-sync.html?p="+e.rp_account+"&endpoint=eu",syncName:"rubicon",iframe:!0})},Adhese.prototype.spotxUserSync=function(e){e&&e.spotx_advertiser_id&&this.genericUserSync({url:"https://sync.search.spotxchange.com/partner?adv_id="+e.spotx_advertiser_id+"&redir=https%3A%2F%2Fuser-sync.adhese.com%2Fhandlers%2Fspotx%2Fuser_sync%3Fu%3D%24SPOTX_USER_ID",syncName:"spotx",iframe:!0})},Adhese.prototype.SafeFrame=function(e,t){return this.poolHost=e,this.containerID="adType",t&&(this.containerID=t),this.adhesePositions=new Array,this.ads=[],this.init()},Adhese.prototype.SafeFrame.prototype.init=function(){if(this.adhesePositionConfig=new Object,this.ads&&0<this.ads.length)for(index in this.ads){var e=this.ads[index];this.adhesePositionConfig[e[this.containerID]]={w:e.width,h:e.height,size:e.width+"x"+e.height,dest:e[this.containerID],tgt:"_blank"}}new $sf.host.Config({auto:!1,debug:!0,renderFile:this.poolHost+"sf/r.html",positions:this.adhesePositionConfig});return this},Adhese.prototype.SafeFrame.prototype.addPositions=function(e){for(var t in e){var i=e[t];i.sfHtml=i.tag,"js"==i.ext&&(null!=i.body&&""!=i.body&&i.body.match(/<script|<SCRIPT/)?i.sfHtml=i.body:i.sfSrc=i.swfSrc);var n=new $sf.host.PosConfig({id:i[this.containerID],w:i.width,h:i.height,size:i.width+"x"+i.height,dest:i[this.containerID],tgt:"_blank"});this.adhesePositions.push(new $sf.host.Position({id:i[this.containerID],html:i.sfHtml,src:i.sfSrc,conf:n}))}},Adhese.prototype.SafeFrame.prototype.render=function(e){for(var t in this.adhesePositions)this.adhesePositions[t].id==e&&$sf.host.render(this.adhesePositions[t])},window.$sf)try{$sf.ver="1-1-0",$sf.specVersion="1.1"}catch(e){}else var $sf={ver:"1-1-0",specVersion:"1.1"};!function(F){var I,H,R,O,j,C="object",l="function",p="replace",D="length",i="document",N="prototype",u=F&&F.Number,g=F&&F.Math,M=F&&F[i],a=F&&F.navigator,c=a&&a.userAgent||"",W="toLowerCase",n="getAttribute",L="setAttribute",q="removeAttribute",U="getElementsByTagName",B="DOMContentLoaded",z=F&&F.String,e=z.fromCharCode(92),v=e+e,m=z.fromCharCode(34),y=e+m,t=z.fromCharCode(43),w="scr"+m+t+m+"ipt",$="about:blank",V="nodeType",X="iframe",G="CollectGarbage",Y="addEventListener",J="",Q=Z,K="$sf.lib",Z=!1,ee=null,te={preventDefault:0,stopImmediatePropagation:0,stopPropagation:0,preventBubble:0},b=u&&u.MAX_VALUE,x=-1*b,T=F&&F.escape,_=F&&F.unescape,ie=!(!window.ActiveXObject&&"ActiveXObject"in window)&&F&&"ActiveXObject"in F,A=0,ne=Z,re=0,oe=ee,se=0,ae=ee,ce=0,de=0,he=0,fe={},le="",pe="",ue=ee,d=ee;!function(){var e;function S(e){var t=typeof e;return"string"==t?e:"number"!=t||e?t==C&&e&&e.join?e.join(""):!1===e?"false":!0===e?"true":e?z(e):"":"0"}function t(t,e,i,n){if("number"!=typeof t)try{t=t?parseFloat(t):u.NaN}catch(e){t=u.NaN}return n==ee&&(n=b),i==ee&&(i=x),(isNaN(t)||t<i||n<t)&&e!=ee?e:t}function i(t){try{t=t&&typeof t==l&&t.toString()&&new t.constructor?t:ee}catch(e){t=ee}return!!t}function k(e,t,i,n,r){var o,s,a;if(!t||!e)return e;for(s in t)a=typeof(o=t[s]),i&&!t.hasOwnProperty(s)||r&&s in e||n&&a==l||(a==C&&o&&(o=o.slice?k([],o):k({},o)),e[s]=o);return e}function n(){return(new Date).getTime()}function r(){return g.round(100*g.random())}function h(e){var t=S(e);return t&&t[p](/^\s\s*/,"")[p](/\s\s*$/,"")}function o(e,t,i,n){var r,o,s=i&&typeof i==C?i:F,a=0,c=ee;if(e)if(e=S(e),t=t&&typeof t==C?t:ee,e.indexOf("."))for(r=e.split(".");o=r[a++];)o=h(o),c=a==r[D]?s[o]&&t?s[o]=k(s[o],t,Z,ee,n):n&&o in s?s[o]:s[o]=s[o]||t||{}:n&&o in s?s[o]:s[o]=s[o]||{},s=s[o];else c=s[e]&&t?s[e]=k(s[e],t,Z,ee,n):s[e]=s[e]||t||{};return c}function s(){return v}function a(){return y}function c(){return"\\r"}function d(){return"\\n"}function f(e,t,i){return S(["<",t,w,i,">"])}function P(e,t,i,n,r){var o,s,a,c,d,h,f,l,p,u,g,v,m,y,w=this,b="indexOf",x="substring",A=Z;if(!(w instanceof P))return new P(e,t,i,n,r);if(!arguments[D])return w;if(e&&typeof e==C)return k(new P("",t,i,n,r),e);if(e=S(e),t=S(t)||"&",i=S(i)||"=",!e)return w;if("?"!=t&&"?"!=i&&"?"==e.charAt(0)&&(e=e[x](1)),o=e[b]("?"),s=e[b](i),-1!=o&&-1!=s&&s<o)c=T(e[x](s+1)),e=(d=e.substr(0,s+1))+c;else if(-1!=o)return new P(e=e[x](o+1),t,i,n);for(e.charAt(0)==t&&(e=e[x](1)),g=(f=e.split(t))[D],o=0;g--;)if(c=f[o++],A=u=Z,c){if(2<(m=(l=c.split(i))[D])){if(p=_(l[0]),l.shift(),r)if(d=p+i,s=e[b](d),m=d[D],h=e[x](s+m),y=(d=t+t)[D],-1!=(a=h[b](d))){for(h in v=new P(h=e.substr(s+m,a+y),t,i,n,r),h="",m=0,v)m++;0<m&&(o+=m-1),c=v}else c=_(l.join(i));else c=_(l.join(i));A=!0}else 2==m&&(p=_(l[0]),c=_(l[1]),A=!0);A&&(n&&p in w||(w[p]=c,u=!0),r&&u&&p&&c&&typeof c!=C&&(0<=c[b](t)||0<=c[b](i))&&(w[p]=new P(c,t,i,n,r)))}}(e=P[N]).toString=e.valueOf=function e(t,i,n,r){var o,s,a,c=[];for(o in t=t||"&",i=i||"=",this)s=typeof(a=this[o]),a&&s==l||(a&&s==C&&(a=e.apply(a,[t,i,n,r])),n&&(o=T(o)),r||(a=T(a)),c.push(o,i,a,t));return S(c)},R=o(K+".lang",{ParamHash:P,cstr:S,cnum:t,cbool:function(e){return!(!e||"0"==e||"false"==e||"no"==e||"undefined"==e||"null"==e)||Z},noop:function(){},trim:h,callable:i,guid:function(e){return S([e||"","_",n(),"_",r(),"_",A++])},mix:k,time:n,rand:r,def:o,ns:function(e,t){var i,n,r,o=/\[(('|")?)((\s|.)*?)(('|")?)\]/gm,s=/\./gm,a=0,c="",d=!0;if(i=t=t||F,e)if(e=S(e))if(n=(e=h(e)).match(/(\[(.{1,})\])|(\.\w+)/gm))for(c=e[p](/(\[.*)|(\..*)/g,""),n.unshift(c);r=n[a++];){if(!i[r=r[p](o,"$3")[p](s,"")]){d=Z;break}i=i[r]}else i=i[r=e];else d=Z;else d=Z;return d&&i||Z},jssafe_html:function(e){var t=S(e);return t&&(t=(t=(t=(t=(t=(t=(t=t.replace(/(<noscript[^>]*>)(\s*?|.*?)(<\/noscript>)/gim,"")).replace(/\\/g,s)).replace(/\"/g,a)).replace(/\n/g,d)).replace(/\r/g,c)).replace(/<(\/)*script([^>]*)>/gi,f)).replace(/\t/gi," "),t=S([m,t,m]),t=m+t+m),t},isArray:function(e){return null!=e&&"string"!=typeof e&&null!=e.length&&e.constructor==Array}}),o("$sf.env",{isIE:ie}),I=S,t,H=i}(),function(){function r(e){var t=0;return parseFloat(e.replace(/\./g,function(){return 1==t++?"":"."}))}function o(e,t,i){var n=e&&e.match(t);return i==ee?n:n&&n[i]||ee}function s(e,t){return e.test(t)}function e(e){var t,i={},n=new Date;if(!e&&d)return d;i.ie=i.opera=i.gecko=i.webkit=i.safari=i.chrome=i.air=i.ipod=i.ipad=i.iphone=i.android=i.webos=i.silk=i.nodejs=i.phantomjs=0,i.mobile=i.ios=i.os=ee,i.accel=!1,i.caja=a&&a.cajaVersion,i.cks=Z,(e=e||c||"")&&(s(/windows|win32/i,e)?i.os="windows":s(/macintosh|mac_powerpc/i,e)?i.os="macintosh":s(/android/i,e)?i.os="android":s(/symbos/i,e)?i.os="symbos":s(/linux/i,e)?i.os="linux":s(/rhino/i,e)&&(i.os="rhino"),s(/KHTML/,e)&&(i.webkit=1),s(/IEMobile|XBLWP7/,e)&&(i.mobile="windows"),s(/Fennec/,e)&&(i.mobile="gecko"),(t=o(e,/AppleWebKit\/([^\s]*)/,1))&&(i.webkit=r(t),i.safari=i.webkit,s(/PhantomJS/,e)&&(t=o(e,/PhantomJS\/([^\s]*)/,1))&&(i.phantomjs=r(t)),s(/ Mobile\//,e)||s(/iPad|iPod|iPhone/,e)?(i.mobile="Apple",t=(t=o(e,/OS ([^\s]*)/,1))&&r(t.replace("_",".")),i.ios=t,i.ipad=i.ipod=i.iphone=0,(t=o(e,/iPad|iPod|iPhone/,0))&&(i[t[W]()]=i.ios)):((t=o(e,/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/,0))&&(i.mobile=t),s(/webOS/,e)&&(i.mobile="WebOS",(t=o(e,/webOS\/([^\s]*);/,1))&&(i.webos=r(t))),s(/ Android/,e)&&(i.mobile="Android",(t=o(e,/Android ([^\s]*);/,1))&&(i.android=r(t))),s(/Silk/,e)&&((t=o(e,/Silk\/([^\s]*)\)/,1))&&(i.silk=r(t)),i.android||(i.android=2.34,i.os="Android"),s(/Accelerated=true/,e)&&(i.accel=!0))),(t=e.match(/(Chrome|CrMo)\/([^\s]*)/))&&t[1]&&t[2]?(i.chrome=r(t[2]),i.safari=0,"CrMo"===t[1]&&(i.mobile="chrome")):(t=o(e,/AdobeAIR\/([^\s]*)/))&&(i.air=t[0])),i.webkit||((t=o(e,/Opera[\s\/]([^\s]*)/,1))?(i.opera=r(t),(t=o(e,/Opera Mini[^;]*/,0))&&(i.mobile=t)):(t=o(e,/MSIE\s([^;]*)/,1))?i.ie=r(t):(t=o(e,/Gecko\/([^\s]*)/))&&(t=o(e,/rv:([^\s\)]*)/,i.gecko=1))&&(i.gecko=r(t))));try{n.setTime(n.getTime()+1e3),M.cookie=cstr(["sf_ck_tst=test; expires=",n.toGMTString(),"; path=/"]),-1!=M.cookie.indexOf("sf_ck_tst")&&(i.cks=!0)}catch(e){i.cks=Z}try{typeof process==C&&process.versions&&process.versions.node&&(i.os=process.platform,i.nodejs=numberify(process.versions.node))}catch(e){i.nodejs=0}return i}(d=e()).parse=e,R.def("$sf.env.ua",d,ee,!0)}(),function(){function r(){de&&(clearTimeout(de),de=0)}function o(e){p(F,"load",o),p(F,B,o),oe=!0}function s(){var e,t,i,n;if(r(),300<=ce&&(oe=!(ae=ee)),oe===ee){try{i=(t=(e=M&&M.body)&&a("*",e))&&t[D],n=e&&e.lastChild}catch(e){se=0,ae=ee}se&&i==se&&n==ae?oe=!(ae=ee):(se=i,ae=n,ce+=1,de=setTimeout(s,50))}else ae=ee}function m(e){var t,i=x(e,"id");(t=i&&fe[i])&&(p(e,"load",t),fe[i]=ee,delete fe[i])}function y(e){return e&&"string"==typeof e&&f(e)||e}function w(e,t,i,n){try{ue||(ue=O.msghost)}catch(e){ue=ee}if(F==top)return e&&ue&&ue[e]&&ue[e](t,i,n)}function c(e){var t=ee;try{e&&(t=9==e[V]?e:e[i]||e.ownerDocument||ee)}catch(e){t=ee}return t}function d(e){var t,i=ee,n="parentWindow",r="defaultView";try{e&&((i=e[n]||e[r]||ee)||(i=(t=c(e))&&(t[n]||t[r])||ee))}catch(e){i=ee}return i}function f(e){var t,i=arguments;return(t=1<i[D]?c(i[1]):M)&&t.getElementById(e)||ee}function b(e){return e&&1==e[V]&&e.tagName[W]()||""}function a(e,t){var i=[];try{i=t&&t[U]?t[U](e)||i:M[U](e)||i}catch(e){i=[]}return i}function l(e){return e&&(e.parentNode||e.parentElement)}function x(e,t,i){try{2<arguments[D]?i===ee?ne?e[q](t,0):e[q](t):(i=I(i),"class"==t[W]()?e.className=i:ne?e[L](t,i,0):e[L](t,i)):i=I(ne?e[n](t,0):e[n](t))}catch(e){i=""}return i}function A(e,t){var i;try{i=e.style,1<arguments[D]?i.cssText=I(t):t=i.cssText}catch(e){t=""}return t}function S(e,t){return(1<arguments[D]&&c(t)||M).createElement(e)}function k(e,t){var i=Z;try{e&&(i=e.appendChild(t))}catch(e){i=Z}return i}function h(e){var t,i=Z,n=b(e)==X;n&&(w("detach",e),m(e),ie||x(e,"src",$));try{(t=l(e))&&(t.removeChild(e),i=!0,ie&&n&&j())}catch(e){}return e=t=ee,i}function P(e,t,i){try{Q?e[J]("on"+t,i):e[J](t,i,Z)}catch(e){}e=i=ee}function p(e,t,i){try{Q?e.detachEvent("on"+t,i):e.removeEventListener(t,i,Z)}catch(e){}e=i=ee}function u(){var e;return r(),oe?!(ae=ee):((e=M.readyState)&&(ae=ee,oe="loaded"==e||"complete"==e||Z),ae=ee,ce=se=0,s(),!!oe)}function g(e){if(u())try{R.callable(e)&&e()}catch(e){e=ee}else setTimeout(function(){g(e),e=ee},51)}function v(e){var t="";if(e=e||F.event){try{e.returnValue=Z}catch(e){}try{e.cancelBubble=!0}catch(e){}try{e.stopped=!0}catch(e){}for(t in te)if(te[t])try{e[t]()}catch(e){}}return Z}function C(e){var t=ee;try{t=(e=e||F.event)?e[le]||e[pe]:ee}catch(e){t=ee}return t}function T(e,t,i,n,r){return _(e,t,i,n,r)}function _(e,t,i,n,r,o){var s,a,c,d,h,f,l,p,u,g=["<",X," "],v="";if(o)c=e;else{if(b(e=y(e))!=X)return ee;c=e.cloneNode(Z)}for(s in"src"in(t=t||{})?x(c,"src",ee):t.src=x(e,"src")||$,"name"in t?x(c,"name",ee):t.name=x(e,"name"),t.src||(t.src=$),v=r&&w("prep",t),o||(x(c,"width",ee),x(c,"height",ee)),i&&((a=A(c))&&";"!=a.charAt(a[D]-1)&&(a+=";"),A(c,[a,I(i)])),k(a=S("div"),c),h=a.innerHTML.replace(/<iframe(.*?)>(.*?)<\/iframe>/gim,"$1"),g.push('name="',t.name,'" ',h,"></",X,">"),delete t.name,a.innerHTML=I(g),d=a.firstChild,t)x(d,s,t[s]);return x(d,"id")||(x(d,"id","sf_iframe_"+he),he++),x(d,"FRAMEBORDER","no"),x(d,"SCROLLING","no"),x(d,"ALLOWTRANSPARENCY",!0),x(d,"HIDEFOCUS",!0),x(d,"TABINDEX",-1),x(d,"MARGINWIDTH",0),x(d,"MARGINHEIGHT",0),f=d,H(l=n)&&(p=function(e){var t=C(e);if(m(t),t&&l)try{l.call(t,e)}catch(e){}t=f=l=p=u=ee},u=x(f,"id"),m(f),u&&(fe[u]=p),P(f,"load",p)),p=ee,v&&w("attach",d,v,r),v=r=c=n=e=a=null,d}function E(e,t,i,n){return _(S(X),e,t,i,n,!0)}!function(){var t,e,i="SCROLLING",n="createEvent",r="UIEvent";ie?(le="srcElement",pe="target",x(t=S(X),i,"no"),ne="no"!=x(t,i),j=G in F?function(){re&&clearTimeout(re),re=setTimeout(function(){try{F[G]()}catch(e){}},3e3)}:_lang.noop):(le="target",pe="currentTarget"),F[Y]&&!ie?(J=Y,"removeEventListener"):ie&&(Q=!0,J="attachEvent","detachEvent"),t=ee;try{t=M[n](r)}catch(e){t=ee}if(!t)try{t=M[n](r+"s")}catch(e){t=ee}if(t)for(e in te)t[e]&&(te[e]=1);t=ee,P(F,"load",o),P(F,B,o),O=R.def(K+".dom",{doc:c,view:d,elt:f,tagName:b,tags:a,par:l,make:S,css:A,attr:x,gc:j,append:k,purge:h,attach:P,detach:p,ready:u,wait:g,evtCncl:v,evtTgt:C},ee,!0)}(),iframes=R.def(K+".dom.iframes",{make:E,clone:T,replace:function(e,t,i,n,r){var o,s,a,c,d,h;s=(d=b(s=(c=(e=e||{}).id)&&y(c)))?s:ee,(a=d==X?s:ee)?(w("detach",a),m(a),h=l(a),x(o=T(a,e,t,n,r),"onload",ee),x(o,"onreadystatechange",ee)):(i&&b(i=y(i))&&(h=i),!h&&s&&(h=l(s)),o=E(e,t=I(t)||A(s)||"",n,r));try{h?a?h.replaceChild(o,a):s?h.replaceChild(o,s):k(h,o):k(M.body,o)}catch(e){}return o=s=e=a=h=n=ee,f(c)},view:function(e){var t,i,n,r,o,s,a=0;try{if(!(t=e.contentWindow||ee))for(r=(i=(n=c(e))&&d(n))&&i.frames||[];o=r[a++];){try{s=o.frameElement}catch(e){s=ee}if(s&&s==e){t=o;break}}}catch(e){t=ee}return t}},ee,!0),logger=R.def(K+".logger",{log:function(e){F.console&&console.log&&console.log(e)},error:function(e){F.console&&console.error?console.error(e):F.console&&console.log&&console.log(e)}},ee,!0),info=R.def("$sf.info",{errs:[],list:[]},ee,!0),z[N].trim||(z[N].trim=R.trim)}()}(window),function(D){var N=null,M=!0,W=!1,a=6e4,d="sf_pos",P="sf_pos_rel_el",h=750,e=1,_=10,C="onBeforePosMsg",T="onPosMsg",c={"exp-ovr":1,"exp-push":0,bg:0,pin:0,"read-cookie":0,"write-cookie":0},E="exp-ovr",l="collapse",f="error",p="geom-update",o="focus-change",F=3e3,L="object",s="string",I="style",q="length",H="width",R="height",O="PX",u="clip",U="scroll",g="onscroll",B="compatMode",v="documentElement",t="document",z="nodeType",m="contains",y="compareDocumentPosition",j="elementFromPoint",$="auto",V="hidden",X="overflow",G="toFixed",r="attach",w="detach",b="message",x="postMessage",A="guid",S="application/x-shockwave-flash",k=D&&D.$sf,Y=k&&k.ver,i=k&&k.env,n=i&&i.ua,J=k&&k.lib,Q=J&&J.lang,K=J&&J.dom,Z=K&&K.iframes,ee=Q&&Q.cbool,te=Q&&Q.cnum,ie=Q&&Q.cstr,ne=Q&&Q.callable,re=Q&&Q.noop,oe=Q&&Q[A],se=Q&&Q.mix,ae=K&&K.elt,ce=K&&K.par,de=(K&&K.tags,K&&K.attr),he=K&&K.doc,fe=K&&K.tagName,le=K&&K.view,pe=Z&&Z.view,ue=(K&&K.purge,K&&K.ready,D&&D.escape),ge=D&&D.Math,ve=ge&&ge.max,me=ge&&ge.min,ye=ge&&ge.round,we=N,be=Q&&Q.ParamHash,xe=D&&D[t],Ae=i&&i.isIE,Se=n&&n.ie||0,ke=n&&n.webkit||0,Pe=n&&n.gecko||0,Ce=n&&n.opera||0,Te=D&&D.location,_e=Te&&(Te.protocol+"//"+(Te.host||Te.hostname)||""),Ee={},Fe={},Ie={},He={},Re={},Oe=W,je=W,De=W,Ne=W,Me=0,We=0,Le=N,qe=N,Ue=N,Be=N,ze=["ShockwaveFlash.ShockwaveFlash.11","ShockwaveFlash.ShockwaveFlash.8","ShockwaveFlash.ShockwaveFlash.7","ShockwaveFlash.ShockwaveFlash.6","ShockwaveFlash.ShockwaveFlash"];function $e(e){var t,i,n,r,o,s=this;if(!arguments.length)return Be?se({},Be):N;if(!(s instanceof $e))return new $e(e);if(!e)return Be=N;if(o=!!Be,s.auto="auto"in e?ee(e.auto):M,s.cdn=ie(e.cdn),s.debug=ee(e.debug),s.root=ie(e.root),s.renderFile=ie(e.renderFile),s.msgFile=ie(e.msgFile),s.to=te(e.to,a),s.ver=ie(e.ver)||Y,s.onBeforePosMsg=ne(e.onBeforePosMsg)?e.onBeforePosMsg:re,s.onPosMsg=ne(e.onPosMsg)?e.onPosMsg:re,s.onStartPosRender=ne(e.onStartPosRender)?e.onStartPosRender:re,s.onEndPosRender=ne(e.onEndPosRender)?e.onEndPosRender:re,s.onFailure=ne(e.onFailure)?e.onFailure3:re,i=e.positions,s.positions=t={},i)for(n in i)(r=i[n])&&typeof r==L&&(t[n||r.id||oe(d)]=new Ve(r));Be=s,o=!!(o&&s.auto&&Q&&Q.ns("$sf.host.boot"));try{o&&k.host.boot()}catch(e){}return se({},Be)}function Ve(e,t,i){var n,r,o=this,s=e&&typeof e||"";return o instanceof Ve?(s==L?(o.id=ie(e.id),o.dest=ie(e.dest||t),o.bg=ie(e.bg)||"transparent",o.tgt=ie(e.tgt)||"_top",o.css=ie(e.css),o.w=te(e.w,0),o.h=te(e.h,0),o.z=te(e.z,0),o.supports=se({},e.supports||c,M,M,M),o.w&&o.h?o.size=o.w+"x"+o.h:(n=ie(e.size))?(r=n.split(/x/gi),o.w=te(r[0],0),o.h=te(r[1],0),o.size=n):o.size=""):"string"==s?(o.id=ie(e),o.dest=ie(e.dest)):(o.dest="",o.bg="transparent",o.tgt="_top",o.css="",o.w=0,o.h=0,o.size="",o.z=0,o.supports={}),o.id=o.id||oe(d),!Be&&i&&$e(i),Be&&(Be.positions[o.id]=o),se({},o)):new Ve(e,t,i)}function Xe(e){if(e){if(-1<e.indexOf("${sf_ver}")&&(e=e.replace(/\${sf_ver}/gi,$sf.ver)),-1<e.indexOf("${ck_on}")){var t=function(){var e=!!navigator.cookieEnabled;void 0!==navigator.cookieEnabled||e||(document.cookie="testcookie",e=-1!=document.cookie.indexOf("testcookie"),navigator&&(navigator.cookieEnabled=e));return e}()?"1":"0";e=e.replace(/\${ck_on}/gi,t)}if(-1<e.indexOf("${flash_ver}")){var i=function(){if(Ue!==N)return Ue;if(navigator.plugins&&0<navigator.plugins.length){var e=navigator.mimeTypes;e&&e[S]&&e[S].enabledPlugin&&e[S].enabledPlugin.description&&(Ue=e[S].enabledPlugin.version)}else if(k.env.isIE){var t,i,n,r;for(t=0;t<ze.length;t++)try{i=new ActiveXObject(ze[t]),n=i.GetVariable("$version"),r=n.indexOf(" "),Ue=-1<r?n.substr(r+1).replace(/,/gi,"."):n.replace(/,/gi,".");break}catch(e){i=N,Ue=0;continue}}else Ue=0;return Ue}();e=e.replace(/\${flash_ver}/gi,i)}}return ie(["<scr","ipt type='text/javascript', src='",e,"'></scr","ipt>"])}function Ge(e){var t=e&&he(e)||xe,i=t[B],n=t[v];return i&&!Ce&&"CSS1Compat"!=i&&(n=t.body),n}function Ye(e){return(e=ie(e))&&-1==e.search(/\D+/g)?M:e&&-1!=e.search(/px/gi)?M:void 0}function Je(e){var t,i,n,r,o=[-1,-1,-1,-1],s=[u+"Top",u+"Right",u+"Bottom",u+"Left"],a=0;if(!e)return o;if(Se)for(;i=s[a];)Ye(t=e[i])&&0<=(t=te(t,-1))&&(o[a]=t),a++;else if((t=e[u])&&-1!=t.search(/\d+/g))for(r=(o=(o=(t=t.replace(/\w+\(([^\)]*?)\)/g,"$1")).split(" "))[q]<=1?o.split(","):o)[q],a=0;r--;)Ye(n=o[a])?o[a]=te(n,-1):o[a]=-1,a++;return o}function Qe(e,t){var i,n=0,r=0;return(i=it(e))&&(n=i.borderTopWidth,r=i.borderLeftWidth,n=Ye(n)?te(n,0):0,r=Ye(r)?te(r,0):0,Pe&&/^t(?:able|d|h|r|head|foot)$/i.test(fe(e))&&(n=r=0)),(t=t||{t:0,l:0}).t+=n,t.l+=r,t}function Ke(e){var t,i,n,r,o={x:0,y:0,w:0,h:0},s={scrollLeft:0,scrollTop:0,scrollWidth:0,scrollHeight:0},a=0,c=0;return i=(t=he(e)||xe)[v]||s,r=t.body||s,(n=t.defaultView)&&(a=te(n.pageXOffset,0),c=te(n.pageYOffset,0)),o.x=ve(i.scrollLeft,r.scrollLeft,a),o.y=ve(i.scrollTop,r.scrollTop,c),o.w=ve(i.scrollWidth,r.scrollWidth,0),o.h=ve(i.scrollHeight,r.scrollHeight,0),o}function Ze(e){var t,i,n,r={t:0,l:0,r:0,b:0,w:0,h:0,z:0},o=0,s=0,a=W,c=Ge(e),d=Ke(e);if(e&&1==e[z])try{for(r.l=e.offsetLeft||0,r.t=e.offsetTop||0,t=e,a=Pe||519<ke;(t=t.offsetParent)&&(r.t+=t.offsetTop||0,r.l+=t.offsetLeft||0,a&&Qe(t,r),t!=c););if("fixed"!=it(t=e,"position")){for(t=e;(t=ce(t))&&(1==t[z]&&(o=t.scrollTop||0,s=t.scrollLeft||0,Pe&&"visible"!=it(t,X)&&Qe(t,r),r.l-=s,r.t-=o),t!=c););r.t+=d.y,r.l+=d.x}else r.t+=d.y,r.l+=d.x;Se||e!=Ge(e)?(n=e.offsetHeight,i=e.offsetWidth):(n=e.clientHeight,i=e.clientWidth),r.b=r.t+n,r.r=r.l+i,r.w=ve(r.r-r.l,0),r.h=ve(r.b-r.t,0),r.z=it(e,"zIndex")}catch(e){r={t:0,l:0,r:0,b:0,w:0,h:0,z:0}}return r}function et(e){var t=Ge(e),i=0,n=0;return t&&(i=t.scrollWidth||0,n=t.scrollHeight||0),{t:0,l:0,b:n,r:i,w:i,h:n}}function tt(e,t){var i=W,n=e&&e[z]||-1,r=t&&t[z]||-1;if(1==n&&-1!=r)if(e[m])if(Ce||1==r)i=e[m](t);else for(;t;){if(e===t){i=M;break}t=t.parentNode}else e[y]&&(i=e===t||!!(16&e[y](t)));return i}function it(e,t){var i="",n="getComputedStyle";if(!(!arguments[q]||!t))if(Se)try{i=e.currentStyle[t]}catch(e){i=""}else try{i=le(e)[n](e,N)[t]}catch(e){i=""}else if(Se)try{i=e.currentStyle}catch(e){i=N}else try{i=le(e)[n](e,N)}catch(e){i=N}return i}function nt(m,y,w){var e,t,i,n,r,o,s,a,c,d,h,f,l,p,u,g,v,b,x,A,S=m&&ce(m),k=Ge(m),P=we(m),C=we(k),T=Ke(k),_=et(m),E={t:0,l:0,r:0,b:0,w:0,h:0},F={t:0,l:0,r:0,b:0,xs:0,ys:0,xiv:0,yiv:0,iv:0,w:0,h:0},I=0,H=0,R=W,O=W,j=W;R=W;if(y=y&&typeof y==L?y:{},S)for(;(e=it(S))&&("block"!=e.display&&"absolute"!=e.position&&"none"==e.float&&"none"==e.clear||(p=e[X+"X"],u=e[X+"Y"],g=Je(e),S==k?(a=T.w,h=T.h):(a=S.scrollWidth,h=S.scrollHeight),c=S.offsetWidth,f=S.offsetHeight,d=S.clientWidth,l=S.clientHeight,(p==V||0<g[1]||0<g[3])&&(x||(v=1,x=S)),(u==V||0<g[0]||0<g[2])&&(x||(b=1,x=S)),p==U&&(x=S,I=f-l,R=M),u==U&&(x||(x=S),H=c-d,R=M),p==$&&(x||(x=S),d<a&&(I=f-l),R=M),u==$&&(x||(x=S),l<h&&(H=c-d),R=M),!x))&&(S==k&&(d<a&&(I=(i=D.innerHeight||f)-l),l<h&&(H=(t=D.innerWidth||c)-d),R=M),(S=ce(S))&&1==S[z]););return P.w&&P.h&&(x&&x!=k?(e=it(x),"body"==fe(x)?(x=k,n=P.t,r=P.l):n=r=0,E=we(x),0<g[1]&&(E.w=g[1],E.r=E.l+E.w),0<g[3]&&(E.l=E.l+g[3],E.w=E.w-g[3]),0<g[2]&&(E.h=g[2],E.b=E.t+E.h),0<g[0]&&(E.t=E.t+g[0],E.h=E.h-g[0]),P.t>E.t&&0<E.t&&(n=P.t-E.t),P.l>E.l&&0<E.l&&(r=P.l-E.l),x.scrollTop,x.scrollLeft,h=x.scrollHeight,a=x.scrollWidth,F.t=ve(n,0),F.l=ve(r,0),e&&(v=e[X+"X"]==V||0<g[1]||0<g[3],b=e[X+"Y"]==V||0<g[0]||0<g[2]),P.t>=E.b?F.b=0:(!b&&P.t>=E.b&&(b=1),h>x.clientHeight?F.b=b?0:ve(h-P.h-I-n,0):F.b=ve(E.h-P.h-I-n,0)),P.l>=E.r?F.r=0:(!v&&P.l>=E.r&&(v=1),a>x.clientWidth?F.r=v?0:ve(a-P.w-H-r,0):F.r=ve(E.w-P.w-H-r,0))):(F.t=ve(P.t,0),F.l=ve(P.l,0),Se&&"BackCompat"==xe[B]&&"no"==de(k,U)?b=v=1:(e=it(k))&&(v=e[X+"X"]==V,b=e[X+"Y"]==V),T.h>k.clientHeight?b?F.b=0:(j=M,F.b=ve(_.h-P.h-I-P.t,0)):F.b=ve(C.h-P.h-I-P.t,0),T.w>k.clientWidth?v?F.r=0:(O=M,F.r=ve(_.w-P.w-H-P.l,0)):F.r=ve(C.r-P.w-H-P.l,0)),F.xs=I?1:0,F.ys=H?1:0,F.w=F.r+F.l,F.h=F.t+F.b,x&&x!=k?A=E:(A=C,x=k),r=ve(P.l,A.l),o=me(P.r,O?me(_.r,A.r):A.r),t=ve(o-r,0),n=ve(P.t,A.t),s=me(P.b,j?me(_.b,A.b):A.b),i=ve(s-n,0),F.xiv=te((t/P.w)[G](2)),F.yiv=te((i/P.h)[G](2)),F.iv=te((t*i/(P.w*P.h))[G](2))),y.refNode=x||k,y.isRoot=x==k,y.canScroll=R,y.refRect=x&&x!=k?E:C,y.expRect=F,y.rect=P,w&&function(){var e,t,i,n,r,o,s,a,c,d,h,f,l,p,u,g=0,v=0;if(.5<F.iv&&(Oe=y,e=rt(m,te(w,1,1)),Oe=N,v=e[q],n=(t=P.w)*(i=P.h),v))for(;r=e[g++];)o=we(r),a=ve(P.l,o.l),c=me(P.r,o.r),s=ve(P.t,o.t),f=(h=c-a)*(d=me(P.b,o.b)-s),p=(1-h/t)[G](2),u=(1-d/i)[G](2),l=(1-f/n)[G](2),(0<p&&p<F.xiv||0<u&&u<F.yiv)&&(F.xiv=p,F.yiv=u,F.iv=l)}(),F}function rt(e,t){var i,n,r,o,s,a,c,d,h,f=we(e),l=he(e),p=Ge(l),u=f.t,g=f.l,v=f.r-f.l,m=f.b-f.t,y=_,w=[],b=ye(v/y),x=ye(m/y),A=b,S=x,k={},P={},C=[],T=0;if(Oe?P=Oe:nt(e,P,M),a=P.refNode,(c=P.refRect)&&a&&a!=p?(d=c.r,h=c.b):(d=g+v,h=u+m),l&&p&&l[j]){for(;A<v;){for(S=x;S<m;)n=u+S,(i=g+A)<d&&n<h&&C.push([i,n]),S+=x;A+=b}for(t=te(t,C[q]);r=C[T++];){s=l[j](r[0],r[1]);try{s&&1==s.nodeType&&s!==p&&s!==e&&!tt(e,s)&&((o=de(s,"id"))||(o=Q.guid("geom_inter"),de(s,"id",o)),!k[o]&&w[q]<t&&(k[o]=1,w.push(s)))}catch(e){}}}for(o in o="",k)0==o.indexOf("geom_inter")&&(s=ae(o))&&de(s,"id",N);return w}function ot(e,t,i,n){return qe||(qe=K.msghost_fb),e&&qe&&qe[e]&&qe[e](t,i,n)}function st(e){!je&&e&&e.data==initID&&(je=M,K.evtCncl(e),K[w](D,b,st))}function at(e){var t=e&&e.data,i=e&&e.source,n=t&&"string"==typeof t&&-1!=t.indexOf(A)&&be(t),r=n&&n.id,o=r&&ae(r),s=o&&pe(o),a=r&&Fe[r],c=n&&n[A],d=a&&a[A],h=a&&a._xmsgcb,f=W;if(d&&c&&c==d&&i&&s&&s==i)try{f=h(n.msg)}catch(e){f=W}return f&&K.evtCncl(e),f}function ct(e,t){var i,n,r,o=e&&Fe[e],s=W;if(o){if(o)if((i=be()).msg=t,i.guid=o.guid,dt()){r=ae(e),n=pe(r);try{n[x](ie(i),o.srcHost||"*"),s=M}catch(e){s=W}}else s=ot("send",e,t)}else s=ot("send",e,t);return i=n=r=N,s}function dt(){return je}function ht(e){var t,i,n,r,o,s,a,c=N,d=(a=Te.href.indexOf("#"),-1<(a=(s=-1<a?Te.href.substr(0,a):Te.href).indexOf("?"))&&(s=s.substr(0,a)),escape(s));return e&&(t=e.name,i=be(t),r=0!=(r=(n=ie(e.src))&&n.substring(0,n.indexOf("/",9))).search(/http/gi)?"":r,(c=be(i)).id=e.id||"iframe_"+oe(),c.src=n,c.srcHost=r,c[A]=c[A]||oe(),c.host=_e,c.loc=d,c.proxyID="",dt()?(c.html5=1,c.proxyPath=""):(o=ot("prep",c))&&(c=o),e.name=c),c}function ft(e,t,i){var n;"iframe"==fe(e)&&(n=de(e,"id"))&&t&&t instanceof be&&n==t.id&&(dt()?((Fe[n]=t)._xmsgcb=i,De||(K[r](D,b,at),De=M)):ot(r,e,t,i))}function lt(e){var t=de(e,"id"),i=t&&Fe[t],n=M;if(i){for(t in i&&(i._xmsgcb=Fe[t]=N,i=N,delete Fe[t]),t="",Fe)if((i=Fe[t])&&i[A]){n=W;break}n&&dt()&&De&&(De=W,K[w](D,b,at)),e=i=N}else ot(w,e)}function pt(e){var t,i,n=[],r=arguments,o=r[q],s=0,a=W;if(Be&&(t=Be[e])){for(;o--;)(i=r[s++])!=e&&n.push(i);try{a=t.apply(N,n)}catch(e){a=W}}return a}function ut(){Me&&(clearTimeout(Me),Me=0)}function gt(){We&&(clearTimeout(We),We=0)}function vt(e){gt(),We=setTimeout(function(){!function(e){var t,i,n,r;for(t in Ee)i=Ee[t],r=i&&i.dest,r&&ae(r)&&i&&(n=be(),data=be(),n.pos=t,n.cmd=data.cmd=o,n.value=e,pt(T,t,o,e),_t(i,n));gt()}(e)},2)}function mt(e){ut(),Me=e?setTimeout(bt,h):setTimeout(wt,h)}function yt(e){var t,i,n,r,o,s;for(t in Ee)e&&t in Re||(o=(r=(i=Ee[t])&&i.dest)&&ae(r))&&i&&(s=It(t,o,M),(n=be()).pos=t,n.cmd=p,n.geom=ue(s),pt(T,t,p,s),_t(i,n));ut()}function wt(){yt()}function bt(){yt(M)}function xt(e){vt(M)}function At(e){vt(D[t].hasFocus())}function St(e){mt(1)}function kt(e){mt()}function Pt(e){var t,i;ut();try{for(t in K.detach(D,U,St),K.detach(D,"resize",kt),K.detach(D,"unload",Pt),K.detach(D,"focus",xt),K.detach(D,"blur",At),Re)(i=Re[t])&&(i.tID&&clearTimeout(i.tID),K.detach(Re[t],U,i[g]),i[g]=i.node=N),Re[t]=N,delete Re[t];Ne=W}catch(e){}}function Ct(e){var t,i,n=W;if((t=be(e,N,N,M,M))&&t.pos&&(i=Ee[t.pos]))switch(t.cmd){case"exp-push":Ht(t,M),n=M;break;case"exp-ovr":Ht(t),n=M;break;case"collapse":!function(e,t,i){var n,r=e&&e.pos,o=r&&Ee[r],s=o&&o.conf,a=s&&s.dest,c=a&&ae(a),d=c&&ae(P+"_"+r),h=c&&c[I],f=d&&d[I];if(!(r&&o&&c&&d))return;if(!o.expanded)return;(n=Re[r])&&n.tID&&clearTimeout(n.tID);if(ut(),!i&&pt(C,r,l,0,0))return;h.left=h.top="0px",f[H]=h[H]=s.w+O,f[R]=h[R]=s.h+O,h.zIndex=o.dx=o.dy=0,Ft(a),i||(pt(T,r,l,0,0),e.cmd=t?"collapsed":"collapse",e.geom=ue(It(r,c,M)),_t(o,e));c=h=d=f=o=e=N}(t),n=M;break;case"msg":pt(T,t.pos,"msg",t.msg),n=M;break;case f:!function(e){var t=e&&e.pos,i=t&&Ee[t],n=i&&i.conf,r=n&&n.dest,o=r&&ae(r),s=o&&ae(P+"_"+t);o&&o[I],s&&s[I];k&&k.info&&k.info.errs&&k.info.errs.push(e);pt(T,t,f,e)}(t),n=M;break;case p:k.lib.logger.log("Geom update complete: "+t.pos),n=M;break;case"read-cookie":i.conf&&i.conf.supports&&i.conf.supports[t.cmd]&&"0"!=i.conf.supports[t.cmd]?(!function(e,t){var i,n,r=e&&e.pos,o=r&&Ee[r],s=o&&o.conf,a=s&&s.dest,c=a&&ae(a),d="read-cookie";if(!s.supports||!s.supports[d]||"0"==s.supports[d])return;if(!r||!o||!c)return;if(!(i=e.cookie))return;n=function(){var e,t,i,n={};for(e=document.cookie.split("; "),t=e.length-1;0<=t;t--)i=e[t].split("="),n[i[0]]=i[1];return n}(),pt(T,d,r,0,0),e.cmd=d,e.geom=ue(It(r,c,M)),e.value=n[i],_t(o,e),c=o=e=N}(t),n=M):n=W;break;case"write-cookie":i.conf&&i.conf.supports&&i.conf.supports[t.cmd]&&"0"!=i.conf.supports[t.cmd]?(!function(e,t){var i,n,r=e&&e.pos,o=r&&Ee[r],s=o&&o.conf,a=s&&s.dest,c=a&&ae(a),d="write-cookie";if(!s.supports||!s.supports[d]||"0"==s.supports[d])return;if(!r||!o||!c)return;if(!(i=e.cookie))return;n=escape(e.value);var h=new Date;h.setDate(h.getDate()+1);var f=n+"; expires="+h.toUTCString();document.cookie=i+"="+f,pt(T,d,r,0,0),e.cmd=d,e.geom=ue(It(r,c,M)),e.info=n,e.value="",_t(o,e),c=o=e=N}(t),n=M):n=W}return n}function Tt(){var e,t=M;for(e in Ie){t=W;break}return t}function _t(t,i){Le="sending-msg-down-"+i.cmd,setTimeout(function(){var e=t&&t.dest;e&&i&&ct(e,i.toString()),Le="",i=e=t=N},e)}function Et(){var e=this,t=K.attr(e,"_pos_id");Ie[t]&&(clearTimeout(Ie[t]),delete Ie[t],He[t]=t,K.attr(e,"_pos_id",N),K.attr(e,"name",N),e[I].visibility="inherit",e[I].display="block",pt("onEndPosRender",t)),Tt()||(Le="")}function Ft(e,t,i,n,r){if(Ae){var o=ae(e),s="shm_"+e,a=ae(s);if(t){if(a)return void(a[I].visibility="visible");a=Z.clone(o,{id:s,src:"",name:s},[H,":",i,O,";position:absolute;",R,":",n,O,";z-index:",r-1,";filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0)"]),K.append(ce(o),a)}else!t&&a&&(a[I].visibility="hidden")}}function It(t,e,i){var n,r,o,s,a=be(),c={};try{K.bounds(e,c,M),i||c.isRoot||!c.canScroll||((o=c.expRect).xs||o.ys)&&(n=Re[t],r=c.refNode,n&&n.node!=r&&(n.tID&&clearTimeout(n.tID),K.detach(void 0,U,n[g]),n.node=n[g]=N,Re[t]=N,delete Re[t]),Re[t]||((n={}).node=r,n[g]=function(e){var o,s;(s=Re[o=t])&&(s.tID&&(clearTimeout(s.tID),delete s.tID),s.tID=setTimeout(function(){var e,t,i=Ee[o],n=i&&i.dest,r=n&&ae(n);r&&i&&(e=It(o,r,M),(t=be()).pos=o,t.cmd=p,t.geom=ue(e),pt(T,o,p,e),_t(i,t)),delete s.tID},h))},Re[t]=n,K.attach(r,U,n[g])))}catch(e){a=N}try{a&&(a.win=be(K.winRect()),a.par=be(c.refRect),o=be(c.expRect),(s=be(c.rect)).iv=o.iv,s.xiv=o.xiv,s.yiv=o.yiv,delete o.iv,delete o.xiv,delete o.yiv,a.exp=o,a.self=s)}catch(e){a=N}return a}function Ht(e,t){var i,n,r,o,s,a,c,d,h,f,l,p,u,g,v,m,y,w,b,x,A=W,S=W,k=e&&e.pos;k&&(n=(i=Ee[k])&&i.conf,i&&n&&(u=i.dest,r=ae(u),o=ae(P+"_"+k),r&&o&&(s=r[I],a=o[I],s&&((x=Re[k])&&x.tID&&clearTimeout(x.tID),ut(),w=e.exp_obj,c=n.w,d=n.h,w?(g=te(w.t,0,0),v=te(w.l,0,0),m=te(w.r,0,0),y=te(w.b,0,0),l=te(c+v+m,0,0),p=te(d+g+y,0,0),g?(f=-1*g,S=M):f=0,v?(h=-1*v,A=M):h=0):(l=(A=(h=i.dx=te(e.dx))<0)?c+-1*h:c+h,p=(S=(f=i.dy=te(e.dy))<0)?d+-1*f:d+f),l<=c&&p<=d||pt(C,k,E,h,f)||(s[H]=l+O,s[R]=p+O,A&&(s.left=h+O),S&&(s.top=f+O),(b=te(i.z,0))||(b=F),s.zIndex=b,Ft(u,M,l,p,b-1),t?(a[H]=l+O,a[R]=p+O):(a[H]=c+O,a[R]=d+O),i.expanded=M,e.dx=h,e.dy=f,e.w=l,e.h=p,e.cmd="expand",e.geom=ue(It(k,r,M)),pt(T,k,E,h,f),_t(i,e),s=o=r=i=e=N)))))}function Rt(){var e,t,i,n,r,o,s=0,a=M,c=arguments;if(!c[q]||"*"==c[s])for(e in c=[],Ee)c.push(e);for(;e=c[s++];)(t=Ee[e])&&(e in Ie&&(clearTimeout(Ie[e]),delete Ie[e]),e in He&&delete He[e],o=(n=(i=t.dest)&&ae(i))&&ce(n),-1!=K.attr(o,"id").indexOf(P)&&(o=ce(r=o)),K.purge(n),r&&K.purge(r),Ee[e]=N,delete Ee[e],n=K.make("div"),K.attr(n,"id",i),K.append(o,n));for(e in e="",Ee){a=W;break}a&&(Le="",Pt())}Q&&D==top&&(we=Se?function(e){var t,i,n,r,o,s,a,c,d,h={t:0,l:0,r:0,b:0,w:0,h:0,z:0},f="BackCompat";if(e&&1==e[z])try{if(n=he(e)||xe,!K.ready())return Ze(e);t=Ke(e),i=e.getBoundingClientRect(),h.t=i.top,h.l=i.left,s=a=2,r=n[B],c=(o=it(n[v])).borderLeftWidth,d=o.borderTopWidth,6===Se&&r!=f&&(s=a=0),r==f&&(s=c=Ye(c)?te(c,0):0,a=d=Ye(d)?te(d,0):0,h.t-=s,h.l-=a),h.t+=t.y,h.l+=t.x,h.b=h.t+e.offsetHeight,h.r=h.l+e.offsetWidth,h.w=ve(h.r-h.l,0),h.h=ve(h.b-h.t,0),h.z=it(e,"zIndex")}catch(e){h={t:0,l:0,r:0,b:0,w:0,h:0,z:0}}return h}:Ze,Q.def("dom",{rect:we,currentStyle:it,contains:tt,docRect:et,winRect:function(e){var t=e&&le(e)||D,i=t.innerHeight||0,n=t.innerWidth||0,r=t.screenY||t.screenTop||0,o=i+r,s=t.screenX||t.screenLeft||0,a=n+s,c=Ge(e);return i||n||!c||(i=c.clientHeight||0,a=s+(n=c.clientWidth||0),o=r+i),{t:r,l:s,b:o,r:a,w:n,h:i}},bounds:nt,overlaps:rt},J,M),function(){if(Q){Q.def("msghost",{prep:ht,attach:ft,detach:lt,usingHTML5:dt,send:ct},K,M),K[r](D,b,st),initID="xdm-html5-init-"+oe(),_e=0==_e.indexOf("file")?_e="file":_e;try{D[x](initID,"file"==_e?"*":_e)}catch(e){K[w](D,b,st)}}}(),Q.def("$sf.host",{Config:$e,PosConfig:Ve,PosMeta:function e(t,i,n){var r,o;if(!(this instanceof e))return new e(key,n,pos,t);if(r={},o={},!i||typeof i!=s)return this;t&&typeof t==L&&(r=se(r,t)),n&&typeof n==L&&(o[i]=n),this.toString=function(){var e=new be;return e.shared=r,e.non_shared=o,e.toString()},this.value=function(e,t){var i="";return e&&typeof e==s?(t&&typeof t==s||(t="shared"),i="shared"==t?r[e]||"":e in o&&o[prop_key]||""):i}},Position:function e(t,i,n,r){var o,s=this,a=t&&typeof t;if(!(s instanceof e))return new e(t,i,n,r);if(null==Be){var c="Publisher Config not initialized - abort";return logger.error(c),void info.errs.push(c)}a==L?se(s,t):o=s.id=ie(t)||oe(d),i?(s.html=i,s.src=""):s.src?s.html=Xe(s.src):(s.html=s.html||"",s.src=""),s.html||(s.html=""),s.meta=n||s.meta||{},s.conf=r||s.conf||{},o&&(Be&&Be.positions[o]?s.conf=Be.positions[o]:r&&(r.id=o,s.conf=new Ve(r)))},nuke:Rt,get:function(e){var t=Ee[e];return t?se({},t):null},render:function e(){var t,i,n,r,o,s,a,c,d,h,f,l,p,u,g,v=0,m=arguments;if(!Be)return W;if(!K.ready())return K.wait(function(){e.apply(N,m),m=N}),N;for(m[0]instanceof Array&&1==m[q]&&(m=m[0]);t=m[v++];)if((n=(i=t.id)?Be.positions[i]:N)&&(r=(d=n.dest)&&ae(d))){if(l=n.w,p=n.h,!l){try{l=r.offsetWidth}catch(e){l=0}l&&(n.w=l)}if(!p){try{p=r.offsetHeight}catch(e){p=0}p&&(n.h=p)}l&&p&&(c=new be,s=ae(h=P+"_"+i),a=ce(r),s&&a==s&&(a=ce(s)),Ft(d),(g=Ie[i])&&clearTimeout(g),(g=He[i])&&delete He[i],Ie[i]=setTimeout(function(){var e,t;(t=(e=i)&&Ie[e])&&(clearTimeout(t),Rt(e),pt(T,"render-timeout",e)),Tt()||(Le="")},Be.to),Le="rendering",pt("onStartPosRender",i,n,t),f=["position:","",";z-index:0;",H,":",l,O,";",R,":",p,O,";","visibility:inherit;"],s?((u=s[I]).width=l+O,u.height=p+O,(u=r&&r[I]).width=l+O,u.height=p+O):(f[1]="relative",(s=K.make("div")).id=h,s.className="iab_sf",o=r.cloneNode(W),K.css(o,f),s.appendChild(o),K.css(s,f),a.replaceChild(s,r),r=ae(d)),c.id=i,c.dest=d,c.conf=be(n),c.meta=t.meta.toString(),c.html=ue(t.html),c.geom=ue(It(i,r)),c.src=Be.renderFile,c.has_focus=Q.cstr(document.hasFocus()),f[1]="absolute",f[13]="top:0px;left:0px;visibility:hidden;display:none;",Ne||(K.attach(D,U,St),K.attach(D,"resize",kt),K.attach(D,"unload",Pt),K.attach(D,"focus",xt),K.attach(D,"blur",At),Ne=M),Z.replace({id:d,name:c,src:Be.renderFile,_pos_id:i},f,s,Et,Ct),Ee[i]=c)}},status:function(){return Le}},N,M))}(window),function(A){var S=!1,k=!0,P=null,C="sf_data",T="text/x-safeframe",a=100,_="sf_position",E=A&&A.document,F=A&&A.$sf,I=F&&F.lib,H=I&&I.lang,R=I&&I.dom,O=H&&H.cstr,j=H&&H.guid,D=R&&R.elt,N=R&&R.par,M=R&&R.tags,W=R&&R.attr,i=R&&R.purge,L=R&&R.ready,q={},c=0,U=S,B=S;function z(e,t){var i,n;try{I||(I=F&&F.lib),I&&I.logger&&A==top?t?I.logger.error(e):I.logger.log(e):(i=E.getElementsByTagName("head")[0],(n=E.createElement("script")).type="text/plain",n.text="\x3c!-- SafeFrame "+(t?"error":"log")+": "+(e||"unknown")+" --\x3e",i.appendChild(i,n))}catch(e){}}function $(){var e,t;if(R)for(e in q)(t=D(e))&&(i(t),delete q[e])}function d(){var e,t,i,n,r,o,s,a,c,d,h,f,l,p,u,g,v=M&&M("script")||[],m=[],y=0,w=S,b=F&&F.host,x=b&&b.conf;if(!F||!H||!R)return z("SafeFrame base library not found",k),w;if(I||(I=F&&F.lib),B&&U)return z("Automatic boot already invoked"),w;if(A==top){try{sf_conf=b.Config()}catch(e){sf_conf=P}if(x&&!sf_conf)try{sf_conf=b.Config(x)}catch(e){sf_conf=P}if(!sf_conf)return z("No configuration found"),w}for(;e=v[y++];)if(e.className==C||W(e,"type")==T){if(U=k,(i=W(e,"id"))||(i=j("sf_data_element"),W(e,"id",i)),q[i])continue;n=e.text||e.innerHTML||e.innerText;try{n=H.trim(n),n=(n=new Function("return "+n))()}catch(e){n=P,z("Error parsing tag configuration "+(e&&e.message||""),k);continue}if(n&&n.id&&(n.html||n.src))if(A!=top)r=(r=n.html||"")||(g=n.src,O(["<scr","ipt type='text/javascript', src='",g,"'></scr","ipt>"])),L()?z("cannot write html content into already loaded document"):E.write(r);else{if(!(t=N(e))){z("can't find parent element for script tag",k);continue}if((s=sf_conf&&sf_conf.positions[n.id])||((s=n.conf).id=n.id,s&&(s=new b.PosConfig(s))),!s){z("no position conf found pre-defined or inline for position "+n.id,k);continue}if(s.dest||(s=new b.PosConfig(s,j(_))),n.meta){for(u in u="",f={},c=n.meta)h=typeof(d=c[u]),!l&&"object"==h&&d&&(l=d,p=u),"object"!=h&&"function"!=h&&(f[u]=d);c=new b.PosMeta(f,p||"",p&&l?l:P)}if(o=new b.Position(n,P,c,s),q[i]=i,!(a=D(s.dest)))if(L()){a=R.make("div"),W(a,"id",s.dest);try{t.insertBefore(a)}catch(e){z("failed auto-adding destination element "+e.message,k);continue}}else E.write("<div id='",s.dest,"'></div>");m.push(o)}else z("no content or id property found in the inline position object",k)}if(m.length)try{b.render(m)}catch(e){z("failed during rendering "+e.message)}else z("no positions to boot");R.wait($)}setTimeout(function e(){var t,i,n,r,o,s=k;if(!U)if(i=F&&F.host,A==top){i&&!i.boot&&(i.boot=d);try{t=i&&i.Config()}catch(e){t=P}if(!t)try{t=i&&i.conf}catch(e){t=P}if(t&&("auto"in t&&t.auto===S&&(s=S),(!i.render||!i.Config)&&(n=t.hostFile)))return r=M("head")[0],(o=R.make("script")).id="sf_host_lib",o.type="text/javascript",o.className="sf_lib",o.src=n,A.ActiveXObject?o.onreadystatechange=function(){var e=o.readyState;"loaded"!=e&&"complete"!=e||(B=S,s&&d(),o.onreadystatechange=P,o=r=i=t=P)}:o.onload=function(){B=S,s&&d(),o.onload=P,o=r=i=t=P},B=k,void r.appendChild(o);s&&(t?(B=k,d(),B=S):c++<=a&&setTimeout(e,50))}else d()},50)}(window);
;
// File: /js/rtbf/www/public/static/js/vendors/postscribe/postscribe.min.js
/* Asynchronously write javascript, even with document.write., v1.4.0 https://krux.github.io/postscribe
Copyright (c) 2015 Derek Brans, MIT license https://github.com/krux/postscribe/blob/master/LICENSE */!function(){function a(a,h){a=a||"",h=h||{};for(var i in b)b.hasOwnProperty(i)&&(h.autoFix&&(h["fix_"+i]=!0),h.fix=h.fix||h["fix_"+i]);var j=[],k=document.createElement("div"),l=function(a){return"string"==typeof a&&-1!==a.indexOf("&")?(k.innerHTML=a,k.textContent||k.innerText||a):a},m=function(b){a+=b},n=function(b){a=b+a},o={comment:/^<!--/,endTag:/^<\//,atomicTag:/^<\s*(script|style|noscript|iframe|textarea)[\s\/>]/i,startTag:/^</,chars:/^[^<]/},p={comment:function(){var b=a.indexOf("-->");return b>=0?{content:a.substr(4,b),length:b+3}:void 0},endTag:function(){var b=a.match(d);return b?{tagName:b[1],length:b[0].length}:void 0},atomicTag:function(){var b=p.startTag();if(b){var c=a.slice(b.length);if(c.match(new RegExp("</\\s*"+b.tagName+"\\s*>","i"))){var d=c.match(new RegExp("([\\s\\S]*?)</\\s*"+b.tagName+"\\s*>","i"));if(d)return{tagName:b.tagName,attrs:b.attrs,content:d[1],length:d[0].length+b.length}}}},startTag:function(){var b=a.indexOf(">");if(-1===b)return null;var d=a.match(c);if(d){var g={},h={},i=d[2];return d[2].replace(e,function(a,b){if(arguments[2]||arguments[3]||arguments[4]||arguments[5])if(arguments[5])g[arguments[5]]="",h[b]=!0;else{var c=arguments[2]||arguments[3]||arguments[4]||f.test(b)&&b||"";g[b]=l(c)}else g[b]=null;i=i.replace(a,"")}),{tagName:d[1],attrs:g,booleanAttrs:h,rest:i,unary:!!d[3],length:d[0].length}}},chars:function(){var b=a.indexOf("<");return{length:b>=0?b:a.length}}},q=function(){for(var b in o)if(o[b].test(a)){g&&console.log("suspected "+b);var c=p[b]();return c?(g&&console.log("parsed "+b,c),c.type=c.type||b,c.text=a.substr(0,c.length),a=a.slice(c.length),c):null}},r=function(a){for(var b;b=q();)if(a[b.type]&&a[b.type](b)===!1)return},s=function(){var b=a;return a="",b},t=function(){return a};return h.fix&&!function(){var b=/^(AREA|BASE|BASEFONT|BR|COL|FRAME|HR|IMG|INPUT|ISINDEX|LINK|META|PARAM|EMBED)$/i,c=/^(COLGROUP|DD|DT|LI|OPTIONS|P|TD|TFOOT|TH|THEAD|TR)$/i,d=[];d.last=function(){return this[this.length-1]},d.lastTagNameEq=function(a){var b=this.last();return b&&b.tagName&&b.tagName.toUpperCase()===a.toUpperCase()},d.containsTagName=function(a){for(var b,c=0;b=this[c];c++)if(b.tagName===a)return!0;return!1};var e=function(a){return a&&"startTag"===a.type&&(a.unary=b.test(a.tagName)||a.unary,a.html5Unary=!/\/>$/.test(a.text)),a},f=q,g=function(){var b=a,c=e(f());return a=b,c},i=function(){var a=d.pop();n("</"+a.tagName+">")},j={startTag:function(a){var b=a.tagName;"TR"===b.toUpperCase()&&d.lastTagNameEq("TABLE")?(n("<TBODY>"),l()):h.fix_selfClose&&c.test(b)&&d.containsTagName(b)?d.lastTagNameEq(b)?i():(n("</"+a.tagName+">"),l()):a.unary||d.push(a)},endTag:function(a){var b=d.last();b?h.fix_tagSoup&&!d.lastTagNameEq(a.tagName)?i():d.pop():h.fix_tagSoup&&k()}},k=function(){f(),l()},l=function(){var a=g();a&&j[a.type]&&j[a.type](a)};q=function(){return l(),e(f())}}(),{append:m,readToken:q,readTokens:r,clear:s,rest:t,stack:j}}var b=function(){var a,b={},c=this.document.createElement("div");return a="<P><I></P></I>",c.innerHTML=a,b.tagSoup=c.innerHTML!==a,c.innerHTML="<P><i><P></P></i></P>",b.selfClose=2===c.childNodes.length,b}(),c=/^<([\-A-Za-z0-9_]+)((?:\s+[\w\-]+(?:\s*=?\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,d=/^<\/([\-A-Za-z0-9_]+)[^>]*>/,e=/(?:([\-A-Za-z0-9_]+)\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))|(?:([\-A-Za-z0-9_]+)(\s|$)+)/g,f=/^(checked|compact|declare|defer|disabled|ismap|multiple|nohref|noresize|noshade|nowrap|readonly|selected)$/i,g=!1;a.supports=b,a.tokenToString=function(a){var b={comment:function(a){return"<!--"+a.content},endTag:function(a){return"</"+a.tagName+">"},atomicTag:function(a){return g&&console.log(a),b.startTag(a)+a.content+b.endTag(a)},startTag:function(a){var b="<"+a.tagName;for(var c in a.attrs){b+=" "+c;var d=a.attrs[c];("undefined"==typeof a.booleanAttrs||"undefined"==typeof a.booleanAttrs[c])&&(b+='="'+(d?d.replace(/(^|[^\\])"/g,'$1\\"'):"")+'"')}return a.rest&&(b+=a.rest),b+(a.unary&&!a.html5Unary?"/>":">")},chars:function(a){return a.text}};return b[a.type](a)},a.escapeAttributes=function(a){var b={};for(var c in a){var d=a[c];b[c]=d&&d.replace(/(^|[^\\])"/g,'$1\\"')}return b};for(var h in b)a.browserHasFlaw=a.browserHasFlaw||!b[h]&&h;this.htmlParser=a}(),function(){function a(){}function b(a){return a!==m&&null!==a}function c(a){return"function"==typeof a}function d(a,b,c){var d,e=a&&a.length||0;for(d=0;e>d;d++)b.call(c,a[d],d)}function e(a,b,c){var d;for(d in a)a.hasOwnProperty(d)&&b.call(c,d,a[d])}function f(a,b){return e(b,function(b,c){a[b]=c}),a}function g(a,c){return a=a||{},e(c,function(c,d){b(a[c])||(a[c]=d)}),a}function h(a){try{return o.call(a)}catch(b){var c=[];return d(a,function(a){c.push(a)}),c}}function i(a){return a&&"tagName"in a?!!~a.tagName.toLowerCase().indexOf("script"):!1}function j(a){return a&&"tagName"in a?!!~a.tagName.toLowerCase().indexOf("style"):!1}var k={afterAsync:a,afterDequeue:a,afterStreamStart:a,afterWrite:a,autoFix:!0,beforeEnqueue:a,beforeWriteToken:function(a){return a},beforeWrite:function(a){return a},done:a,error:function(a){throw a},releaseAsync:!1},l=this,m=void 0;if(!l.postscribe){var n=!1,o=Array.prototype.slice,p=function(a){return a[a.length-1]},q=function(){function a(a,c,d){var e=k+c;if(2===arguments.length){var f=a.getAttribute(e);return b(f)?String(f):f}b(d)&&""!==d?a.setAttribute(e,d):a.removeAttribute(e)}function g(b,c){var d=b.ownerDocument;f(this,{root:b,options:c,win:d.defaultView||d.parentWindow,doc:d,parser:htmlParser("",{autoFix:c.autoFix}),actuals:[b],proxyHistory:"",proxyRoot:d.createElement(b.nodeName),scriptStack:[],writeQueue:[]}),a(this.proxyRoot,"proxyof",0)}var k="data-ps-";return g.prototype.write=function(){[].push.apply(this.writeQueue,arguments);for(var a;!this.deferredRemote&&this.writeQueue.length;)a=this.writeQueue.shift(),c(a)?this.callFunction(a):this.writeImpl(a)},g.prototype.callFunction=function(a){var b={type:"function",value:a.name||a.toString()};this.onScriptStart(b),a.call(this.win,this.doc),this.onScriptDone(b)},g.prototype.writeImpl=function(a){this.parser.append(a);for(var b,c,d,e=[];(b=this.parser.readToken())&&!(c=i(b))&&!(d=j(b));)b=this.options.beforeWriteToken(b),b&&e.push(b);this.writeStaticTokens(e),c&&this.handleScriptToken(b),d&&this.handleStyleToken(b)},g.prototype.writeStaticTokens=function(a){var b=this.buildChunk(a);if(b.actual)return b.html=this.proxyHistory+b.actual,this.proxyHistory+=b.proxy,this.proxyRoot.innerHTML=b.html,n&&(b.proxyInnerHTML=this.proxyRoot.innerHTML),this.walkChunk(),n&&(b.actualInnerHTML=this.root.innerHTML),b},g.prototype.buildChunk=function(a){var b=this.actuals.length,c=[],e=[],f=[];return d(a,function(a){var d=htmlParser.tokenToString(a);if(c.push(d),a.attrs){if(!/^noscript$/i.test(a.tagName)){var g=b++;e.push(d.replace(/(\/?>)/," "+k+"id="+g+" $1")),"ps-script"!==a.attrs.id&&"ps-style"!==a.attrs.id&&f.push("atomicTag"===a.type?"":"<"+a.tagName+" "+k+"proxyof="+g+(a.unary?" />":">"))}}else e.push(d),f.push("endTag"===a.type?d:"")}),{tokens:a,raw:c.join(""),actual:e.join(""),proxy:f.join("")}},g.prototype.walkChunk=function(){for(var c,d=[this.proxyRoot];b(c=d.shift());){var e=1===c.nodeType,f=e&&a(c,"proxyof");if(!f){e&&(this.actuals[a(c,"id")]=c,a(c,"id",null));var g=c.parentNode&&a(c.parentNode,"proxyof");g&&this.actuals[g].appendChild(c)}d.unshift.apply(d,h(c.childNodes))}},g.prototype.handleScriptToken=function(a){var b=this.parser.clear();if(b&&this.writeQueue.unshift(b),a.src=a.attrs.src||a.attrs.SRC,a=this.options.beforeWriteToken(a)){a.src&&this.scriptStack.length?this.deferredRemote=a:this.onScriptStart(a);var c=this;this.writeScriptToken(a,function(){c.onScriptDone(a)})}},g.prototype.handleStyleToken=function(a){var b=this.parser.clear();b&&this.writeQueue.unshift(b),a.type=a.attrs.type||a.attrs.TYPE||"text/css",a=this.options.beforeWriteToken(a),a&&this.writeStyleToken(a),b&&this.write()},g.prototype.writeStyleToken=function(a){var b=this.buildStyle(a);this.insertStyle(b),a.content&&(b.styleSheet&&!b.sheet?b.styleSheet.cssText=a.content:b.appendChild(this.doc.createTextNode(a.content)))},g.prototype.buildStyle=function(a){var b=this.doc.createElement(a.tagName);return b.setAttribute("type",a.type),e(a.attrs,function(a,c){b.setAttribute(a,c)}),b},g.prototype.insertStyle=function(a){this.writeImpl('<span id="ps-style"/>');var b=this.doc.getElementById("ps-style");b.parentNode.replaceChild(a,b)},g.prototype.onScriptStart=function(a){a.outerWrites=this.writeQueue,this.writeQueue=[],this.scriptStack.unshift(a)},g.prototype.onScriptDone=function(a){return a!==this.scriptStack[0]?void this.options.error({message:"Bad script nesting or script finished twice"}):(this.scriptStack.shift(),this.write.apply(this,a.outerWrites),void(!this.scriptStack.length&&this.deferredRemote&&(this.onScriptStart(this.deferredRemote),this.deferredRemote=null)))},g.prototype.writeScriptToken=function(a,b){var c=this.buildScript(a),d=this.shouldRelease(c),e=this.options.afterAsync;a.src&&(c.src=a.src,this.scriptLoadHandler(c,d?e:function(){b(),e()}));try{this.insertScript(c),(!a.src||d)&&b()}catch(f){this.options.error(f),b()}},g.prototype.buildScript=function(a){var b=this.doc.createElement(a.tagName);return e(a.attrs,function(a,c){b.setAttribute(a,c)}),a.content&&(b.text=a.content),b},g.prototype.insertScript=function(a){this.writeImpl('<span id="ps-script"/>');var b=this.doc.getElementById("ps-script");b.parentNode.replaceChild(a,b)},g.prototype.scriptLoadHandler=function(a,b){function c(){a=a.onload=a.onreadystatechange=a.onerror=null}function d(){c(),b()}function e(a){c(),g(a),b()}var g=this.options.error;f(a,{onload:function(){d()},onreadystatechange:function(){/^(loaded|complete)$/.test(a.readyState)&&d()},onerror:function(){e({message:"remote script failed "+a.src})}})},g.prototype.shouldRelease=function(a){var b=/^script$/i.test(a.nodeName);return!b||!!(this.options.releaseAsync&&a.src&&a.hasAttribute("async"))},g}();l.postscribe=function(){function b(){var a,b=j.shift();b&&(a=p(b),a.afterDequeue(),b.stream=d.apply(null,b),a.afterStreamStart())}function d(c,d,g){function j(a){a=g.beforeWrite(a),m.write(a),g.afterWrite(a)}m=new q(c,g),m.id=i++,m.name=g.name||m.id,e.streams[m.name]=m;var k=c.ownerDocument,l={close:k.close,open:k.open,write:k.write,writeln:k.writeln};f(k,{close:a,open:a,write:function(){return j(h(arguments).join(""))},writeln:function(){return j(h(arguments).join("")+"\n")}});var n=m.win.onerror||a;return m.win.onerror=function(a,b,c){g.error({msg:a+" - "+b+":"+c}),n.apply(m.win,arguments)},m.write(d,function(){f(k,l),m.win.onerror=n,g.done(),m=null,b()}),m}function e(d,e,f){c(f)&&(f={done:f}),f=g(f,k),d=/^#/.test(d)?l.document.getElementById(d.substr(1)):d.jquery?d[0]:d;var h=[d,e,f];return d.postscribe={cancel:function(){h.stream?h.stream.abort():h[1]=a}},f.beforeEnqueue(h),j.push(h),m||b(),d.postscribe}var i=0,j=[],m=null;return f(e,{streams:{},queue:j,WriteStream:q})}()}}();
;
// File: /js/news/common/public/static/js/social.js

// Pinterest
(function(d, s, id){
    var js, pjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//assets.pinterest.com/sdk/sdk.js";
    pjs.parentNode.insertBefore(js, pjs);
}(document, 'script', 'pinterest-jssdk'));

// Facebook
window.fbAsyncInit = function() {
    var pageAppId = 366967623746;

    if ((ref = document.head.querySelector("[property='fb:app_id']")) != null) {
      pageAppId = ref.content;
    }

    FB.init({
        appId: pageAppId,
        xfbml: true,
        version: 'v3.0'
    });
};
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/fr_FR/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Twitter
window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));
;