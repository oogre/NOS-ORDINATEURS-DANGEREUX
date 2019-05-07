
// File: /js/news/common/public/static/js/module/article/embed.js
$(function () {

    // Timeline
    $('iframe[src*=\'.knightlab.com/libs/timeline\']').addClass('rtbf-article-main__embed-timelinejs');

    // Idalgo
    $('.idalgo-iframe').each(function () {

        var url = 'https://www.rtbf.be/sport/widget/idalgo-iframe?url=';
        var src = $(this).data('src');

        if (src != undefined) {

            url += encodeURIComponent(src);

            var $iframe = $('<iframe />', {
                src: url,
                width: '100%'
            });

            $(this).replaceWith($iframe);

            $iframe.load(function () {
                $(this).height($(this).contents().height());
                $('body').trigger('iframeloaded');
            });
        }
    });

    // embed audio
    $('.js-embed-audio iframe').load(function () {
        var $iframe = $(this).contents();
        var iframeHeight = $iframe.find('body').height();
        $(this).closest('.js-embed-audio').height(iframeHeight);
        $('body').trigger('iframeloaded');
    });

    // Picture Gallery
    $('.picture-gallery-embed').each(function () {

        var galleryId = $(this).data('gallery-id');
        var url = 'https://www.rtbf.be/iframe/gallery?id=' + galleryId + '&fullscreen=1';

        var $iframe = $('<iframe />', {
            id: 'picture-gallery-embed-' + galleryId,
            name: 'picture-gallery-embed-' + galleryId,
            'class': 'picture-gallery-embed',
            frameborder: '0',
            scrolling: 'no',
            width: '100%',
            src: url,
            allowFullScreen: 'allowFullScreen'
        });
        $iframe.load(function () {
            $(this).height($(this).contents().height());
            $('body').trigger('iframeloaded');
        });
        $(this).replaceWith($iframe);
    });
});
;
// File: /js/news/common/public/static/js/module/article/viewcount.js
(function ($, window) {

    var isPreview = window.location.href.indexOf('preview') > -1;

    if (!isPreview) {

        var articleId = parseInt($('.js-article-detail').data('articleId'));
        if (articleId > 0) {
            $.get('https://viewcount-service.rtbf.be/', { 'article_id': articleId });
        }
    }
})(jQuery, window);
;
// File: /js/news/common/public/static/js/RTBF/text2speech.js
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/* globals ReadSpeaker */
// eslint-disable-next-line no-use-before-define
var RTBF = RTBF || {};

(function ($, window, document, RTBF) {
  /* globals jQuery */

  var Text2speech = (function () {
    function Text2speech() {
      _classCallCheck(this, Text2speech);

      this.cookieName = 'isReadSpeakerEnabled';
      this.isAlreadyRendered = false;
    }

    _createClass(Text2speech, [{
      key: 'disable',
      value: function disable() {
        $.cookie(this.cookieName, null, { path: '/' });
      }
    }, {
      key: 'enable',
      value: function enable() {
        $.cookie(this.cookieName, 1, { path: '/' });
        this.render();
      }
    }, {
      key: 'isEnabled',
      value: function isEnabled() {
        return true

        // We don't use the cookie anymore
        // Small button instead

        // return $.cookie(this.cookieName) == 1;
        ;
      }
    }, {
      key: 'render',
      value: function render() {
        if (!this.isAlreadyRendered && this.isEnabled()) {
          var $item = $('.js-text2speech-area');

          $item.each(function () {
            $(this).show();
          });

          if ($item.length > 0) {
            window.rsConf = { params: 'https://www.static.rtbf.be/news/common/js/module/helper/text2speech/ReadSpeaker.js?pids=embhl' };

            var head = document.getElementsByTagName('HEAD').item(0);
            var script = document.createElement('script');

            script.type = 'text/javascript';
            script.src = 'https://www.static.rtbf.be/news/common/js/module/helper/text2speech/ReadSpeaker.js';
            head.appendChild(script);

            script.onload = function () {
              ReadSpeaker.init();
            };

            this.isAlreadyRendered = true;
          }
        }
      }
    }]);

    return Text2speech;
  })();

  RTBF.Text2speech = new Text2speech();
})(jQuery, window, document, RTBF);
;
// File: /js/news/common/public/static/js/module/helper/text2speech.js
$(function () {
    RTBF.Text2speech.render();
});
;
// File: /js/news/common/public/static/js/module/helper/dates.js
$(function() {

    var updateAgo = function () {
        $('.js-uncached-ago').each(function() {
            var that = $(this);

            var articleTime = parseInt(that.data('time'));

            var now = new Date();
            var currentTime = now.getMinutes();

            // Handle async block loading by waiting for the blockready event to refresh dates
            if (currentTime < articleTime) {
                currentTime += 60;
            }

            var realAgo = currentTime - articleTime;
            if (realAgo < 1) {
            	realAgo = 1;
            }

            if (realAgo == 1) {
                that.text( 'une minute');
            }

            if (realAgo > 1) {
                that.text(realAgo + ' minutes');
            }

            that.removeClass('js-uncached-ago');
        });
    };

    updateAgo();

    $('body').on('blockready', updateAgo);
});

;
// File: /js/news/common/public/static/js/RTBF/sharebar.js
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/**
* depends: RtbfPopUp
* @todo: replace ctg shared api key with proper one
*
**/
// eslint-disable-next-line no-use-before-define
var RTBF = RTBF || {};

(function ($, window, document, RTBF) {
  /* globals jQuery */

  var Sharebar = (function () {
    function Sharebar(settings) {
      _classCallCheck(this, Sharebar);

      this.container = $('.js-sharebar'); // multiple results
      this.sharedCountNode = this.container.find('.js-shared-count'); // multiple results
      this.commentCountNode = this.container.find('.js-comment-count'); // multiple results
      this.sharedCountUrl = this.container.find('.js-shared-url').data('url'); // used by tv/media
      var url = this.sharedCountUrl === undefined ? $('meta[property="og:url"]').attr('content') : this.sharedCountUrl;

      this.encodedUrl = encodeURIComponent(url);
      this.sharedApiUrl = 'https://www.rtbf.be/news/api/sharedcount?url=' + this.encodedUrl;
      this.sharedCount = 0;
      this.commentCount = 0;
      this.popupSpecs = {
        width: 626,
        height: 436,
        centerBrowser: 1,
        resizable: 1
      };

      this.bind();
      this.init();

      if (this.sharedCountNode.length > 0 || this.commentCountNode.length > 0) {
        this.getSharedCount();
      }
    }

    _createClass(Sharebar, [{
      key: 'bind',
      value: function bind() {
        var _this = this;

        // click action on the more mobile btn to display all share option
        this.container.on('click.sharebar', '.js-sharebar-more', function (e) {
          e.preventDefault();
          _this.container.toggleClass('sharebar--open');
        });
      }
    }, {
      key: 'init',
      value: function init() {
        // Twitter is not in the list (opens its own popup)
        // To add it, add class: .js-twitter-share
        $('body').RtbfPopUp({
          selector: '.js-facebook-share, .js-pinterest-share',
          width: this.popupSpecs.width,
          height: this.popupSpecs.height,
          centerBrowser: this.popupSpecs.centerBrowser,
          resizable: this.popupSpecs.resizable
        });

        $('body').on('click', '.js-email-share', function (e) {
          e.preventDefault();
          window.open($(this).attr('href'), '_popup', 'width=10, height=10').close();
        });
      }
    }, {
      key: 'getSharedCount',
      value: function getSharedCount() {
        var _this2 = this;

        $.get(this.sharedApiUrl, function (data) {
          if (data && !data.Error) {
            if (data.comment_count) _this2.commentCount += data.comment_count;
            if (data.social_count) _this2.sharedCount += data.social_count;
          }
        }, 'json').always(function () {
          var html = _this2.commentCount > 0 ? _this2.commentCount : '<span class="color-special hidden-xs hidden-sm">Réagir</span>';

          _this2.commentCountNode.html(html);
          _this2.sharedCountNode.html(_this2.sharedCount);
        });
      }
    }]);

    return Sharebar;
  })();

  RTBF.Sharebar = Sharebar;

  // eslint-disable-next-line no-new
  new Sharebar();
})(jQuery, window, document, RTBF);
;
// File: /js/news/common/public/static/js/vendor/blueimp-gallery/blueimp-gallery.min.js
!function(){"use strict";function a(a,b){var c;for(c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}function b(a){if(!this||this.find!==b.prototype.find)return new b(a);if(this.length=0,a)if("string"==typeof a&&(a=this.find(a)),a.nodeType||a===a.window)this.length=1,this[0]=a;else{var c=a.length;for(this.length=c;c;)c-=1,this[c]=a[c]}}b.extend=a,b.contains=function(a,b){do if(b=b.parentNode,b===a)return!0;while(b);return!1},b.parseJSON=function(a){return window.JSON&&JSON.parse(a)},a(b.prototype,{find:function(a){var c=this[0]||document;return"string"==typeof a&&(a=c.querySelectorAll?c.querySelectorAll(a):"#"===a.charAt(0)?c.getElementById(a.slice(1)):c.getElementsByTagName(a)),new b(a)},hasClass:function(a){return this[0]?new RegExp("(^|\\s+)"+a+"(\\s+|$)").test(this[0].className):!1},addClass:function(a){for(var b,c=this.length;c;){if(c-=1,b=this[c],!b.className)return b.className=a,this;if(this.hasClass(a))return this;b.className+=" "+a}return this},removeClass:function(a){for(var b,c=new RegExp("(^|\\s+)"+a+"(\\s+|$)"),d=this.length;d;)d-=1,b=this[d],b.className=b.className.replace(c," ");return this},on:function(a,b){for(var c,d,e=a.split(/\s+/);e.length;)for(a=e.shift(),c=this.length;c;)c-=1,d=this[c],d.addEventListener?d.addEventListener(a,b,!1):d.attachEvent&&d.attachEvent("on"+a,b);return this},off:function(a,b){for(var c,d,e=a.split(/\s+/);e.length;)for(a=e.shift(),c=this.length;c;)c-=1,d=this[c],d.removeEventListener?d.removeEventListener(a,b,!1):d.detachEvent&&d.detachEvent("on"+a,b);return this},empty:function(){for(var a,b=this.length;b;)for(b-=1,a=this[b];a.hasChildNodes();)a.removeChild(a.lastChild);return this},first:function(){return new b(this[0])}}),"function"==typeof define&&define.amd?define(function(){return b}):(window.blueimp=window.blueimp||{},window.blueimp.helper=b)}(),function(a){"use strict";"function"==typeof define&&define.amd?define(["./blueimp-helper"],a):(window.blueimp=window.blueimp||{},window.blueimp.Gallery=a(window.blueimp.helper||window.jQuery))}(function(a){"use strict";function b(a,c){return void 0===document.body.style.maxHeight?null:this&&this.options===b.prototype.options?a&&a.length?(this.list=a,this.num=a.length,this.initOptions(c),void this.initialize()):void this.console.log("blueimp Gallery: No or empty list provided as first argument.",a):new b(a,c)}return a.extend(b.prototype,{options:{container:"#blueimp-gallery",slidesContainer:"div",titleElement:"h3",displayClass:"blueimp-gallery-display",controlsClass:"blueimp-gallery-controls",singleClass:"blueimp-gallery-single",leftEdgeClass:"blueimp-gallery-left",rightEdgeClass:"blueimp-gallery-right",playingClass:"blueimp-gallery-playing",slideClass:"slide",slideLoadingClass:"slide-loading",slideErrorClass:"slide-error",slideContentClass:"slide-content",toggleClass:"toggle",prevClass:"prev",nextClass:"next",closeClass:"close",playPauseClass:"play-pause",typeProperty:"type",titleProperty:"title",urlProperty:"href",displayTransition:!0,clearSlides:!0,stretchImages:!1,toggleControlsOnReturn:!0,toggleSlideshowOnSpace:!0,enableKeyboardNavigation:!0,closeOnEscape:!0,closeOnSlideClick:!0,closeOnSwipeUpOrDown:!0,emulateTouchEvents:!0,stopTouchEventsPropagation:!1,hidePageScrollbars:!0,disableScroll:!0,carousel:!1,continuous:!0,unloadElements:!0,startSlideshow:!1,slideshowInterval:5e3,index:0,preloadRange:2,transitionSpeed:400,slideshowTransitionSpeed:void 0,event:void 0,onopen:void 0,onopened:void 0,onslide:void 0,onslideend:void 0,onslidecomplete:void 0,onclose:void 0,onclosed:void 0},carouselOptions:{hidePageScrollbars:!1,toggleControlsOnReturn:!1,toggleSlideshowOnSpace:!1,enableKeyboardNavigation:!1,closeOnEscape:!1,closeOnSlideClick:!1,closeOnSwipeUpOrDown:!1,disableScroll:!1,startSlideshow:!0},console:window.console&&"function"==typeof window.console.log?window.console:{log:function(){}},support:function(b){var c={touch:void 0!==window.ontouchstart||window.DocumentTouch&&document instanceof DocumentTouch},d={webkitTransition:{end:"webkitTransitionEnd",prefix:"-webkit-"},MozTransition:{end:"transitionend",prefix:"-moz-"},OTransition:{end:"otransitionend",prefix:"-o-"},transition:{end:"transitionend",prefix:""}},e=function(){var a,d,e=c.transition;document.body.appendChild(b),e&&(a=e.name.slice(0,-9)+"ransform",void 0!==b.style[a]&&(b.style[a]="translateZ(0)",d=window.getComputedStyle(b).getPropertyValue(e.prefix+"transform"),c.transform={prefix:e.prefix,name:a,translate:!0,translateZ:!!d&&"none"!==d})),void 0!==b.style.backgroundSize&&(c.backgroundSize={},b.style.backgroundSize="contain",c.backgroundSize.contain="contain"===window.getComputedStyle(b).getPropertyValue("background-size"),b.style.backgroundSize="cover",c.backgroundSize.cover="cover"===window.getComputedStyle(b).getPropertyValue("background-size")),document.body.removeChild(b)};return function(a,c){var d;for(d in c)if(c.hasOwnProperty(d)&&void 0!==b.style[d]){a.transition=c[d],a.transition.name=d;break}}(c,d),document.body?e():a(document).on("DOMContentLoaded",e),c}(document.createElement("div")),requestAnimationFrame:window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame,initialize:function(){return this.initStartIndex(),this.initWidget()===!1?!1:(this.initEventListeners(),this.onslide(this.index),this.ontransitionend(),void(this.options.startSlideshow&&this.play()))},slide:function(a,b){window.clearTimeout(this.timeout);var c,d,e,f=this.index;if(f!==a&&1!==this.num){if(b||(b=this.options.transitionSpeed),this.support.transform){for(this.options.continuous||(a=this.circle(a)),c=Math.abs(f-a)/(f-a),this.options.continuous&&(d=c,c=-this.positions[this.circle(a)]/this.slideWidth,c!==d&&(a=-c*this.num+a)),e=Math.abs(f-a)-1;e;)e-=1,this.move(this.circle((a>f?a:f)-e-1),this.slideWidth*c,0);a=this.circle(a),this.move(f,this.slideWidth*c,b),this.move(a,0,b),this.options.continuous&&this.move(this.circle(a-c),-(this.slideWidth*c),0)}else a=this.circle(a),this.animate(f*-this.slideWidth,a*-this.slideWidth,b);this.onslide(a)}},getIndex:function(){return this.index},getNumber:function(){return this.num},prev:function(){(this.options.continuous||this.index)&&this.slide(this.index-1)},next:function(){(this.options.continuous||this.index<this.num-1)&&this.slide(this.index+1)},play:function(a){var b=this;window.clearTimeout(this.timeout),this.interval=a||this.options.slideshowInterval,this.elements[this.index]>1&&(this.timeout=this.setTimeout(!this.requestAnimationFrame&&this.slide||function(a,c){b.animationFrameId=b.requestAnimationFrame.call(window,function(){b.slide(a,c)})},[this.index+1,this.options.slideshowTransitionSpeed],this.interval)),this.container.addClass(this.options.playingClass)},pause:function(){window.clearTimeout(this.timeout),this.interval=null,this.container.removeClass(this.options.playingClass)},add:function(a){var b;for(a.concat||(a=Array.prototype.slice.call(a)),this.list.concat||(this.list=Array.prototype.slice.call(this.list)),this.list=this.list.concat(a),this.num=this.list.length,this.num>2&&null===this.options.continuous&&(this.options.continuous=!0,this.container.removeClass(this.options.leftEdgeClass)),this.container.removeClass(this.options.rightEdgeClass).removeClass(this.options.singleClass),b=this.num-a.length;b<this.num;b+=1)this.addSlide(b),this.positionSlide(b);this.positions.length=this.num,this.initSlides(!0)},resetSlides:function(){this.slidesContainer.empty(),this.slides=[]},handleClose:function(){var a=this.options;this.destroyEventListeners(),this.pause(),this.container[0].style.display="none",this.container.removeClass(a.displayClass).removeClass(a.singleClass).removeClass(a.leftEdgeClass).removeClass(a.rightEdgeClass),a.hidePageScrollbars&&(document.body.style.overflow=this.bodyOverflowStyle),this.options.clearSlides&&this.resetSlides(),this.options.onclosed&&this.options.onclosed.call(this)},close:function(){var a=this,b=function(c){c.target===a.container[0]&&(a.container.off(a.support.transition.end,b),a.handleClose())};this.options.onclose&&this.options.onclose.call(this),this.support.transition&&this.options.displayTransition?(this.container.on(this.support.transition.end,b),this.container.removeClass(this.options.displayClass)):this.handleClose()},circle:function(a){return(this.num+a%this.num)%this.num},move:function(a,b,c){this.translateX(a,b,c),this.positions[a]=b},translate:function(a,b,c,d){var e=this.slides[a].style,f=this.support.transition,g=this.support.transform;e[f.name+"Duration"]=d+"ms",e[g.name]="translate("+b+"px, "+c+"px)"+(g.translateZ?" translateZ(0)":"")},translateX:function(a,b,c){this.translate(a,b,0,c)},translateY:function(a,b,c){this.translate(a,0,b,c)},animate:function(a,b,c){if(!c)return void(this.slidesContainer[0].style.left=b+"px");var d=this,e=(new Date).getTime(),f=window.setInterval(function(){var g=(new Date).getTime()-e;return g>c?(d.slidesContainer[0].style.left=b+"px",d.ontransitionend(),void window.clearInterval(f)):void(d.slidesContainer[0].style.left=(b-a)*(Math.floor(g/c*100)/100)+a+"px")},4)},preventDefault:function(a){a.preventDefault?a.preventDefault():a.returnValue=!1},stopPropagation:function(a){a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},onresize:function(){this.initSlides(!0)},onmousedown:function(a){a.which&&1===a.which&&"VIDEO"!==a.target.nodeName&&(a.preventDefault(),(a.originalEvent||a).touches=[{pageX:a.pageX,pageY:a.pageY}],this.ontouchstart(a))},onmousemove:function(a){this.touchStart&&((a.originalEvent||a).touches=[{pageX:a.pageX,pageY:a.pageY}],this.ontouchmove(a))},onmouseup:function(a){this.touchStart&&(this.ontouchend(a),delete this.touchStart)},onmouseout:function(b){if(this.touchStart){var c=b.target,d=b.relatedTarget;(!d||d!==c&&!a.contains(c,d))&&this.onmouseup(b)}},ontouchstart:function(a){this.options.stopTouchEventsPropagation&&this.stopPropagation(a);var b=(a.originalEvent||a).touches[0];this.touchStart={x:b.pageX,y:b.pageY,time:Date.now()},this.isScrolling=void 0,this.touchDelta={}},ontouchmove:function(a){this.options.stopTouchEventsPropagation&&this.stopPropagation(a);var b,c,d=(a.originalEvent||a).touches[0],e=(a.originalEvent||a).scale,f=this.index;if(!(d.length>1||e&&1!==e))if(this.options.disableScroll&&a.preventDefault(),this.touchDelta={x:d.pageX-this.touchStart.x,y:d.pageY-this.touchStart.y},b=this.touchDelta.x,void 0===this.isScrolling&&(this.isScrolling=this.isScrolling||Math.abs(b)<Math.abs(this.touchDelta.y)),this.isScrolling)this.options.closeOnSwipeUpOrDown&&this.translateY(f,this.touchDelta.y+this.positions[f],0);else for(a.preventDefault(),window.clearTimeout(this.timeout),this.options.continuous?c=[this.circle(f+1),f,this.circle(f-1)]:(this.touchDelta.x=b/=!f&&b>0||f===this.num-1&&0>b?Math.abs(b)/this.slideWidth+1:1,c=[f],f&&c.push(f-1),f<this.num-1&&c.unshift(f+1));c.length;)f=c.pop(),this.translateX(f,b+this.positions[f],0)},ontouchend:function(a){this.options.stopTouchEventsPropagation&&this.stopPropagation(a);var b,c,d,e,f,g=this.index,h=this.options.transitionSpeed,i=this.slideWidth,j=Number(Date.now()-this.touchStart.time)<250,k=j&&Math.abs(this.touchDelta.x)>20||Math.abs(this.touchDelta.x)>i/2,l=!g&&this.touchDelta.x>0||g===this.num-1&&this.touchDelta.x<0,m=!k&&this.options.closeOnSwipeUpOrDown&&(j&&Math.abs(this.touchDelta.y)>20||Math.abs(this.touchDelta.y)>this.slideHeight/2);this.options.continuous&&(l=!1),b=this.touchDelta.x<0?-1:1,this.isScrolling?m?this.close():this.translateY(g,0,h):k&&!l?(c=g+b,d=g-b,e=i*b,f=-i*b,this.options.continuous?(this.move(this.circle(c),e,0),this.move(this.circle(g-2*b),f,0)):c>=0&&c<this.num&&this.move(c,e,0),this.move(g,this.positions[g]+e,h),this.move(this.circle(d),this.positions[this.circle(d)]+e,h),g=this.circle(d),this.onslide(g)):this.options.continuous?(this.move(this.circle(g-1),-i,h),this.move(g,0,h),this.move(this.circle(g+1),i,h)):(g&&this.move(g-1,-i,h),this.move(g,0,h),g<this.num-1&&this.move(g+1,i,h))},ontouchcancel:function(a){this.touchStart&&(this.ontouchend(a),delete this.touchStart)},ontransitionend:function(a){var b=this.slides[this.index];a&&b!==a.target||(this.interval&&this.play(),this.setTimeout(this.options.onslideend,[this.index,b]))},oncomplete:function(b){var c,d=b.target||b.srcElement,e=d&&d.parentNode;d&&e&&(c=this.getNodeIndex(e),a(e).removeClass(this.options.slideLoadingClass),"error"===b.type?(a(e).addClass(this.options.slideErrorClass),this.elements[c]=3):this.elements[c]=2,d.clientHeight>this.container[0].clientHeight&&(d.style.maxHeight=this.container[0].clientHeight),this.interval&&this.slides[this.index]===e&&this.play(),this.setTimeout(this.options.onslidecomplete,[c,e]))},onload:function(a){this.oncomplete(a)},onerror:function(a){this.oncomplete(a)},onkeydown:function(a){switch(a.which||a.keyCode){case 13:this.options.toggleControlsOnReturn&&(this.preventDefault(a),this.toggleControls());break;case 27:this.options.closeOnEscape&&this.close();break;case 32:this.options.toggleSlideshowOnSpace&&(this.preventDefault(a),this.toggleSlideshow());break;case 37:this.options.enableKeyboardNavigation&&(this.preventDefault(a),this.prev());break;case 39:this.options.enableKeyboardNavigation&&(this.preventDefault(a),this.next())}},handleClick:function(b){var c=this.options,d=b.target||b.srcElement,e=d.parentNode,f=function(b){return a(d).hasClass(b)||a(e).hasClass(b)};f(c.toggleClass)?(this.preventDefault(b),this.toggleControls()):f(c.prevClass)?(this.preventDefault(b),this.prev()):f(c.nextClass)?(this.preventDefault(b),this.next()):f(c.closeClass)?(this.preventDefault(b),this.close()):f(c.playPauseClass)?(this.preventDefault(b),this.toggleSlideshow()):e===this.slidesContainer[0]?(this.preventDefault(b),c.closeOnSlideClick?this.close():this.toggleControls()):e.parentNode&&e.parentNode===this.slidesContainer[0]&&(this.preventDefault(b),this.toggleControls())},onclick:function(a){return this.options.emulateTouchEvents&&this.touchDelta&&(Math.abs(this.touchDelta.x)>20||Math.abs(this.touchDelta.y)>20)?void delete this.touchDelta:this.handleClick(a)},updateEdgeClasses:function(a){a?this.container.removeClass(this.options.leftEdgeClass):this.container.addClass(this.options.leftEdgeClass),a===this.num-1?this.container.addClass(this.options.rightEdgeClass):this.container.removeClass(this.options.rightEdgeClass)},handleSlide:function(a){this.options.continuous||this.updateEdgeClasses(a),this.loadElements(a),this.options.unloadElements&&this.unloadElements(a),this.setTitle(a)},onslide:function(a){this.index=a,this.handleSlide(a),this.setTimeout(this.options.onslide,[a,this.slides[a]])},setTitle:function(a){var b=this.slides[a].firstChild.title,c=this.titleElement;c.length&&(this.titleElement.empty(),b&&c[0].appendChild(document.createTextNode(b)))},setTimeout:function(a,b,c){var d=this;return a&&window.setTimeout(function(){a.apply(d,b||[])},c||0)},imageFactory:function(b,c){var d,e,f,g=this,h=this.imagePrototype.cloneNode(!1),i=b,j=this.options.stretchImages,k=function(b){if(!d){if(b={type:b.type,target:e},!e.parentNode)return g.setTimeout(k,[b]);d=!0,a(h).off("load error",k),j&&"load"===b.type&&(e.style.background='url("'+i+'") center no-repeat',e.style.backgroundSize=j),c(b)}};return"string"!=typeof i&&(i=this.getItemProperty(b,this.options.urlProperty),f=this.getItemProperty(b,this.options.titleProperty)),j===!0&&(j="contain"),j=this.support.backgroundSize&&this.support.backgroundSize[j]&&j,j?e=this.elementPrototype.cloneNode(!1):(e=h,h.draggable=!1),f&&(e.title=f),a(h).on("load error",k),h.src=i,e},createElement:function(b,c){var d=b&&this.getItemProperty(b,this.options.typeProperty),e=d&&this[d.split("/")[0]+"Factory"]||this.imageFactory,f=b&&e.call(this,b,c);return f||(f=this.elementPrototype.cloneNode(!1),this.setTimeout(c,[{type:"error",target:f}])),a(f).addClass(this.options.slideContentClass),f},loadElement:function(b){this.elements[b]||(this.slides[b].firstChild?this.elements[b]=a(this.slides[b]).hasClass(this.options.slideErrorClass)?3:2:(this.elements[b]=1,a(this.slides[b]).addClass(this.options.slideLoadingClass),this.slides[b].appendChild(this.createElement(this.list[b],this.proxyListener))))},loadElements:function(a){var b,c=Math.min(this.num,2*this.options.preloadRange+1),d=a;for(b=0;c>b;b+=1)d+=b*(b%2===0?-1:1),d=this.circle(d),this.loadElement(d)},unloadElements:function(a){var b,c,d;for(b in this.elements)this.elements.hasOwnProperty(b)&&(d=Math.abs(a-b),d>this.options.preloadRange&&d+this.options.preloadRange<this.num&&(c=this.slides[b],c.removeChild(c.firstChild),delete this.elements[b]))},addSlide:function(a){var b=this.slidePrototype.cloneNode(!1);b.setAttribute("data-index",a),this.slidesContainer[0].appendChild(b),this.slides.push(b)},positionSlide:function(a){var b=this.slides[a];b.style.width=this.slideWidth+"px",this.support.transform&&(b.style.left=a*-this.slideWidth+"px",this.move(a,this.index>a?-this.slideWidth:this.index<a?this.slideWidth:0,0))},initSlides:function(b){var c,d;for(b||(this.positions=[],this.positions.length=this.num,this.elements={},this.imagePrototype=document.createElement("img"),this.elementPrototype=document.createElement("div"),this.slidePrototype=document.createElement("div"),a(this.slidePrototype).addClass(this.options.slideClass),this.slides=this.slidesContainer[0].children,c=this.options.clearSlides||this.slides.length!==this.num),this.slideWidth=this.container[0].offsetWidth,this.slideHeight=this.container[0].offsetHeight,this.slidesContainer[0].style.width=this.num*this.slideWidth+"px",c&&this.resetSlides(),d=0;d<this.num;d+=1)c&&this.addSlide(d),this.positionSlide(d);this.options.continuous&&this.support.transform&&(this.move(this.circle(this.index-1),-this.slideWidth,0),this.move(this.circle(this.index+1),this.slideWidth,0)),this.support.transform||(this.slidesContainer[0].style.left=this.index*-this.slideWidth+"px")},toggleControls:function(){var a=this.options.controlsClass;this.container.hasClass(a)?this.container.removeClass(a):this.container.addClass(a)},toggleSlideshow:function(){this.interval?this.pause():this.play()},getNodeIndex:function(a){return parseInt(a.getAttribute("data-index"),10)},getNestedProperty:function(a,b){return b.replace(/\[(?:'([^']+)'|"([^"]+)"|(\d+))\]|(?:(?:^|\.)([^\.\[]+))/g,function(b,c,d,e,f){var g=f||c||d||e&&parseInt(e,10);b&&a&&(a=a[g])}),a},getDataProperty:function(b,c){if(b.getAttribute){var d=b.getAttribute("data-"+c.replace(/([A-Z])/g,"-$1").toLowerCase());if("string"==typeof d){if(/^(true|false|null|-?\d+(\.\d+)?|\{[\s\S]*\}|\[[\s\S]*\])$/.test(d))try{return a.parseJSON(d)}catch(e){}return d}}},getItemProperty:function(a,b){var c=a[b];return void 0===c&&(c=this.getDataProperty(a,b),void 0===c&&(c=this.getNestedProperty(a,b))),c},initStartIndex:function(){var a,b=this.options.index,c=this.options.urlProperty;if(b&&"number"!=typeof b)for(a=0;a<this.num;a+=1)if(this.list[a]===b||this.getItemProperty(this.list[a],c)===this.getItemProperty(b,c)){b=a;break}this.index=this.circle(parseInt(b,10)||0)},initEventListeners:function(){var b=this,c=this.slidesContainer,d=function(a){var c=b.support.transition&&b.support.transition.end===a.type?"transitionend":a.type;b["on"+c](a)};a(window).on("resize",d),a(document.body).on("keydown",d),this.container.on("click",d),this.support.touch?c.on("touchstart touchmove touchend touchcancel",d):this.options.emulateTouchEvents&&this.support.transition&&c.on("mousedown mousemove mouseup mouseout",d),this.support.transition&&c.on(this.support.transition.end,d),this.proxyListener=d},destroyEventListeners:function(){var b=this.slidesContainer,c=this.proxyListener;a(window).off("resize",c),a(document.body).off("keydown",c),this.container.off("click",c),this.support.touch?b.off("touchstart touchmove touchend touchcancel",c):this.options.emulateTouchEvents&&this.support.transition&&b.off("mousedown mousemove mouseup mouseout",c),this.support.transition&&b.off(this.support.transition.end,c)},handleOpen:function(){this.options.onopened&&this.options.onopened.call(this)},initWidget:function(){var b=this,c=function(a){a.target===b.container[0]&&(b.container.off(b.support.transition.end,c),b.handleOpen())};return this.container=a(this.options.container),this.container.length?(this.slidesContainer=this.container.find(this.options.slidesContainer).first(),this.slidesContainer.length?(this.titleElement=this.container.find(this.options.titleElement).first(),1===this.num&&this.container.addClass(this.options.singleClass),this.options.onopen&&this.options.onopen.call(this),this.support.transition&&this.options.displayTransition?this.container.on(this.support.transition.end,c):this.handleOpen(),this.options.hidePageScrollbars&&(this.bodyOverflowStyle=document.body.style.overflow,document.body.style.overflow="hidden"),this.container[0].style.display="block",this.initSlides(),void this.container.addClass(this.options.displayClass)):(this.console.log("blueimp Gallery: Slides container not found.",this.options.slidesContainer),!1)):(this.console.log("blueimp Gallery: Widget container not found.",this.options.container),!1)},initOptions:function(b){this.options=a.extend({},this.options),(b&&b.carousel||this.options.carousel&&(!b||b.carousel!==!1))&&a.extend(this.options,this.carouselOptions),a.extend(this.options,b),this.num<3&&(this.options.continuous=this.options.continuous?null:!1),this.support.transition||(this.options.emulateTouchEvents=!1),this.options.event&&this.preventDefault(this.options.event)}}),b}),function(a){"use strict";"function"==typeof define&&define.amd?define(["./blueimp-helper","./blueimp-gallery"],a):a(window.blueimp.helper||window.jQuery,window.blueimp.Gallery)}(function(a,b){"use strict";a.extend(b.prototype.options,{fullScreen:!1});var c=b.prototype.initialize,d=b.prototype.close;return a.extend(b.prototype,{getFullScreenElement:function(){return document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement},requestFullScreen:function(a){a.requestFullscreen?a.requestFullscreen():a.webkitRequestFullscreen?a.webkitRequestFullscreen():a.mozRequestFullScreen?a.mozRequestFullScreen():a.msRequestFullscreen&&a.msRequestFullscreen()},exitFullScreen:function(){document.exitFullscreen?document.exitFullscreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen()},initialize:function(){c.call(this),this.options.fullScreen&&!this.getFullScreenElement()&&this.requestFullScreen(this.container[0])},close:function(){this.getFullScreenElement()===this.container[0]&&this.exitFullScreen(),d.call(this)}}),b}),function(a){"use strict";"function"==typeof define&&define.amd?define(["./blueimp-helper","./blueimp-gallery"],a):a(window.blueimp.helper||window.jQuery,window.blueimp.Gallery)}(function(a,b){"use strict";a.extend(b.prototype.options,{indicatorContainer:"ol",activeIndicatorClass:"active",thumbnailProperty:"thumbnail",thumbnailIndicators:!0});var c=b.prototype.initSlides,d=b.prototype.addSlide,e=b.prototype.resetSlides,f=b.prototype.handleClick,g=b.prototype.handleSlide,h=b.prototype.handleClose;return a.extend(b.prototype,{createIndicator:function(b){var c,d,e=this.indicatorPrototype.cloneNode(!1),f=this.getItemProperty(b,this.options.titleProperty),g=this.options.thumbnailProperty;return this.options.thumbnailIndicators&&(d=b.getElementsByTagName&&a(b).find("img")[0],d?c=d.src:g&&(c=this.getItemProperty(b,g)),c&&(e.style.backgroundImage='url("'+c+'")')),f&&(e.title=f),e},addIndicator:function(a){if(this.indicatorContainer.length){var b=this.createIndicator(this.list[a]);b.setAttribute("data-index",a),this.indicatorContainer[0].appendChild(b),this.indicators.push(b)}},setActiveIndicator:function(b){this.indicators&&(this.activeIndicator&&this.activeIndicator.removeClass(this.options.activeIndicatorClass),this.activeIndicator=a(this.indicators[b]),this.activeIndicator.addClass(this.options.activeIndicatorClass))},initSlides:function(a){a||(this.indicatorContainer=this.container.find(this.options.indicatorContainer),this.indicatorContainer.length&&(this.indicatorPrototype=document.createElement("li"),this.indicators=this.indicatorContainer[0].children)),c.call(this,a)},addSlide:function(a){d.call(this,a),this.addIndicator(a)},resetSlides:function(){e.call(this),this.indicatorContainer.empty(),this.indicators=[]},handleClick:function(a){var b=a.target||a.srcElement,c=b.parentNode;if(c===this.indicatorContainer[0])this.preventDefault(a),this.slide(this.getNodeIndex(b));else{if(c.parentNode!==this.indicatorContainer[0])return f.call(this,a);this.preventDefault(a),this.slide(this.getNodeIndex(c))}},handleSlide:function(a){g.call(this,a),this.setActiveIndicator(a)},handleClose:function(){this.activeIndicator&&this.activeIndicator.removeClass(this.options.activeIndicatorClass),h.call(this)}}),b}),function(a){"use strict";"function"==typeof define&&define.amd?define(["./blueimp-helper","./blueimp-gallery"],a):a(window.blueimp.helper||window.jQuery,window.blueimp.Gallery)}(function(a,b){"use strict";a.extend(b.prototype.options,{videoContentClass:"video-content",videoLoadingClass:"video-loading",videoPlayingClass:"video-playing",videoPosterProperty:"poster",videoSourcesProperty:"sources"});var c=b.prototype.handleSlide;return a.extend(b.prototype,{handleSlide:function(a){c.call(this,a),this.playingVideo&&this.playingVideo.pause()},videoFactory:function(b,c,d){var e,f,g,h,i,j=this,k=this.options,l=this.elementPrototype.cloneNode(!1),m=a(l),n=[{type:"error",target:l}],o=d||document.createElement("video"),p=this.getItemProperty(b,k.urlProperty),q=this.getItemProperty(b,k.typeProperty),r=this.getItemProperty(b,k.titleProperty),s=this.getItemProperty(b,k.videoPosterProperty),t=this.getItemProperty(b,k.videoSourcesProperty);if(m.addClass(k.videoContentClass),r&&(l.title=r),o.canPlayType)if(p&&q&&o.canPlayType(q))o.src=p;else for(;t&&t.length;)if(f=t.shift(),p=this.getItemProperty(f,k.urlProperty),q=this.getItemProperty(f,k.typeProperty),p&&q&&o.canPlayType(q)){o.src=p;break}return s&&(o.poster=s,e=this.imagePrototype.cloneNode(!1),a(e).addClass(k.toggleClass),e.src=s,e.draggable=!1,l.appendChild(e)),g=document.createElement("a"),g.setAttribute("target","_blank"),d||g.setAttribute("download",r),g.href=p,o.src&&(o.controls=!0,(d||a(o)).on("error",function(){j.setTimeout(c,n)}).on("pause",function(){h=!1,m.removeClass(j.options.videoLoadingClass).removeClass(j.options.videoPlayingClass),i&&j.container.addClass(j.options.controlsClass),delete j.playingVideo,j.interval&&j.play()}).on("playing",function(){h=!1,m.removeClass(j.options.videoLoadingClass).addClass(j.options.videoPlayingClass),j.container.hasClass(j.options.controlsClass)?(i=!0,j.container.removeClass(j.options.controlsClass)):i=!1}).on("play",function(){window.clearTimeout(j.timeout),h=!0,m.addClass(j.options.videoLoadingClass),j.playingVideo=o}),a(g).on("click",function(a){j.preventDefault(a),h?o.pause():o.play()}),l.appendChild(d&&d.element||o)),l.appendChild(g),this.setTimeout(c,[{type:"load",target:l}]),l}}),b}),function(a){"use strict";"function"==typeof define&&define.amd?define(["./blueimp-helper","./blueimp-gallery-video"],a):a(window.blueimp.helper||window.jQuery,window.blueimp.Gallery)}(function(a,b){"use strict";if(!window.postMessage)return b;a.extend(b.prototype.options,{vimeoVideoIdProperty:"vimeo",vimeoPlayerUrl:"//player.vimeo.com/video/VIDEO_ID?api=1&player_id=PLAYER_ID",vimeoPlayerIdPrefix:"vimeo-player-",vimeoClickToPlay:!0});var c=b.prototype.textFactory||b.prototype.imageFactory,d=function(a,b,c,d){this.url=a,this.videoId=b,this.playerId=c,this.clickToPlay=d,this.element=document.createElement("div"),this.listeners={}},e=0;return a.extend(d.prototype,{canPlayType:function(){return!0},on:function(a,b){return this.listeners[a]=b,this},loadAPI:function(){for(var b,c,d=this,e="//"+("https"===location.protocol?"secure-":"")+"a.vimeocdn.com/js/froogaloop2.min.js",f=document.getElementsByTagName("script"),g=f.length,h=function(){!c&&d.playOnReady&&d.play(),c=!0};g;)if(g-=1,f[g].src===e){b=f[g];break}b||(b=document.createElement("script"),b.src=e),a(b).on("load",h),f[0].parentNode.insertBefore(b,f[0]),/loaded|complete/.test(b.readyState)&&h()},onReady:function(){var a=this;this.ready=!0,this.player.addEvent("play",function(){a.hasPlayed=!0,a.onPlaying()}),this.player.addEvent("pause",function(){a.onPause()}),this.player.addEvent("finish",function(){a.onPause()}),this.playOnReady&&this.play()},onPlaying:function(){this.playStatus<2&&(this.listeners.playing(),this.playStatus=2)},onPause:function(){this.listeners.pause(),delete this.playStatus},insertIframe:function(){var a=document.createElement("iframe");a.src=this.url.replace("VIDEO_ID",this.videoId).replace("PLAYER_ID",this.playerId),a.id=this.playerId,this.element.parentNode.replaceChild(a,this.element),this.element=a},play:function(){var a=this;this.playStatus||(this.listeners.play(),this.playStatus=1),this.ready?!this.hasPlayed&&(this.clickToPlay||window.navigator&&/iP(hone|od|ad)/.test(window.navigator.platform))?this.onPlaying():this.player.api("play"):(this.playOnReady=!0,window.$f?this.player||(this.insertIframe(),this.player=$f(this.element),this.player.addEvent("ready",function(){a.onReady()})):this.loadAPI())},pause:function(){this.ready?this.player.api("pause"):this.playStatus&&(delete this.playOnReady,this.listeners.pause(),delete this.playStatus)}}),a.extend(b.prototype,{VimeoPlayer:d,textFactory:function(a,b){var f=this.options,g=this.getItemProperty(a,f.vimeoVideoIdProperty);return g?(void 0===this.getItemProperty(a,f.urlProperty)&&(a[f.urlProperty]="//vimeo.com/"+g),e+=1,this.videoFactory(a,b,new d(f.vimeoPlayerUrl,g,f.vimeoPlayerIdPrefix+e,f.vimeoClickToPlay))):c.call(this,a,b)}}),b}),function(a){"use strict";"function"==typeof define&&define.amd?define(["./blueimp-helper","./blueimp-gallery-video"],a):a(window.blueimp.helper||window.jQuery,window.blueimp.Gallery)}(function(a,b){"use strict";if(!window.postMessage)return b;a.extend(b.prototype.options,{youTubeVideoIdProperty:"youtube",youTubePlayerVars:{wmode:"transparent"},youTubeClickToPlay:!0});var c=b.prototype.textFactory||b.prototype.imageFactory,d=function(a,b,c){this.videoId=a,this.playerVars=b,this.clickToPlay=c,this.element=document.createElement("div"),this.listeners={}};return a.extend(d.prototype,{canPlayType:function(){return!0},on:function(a,b){return this.listeners[a]=b,this},loadAPI:function(){var a,b=this,c=window.onYouTubeIframeAPIReady,d="//www.youtube.com/iframe_api",e=document.getElementsByTagName("script"),f=e.length;for(window.onYouTubeIframeAPIReady=function(){c&&c.apply(this),b.playOnReady&&b.play()};f;)if(f-=1,e[f].src===d)return;a=document.createElement("script"),a.src=d,e[0].parentNode.insertBefore(a,e[0])},onReady:function(){this.ready=!0,this.playOnReady&&this.play()},onPlaying:function(){this.playStatus<2&&(this.listeners.playing(),this.playStatus=2)},onPause:function(){b.prototype.setTimeout.call(this,this.checkSeek,null,2e3)},checkSeek:function(){(this.stateChange===YT.PlayerState.PAUSED||this.stateChange===YT.PlayerState.ENDED)&&(this.listeners.pause(),delete this.playStatus)},onStateChange:function(a){switch(a.data){case YT.PlayerState.PLAYING:this.hasPlayed=!0,this.onPlaying();break;case YT.PlayerState.PAUSED:case YT.PlayerState.ENDED:this.onPause()}this.stateChange=a.data},onError:function(a){this.listeners.error(a)},play:function(){var a=this;this.playStatus||(this.listeners.play(),this.playStatus=1),this.ready?!this.hasPlayed&&(this.clickToPlay||window.navigator&&/iP(hone|od|ad)/.test(window.navigator.platform))?this.onPlaying():this.player.playVideo():(this.playOnReady=!0,window.YT&&YT.Player?this.player||(this.player=new YT.Player(this.element,{videoId:this.videoId,playerVars:this.playerVars,events:{onReady:function(){a.onReady()},onStateChange:function(b){a.onStateChange(b)},onError:function(b){a.onError(b)}}})):this.loadAPI())},pause:function(){this.ready?this.player.pauseVideo():this.playStatus&&(delete this.playOnReady,this.listeners.pause(),delete this.playStatus)
}}),a.extend(b.prototype,{YouTubePlayer:d,textFactory:function(a,b){var e=this.options,f=this.getItemProperty(a,e.youTubeVideoIdProperty);return f?(void 0===this.getItemProperty(a,e.urlProperty)&&(a[e.urlProperty]="//www.youtube.com/watch?v="+f),void 0===this.getItemProperty(a,e.videoPosterProperty)&&(a[e.videoPosterProperty]="//img.youtube.com/vi/"+f+"/maxresdefault.jpg"),this.videoFactory(a,b,new d(f,e.youTubePlayerVars,e.youTubeClickToPlay))):c.call(this,a,b)}}),b});
;
// File: /js/news/common/public/static/js/RTBF/gallery.js
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/**
* Gallery class
*
* Depends: blueimp Gallery
* @see  https://github.com/blueimp/Gallery
*
**/

// eslint-disable-next-line no-use-before-define
var RTBF = RTBF || {};
// eslint-disable-next-line no-use-before-define
var blueimp = blueimp || { Gallery: false };

(function ($, window, document, RTBF, blueimp) {
  /* globals jQuery */

  var Gallery = (function () {
    function Gallery(settings) {
      _classCallCheck(this, Gallery);

      this.container = $('.js-gallery');
      this.currentCount = this.container.find('.js-gallery-current-count');
      this.totalCount = this.container.find('.js-gallery-total-count');
      this.images = this.container.data('images') || [];
      this.format = 'mobile';
      this.gallery = null;
      this.sharebar = this.container.find('.js-sharebar');
      this.index = 0;
      this.active = false;

      this.resize();
      this.bind();
    }

    _createClass(Gallery, [{
      key: 'init',
      value: function init() {
        var self = this;

        this.active = true;

        if (self.images.length < 2) {
          this.container.find('.js-gallery-prev').addClass('hidden');
          this.container.find('.js-gallery-next').addClass('hidden');
        }

        self.gallery = blueimp.Gallery(self.images, {
          container: '.js-gallery',
          titleProperty: 'title',
          urlProperty: 'urls.' + self.format,
          displayTransition: false,
          transitionSpeed: 100,
          titleElement: 'p',
          closeClass: 'js-gallery-close',
          stretchImages: true,
          index: this.index,
          clearSlides: true,
          continuous: true,
          fullScreen: !RTBF.Utils.isDesktop(),
          disableScroll: true,
          stopTouchEventsPropagation: true,
          closeOnSwipeUpOrDown: false,
          preloadRange: 4,
          emulateTouchEvents: false,

          onslide: function onslide(index, slide) {
            var copyrightText = this.list[index].copyright;
            var slideDesc = $(this.titleElement);
            var slideCopyright = slideDesc.find('em');

            self.index = index;

            self.currentCount.html(index + 1);

            if (slideCopyright.length === 0) {
              slideDesc.append('<em>' + copyrightText + '</em>');
            } else {
              slideCopyright.text(copyrightText);
            }

            for (var i in this.list[index].shareUrls) {
              self.sharebar.find('a.js-' + i + '-share').attr('href', this.list[index].shareUrls[i]);
            }
          },

          onopen: function onopen() {
            self.totalCount.html(this.list.length);

            // on click img, slide next
            $(this.slidesContainer).on('click.gallery', function (e) {
              e.preventDefault();
              self.gallery.next();
            });
          },

          onclose: function onclose() {
            self.container.find('.js-gallery-desc').removeClass('is-active');
            self.container.find('.js-share').removeClass('is-active');
            $(this.slidesContainer).off('click.gallery');
          }
        });
      }
    }, {
      key: 'resize',
      value: function resize() {
        if (!RTBF.Utils) return;
        var isRetina = RTBF.Utils.isRetina();

        if (RTBF.Utils.isMobile()) {
          this.format = isRetina ? 'tablet' : 'mobile';
        } else if (RTBF.Utils.isTablet()) {
          this.format = isRetina ? 'desktop' : 'tablet';
        } else {
          this.format = 'desktop';
        }
      }
    }, {
      key: 'bind',
      value: function bind() {
        var _this = this;

        $('body').on('click.gallery', '.js-gallery-image', function (e) {
          e.preventDefault();
          var id = $(e.currentTarget).data('id');

          _this.images.forEach(function (item, i, items) {
            if (parseInt(item.id, 10) === id) {
              _this.index = i;
              return false;
            }
          });

          _this.init();
        });

        $('body').on('click.gallery', '.js-gallery .js-share', function (e) {
          e.preventDefault();
          $(e.currentTarget).toggleClass('is-active');
        });

        $('body').on('click.gallery', '.js-gallery-info', function (e) {
          e.preventDefault();
          _this.container.find('.js-gallery-desc').toggleClass('is-active');
          $(e.currentTarget).toggleClass('is-active');
          _this.container.find('.js-share').removeClass('is-active');
          _this.container.find('.js-gallery-close').toggleClass('hidden');
        });

        $('body').on('click.gallery', '.js-gallery-desc-title', function (e) {
          e.preventDefault();
          if (!RTBF.Utils.isDesktop()) {
            _this.container.find('.js-gallery-desc').toggleClass('is-active');
            _this.container.find('.js-gallery-info').toggleClass('is-active');
            _this.container.find('.js-gallery-close').toggleClass('hidden');
          }
        });
      }
    }]);

    return Gallery;
  })();

  RTBF.Gallery = Gallery;

  // eslint-disable-next-line no-new
  new Gallery();
})(jQuery, window, document, RTBF, blueimp);
;
// File: /js/news/common/public/static/js/module/article/keyword.js
(function ($) {

    var $block = $('.js-keyword-block');

    $block.on('click', '.js-keyword-button-more', function (e) {
        e.preventDefault();
        // Hide button
        $(this).addClass('hidden');
        // Display hidden keyword
        $block.find('.js-keyword-hidden').removeClass('hidden');
    });
})(jQuery);
;
// File: /js/news/common/public/static/js/module/article/block/newsletter.js
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

  /* global $, RTBF */

  // GetSite
  var $element = $('.js-newsletter-article');
  var site = $element.data('favorite_site');

  function storageKeyFor(postfix) {
    var keyPrefix = 'RTBF_newsletter_' + site;

    if (RTBF.sso.user) {
      keyPrefix += '_' + RTBF.sso.uid();
    }

    return keyPrefix + '_' + postfix;
  }

  var capping = 6;

  var incrementedCounter = false;

  RTBF.Newsletter = {
    displayed: false,

    site: site,

    counter: 0,

    setVisibility: function setVisibility() {
      showNewsletter();
    }
  };

  $(document).ready(function () {
    $('.js-newsletter-close').click(function (e) {
      e.preventDefault();
      hideNewsLetter();
    });
  });

  var showNewsletter = function showNewsletter() {
    RTBF.sso.fetch(true, function (err, user) {
      var displayNewsLetter = true;

      if (isNewsLetterHidden()) {
        displayNewsLetter = false;
      }

      if (cappingReached()) {
        displayNewsLetter = false;
      }

      //place it first paragraph

      var $firstParagraph = $('body').find('.js-article-paragraph-list p:first');
      $element.insertAfter($firstParagraph);

      // We display the bloc : add to favorites if the user is not connected
      if (!err) {
        // Don't display the favorite bloc if the user is connected
        // and have this programId in his favorites list
        if ((user.newsletters || {})[site] === 1) {
          displayNewsLetter = false;
        }
      }

      RTBF.Newsletter.displayed = displayNewsLetter;

      if (displayNewsLetter) {
        incrementCounter();
        $element.removeClass('is-disabled');
      } else {
        $element.addClass('is-disabled');
      }
    });
  };

  var cappingReached = function cappingReached() {
    if (RTBF.Newsletter.cappingDisabled === true) {
      return false;
    }

    var cappingKey = storageKeyFor('capping');
    var session = parseInt(sessionStorage.getItem(cappingKey) || 0);

    if (session >= capping) {
      return true;
    }
    sessionStorage.setItem(cappingKey, session + 1);
    return false;
  };

  var isNewsLetterHidden = function isNewsLetterHidden() {
    var showNewsLetterAgainDate = new Date('1/1/2018').getTime();
    var hidingKey = storageKeyFor('hiding');
    var hiddenAtDate = parseInt(sessionStorage.getItem(hidingKey) || 0);

    return Date.now() < showNewsLetterAgainDate && localStorage.getItem(hidingKey) != null;
  };

  var hideNewsLetter = function hideNewsLetter() {
    $element.addClass('is-disabled');

    var hidingKey = storageKeyFor('hiding');
    localStorage.setItem(hidingKey, Date.now().toString());
  };

  var incrementCounter = function incrementCounter() {
    if (incrementedCounter === false) {
      incrementedCounter = true;

      var counterKey = storageKeyFor('counting');
      var counter = parseInt(localStorage.getItem(counterKey) || 0);
      counter++;
      RTBF.Newsletter.counter = counter;
      localStorage.setItem(counterKey, counter.toString());
    }
  };

  // On vérifie que l'utilisateur est enregistré à la newsletter sur le login et logout
  RTBF.sso.on('login', showNewsletter);
  RTBF.sso.on('logout', showNewsletter);

  showNewsletter();
});
;
// File: /js/news/common/public/static/js/module/live/preview.js
$(function () {

  var $container = $('.js-live-preview');
  var $iframe = $container.find('.js-embed-iframe');

  var isMediaOnTop = $('.js-on-top').length > 0;

  var geoWorldName = 'open';
  var geoEuropeName = 'eu';
  var ttl = 60 * 60 * 3 * 1000;
  var apiTimeOut = 3 * 1000;
  var apiGeoUrl = 'https://www.rtbf.be/api/geoip';
  var closeStorageName = 'closePreviewLiveV2';

  var storeWithExpiration = {
    set: function set(key, val, exp) {
      if (store.enabled) {
        store.set(key, { val: val, exp: exp, time: new Date().getTime() });
      }
    },
    get: function get(key) {
      if (!store.enabled) {
        return null;
      }
      var info = store.get(key);
      if (!info) {
        return null;
      }
      if (new Date().getTime() - info.time > info.exp) {
        return null;
      }

      return info.val;
    }
  };

  var removePreviewLive = function removePreviewLive() {
    $container.remove();
  };

  var setStaticContent = function setStaticContent(param) {
    $iframe.remove();
    $container.find('.js-livepreview-image').show();
  };

  var showPreviewLive = function showPreviewLive() {
    $iframe.attr('src', $iframe.data('url'));
    $container.removeClass('hidden');

    $('body').on('externalPlayerVideoMessage', function (e) {
      if (e.action === 'ended') {
        setStaticContent();
      }
    });
  };

  var showLiveIfAccessible = function showLiveIfAccessible(geoBlock) {
    // si la geolock n'est pas monde, on doit vérifier la localisation du user
    if (geoBlock !== geoWorldName) {
      (function () {
        var geoblockStorageName = 'geoCachePreviewLive_' + geoBlock;
        // le résultat de l'api geoblock pourrait être dans le local storage
        var isAllowed = storeWithExpiration.get(geoblockStorageName);
        // si pas caché, on appelle l'api
        if (isAllowed === null) {
          var restrictionCode = 2; // belgium
          if (geoBlock === geoEuropeName) {
            restrictionCode = 1 // europe
            ;
          }

          $.ajax({
            url: apiGeoUrl,
            data: {
              'zone': restrictionCode
            },
            timeout: apiTimeOut
          }).done(function (data) {
            storeWithExpiration.set(geoblockStorageName, data, ttl);
            isAllowed = data;
          }).fail(function () {
            isAllowed = true;
          }).always(function () {
            if (isAllowed) {
              showPreviewLive();
            }
          });
        } else {
          if (isAllowed) {
            showPreviewLive();
          }
        }
      })();
    } else {
      showPreviewLive();
    }
  };

  if (!isMediaOnTop && RTBF.Utils.isDesktop) {
    $close = $('.js-close', $container);
    $detail = $('.js-detail-link', $container);

    $close.on('click', function (e) {
      e.preventDefault();
      // preview is killed -> remove
      $container.remove();

      storeWithExpiration.set(closeStorageName, 'true', ttl);
    });

    $detail.on('click', function (e) {
      // live is running elsewhere -> remove
      removePreviewLive();
    });

    if (storeWithExpiration.get(closeStorageName) !== null) {
      removePreviewLive();
    } else {
      showLiveIfAccessible($container.data('geoblock'));
    }
  } else {
    // mobile -> remove
    removePreviewLive();
  }
});
;
// File: /js/rtbf/www/public/static/js/common/login.js
$(document).ready(function() {
	
	// Expand Panel
	$("#open").click(function(e){
		e.preventDefault();
		$("div#panel").slideDown("slow", function(){
			$('#log').focus();
		});
	
	});	
	
	// Collapse Panel
	$("#close").click(function(e){
		e.preventDefault();
		$("div#panel").slideUp("slow");	
	});		
	
	// Switch buttons from "Log In | Register" to "Close Panel" on click
	$("#toggle a").click(function(e) {
		e.preventDefault();
		$("#toggle a").toggle();
	});		
		
});
;
// File: /js/news/common/public/static/js/RTBF/topbar.js
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

// eslint-disable-next-line no-use-before-define
var RTBF = RTBF || {};

(function ($, window, document, RTBF) {
  /* globals jQuery */

  var Topbar = (function () {
    function Topbar() {
      for (var _len = arguments.length, settings = Array(_len), _key = 0; _key < _len; _key++) {
        settings[_key] = arguments[_key];
      }

      _classCallCheck(this, Topbar);

      this.maxVisibleItems = 9;
      this.container = $('.js-topbar');
      this.mainList = this.container.find('.js-topbar-main-list');
      this.moreList = this.container.find('.js-topbar-more-list');
      this.moreContainer = this.container.find('.js-topbar-more');
      this.moreToggle = this.container.find('.js-topbar-more-toggle');
      this.ssoRegister = this.container.find('.js-sso-toggle-register');
      this.ssoLogin = this.container.find('.js-sso-toggle-login');
      this.ssoLogged = this.container.find('.js-sso-toggle-logged');
      this.ssoPopup = this.container.find('.js-sso-popup');
      this.ssoWatchtower = null;
      this.resizeTimeout = null;

      this.bind();
      this.resize();
    }

    _createClass(Topbar, [{
      key: 'bind',
      value: function bind() {
        var _this = this;

        $(window).on('resize', function (e) {
          clearTimeout(_this.resizeTimeout);
          _this.resizeTimeout = window.setTimeout(function () {
            _this.resize();
          }, 50);
        });

        this.moreToggle.on('click', function (e) {
          e.preventDefault();
          _this.container.toggleClass('rtbf-nav--open');
        });

        this.ssoRegister.on('click touchend', function (e) {
          e.preventDefault();
          _this.toggleSso(true);
        });

        this.ssoLogin.on('click touchend', function (e) {
          e.preventDefault();
          _this.toggleSso(false);
        });

        this.ssoLogged.on('click touchend', function (e) {
          e.preventDefault();
          _this.toggleSso(false);
        });

        this.ssoPopup.on('click', '.js-sso-popup-logout', function (e) {
          if (_this.ssoWatchtower) _this.ssoWatchtower.breakout();
          _this.ssoLogged.addClass('is-loading');

          RTBF.sso.logout(function () {
            _this.ssoPopup.removeClass('is-active').blur();
            _this.ssoLogged.removeClass('is-active');
            _this.ssoLogged.removeClass('is-loading');
          });
        });

        RTBF.sso.on('data', function () {
          _this.updateSso();
        });

        this.updateSso();
      }
    }, {
      key: 'toggleSso',
      value: function toggleSso(register) {
        var _this2 = this;

        if (!this.ssoLogged.hasClass('is-active')) {
          RTBF.sso.fetch(function (err, user) {
            if (err) {
              // eslint-disable-next-line handle-callback-err
              RTBF.sso.access(register, null, null, function (err) {});
              return;
            }

            _this2.updateSso();
            _this2.ssoPopup.addClass('is-active').focus();
            _this2.ssoLogged.addClass('is-active');

            _this2.ssoWatchtower = RTBF.Utils.watchtower(_this2.ssoPopup, function () {
              _this2.ssoPopup.removeClass('is-active').blur();
              _this2.ssoLogged.removeClass('is-active');
            });
          });
        } else {
          this.ssoPopup.removeClass('is-active').blur();
          this.ssoLogged.removeClass('is-active');
          if (this.ssoWatchtower) this.ssoWatchtower.release();
        }
      }
    }, {
      key: 'updateSso',
      value: function updateSso() {
        var user = RTBF.sso.data();
        var logged = !!user;
        var fullname = logged ? user.firstname + ' ' + user.lastname : '';
        var firstname = logged ? user.firstname : '';

        this.container.toggleClass('is-logged', logged);
        this.container.find('.js-sso-toggle-name').text(fullname);
        this.container.find('.js-sso-popup-name').text(firstname);

        if (logged && user.parentalControl) {
          var className = null;
          switch (user.parentalControl) {
            case 'all':
              className = 'all';
              break;

            case '-12':
              className = '12';
              break;

            default:
              className = '16';
          }

          // parental-control-12 est ajouté par défaut dans le php
          $('body').removeClass('parental-control-12').addClass('parental-control-' + className);
        } else {
          $('body').removeClass('parental-control-all').removeClass('parental-control-16').addClass('parental-control-12');
        }
      }
    }, {
      key: 'resize',
      value: function resize() {
        var _this3 = this;

        var toggleOffset = this.moreToggle.offset();
        var mainListItems = this.mainList.children();
        var moreListItems = this.moreList.children();
        var lastVisibleIndex = mainListItems.length;

        mainListItems.removeClass('hidden');
        moreListItems.removeClass('hidden');

        mainListItems.each(function (i, e) {
          var offsetRight = $(e).offset().left + $(e).width();

          if (offsetRight > toggleOffset.left || i > _this3.maxVisibleItems) {
            lastVisibleIndex = i;
            return false;
          }
        });

        if (lastVisibleIndex > 0) {
          mainListItems.slice(lastVisibleIndex).addClass('hidden');
          moreListItems.slice(0, lastVisibleIndex).addClass('hidden');
        }
      }
    }]);

    return Topbar;
  })();

  RTBF.Topbar = Topbar;

  // eslint-disable-next-line no-new
  new RTBF.Topbar();
})(jQuery, window, document, RTBF);
;
// File: /js/news/common/public/static/js/vendor/awesomplete/awesomplete.min.js
// Awesomplete - Lea Verou - MIT license
!function(){function t(t){var e=Array.isArray(t)?{label:t[0],value:t[1]}:"object"==typeof t&&"label"in t&&"value"in t?t:{label:t,value:t};this.label=e.label||e.value,this.value=e.value}function e(t,e,i){for(var n in e){var s=e[n],r=t.input.getAttribute("data-"+n.toLowerCase());"number"==typeof s?t[n]=parseInt(r):s===!1?t[n]=null!==r:s instanceof Function?t[n]=null:t[n]=r,t[n]||0===t[n]||(t[n]=n in i?i[n]:s)}}function i(t,e){return"string"==typeof t?(e||document).querySelector(t):t||null}function n(t,e){return o.call((e||document).querySelectorAll(t))}function s(){n("input.awesomplete").forEach(function(t){new r(t)})}var r=function(t,n){var s=this;this.isOpened=!1,this.input=i(t),this.input.setAttribute("autocomplete","off"),this.input.setAttribute("aria-autocomplete","list"),n=n||{},e(this,{minChars:2,maxItems:10,autoFirst:!1,data:r.DATA,filter:r.FILTER_CONTAINS,sort:r.SORT_BYLENGTH,item:r.ITEM,replace:r.REPLACE},n),this.index=-1,this.container=i.create("div",{className:"awesomplete",around:t}),this.ul=i.create("ul",{hidden:"hidden",inside:this.container}),this.status=i.create("span",{className:"visually-hidden",role:"status","aria-live":"assertive","aria-relevant":"additions",inside:this.container}),i.bind(this.input,{input:this.evaluate.bind(this),blur:this.close.bind(this,{reason:"blur"}),keydown:function(t){var e=t.keyCode;s.opened&&(13===e&&s.selected?(t.preventDefault(),s.select()):27===e?s.close({reason:"esc"}):38!==e&&40!==e||(t.preventDefault(),s[38===e?"previous":"next"]()))}}),i.bind(this.input.form,{submit:this.close.bind(this,{reason:"submit"})}),i.bind(this.ul,{mousedown:function(t){var e=t.target;if(e!==this){for(;e&&!/li/i.test(e.nodeName);)e=e.parentNode;e&&0===t.button&&(t.preventDefault(),s.select(e,t.target))}}}),this.input.hasAttribute("list")?(this.list="#"+this.input.getAttribute("list"),this.input.removeAttribute("list")):this.list=this.input.getAttribute("data-list")||n.list||[],r.all.push(this)};r.prototype={set list(t){if(Array.isArray(t))this._list=t;else if("string"==typeof t&&t.indexOf(",")>-1)this._list=t.split(/\s*,\s*/);else if(t=i(t),t&&t.children){var e=[];o.apply(t.children).forEach(function(t){if(!t.disabled){var i=t.textContent.trim(),n=t.value||i,s=t.label||i;""!==n&&e.push({label:s,value:n})}}),this._list=e}document.activeElement===this.input&&this.evaluate()},get selected(){return this.index>-1},get opened(){return this.isOpened},close:function(t){this.opened&&(this.ul.setAttribute("hidden",""),this.isOpened=!1,this.index=-1,i.fire(this.input,"awesomplete-close",t||{}))},open:function(){this.ul.removeAttribute("hidden"),this.isOpened=!0,this.autoFirst&&this.index===-1&&this.goto(0),i.fire(this.input,"awesomplete-open")},next:function(){var t=this.ul.children.length;this.goto(this.index<t-1?this.index+1:t?0:-1)},previous:function(){var t=this.ul.children.length,e=this.index-1;this.goto(this.selected&&e!==-1?e:t-1)},goto:function(t){var e=this.ul.children;this.selected&&e[this.index].setAttribute("aria-selected","false"),this.index=t,t>-1&&e.length>0&&(e[t].setAttribute("aria-selected","true"),this.status.textContent=e[t].textContent,i.fire(this.input,"awesomplete-highlight",{text:this.suggestions[this.index]}))},select:function(t,e){if(t?this.index=i.siblingIndex(t):t=this.ul.children[this.index],t){var n=this.suggestions[this.index],s=i.fire(this.input,"awesomplete-select",{text:n,origin:e||t});s&&(this.replace(n),this.close({reason:"select"}),i.fire(this.input,"awesomplete-selectcomplete",{text:n}))}},evaluate:function(){var e=this,i=this.input.value;i.length>=this.minChars&&this._list.length>0?(this.index=-1,this.ul.innerHTML="",this.suggestions=this._list.map(function(n){return new t(e.data(n,i))}).filter(function(t){return e.filter(t,i)}).sort(this.sort).slice(0,this.maxItems),this.suggestions.forEach(function(t){e.ul.appendChild(e.item(t,i))}),0===this.ul.children.length?this.close({reason:"nomatches"}):this.open()):this.close({reason:"nomatches"})}},r.all=[],r.FILTER_CONTAINS=function(t,e){return RegExp(i.regExpEscape(e.trim()),"i").test(t)},r.FILTER_STARTSWITH=function(t,e){return RegExp("^"+i.regExpEscape(e.trim()),"i").test(t)},r.SORT_BYLENGTH=function(t,e){return t.length!==e.length?t.length-e.length:t<e?-1:1},r.ITEM=function(t,e){var n=""===e?t:t.replace(RegExp(i.regExpEscape(e.trim()),"gi"),"<mark>$&</mark>");return i.create("li",{innerHTML:n,"aria-selected":"false"})},r.REPLACE=function(t){this.input.value=t.value},r.DATA=function(t){return t},Object.defineProperty(t.prototype=Object.create(String.prototype),"length",{get:function(){return this.label.length}}),t.prototype.toString=t.prototype.valueOf=function(){return""+this.label};var o=Array.prototype.slice;return i.create=function(t,e){var n=document.createElement(t);for(var s in e){var r=e[s];if("inside"===s)i(r).appendChild(n);else if("around"===s){var o=i(r);o.parentNode.insertBefore(n,o),n.appendChild(o)}else s in n?n[s]=r:n.setAttribute(s,r)}return n},i.bind=function(t,e){if(t)for(var i in e){var n=e[i];i.split(/\s+/).forEach(function(e){t.addEventListener(e,n)})}},i.fire=function(t,e,i){var n=document.createEvent("HTMLEvents");n.initEvent(e,!0,!0);for(var s in i)n[s]=i[s];return t.dispatchEvent(n)},i.regExpEscape=function(t){return t.replace(/[-\\^$*+?.()|[\]{}]/g,"\\$&")},i.siblingIndex=function(t){for(var e=0;t=t.previousElementSibling;e++);return e},"undefined"!=typeof Document&&("loading"!==document.readyState?s():document.addEventListener("DOMContentLoaded",s)),r.$=i,r.$$=n,"undefined"!=typeof self&&(self.Awesomplete=r),"object"==typeof module&&module.exports&&(module.exports=r),r}();
//# sourceMappingURL=awesomplete.min.js.map
;
// File: /js/news/common/public/static/js/module/meteo/forecast.js
$(function () {
    'use strict';

    // Compile a template function for a given meteo widget.
    var compile = function ($meteo) {
        var today = {};
        var $today = $meteo.find('.js-meteo-today:first');

        today.w3c = $today.find('.js-meteo-today-w3c:first');
        today.period = $today.find('.js-meteo-today-period:first');
        today.min = $today.find('.js-meteo-today-min:first');
        today.max = $today.find('.js-meteo-today-max:first');
        today.wind = $today.find('.js-meteo-today-wind:first');
        today.icon = $today.find('.js-meteo-today-icon:first > i');

        var forecasts = [];
        var $forecasts = $meteo.find('.js-meteo-forecast');

        $forecasts.each(function () {
            var forecast = {};
            var $forecast = $(this);

            forecast.period = $forecast.find('.js-meteo-forecast-period:first');
            forecast.weather = $forecast.find('.js-meteo-forecast-weather:first');
            forecast.icon = $forecast.find('.js-meteo-forecast-icon:first > i');

            forecasts.push(forecast);
        });

        return function (data) {
            today.period.text(data.today.label);
            today.min.text(data.today.min);
            today.max.text(data.today.max);
            today.wind.text(data.today.wind);
            today.icon.attr('class', 'ico ' + data.today.icon);
            today.icon.attr('title', data.today.brief);

            for (var i in forecasts) {
                forecasts[i].period.text(data.forecasts[i].label);
                forecasts[i].weather.text(data.forecasts[i].weather);
                forecasts[i].icon.attr('class', 'ico ' + data.forecasts[i].icon);
                forecasts[i].icon.attr('title', data.forecasts[i].brief);
            }
        };
    };

    // Get the weather information for a given station.
    var weather = function (station, cb) {
        $.get('https://www.rtbf.be/news/api/weather', {
            station: station,
        }, 'json').then(cb);
    };

    // Get the list of station matching a query.
    var stations = function (query, cb) {
        $.get('https://www.rtbf.be/news/api/station', {
            query: query,
        }, 'json').then(cb);
    };

    // Initiate the station picker only after the first click on the field.
    $('.js-meteo').one('click', '.js-meteo-station-selector', function () {
        var $this = $(this);
        var $meteo = $this.closest('.js-meteo');
        var $update = $meteo.find('.js-meteo-update');
        var template = compile($meteo);

        var awesomplete = new Awesomplete(this, {
            autoFirst: true,
        });

        $this.focus();

        // Choose a new station and update the widget.
        var choose = RTBF.Utils.throttle(function () {
            var station = 0;
            var items = $this.data('items');

            for (var i in items) {
                var item = items[i];
                if (item.label !== $this.val()) continue;
                station = item.station;
            }

            if (!station) return;

            weather(station, function (data) {
                template(data);

                // Dislay a message when the station is updated.
                $update.addClass('is-visible');
                setTimeout(function () {
                    $update.removeClass('is-visible');
                }, 2000);
            });
        }, 500);

        // Update the auto complete results list.
        var update = RTBF.Utils.debounce(function (e) {
            // Filter on characters only.
            if (e.which < 65 || e.which > 90) return;

            stations($this.val(), function (items) {
                // Save results for later on.
                $this.data('items', items);

                // Collect labels only.
                var labels = [];
                for (var i in items) labels.push(items[i].label);

                // Update awesomplete list.
                awesomplete.list = labels;
                awesomplete.evaluate();
            });
        }, 300);

        $this.on('keyup', update);
        $this.on('awesomplete-selectcomplete', choose);
    });

    var $menu = $('.js-meteo-menu');
    var delay = false;

    var isDesktopMenu = function() {
        return $(window).width() > 991;
    };
    var iOS = /iPad|iPhone|iPod/.test(navigator.platform);

    $menu.find('>a').on('click', function (evt) {
        // For mobiles only...
        if (!isDesktopMenu()) {
            var $meteoWidgetZone = $('.js-meteo-widget');
            // If it exists in the current page we scroll to meteo zone (else we just follow the href)
            if ($meteoWidgetZone.length) {
                evt.preventDefault();
                $('html, body').animate({
                    scrollTop: $meteoWidgetZone.offset().top},
                'slow');
            }
        }
    });
    $menu.on('mouseenter', function () {
        if (isDesktopMenu()) {
            $menu.addClass('is-visible');
            clearTimeout(delay);
        } else if (iOS) {
            // iOS does block the 'click' event when using `mouseenter`
            // http://stackoverflow.com/questions/17710893/why-when-do-i-have-to-tap-twice-to-trigger-click-on-ios
            // So we know we can force it
            $menu.find('>a').click();
        }
    }).on('mouseleave', function () {
        delay = setTimeout(function () {
            $menu.removeClass('is-visible');
        }, 500);
    });
});
;
// File: /js/news/common/public/static/js/module/sso/dialog.js
$(function () {
  'use strict';

  /* globals RTBF, $, _, ga, store */

  // Templating
  var $this = $(this);
  var $container = $this.find('.js-sso-dialog');
  var myAccountPage = $container.data('account-link');
  var newsletterSite = $container.data('newsletter-site');
  var newsletterLabel = $container.data('newsletter-label');
  var newsletterLink = $container.data('newsletter-link');

  var noRenderOnPages = [
    'https://www.rtbf.be/activation',
    myAccountPage
  ];

  _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
  var dialogTpl = _.template($this.find('.js-sso-dialog-tpl').html());

  // ---> START USE FOR TEST

  var $containerReset = $('.js-sso-dialog-reset');
  var env = $containerReset.data('env');
  var articleViewCount = store.get('articleViewCount') || {};
  var articleId = parseInt($('.js-article-detail').data('articleId'));

  // ---> END USE FOR TEST

  // DATA
  var actionsProfile = {
    enrich_empty_field: 'enrich_empty_field',
    enrich_postpone_empty_field: 'enrich_postpone_empty_field',
    enrich_subscribe_newsletter: 'enrich_subscribe_newsletter'
  };

  var enrichment = {
    enrich_empty_field: {
      messages: {
        fill_profile: 'Votre profil est rempli à ###RATE###%&nbsp;! Complétez-le pour améliorer votre expérience &nbsp;!'
      },
      actions: {
        no: {
          label: 'Non',
          stats: {
            label: 'postpone fill profile'
          }
        },
        yes: {
          label: 'Oui',
          stats: {
            label: 'go to fill profile'
          }
        },
      },
    },
    enrich_subscribe_newsletter: {
      messages: {
        subscribe: 'Souhaitez-vous vous abonner à notre newsletter ' + newsletterLabel + '&nbsp;?'
      },
      actions: {
        no: {
          label: 'Non, merci',
          stats: {
            label: 'dont want to subscribe to newsletter'
          }
        },
        yes: {
          label: 'Oui',
          stats: {
            label: 'go to subscribe to newsletter'
          }
        },
      },
    },
  };

  // FUNCTIONS

  /**
   * Function send a stat to google
   * @param action
   * @param label
   * @param value
   */
  var sendStats = function(action, label, value) {
    if (! value) {
      value = '';
    }
    ga('send', 'event', 'sso-profile-fill', action, label, value);
  }

  /**
   * Function prepare all the informations needed to render a notification
   * to enrich profile user
   * @param {*} user
   */
  var prepareData = function (user) {
    sendStats('display', 'view for user profile');
    return {
      title: 'Bonjour ' + user.firstname + ',',
      question: enrichment[user.enrichment.action].messages.fill_profile.replace('###RATE###', user.fillingRate),
      options: enrichment[user.enrichment.action].actions
    };
  };

  /**
   * Function prepare all the informations needed to render a notification
   * to subscribe to a newsletter
   * @param {*} user
   */
  var prepareSubscription = function (user) {
    // This check is if we have a enrichment for newsletter
    // but the context is the home and we havent the following information on the module .php
    if (!newsletterLabel && !newsletterSite && !newsletterLink) {
      return {title: null, question: null, options: null};
    }
    sendStats('display', 'view for newsletter subscribe');
    return {
      title: 'Bonjour ' + user.firstname + ',',
      question: enrichment[actionsProfile.enrich_subscribe_newsletter].messages.subscribe,
      options: enrichment[actionsProfile.enrich_subscribe_newsletter].actions
    };
  };

  /**
   * Event to click on the option close to save a status of the enrichment
   */
  var eventClickCloseDialog = function () {
    $container.on('click', '.js-sso-dialog_close', function () {
      if (RTBF.sso.user.enrichment) {
        var action = null;
        if (RTBF.sso.user.enrichment.action === actionsProfile.enrich_empty_field) {
          action = actionsProfile.enrich_postpone_empty_field;
        }

        if (action) {
          RTBF.sso.enrich(
            action,
            null,
            RTBF.sso.user.enrichment.dismiss,
            function () {}
          );
        }

        sendStats('click', 'close cross ' + enrichment[RTBF.sso.user.enrichment.action].actions.no.stats.label, RTBF.sso.user.gigyaId);
      } else {
        sendStats('click', 'close cross ' + enrichment.enrich_subscribe_newsletter.actions.no.stats.label, RTBF.sso.user.gigyaId);
      }

      $container.addClass('hidden');
    });
  };

  /**
   * Event to click on the option nothing to save a status of the enrichment
   */
  var eventClickNothing = function () {
    $container.on('click', '.js-sso-dialog_options-nothing', function () {
      if (RTBF.sso.user.enrichment ) {
        //In the case of update profile we need to update the last access and confirm date for the field
        if (RTBF.sso.user.enrichment.action === actionsProfile.enrich_empty_field) {
          RTBF.sso.enrich(
              actionsProfile.enrich_postpone_empty_field,
              null,
              RTBF.sso.user.enrichment.dismiss,
              function () {}
            );
        }

        sendStats('click', enrichment[RTBF.sso.user.enrichment.action].actions.no.stats.label, RTBF.sso.user.gigyaId);
      } else {
        sendStats('click', enrichment.enrich_subscribe_newsletter.actions.no.stats.label, RTBF.sso.user.gigyaId);
      }

      $container.addClass('hidden');
    });
  };

  /**
   * Event to click on the option dismiss to dont suggest any notification
   */
  // var eventClickDismiss = function () {
  //   $container.on('click', '.js-sso-dialog_options-dismiss', function () {
  //     RTBF.sso.enrich(null, null, true, function () {});
  //     $container.addClass('hidden');
  //   });
  // };

  /**
   * Event to click on the option continue to save a status of the enrichment
   */
  var eventClickContinue = function () {
    $container.on('click', '.js-sso-dialog_options-continue', function () {
      var link = null;
      if (RTBF.sso.user.enrichment && RTBF.sso.user.enrichment.action === actionsProfile.enrich_empty_field) {
        link = myAccountPage;
        sendStats('click', enrichment[RTBF.sso.user.enrichment.action].actions.yes.stats.label, RTBF.sso.user.gigyaId);

        RTBF.sso.enrich(
          RTBF.sso.user.enrichment.action,
          RTBF.sso.user.enrichment.resource,
          RTBF.sso.user.enrichment.dismiss,
          function () {}
        );
      } else {
        link = newsletterLink;
        sendStats('click', enrichment.enrich_subscribe_newsletter.actions.yes.stats.label, RTBF.sso.user.gigyaId);
      }

      $(this).attr('href', link);
      $container.addClass('hidden');
    });
  };

  /**
   * Function redering the html to the container
   * @param {*} content
   */
  var rendering = function (content) {
    if (content.title !== null && content.question !== null) {
      var data = {
        title: content.title,
        text: content.question,
        nothingText: content.options.no.label,
        continueText: content.options.yes.label
      };

      $container.html(dialogTpl(data));

      $container.removeClass('hidden');
    }
  };

  /**
   * Function to count article detail view
   * @param {*} user
   */
  var countArticleProcess = function () {
    if (window.location.href.indexOf('preview') > -1) {
      return;
    }

    // If no newsletter site and articleId dont enrich
    if (!articleId || !newsletterSite) {
      return;
    }

    if (articleViewCount.count > 2) {
      articleViewCount.count = 1;
    } else if (articleViewCount.site !== newsletterSite) {
      articleViewCount.count = 1;
    } else if (articleViewCount.articleId !== articleId) {
      articleViewCount.count++;
    }

    articleViewCount.site = newsletterSite;
    articleViewCount.articleId = articleId;

    store.set('articleViewCount', articleViewCount);
  };

  /**
   * Manage the dialog rendering following the information contains in the user object
   * @param {*} err
   * @param {*} user
   */
  var dialog = function (err, user) {
    if (err) return;

    countArticleProcess();

    if (user.enrichment && user.enrichment.action === actionsProfile.enrich_empty_field) {
      rendering(prepareData(user));
    } else if (articleId && articleViewCount.count > 2 && user.newsletters && !user.newsletters[newsletterSite]) {
      rendering(prepareSubscription(user));
    }
  };

  /**
   * Function fetch the data of the user and
   * execute the function fillingRate on callback
   */
  var dialogWithFetch = function () {
    $container.addClass('hidden');

    // No dialog on except pages
    var isExceptPage = noRenderOnPages.find(function(item) {
      return window.location.href.indexOf(item) === 0
    });

    if (isExceptPage) {
      return;
    }

    RTBF.sso.fetch(dialog);
  };

  RTBF.sso.on('update', dialogWithFetch);
  RTBF.sso.on('login', dialogWithFetch);
  RTBF.sso.on('logout', function () {
    $container.addClass('hidden');
  });

  dialogWithFetch();

  // Init events
  eventClickNothing();
  eventClickContinue();
  //eventClickDismiss();
  eventClickCloseDialog();
});


;
// File: /js/news/common/public/static/js/module/footer/default.js
$(function() {
    var $text2speechBtn = $('.js-toggle-text2speech');
    var $text2speechLabel = $text2speechBtn.find('.js-text2speech-label');
    var $popup = $('.js-text2speech-popup');

    $text2speechBtn.click(function (e) {
        e.preventDefault();

        if(RTBF.Text2speech.isEnabled()) {
            RTBF.Text2speech.disable();
            $popup.removeClass('is-visible');
        }else{
            RTBF.Text2speech.enable();
            $popup.addClass('is-visible');
        }

        setText();

    });

    var setText = function(){
        if(RTBF.Text2speech.isEnabled()){
            $text2speechLabel.text('Désactiver l\'aide aux malvoyants');
        }else{
            $text2speechLabel.text('Activer l\'aide aux malvoyants');
        }
    }

    $popup.on('click','.js-close',function(ev) {
        $popup.removeClass('is-visible');
        ev.preventDefault();
    })

    setText();
});

;
// File: /js/news/common/public/static/js/module/footer/block/popindown.js
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

  /* global $, RTBF */

  var NUMBER_OF_DAY_HIDDING_BLOCK_CAMPAIGN = 3;

  // GetSite
  var $footer = $('footer.footer-main');

  // The bloc element
  var $element = $footer.find('.js-popin-down');
  var site = $element.data('favorite_site');

  var showPopinDownCampaign = function showPopinDownCampaign() {
    // Check if the bloc should be hidden in the storage
    try {
      var footerDetailFavorite = $.cookie('RTBF.news.common.footer.popin-down-campaign');

      if (footerDetailFavorite) {
        // Number of days between the localstorage has been created and now

        if (footerDetailFavorite === 'hidden') {
          $element.addClass('is-disabled');
          return;
        }
      }
    } catch (e) {}

    // Get the program detail if the user have it in his favorites
    RTBF.sso.fetch(true, function (err, user) {
      // We display the bloc : add to favorites if the user is not connected
      if (err) {
        $element.removeClass('is-disabled');
        return;
      }

      // Don't display the favorite bloc if the user is connected
      // and have this programId in his favorites list
      if ((user.newsletters || {})[site] === 1) {
        $element.addClass('is-disabled');
        return;
      }

      // Display the favorite in all other cases
      $element.removeClass('is-disabled');
    });
  };

  // Buttons favorite action

  // Action to click on the button to remove the bloc to add the program to the favorites
  $footer.on('click', '.js-close', function (e) {
    e.preventDefault();

    // Save locally in localstorage the ask to not display the bloc to add the program to the favorites
    $.cookie('RTBF.news.common.footer.popin-down-campaign', 'hidden', {
      expires: NUMBER_OF_DAY_HIDDING_BLOCK_CAMPAIGN,
      path: '/' + site });

    // Rendering of the invitation to add the program to the favorites
    showPopinDownCampaign();
  });

  // Check if the user have the programId saved in his favorite on login and logout
  RTBF.sso.on('login', showPopinDownCampaign);
  RTBF.sso.on('logout', showPopinDownCampaign);

  showPopinDownCampaign();
});
;
// File: /js/news/common/public/static/js/RTBF/cookiepolicy.js
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (root, factory) {
  'use strict';

  /* globals define, module, exports, localStorage, $ */

  if (typeof define === 'function' && define.amd) {
    // Asynchronous Module Definition (AMD) (e.g. requirejs)
    define([], factory);
  } else if (typeof exports === 'object') {
    // CommonJS style (e.g. Browserify)
    module.exports = factory();
  } else {
    // Global definition (e.g. RTBF)
    root.RTBF = root.RTBF || {};
    root.RTBF.cookiePolicy = factory();
  }
})(this, function () {
  'use strict';

  /**
   * if user has checked (agreed) all cookies
   * -> FULL consent then the cookie expired in 365 days
   */
  var EXPIRED_COOKIE_DATE_FULL_CONSENT = 365;
  /**
   * Otherwhise if user has checked (agreed) some cookies (not all)
   * -> PARTIAL consent then the cookie expired in 30 days
   */
  var EXPIRED_COOKIE_DATE_PARTIAL_CONSENT = 30;

  /**
   * Class CookiePolicy
   */

  var CookiePolicy = (function () {
    function CookiePolicy() {
      _classCallCheck(this, CookiePolicy);

      this.consentName = 'eucookieconsent';
      this.consent = this.getConsent();
    }

    _createClass(CookiePolicy, [{
      key: 'setCookie',

      // ////////////////////////////////////////////////////////////////////////// //
      // //////////////////////////////// C O R E ///////////////////////////////// //
      // ////////////////////////////////////////////////////////////////////////// //

      value: function setCookie(name, value, expire) {
        try {
          $.cookie(name, value, { expires: expire, path: '/', domain: '.rtbf.be' });
          if ($.cookie(name)) return;
        } catch (e) {}

        localStorage.setItem(name, value);
      }
    }, {
      key: 'getCookie',
      value: function getCookie(name) {
        return $.cookie(name) || localStorage.getItem(name);
      }
    }, {
      key: 'signAll',
      value: function signAll(consent) {
        if (!consent) {
          // False by default
          this.consent = {
            ads: false,
            pixelTrackers: false
          };
        } else {
          this.consent = consent;
        }
        var consentStringified = this.encodeConsentCookie(this.consent);
        var expired = this.existOptionDenyInConsent(this.consent) ? EXPIRED_COOKIE_DATE_PARTIAL_CONSENT : EXPIRED_COOKIE_DATE_FULL_CONSENT;
        this.setCookie(this.consentName, consentStringified, expired);
      }
    }, {
      key: 'getConsent',

      // ////////////////////////////////////////////////////////////////////////// //
      // ////////////////////////////// H E L P E R /////////////////////////////// //
      // ////////////////////////////////////////////////////////////////////////// //

      value: function getConsent() {
        return this.decodeConsentCookie();
      }
    }, {
      key: 'decodeConsentCookie',
      value: function decodeConsentCookie() {
        var cookie = this.getCookie(this.consentName);
        if (!cookie) {
          return null;
        }
        return JSON.parse(window.atob(this.getCookie(this.consentName)));
      }
    }, {
      key: 'encodeConsentCookie',
      value: function encodeConsentCookie(consentNotStringified) {
        return window.btoa(JSON.stringify(consentNotStringified));
      }
    }, {
      key: 'existOptionDenyInConsent',
      value: function existOptionDenyInConsent(consent) {
        var exist = false;
        var keys = Object.keys(consent);

        keys.forEach(function (nameProp) {
          if (!consent[nameProp]) {
            exist = true;
          }
        });

        return exist;
      }
    }, {
      key: 'hasSignedAds',

      // ///////////////////////////////// A D S ////////////////////////////////// //

      value: function hasSignedAds() {
        this.consent = this.decodeConsentCookie();
        return this.consent ? this.consent.ads : false;
      }
    }, {
      key: 'hasSignedPixelTrackers',

      // ////////////////////// P I X E L T R A C K E R S /////////////////////// //

      value: function hasSignedPixelTrackers() {
        this.consent = this.decodeConsentCookie();
        return this.consent ? this.consent.pixelTrackers : false;
      }
    }]);

    return CookiePolicy;
  })();

  // ////////////////////////////////////////////////////////////////////////// //
  // //////////////////////////// FA V O R I T E ////////////////////////////// //
  // ////////////////////////////////////////////////////////////////////////// //

  return new CookiePolicy();
});
;
// File: /js/news/common/public/static/js/module/cookiepolicy/default.js
$(function () {
  var $container = $('body');
  var $template = $('#js-cookie-policy-default-tmpl').html();
  var selector = '#js-cookie-policy-default';
  var cookiePolicy = RTBF.cookiePolicy;

  var noRenderOnPages = ['https://www.rtbf.be/auvio/faq', 'https://www.rtbf.be/tarmac/faq', 'https://www.rtbf.be/cookies/', 'https://www.rtbf.be/lapremiere/infos/faq', 'https://www.rtbf.be/vivacite/infos/faq', 'https://www.rtbf.be/musiq3/infos/faq', 'https://www.rtbf.be/classic21/infos/faq', 'https://www.rtbf.be/pure/infos/faq', 'https://www.rtbf.be/entreprise/contact-et-question/faq/detail'];

  function show() {
    $($container).append($template);
    // work with the freshly inserted cookie banner
    var $el = $(selector);
    $el.find('.js-cookie-policy-accept').on('click', function (e) {
      $el.find('.js-cookie-policy-accept').addClass('signed');
      setTimeout(function () {
        $el.fadeOut(400, function () {
          return $el.remove();
        });
      }, 1500);

      cookiePolicy.signAll({
        ads: true,
        pixelTrackers: true
      });
      // prevent anchor to top
      e.preventDefault();
    });

    $el.fadeIn(400);

    // track
    if (typeof ga === 'function') {
      ga('send', {
        'hitType': 'event', // Required.
        'eventCategory': 'display', // Required.
        'eventAction': 'render', // Required.
        'eventLabel': 'CookiePolicy',
        'eventValue': 1
      });
    }
  }

  var isExceptPage = noRenderOnPages.find(function (item) {
    return window.location.href.indexOf(item.replace(/(.*?)(\/)?$/gi, '$1')) === 0;
  });

  if (isExceptPage) {
    return;
  }

  if (!cookiePolicy.getConsent()) {
    show();
  }
});
;
// File: /js/news/common/public/static/js/module/sso/screen/error.js
$(function () {
  RTBF.sso.subscribe('loaded', RTBF.sso.context.authentication.screens.error, function (e) {
    var code = RTBF.Utils.getQueryParams().errorCode || '';

    // Keep only the numerical code.
    code = code.substring(0, code.indexOf(' '));

    var $message = e.$screen.find('p[data-code="' + code + '"]');

    if (!$message.length) return;

    // Hide default message.
    e.$screen.find('p:first').addClass('hidden');

    // Display contextual error mesasge.
    $message.removeClass('hidden');
  });
});
;
// File: /js/news/common/public/static/js/RTBF/menu.js
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/**
* Depends: RTBF.Utils
* Depends: store.js
*/

// TODO @fma add aria attributes `aria-control` & `aria-expanded` on submenu openers
// TODO @fma add id attribute on submenu matching the parent submenu opener

// eslint-disable-next-line no-use-before-define
var RTBF = RTBF || {};
// eslint-disable-next-line no-use-before-define
var store = store || {};

(function ($, window, document, RTBF, store) {
  /* globals jQuery */

  var Menu = (function () {
    function Menu(settings) {
      var _this = this;

      _classCallCheck(this, Menu);

      this.maxVisibleItems = 9;

      this.body = $('body');
      this.site = settings.site || '';
      this.container = $('.js-menu');
      this.menu = this.container.find('.js-menu-list');
      this.more = this.container.find('.js-menu-more-list');
      this.menuKey = this.container.data('menukey');
      this.version = this.container.data('version') || '1.0';
      this.menuToggle = $('.js-menu-toggle');
      this.menuSearch = $('.js-menu-search');
      this.menuButtons = $('.js-menu-toggle, .js-menu-search');
      this.searchBox = this.container.find('.js-search-box').remove(); // 'cut' the node for further use
      this.contentMain = this.body.find('.js-content-main');
      this.menuJson = null;
      this.menuReady = this.container.data('menuReady');
      this.resizeTimeout = null;
      this.isProcessing = false;
      this.useStorage = true;

      this.ssl = window.location.protocol === 'https:' ? 'ssl' : 'nossl';

      // Removing the empty spaces between <tags>
      // @see     https://jira.rtbf.be:8443/browse/WWWCOMMON-460
      var htmlStr = this.menu.html();

      if (htmlStr) {
        htmlStr = htmlStr.replace(/>\s+</g, '><');
        this.menu.html(htmlStr);
      }

      this.bind();

      if (!this.isMenuMobile()) {
        this.getMenu().then(function () {
          _this.searchBox.appendTo(_this.menu);
          _this.resize();
        });
      }
    }

    _createClass(Menu, [{
      key: 'isMenuMobile',
      value: function isMenuMobile() {
        return RTBF.Utils && (RTBF.Utils.isMobile() || RTBF.Utils.isTablet());
      }
    }, {
      key: 'bind',
      value: function bind() {
        var _this2 = this;

        var self = this;

        // IMPORTANT iOS does NOT handle focus in a friendly way...
        // http://stackoverflow.com/questions/5978470/ipad-html-focus
        var ua = navigator.userAgent;
        var iOSDevice = /(iPad|iPhone|iPod)/gi.test(ua);

        // mobile menu/search buttons
        var eventName = iOSDevice ? 'touchstart' : 'click';

        this.menuButtons.on(eventName, function (e) {
          e.preventDefault();

          var btn = $(this); // Menu toggle or menu search
          var isToggle = btn.is(self.menuToggle);
          var isActive = btn.hasClass('active');
          var isMenuVisible = self.menu.is(':visible');

          $('body').trigger('closequickmenu');
          self.menuButtons.removeClass('active');

          self.getMenu().then(function () {
            if (isToggle) {
              self.searchBox.appendTo(self.menu);
              self.menu.children(':not(.js-search-box)').removeClass('hidden-xs');
            } else {
              self.searchBox.prependTo(self.menu);
              self.menu.children(':not(.js-search-box)').addClass('hidden-xs');
            }

            if (!isActive) {
              btn.addClass('active');
              if (!isMenuVisible) {
                self.menu.addClass('visible--xs');
              }
            } else if (isMenuVisible) {
              self.menu.removeClass('visible--xs');
              self.searchBox.find('input').blur();
            }
            if (!isToggle) {
              // Not the menu link, then search icon!
              self.searchBox.find('input').focus();
            }
          });
        });

        if (iOSDevice) {
          this.menuSearch.on('touchend', function (e) {
            if (self.searchBox.is(':visible')) {
              self.searchBox.find('input').focus();
            }
          });
        }

        this.menu.on('click', 'a', function (e) {
          var link = $(e.currentTarget);
          var li = link.closest('li');
          var angle = $(e.target);
          var href = link.attr('href');
          var isEmptyLink = !href || href === '#';

          if (isEmptyLink && angle.is(link)) {
            // There is no defined `href` so we help to trigger the `angle` click
            angle = link.find('.js-angle');
          }

          // eslint-disable-next-line no-mixed-operators
          if (angle.hasClass('js-angle') || link.hasClass('js-selectbox') && !_this2.isMenuMobile()) {
            e.preventDefault();
          }

          // send event to trigger expand menu show / hide
          if (li.hasClass('js-expandmenu')) {
            _this2.menu.find('.js-expandmenu').not(li).removeClass('active--md');
            li.toggleClass('active--md');
            _this2.body.trigger('expandmenu', li.data('id'));
          }

          // toggle search bar from search menu entry
          if (li.hasClass('js-searchtoggle')) {
            e.preventDefault();
            _this2.body.trigger('searchtoggle');
          }

          if (angle.hasClass('js-angle')) {
            if (_this2.isMenuMobile()) {
              link.toggleClass('active--xs');
            }
          }

          if (link.hasClass('js-selectbox') && !_this2.isMenuMobile()) {
            var _parent = link.parent();
            var contextMenu = $('.rtbf-site-subnav--secondary', _parent);

            contextMenu.toggleClass('select-menu--open');
            _this2.outsideSelectBoxClick(_parent);
          }
        });

        // media search button
        $(this.body).on('click', '.js-search-button', function (e) {
          e.preventDefault();
          _this2.body.trigger('searchtoggle');
        });

        // more buttons
        $(this.container).on('click', '.js-menu-more-toggle', function (e) {
          e.preventDefault();
          $(e.currentTarget).toggleClass('is-menu-open');
        });

        $(window).on('resize', function (e) {
          clearTimeout(_this2.resizeTimeout);
          _this2.resizeTimeout = window.setTimeout(function () {
            if (!_this2.isMenuMobile()) {
              _this2.getMenu().then(function () {
                _this2.resize();
              });
            }
          }, 150);
        });

        this.body.on('closemenu', function (e) {
          self.closeMenu();
        });
      }
    }, {
      key: 'outsideSelectBoxClick',
      value: function outsideSelectBoxClick(selectBoxCont) {
        var _this3 = this;

        // IMPORTANT iOS does NOT handle the click.outside so we need to use touchstart
        var ua = navigator.userAgent;
        var iOSDevice = /(iPad|iPhone|iPod)/gi.test(ua);

        var observedElement = iOSDevice ? $(document) : this.body;
        var observedEvent = iOSDevice ? 'touchstart' : 'click.outside';

        var openedItems = $('.select-menu--open', selectBoxCont);
        var isOpen = openedItems.length > 0;

        if (isOpen) {
          observedElement.on(observedEvent, function (e) {
            var target = $(e.target);

            if (target.closest(selectBoxCont).length === 0) {
              openedItems.removeClass('select-menu--open');
              _this3.outsideSelectBoxClick(selectBoxCont);
            }
          });
        } else {
          observedElement.off(observedEvent);
        }
      }
    }, {
      key: 'getStorageMenu',
      value: function getStorageMenu() {
        if (this.useStorage && store.enabled && store.get('RTBF.Menu.version.' + this.ssl + '.' + this.site) === this.version) {
          try {
            var menu = store.get('RTBF.Menu.json.' + this.ssl + '.' + this.site);

            this.menuJson = JSON.parse(menu);
            return true;
          } catch (e) {}
        }

        return false;
      }
    }, {
      key: 'setStorageMenu',
      value: function setStorageMenu(json) {
        if (this.useStorage && store.enabled) {
          try {
            var jsonString = JSON.stringify(json);

            store.set('RTBF.Menu.version.' + this.ssl + '.' + this.site, this.version);
            store.set('RTBF.Menu.json.' + this.ssl + '.' + this.site, jsonString);
            return true;
          } catch (e) {}
        }

        return false;
      }
    }, {
      key: 'getMenu',

      // returns a promise
      value: function getMenu() {
        var _this4 = this;

        if (this.menuReady) {
          return $.Deferred().resolve('menu is ready').promise();
        } else if (this.isProcessing) {
          return $.Deferred().reject('isProcessing').promise();
        }

        this.isProcessing = true;
        if (this.menuJson != null || this.getStorageMenu()) {
          this.menu.empty();
          this.buildMenu(this.menu, this.menuJson.item);
          this.showCurrentMenu();
          this.menuReady = true;
          this.isProcessing = false;
          return $.Deferred().resolve('menu is ready from local data').promise();
        }

        return $.getJSON('https://www.rtbf.be/news/api/menu', { site: this.site, version: this.version }).done(function (data) {
          if (data.item) {
            _this4.menuJson = data;
            _this4.setStorageMenu(_this4.menuJson);
            _this4.menu.empty();
            _this4.buildMenu(_this4.menu, data.item);
            _this4.showCurrentMenu();
            _this4.menuReady = true;
            _this4.isProcessing = false;
          }
        }).fail(function (jqXHR, textStatus, errorThrown) {
          _this4.menuToggle.addClass('hidden');
        });
      }
    }, {
      key: 'buildMenu',

      // @todo: handlebars?
      value: function buildMenu(parent) {
        var _this5 = this;

        var items = arguments[1] === undefined ? [] : arguments[1];

        var level = parent.data('level');

        items.forEach(function (item, i, items) {
          var attr = item['@attributes'];

          if (attr.name) {
            var hidden = attr.hidden ? 'hidden' : '';
            var homeopen = attr.homeopen ? 'homeopen' : '';
            var hiddenDesktop = attr.hiddendesktop && !attr.hidden ? 'visible-xs-block visible-sm-block' : '';
            var desktopChildren = attr.desktopchildren ? 'js-desktop-children' : '';
            var overridesubmenukey = attr.overridesubmenukey ? 'js-override-sub-menu-key' : '';
            var catMain = attr.l2label ? 'rtbf-site-subnav__cat-main' : '';
            var arrow = attr.hasarrow ? '<i class="ico ico-caret-right hidden-xs hidden-sm"></i>' : '';
            var linkClass = attr.linkclass ? attr.linkclass : '';
            var extraClass = attr.extraclass ? attr.extraclass : '';
            var _name = attr.name;
            var url = !attr.url ? '#' : attr.url;
            var expandmenu = attr.expandmenu ? 'js-expandmenu' : '';
            var searchtoggle = '';
            var iconMarginRight = '';
            var showinselectbox = attr.showinselectbox ? 'js-show-in-selectbox' : '';

            if (level === 2) {
              _name = attr.l2label ? '<span class="visible-xs-block visible-sm-block">' + attr.name + '</span> <span class="hidden-xs hidden-sm">' + attr.l2label + '</span>' : attr.name;
            } else {
              switch (attr.id) {
                case 'home':
                  iconMarginRight = attr.showhomename ? 'rtbf-site-nav__icon--margin-right' : '';
                  _name = '<span class="hidden-xs hidden-sm ' + iconMarginRight + '"><i class="ico ico-home"></i></span> ';
                  _name += attr.showhomename ? attr.name : '<span class="visible-xs-block visible-sm-block">' + attr.name + '</span>';
                  break;
                case 'flux':
                  iconMarginRight = attr.showhomename ? 'rtbf-site-nav__icon--margin-right' : '';
                  _name = '<span class="hidden-xs hidden-sm ' + iconMarginRight + '"><i class="ico ico-align-left"></i></span> ';
                  _name += attr.showhomename ? attr.name : '<span class="visible-xs-block visible-sm-block">' + attr.name + '</span>';
                  break;
                case 'live':
                  // score
                  iconMarginRight = attr.showhomename ? 'rtbf-site-nav__icon--margin-right' : '';
                  _name = '<span class="hidden-xs hidden-sm ' + iconMarginRight + '"><i class="ico ico-trophy"></i></span> ';
                  _name += attr.showhomename ? attr.name : '<span class="visible-xs-block visible-sm-block">' + attr.name + '</span>';
                  break;
                case 'alertus':
                  // Alertez-nous
                  _name = '<span class="rtbf-site-nav__icon--margin-right">' + attr.name + '</span> ';
                  _name += '<span class="hidden-xs hidden-sm"><i class="ico ico-bell"></i></span> ';
                  break;

                case 'search':
                  searchtoggle = 'js-searchtoggle';
                  _name = '<i class="ico ico-search"></i> <span class="sr-only">Rechercher</span>';
                  break;
              }
            }

            var li = $('<li class="' + attr.id + ' ' + hidden + ' ' + homeopen + ' ' + hiddenDesktop + ' ' + desktopChildren + ' ' + extraClass + ' ' + overridesubmenukey + ' ' + expandmenu + ' ' + searchtoggle + ' ' + showinselectbox + '" data-id="' + attr.id + '"><a href="' + url + '" class="' + catMain + ' ' + linkClass + '">' + _name + '' + arrow + '<i class="ico ico-angle-down rtbf-site-nav__submenu-icon js-angle"></i></a></li>');

            if (item.item) {
              // single subnodes are not wrapped in an array
              var elts = Array.isArray(item.item) ? item.item : [item.item];

              if (!attr.desktopchildren) li.addClass('has-children'); // avoid caret in mobile menu (ex. belgique)
              var ul = $('<ul class="rtbf-site-subnav rtbf-site-subnav--level-' + (level + 1) + ' list-unstyled js-submenu-list js-level' + (level + 1) + '" data-level="' + (level + 1) + '"></ul>');

              ul.appendTo(li);
              _this5.buildMenu(ul, elts);
            }

            li.appendTo(parent);

            // add a hidden 'plus' node
            if (i + 1 === items.length) {
              $('<li class="rtbf-site-nav-more js-menu-more">\n              <a class="js-menu-more-toggle" href="#">Plus <i class="ico ico-caret-down"></i></a><ul class="list-unstyled rtbf-site-nav__list"></ul>\n              </li>').appendTo(parent);
            }
          }
        });
      }
    }, {
      key: 'showCurrentMenu',
      value: function showCurrentMenu() {
        var current = undefined;

        if (this.menuKey) {
          current = this.menu.find('.' + this.menuKey);
        }

        if (!current) {
          // don't open menu
          return false;
        }

        var closestUl = current.closest('ul');
        var isLevel2 = closestUl.hasClass('js-level2');

        this.menu.find('a.current').removeClass('current');

        // if level 2 && has children, take the first child as current / menukey
        if (isLevel2) {
          this.contentMain.addClass('content-main--has-subnav');
          var firstChild = current.children('ul:first').find('li:first');

          current = firstChild.length ? firstChild : current;
          this.menuKey = firstChild.length ? firstChild.data('id') : this.menuKey;
        }

        // redefine current if overridesubmenukey is present on parents
        var newCurrent = current.parents('li.js-override-sub-menu-key:first');

        if (newCurrent.length) current = newCurrent;

        current.find('a:first').addClass('current');

        // if only one child, add current on first child's a also
        var singleChild = current.find('ul>li:not(.js-menu-more)');

        if (singleChild.length === 1) {
          singleChild.find('a').addClass('current');
        }

        if (current.hasClass('js-desktop-children')) {
          this.contentMain.addClass('content-main--has-subnav');
          current.addClass('active--md');
        }

        // develop tree
        if (this.menuKey === 'home') {
          this.menu.find('.homeopen a:first').addClass('active--xs');
        } else {
          current.parentsUntil(this.container, 'li').each(function (i, e) {
            var li = $(e);

            // special case for media category with different behavior than channel
            if (li.hasClass('js-expandmenu')) {
              li.addClass('item-highlight').find('a:first').addClass('active--xs');
            } else {
              li.addClass('active--md').find('a:first').addClass('active--xs');
            }

            if (li.hasClass('hidden')) {
              li.removeClass('hidden').addClass('hidden-xs hidden-sm');
            }
          });
        }

        // desktop version of level2
        if (closestUl.hasClass('js-level2')) {
          this.container.addClass('rtbf-site-nav__level2');
        } else {
          this.container.removeClass('rtbf-site-nav__level2');
        }

        // desktop version of level 3
        // @todo: messy, clone it instead? tpls?
        if (closestUl.hasClass('js-level3')) {
          this.contentMain.addClass('content-main--has-subnav');
          var selectboxLevel3 = current.closest('li.active--md').addClass('js-selectbox');
          var siblings = selectboxLevel3.siblings().clone();
          var secondary = $('<ul class="rtbf-site-subnav--secondary list-unstyled hidden-xs hidden-sm">');

          // manage showinselectbox
          // displays a menu in selectbox despite the 'hidden' attribute on l2 node
          $.each(siblings, function (i, elt) {
            var item = $(elt);

            if (item.hasClass('js-show-in-selectbox')) {
              item.removeClass('hidden');
            }
          });

          selectboxLevel3.find('a:first').addClass('js-selectbox');
          this.container.addClass('rtbf-site-nav__level3');
          selectboxLevel3.addClass('rtbf-site-subnav__select-menu');
          siblings.appendTo(secondary);
          secondary.appendTo(selectboxLevel3);
        } else {
          this.container.removeClass('rtbf-site-nav__level3');
          this.menu.find('li.rtbf-site-subnav__select-menu').removeClass('rtbf-site-subnav__select-menu');
          this.menu.find('rtbf-site-subnav--secondary list-unstyled').remove();
          this.menu.find('a.js-selectbox').removeClass('js-selectbox');
        }
      }
    }, {
      key: 'closeMenu',

      // close mobile version of menu
      value: function closeMenu() {
        this.menuButtons.removeClass('active');
        this.menu.removeClass('visible--xs');
        this.showCurrentMenu();
      }
    }, {
      key: 'resize',

      // each parent ul of the current node is resized,
      // elts not fitting go to the plus node
      value: function resize() {
        var current = this.menu.find('a.current');

        if (!current.length) current = this.container.find('li:visible a:first');
        var uls = current.parentsUntil(this.container, 'ul');
        var menuWidth = this.menu.width();
        var siteLogo = this.container.parent().find('.js-site-logo');
        var alertUs = this.menu.find('.alertus');
        var maradio = this.menu.find('.maradio');

        uls.each(function (i, e) {
          var ul = $(e);
          var items = ul.children('li:not(.js-menu-more):not(.js-search-box):not(.alertus)');
          var more = ul.children('.js-menu-more:first');
          var moreList = more.find('ul');
          var lastVisibleIndex = false;
          var lastItem = items.last();
          var availableWidth = menuWidth;

          if (ul.hasClass('js-level1')) {
            if (siteLogo.length) availableWidth -= siteLogo.outerWidth();
            if (alertUs.length) availableWidth -= alertUs.outerWidth();
            if (maradio.length) availableWidth -= maradio.outerWidth();
          }

          if (ul.hasClass('js-level3')) {
            availableWidth = ul.outerWidth();
            var selectbox = ul.parent().find('.js-selectbox');

            if (selectbox.length) availableWidth -= selectbox.outerWidth();
          }

          moreList.empty();
          items.find('> a').removeClass('is-hidden'); // show before getting last offset
          var firstOffset = items.first().offset();
          var lastOffset = lastItem.offset();
          var contentWidth = lastOffset.left + lastItem.outerWidth() - firstOffset.left;

          if (contentWidth > availableWidth) {
            more.addClass('is-visible');
            items.each(function (i, el) {
              var li = $(el);
              var offset = li.offset();
              var projectedWidth = offset.left - firstOffset.left + (li.outerWidth() + more.outerWidth());

              if (projectedWidth > availableWidth) {
                lastVisibleIndex = i;
                return false;
              }
            });

            if (lastVisibleIndex > 0) {
              var selectedItems = items.slice(lastVisibleIndex);

              // Clone
              var clones = selectedItems.clone();

              clones.find('.js-submenu-list').remove();
              var containsCurrentPage = clones.find('.current').length > 0;

              more.toggleClass('has-current', containsCurrentPage);
              clones.appendTo(moreList);

              // Hide
              selectedItems.find('> a').addClass('is-hidden');
            }
          } else {
            more.removeClass('is-visible');
          }
        });
      }
    }]);

    return Menu;
  })();

  RTBF.Menu = Menu;

  // eslint-disable-next-line no-new
  new RTBF.Menu({ site: $('body').data('site') });
})(jQuery, window, document, RTBF, store);
// no menu under search on mobile
;
// File: /js/news/common/public/static/js/module/search/google/form.js
$(function () {
  $('body').on('submit', '.js-google-form', function () {
    var $this = $(this);
    var $input = $this.find('.js-google-form-input');

    if ($input.val().trim() !== '') return true;

    $input.focus();
    return false;
  });
});
;
// File: /js/news/common/public/static/js/RTBF/liveheadband.js
/* globals $ */
$(function () {
  var $liveband = $('.js-live-headband');

  if ($liveband) {
    (function () {
      var livecount = $liveband.data('livecount');

      $liveband.on('click', '.js-more', function (evt) {
        if (livecount > 1) {
          evt.preventDefault();

          // Multiple live feeds we open/close
          $liveband.toggleClass('is-open');
          $(evt.currentTarget).toggleClass('active');
        }
      });
    })();
  }
});
;
// File: /js/news/common/public/static/js/module/menu/breaking.js
(function () {
    'use strict';

    $('.js-breaking').each(function () {
        var $this = $(this);
        var $backToTop = $('.js-scroll-to-top');

        var site = $('body').data('site');
        var cookie = site + '_' + 'breaking';

        var current = parseInt($this.data('id'));
        var last = parseInt($.cookie(cookie)) || 0;

        if (!current || current > last) {
            $this.removeClass('hidden');

            // We hide the back to top button while the breaking is visible...
            if ($('.js-breaking:visible').length) {
                $backToTop.css('display', 'none');
            }

            $this.on('click', '.js-breaking-close', function (evt) {
                $this.addClass('hidden');
                $.cookie(cookie, current, {path:'/'});
                // Should we show the back to top ?
                if ($('.js-breaking:visible').length===0) {
                    $backToTop.css('display', '');
                }
            });
        }
    });
})();
;
// File: /js/news/common/public/static/js/RTBF/quickmenu.js
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

// eslint-disable-next-line no-use-before-define
var RTBF = RTBF || {};

(function ($, window, document, RTBF) {
  /* globals jQuery, store */

  var QuickMenu = (function () {
    function QuickMenu(settings) {
      _classCallCheck(this, QuickMenu);

      this.site = settings.site || '';
      this.container = $('.js-quickmenu');

      this.mainMenu = this.container.find('.js-quickmenu-main');
      this.secondMenu = this.container.find('.js-quickmenu-secondary');
      this.menus = this.container.find('.js-quickmenu-main, .js-quickmenu-secondary');
      this.menuToggle = $('.js-quickmenu-toggle');
      this.menuKey = this.container.data('menukey') || '';
      this.version = this.container.data('version') || '1.0';
      this.menuJson = null;
      this.mainMenuJson = null;
      this.secondMenuJson = null;
      this.menuReady = false;
      this.isProcessing = false;
      this.useStorage = true;

      this.bind();
    }

    _createClass(QuickMenu, [{
      key: 'bind',
      value: function bind() {
        var self = this;

        this.menuToggle.on('click', function (e) {
          e.preventDefault();
          var relativeTop = self.container.offset().top - $('html, body').scrollTop();

          $('body').trigger('closemenu');

          self.getMenu().then(function () {
            self.container.toggleClass('active');

            // reposition quickmenu due to menu close
            $('html, body').scrollTop(self.container.offset().top - relativeTop);
          });
        });

        this.menus.on('click', 'a', function (e) {
          var link = $(e.currentTarget);
          var angle = $(e.target);

          if (angle.hasClass('js-angle')) {
            e.preventDefault();
            link.parent().toggleClass('active');
          }
        });

        $('body').on('closequickmenu', function (e) {
          self.closeMenu();
        });
      }
    }, {
      key: 'getStorageMenu',
      value: function getStorageMenu() {
        if (this.useStorage && store.enabled && store.get('RTBF.Menu.version.' + this.site) === this.version) {
          try {
            var menu = store.get('RTBF.Menu.json.' + this.site);

            this.menuJson = JSON.parse(menu);
            return true;
          } catch (e) {}
        }

        return false;
      }
    }, {
      key: 'setStorageMenu',
      value: function setStorageMenu(json) {
        if (this.useStorage && store.enabled) {
          try {
            var jsonString = JSON.stringify(json);

            store.set('RTBF.Menu.version.' + this.site, this.version);
            store.set('RTBF.Menu.json.' + this.site, jsonString);
            return true;
          } catch (e) {}
        }

        return false;
      }
    }, {
      key: 'getMenu',

      // returns a promise
      value: function getMenu() {
        var _this = this;

        if (this.menuReady) {
          return $.Deferred().resolve('menu is ready').promise();
        } else if (this.isProcessing) {
          return $.Deferred().reject('isProcessing').promise();
        }

        this.isProcessing = true;
        if (this.getStorageMenu() || this.menuJson !== null) {
          this.initBuildMenu(this.menuJson);
          return $.Deferred().resolve('menu is ready from local data').promise();
        }
        return $.get('https://www.rtbf.be/news/api/menu?site=' + this.site, function (data) {
          _this.menuJson = data;
          _this.setStorageMenu(_this.menuJson);
          _this.initBuildMenu(_this.menuJson);
        }, 'json');
      }
    }, {
      key: 'initBuildMenu',

      // launches menuKey finding && menus builds
      value: function initBuildMenu(data) {
        this.menus.empty();
        this.findMenuNodes(data, this.menuKey, null, null);
        var elts;
        if (this.mainMenuJson && this.mainMenuJson.item) {
          elts = Array.isArray(this.mainMenuJson.item) ? this.mainMenuJson.item : [this.mainMenuJson.item];

          this.mainMenu.data('attr', this.mainMenuJson['@attributes']);
          this.buildMainMenu(this.mainMenu, elts);
        }

        if (this.secondMenuJson && this.secondMenuJson.item) {
          elts = Array.isArray(this.secondMenuJson.item) ? this.secondMenuJson.item : [this.secondMenuJson.item];

          this.secondMenu.data('attr', this.secondMenuJson['@attributes']);
          this.buildSecondMenu(this.secondMenu, elts);
        }
        this.menuReady = true;
        this.isProcessing = false;
      }
    }, {
      key: 'findMenuNodes',

      // finds menuKey in json
      // then sets its parent and grandparent as main and second menu
      /**
       * @param nodeId string
       */
      value: function findMenuNodes(data, nodeId, parent, grandParent) {
        var _this2 = this;

        if (!Array.isArray(data)) data = [data];

        data.forEach(function (item, i, items) {
          if (item['@attributes'].id === nodeId) {
            _this2.mainMenuJson = parent;
            _this2.secondMenuJson = grandParent['@attributes'].id ? grandParent : null;
            return false;
          } else if (item.item) {
            _this2.findMenuNodes(item.item, nodeId, item, parent);
          }
        });
      }
    }, {
      key: 'buildMainMenu',
      value: function buildMainMenu(parent) {
        var _this3 = this;

        var items = arguments[1] === undefined ? [] : arguments[1];

        items.forEach(function (item, i, items) {
          var attr = item['@attributes'];
          var hidden = attr.hidden ? 'hidden' : '';
          var current = attr.id === _this3.menuKey ? 'current' : '';
          var li = $('<li id="' + attr.id + '" class="' + hidden + '"><a href="' + attr.url + '" class="' + current + '">' + attr.name + '<i class="ico ico-angle-down rtbf-site-nav__submenu-icon js-angle"></i></a></li>');

          if (item.item) {
            // single subnodes are not wrapped in an array
            var elts = Array.isArray(item.item) ? item.item : [item.item];

            li.addClass('has-children');
            var ul = $('<ul class="list-unstyled rtbf-site-subnav"></ul>');

            ul.appendTo(li);
            _this3.buildMainMenu(ul, elts);
          }
          if (attr.extraclass && attr.extraclass.indexOf('js-collapse-expand') > -1) {} else {
            li.appendTo(parent);
          }
        });
      }
    }, {
      key: 'buildSecondMenu',
      value: function buildSecondMenu(parent) {
        var _this4 = this;

        var items = arguments[1] === undefined ? [] : arguments[1];

        if (parent.data('attr')) {
          var attr = parent.data('attr');
          var firstLi = $('<li class="full-width hidden-md hidden-lg"><a href="' + attr.url + '"><strong>Plus de ' + attr.name + ' <i class="ico ico-angle-right"></i></strong></a></li>');

          firstLi.appendTo(parent);
        }

        items.forEach(function (item, i, items) {
          var attr = item['@attributes'];

          if (attr.quickmenurepeat || _this4.mainMenu.data('attr').id !== item['@attributes'].id) {
            var hidden = attr.hidden ? 'hidden' : '';
            var current = attr.id === _this4.menuKey ? 'current' : '';
            var li = $('<li id="' + attr.id + '" class="' + hidden + '"><a href="' + attr.url + '" class="' + current + '">' + attr.name + '<i class="ico ico-angle-down rtbf-site-nav__submenu-icon js-angle"></i></a></li>');

            li.appendTo(parent);
          }
        });
      }
    }, {
      key: 'closeMenu',

      // close quickmenu
      value: function closeMenu() {
        this.container.removeClass('active');
      }
    }]);

    return QuickMenu;
  })();

  RTBF.QuickMenu = QuickMenu;

  // eslint-disable-next-line no-new
  new RTBF.QuickMenu({ site: $('body').data('site') });
})(jQuery, window, document, RTBF);

// Skip artificial links meant for improving accessibility
// on main menu (e.g. "Fermer le menu abc")
// no submenus for second menu
;
// File: /js/news/common/public/static/js/jquery_non_writable.js
/**
 * Make window.$ as non-writable to forbid ads to overwrite it.
 *
 * This script is used in
 * - /news/common/module/init/head.php
 * - /rtbf/www/module/cimmon/library/banner/init.php
 *
 * This script should be remove once a long term solution has been found
 * to isolate javascript and css files of ads.
 *
 * 18/09/2017
 */

/* global jQuery */
jQuery(function ($) {
  'use strict';

  Object.defineProperty(window, '$', {
    value: $,
    writable: false,
    enumerable: true,
    configurable: false,
  });
});

;
// File: /js/news/common/public/static/js/vendor/adobe/dil_v8.0.js
!function(e){var t={};function r(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(n,s,function(t){return e[t]}.bind(null,s));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);var n=function(e,t,r){var n="",s=t||"Error caught in DIL module/submodule: ";return e===Object(e)?n=s+(e.message||"err has no message"):(n=s+"err is not a valid object",e={}),e.message=n,r instanceof DIL&&(e.partner=r.api.getPartner()),DIL.errorModule.handleError(e),this.errorMessage=n,n},s={submitUniversalAnalytics:function(e,t,r){try{var n,s,i,a,o=e.getAll()[0],d=o[r||"b"].data.keys,u={};for(n=0,s=d.length;n<s;n++)i=d[n],void 0===(a=o.get(i))||"function"==typeof a||a===Object(a)||/^_/.test(i)||/^&/.test(i)||(u[i]=a);return t.api.signals(u,"c_").submit(),u}catch(e){return"Caught error with message: "+e.message}},dil:null,arr:null,tv:null,errorMessage:"",defaultTrackVars:["_setAccount","_setCustomVar","_addItem","_addTrans","_trackSocial"],defaultTrackVarsObj:null,signals:{},hasSignals:!1,handle:n,init:function(e,t,r){try{this.dil=null,this.arr=null,this.tv=null,this.errorMessage="",this.signals={},this.hasSignals=!1;var n={name:"DIL GA Module Error"},s="";t instanceof DIL?(this.dil=t,n.partner=this.dil.api.getPartner()):(s="dilInstance is not a valid instance of DIL",n.message=s,DIL.errorModule.handleError(n)),e instanceof Array&&e.length?this.arr=e:(s="gaArray is not an array or is empty",n.message=s,DIL.errorModule.handleError(n)),this.tv=this.constructTrackVars(r),this.errorMessage=s}catch(e){this.handle(e,"DIL.modules.GA.init() caught error with message ",this.dil)}finally{return this}},constructTrackVars:function(e){var t,r,n,s,i,a,o=[];if(this.defaultTrackVarsObj!==Object(this.defaultTrackVarsObj)){for(a={},r=0,n=(i=this.defaultTrackVars).length;r<n;r++)a[i[r]]=!0;this.defaultTrackVarsObj=a}else a=this.defaultTrackVarsObj;if(e===Object(e)){if((t=e.names)instanceof Array&&(n=t.length))for(r=0;r<n;r++)"string"==typeof(s=t[r])&&s.length&&s in a&&o.push(s);if(o.length)return o}return this.defaultTrackVars},constructGAObj:function(e){var t,r,n,s,i={},a=e instanceof Array?e:this.arr,o=function(e,t){return e instanceof Array&&t instanceof Array&&(Array.prototype.push.apply(e,t),!0)};for(t=0,r=a.length;t<r;t++)(n=a[t])instanceof Array&&n.length&&(o(n=[],a[t]),"string"==typeof(s=n.shift())&&s.length&&(i[s]instanceof Array||(i[s]=[]),i[s].push(n)));return i},addToSignals:function(e,t){return"string"==typeof e&&""!==e&&null!=t&&""!==t&&(this.signals[e]instanceof Array||(this.signals[e]=[]),this.signals[e].push(t),this.hasSignals=!0,!0)},constructSignals:function(){var e,t,r,n,s,i,a=this.constructGAObj(),o={_setAccount:function(e){this.addToSignals("c_accountId",e)},_setCustomVar:function(e,t,r){"string"==typeof t&&t.length&&this.addToSignals("c_"+t,r)},_addItem:function(e,t,r,n,s,i){this.addToSignals("c_itemOrderId",e),this.addToSignals("c_itemSku",t),this.addToSignals("c_itemName",r),this.addToSignals("c_itemCategory",n),this.addToSignals("c_itemPrice",s),this.addToSignals("c_itemQuantity",i)},_addTrans:function(e,t,r,n,s,i,a,o){this.addToSignals("c_transOrderId",e),this.addToSignals("c_transAffiliation",t),this.addToSignals("c_transTotal",r),this.addToSignals("c_transTax",n),this.addToSignals("c_transShipping",s),this.addToSignals("c_transCity",i),this.addToSignals("c_transState",a),this.addToSignals("c_transCountry",o)},_trackSocial:function(e,t,r,n){this.addToSignals("c_socialNetwork",e),this.addToSignals("c_socialAction",t),this.addToSignals("c_socialTarget",r),this.addToSignals("c_socialPagePath",n)}},d=this.tv;for(e=0,t=d.length;e<t;e++)if(r=d[e],a.hasOwnProperty(r)&&o.hasOwnProperty(r)&&(i=a[r])instanceof Array)for(n=0,s=i.length;n<s;n++)o[r].apply(this,i[n])},submit:function(){try{return""!==this.errorMessage?this.errorMessage:(this.constructSignals(),this.hasSignals?(this.dil.api.signals(this.signals).submit(),"Signals sent: "+this.dil.helpers.convertObjectToKeyValuePairs(this.signals,"=",!0)+this.dil.log):"No signals present")}catch(e){return this.handle(e,"DIL.modules.GA.submit() caught error with message ",this.dil)}},Stuffer:{LIMIT:5,dil:null,cookieName:null,delimiter:null,errorMessage:"",handle:n,callback:null,v:function(){return!1},init:function(e,t,r){try{this.dil=null,this.callback=null,this.errorMessage="",e instanceof DIL?(this.dil=e,this.v=this.dil.validators.isPopulatedString,this.cookieName=this.v(t)?t:"aam_ga",this.delimiter=this.v(r)?r:"|"):this.handle({message:"dilInstance is not a valid instance of DIL"},"DIL.modules.GA.Stuffer.init() error: ")}catch(e){this.handle(e,"DIL.modules.GA.Stuffer.init() caught error with message ",this.dil)}finally{return this}},process:function(e){var t,r,n,s,i,a,o,d,u,c,l,f=!1,h=1;if(e===Object(e)&&(t=e.stuff)&&t instanceof Array&&(r=t.length))for(n=0;n<r;n++)if((s=t[n])&&s===Object(s)&&(i=s.cn,a=s.cv,i===this.cookieName&&this.v(a))){f=!0;break}if(f){for(o=a.split(this.delimiter),void 0===window._gaq&&(window._gaq=[]),d=window._gaq,n=0,r=o.length;n<r&&(c=(u=o[n].split("="))[0],l=u[1],this.v(c)&&this.v(l)&&d.push(["_setCustomVar",h++,c,l,1]),!(h>this.LIMIT));n++);this.errorMessage=h>1?"No errors - stuffing successful":"No valid values to stuff"}else this.errorMessage="Cookie name and value not found in json";if("function"==typeof this.callback)return this.callback()},submit:function(){try{var e=this;return""!==this.errorMessage?this.errorMessage:(this.dil.api.afterResult(function(t){e.process(t)}).submit(),"DIL.modules.GA.Stuffer.submit() successful")}catch(e){return this.handle(e,"DIL.modules.GA.Stuffer.submit() caught error with message ",this.dil)}}}},i={dil:null,handle:n,init:function(e,t,r,n){try{var s=this,i={name:"DIL Site Catalyst Module Error"},a=function(e){return i.message=e,DIL.errorModule.handleError(i),e};if(this.options=n===Object(n)?n:{},this.dil=null,!(t instanceof DIL))return a("dilInstance is not a valid instance of DIL");if(this.dil=t,i.partner=t.api.getPartner(),e!==Object(e))return a("siteCatalystReportingSuite is not an object");var o=e;return window.AppMeasurement_Module_DIL=o.m_DIL=function(e){var t="function"==typeof e.m_i?e.m_i("DIL"):this;if(t!==Object(t))return a("m is not an object");t.trackVars=s.constructTrackVars(r),t.d=0,t.s=e,t._t=function(){var e,t,r,n,i,o,d=this,u=","+d.trackVars+",",c=d.s,l=[],f=[],h={},p=!1;if(c!==Object(c))return a("Error in m._t function: s is not an object");if(d.d){if("function"==typeof c.foreachVar)c.foreachVar(function(e,t){void 0!==t&&(h[e]=t,p=!0)},d.trackVars);else{if(!(c.va_t instanceof Array))return a("Error in m._t function: s.va_t is not an array");if(c.lightProfileID?(e=c.lightTrackVars)&&(e=","+e+","+c.vl_mr+","):(c.pe||c.linkType)&&(e=c.linkTrackVars,c.pe&&c[t=c.pe.substring(0,1).toUpperCase()+c.pe.substring(1)]&&(e=c[t].trackVars),e&&(e=","+e+","+c.vl_l+","+c.vl_l2+",")),e){for(o=0,l=e.split(",");o<l.length;o++)u.indexOf(","+l[o]+",")>=0&&f.push(l[o]);f.length&&(u=","+f.join(",")+",")}for(n=0,i=c.va_t.length;n<i;n++)r=c.va_t[n],u.indexOf(","+r+",")>=0&&void 0!==c[r]&&null!==c[r]&&""!==c[r]&&(h[r]=c[r],p=!0)}s.includeContextData(c,h).store_populated&&(p=!0),p&&d.d.api.signals(h,"c_").submit()}}},o.loadModule("DIL"),o.DIL.d=t,i.message?i.message:"DIL.modules.siteCatalyst.init() completed with no errors"}catch(e){return this.handle(e,"DIL.modules.siteCatalyst.init() caught error with message ",this.dil)}},constructTrackVars:function(e){var t,r,n,s,i,a,o,d,u=[];if(e===Object(e)){if((t=e.names)instanceof Array&&(s=t.length))for(n=0;n<s;n++)"string"==typeof(i=t[n])&&i.length&&u.push(i);if((r=e.iteratedNames)instanceof Array&&(s=r.length))for(n=0;n<s;n++)if((a=r[n])===Object(a)&&(i=a.name,d=parseInt(a.maxIndex,10),"string"==typeof i&&i.length&&!isNaN(d)&&d>=0))for(o=0;o<=d;o++)u.push(i+o);if(u.length)return u.join(",")}return this.constructTrackVars({names:["pageName","channel","campaign","products","events","pe","pev1","pev2","pev3"],iteratedNames:[{name:"prop",maxIndex:75},{name:"eVar",maxIndex:250}]})},includeContextData:function(e,t){var r={},n=!1;if(e.contextData===Object(e.contextData)){var s,i,a,o,d,u=e.contextData,c=this.options.replaceContextDataPeriodsWith,l=this.options.filterFromContextVariables,f={};if("string"==typeof c&&c.length||(c="_"),l instanceof Array)for(s=0,i=l.length;s<i;s++)a=l[s],this.dil.validators.isPopulatedString(a)&&(f[a]=!0);for(o in u)u.hasOwnProperty(o)&&!f[o]&&((d=u[o])||"number"==typeof d)&&(t[o=("contextData."+o).replace(/\./g,c)]=d,n=!0)}return r.store_populated=n,r}};"function"!=typeof window.DIL&&(window.DIL=function(e){var t,r,n,s,i,a,o,d,u,c,l,f,h,p,g,m,y,I=[];e!==Object(e)&&(e={}),n=e.partner,s=e.containerNSID,i=e.mappings,a=e.uuidCookie,o=!0===e.enableErrorReporting,d=e.visitorService,u=e.declaredId,c=!0===e.delayAllUntilWindowLoad,l=void 0===e.secureDataCollection||!0===e.secureDataCollection,f="boolean"==typeof e.isCoopSafe?e.isCoopSafe:null,h=!0===e.disableDefaultRequest,p=e.afterResultForDefaultRequest,g=e.visitorConstructor,m=!0===e.disableCORS,y=!0===e.ignoreHardDependencyOnVisitorAPI,o&&DIL.errorModule.activate(),y&&I.push("Warning: this instance is configured to ignore the hard dependency on the VisitorAPI service. This means that no URL destinations will be fired if the instance has no connection to VisitorAPI. If the VisitorAPI service is not instantiated, ID syncs will not be fired either.");var v=!0===window._dil_unit_tests;if((t=arguments[1])&&I.push(t+""),!n||"string"!=typeof n){var b={name:"error",message:t="DIL partner is invalid or not specified in initConfig",filename:"dil.js"};return DIL.errorModule.handleError(b),new Error(t)}if(t="DIL containerNSID is invalid or not specified in initConfig, setting to default of 0",(s||"number"==typeof s)&&(s=parseInt(s,10),!isNaN(s)&&s>=0&&(t="")),t&&(s=0,I.push(t),t=""),(r=DIL.getDil(n,s))instanceof DIL&&r.api.getPartner()===n&&r.api.getContainerNSID()===s)return r;if(!(this instanceof DIL))return new DIL(e,"DIL was not instantiated with the 'new' operator, returning a valid instance with partner = "+n+" and containerNSID = "+s);DIL.registerDil(this,n,s);var _={IS_HTTPS:l||"https:"===document.location.protocol,SIX_MONTHS_IN_MINUTES:259200,IE_VERSION:function(){if(document.documentMode)return document.documentMode;for(var e=7;e>4;e--){var t=document.createElement("div");if(t.innerHTML="\x3c!--[if IE "+e+"]><span></span><![endif]--\x3e",t.getElementsByTagName("span").length)return t=null,e}return null}()};_.IS_IE_LESS_THAN_10="number"==typeof _.IE_VERSION&&_.IE_VERSION<10;var D={stuffed:{}},S={},O={firingQueue:[],fired:[],firing:!1,sent:[],errored:[],reservedKeys:{sids:!0,pdata:!0,logdata:!0,callback:!0,postCallbackFn:!0,useImageRequest:!0},firstRequestHasFired:!1,abortRequests:!1,num_of_cors_responses:0,num_of_cors_errors:0,corsErrorSources:[],num_of_img_responses:0,num_of_img_errors:0,platformParams:{d_nsid:s+"",d_rtbd:"json",d_jsonv:DIL.jsonVersion+"",d_dst:"1"},nonModStatsParams:{d_rtbd:!0,d_dst:!0,d_cts:!0,d_rs:!0},modStatsParams:null,adms:{TIME_TO_CATCH_ALL_REQUESTS_RELEASE:3e4,calledBack:!1,mid:null,noVisitorAPI:null,VisitorAPI:null,instance:null,releaseType:"no VisitorAPI",isOptedOut:!0,isOptedOutCallbackCalled:!1,admsProcessingStarted:!1,process:function(e){try{if(this.admsProcessingStarted)return;this.admsProcessingStarted=!0;var t,r,n,i,a,o=this,u=d;if("function"==typeof e&&"function"==typeof e.getInstance){if(u!==Object(u)||!(t=u.namespace)||"string"!=typeof t)throw this.releaseType="no namespace",new Error("DIL.create() needs the initConfig property `visitorService`:{namespace:'<Experience Cloud Org ID>'}");if((r=e.getInstance(t,{idSyncContainerID:s}))===Object(r)&&r instanceof e&&"function"==typeof r.isAllowed&&"function"==typeof r.getMarketingCloudVisitorID&&"function"==typeof r.getCustomerIDs&&"function"==typeof r.isOptedOut&&"function"==typeof r.publishDestinations)return this.VisitorAPI=e,r.isAllowed()?(this.instance=r,n=function(e){"VisitorAPI"!==o.releaseType&&(o.mid=e,o.releaseType="VisitorAPI",o.releaseRequests())},"string"==typeof(i=r.getMarketingCloudVisitorID(n))&&i.length?void n(i):void setTimeout(function(){"VisitorAPI"!==o.releaseType&&(o.releaseType="timeout",o.releaseRequests())},this.getLoadTimeout())):(this.releaseType="VisitorAPI is not allowed to write cookies",void this.releaseRequests());throw this.releaseType="invalid instance",a="Invalid Visitor instance.",r===Object(r)&&"function"!=typeof r.publishDestinations&&(a+=" In particular, visitorInstance.publishDestinations is not a function. This is needed to fire URL destinations in DIL v8.0+ and should be present in Visitor v3.3+ ."),new Error(a)}throw this.noVisitorAPI=!0,new Error("Visitor does not exist.")}catch(e){if(!y)throw new Error("Error in processing Visitor API, which is a hard dependency for DIL v8.0+: "+e.message);this.releaseRequests()}},releaseRequests:function(){this.calledBack=!0,O.registerRequest()},getMarketingCloudVisitorID:function(){return this.instance?this.instance.getMarketingCloudVisitorID():null},getMIDQueryString:function(){var e=P.isPopulatedString,t=this.getMarketingCloudVisitorID();return e(this.mid)&&this.mid===t||(this.mid=t),e(this.mid)?"d_mid="+this.mid+"&":""},getCustomerIDs:function(){return this.instance?this.instance.getCustomerIDs():null},getCustomerIDsQueryString:function(e){if(e===Object(e)){var t,r,n,s,i="",a=[],o=[];for(t in e)e.hasOwnProperty(t)&&(o[0]=t,(r=e[t])===Object(r)&&(o[1]=r.id||"",o[2]=r.authState||0,a.push(o),o=[]));if(s=a.length)for(n=0;n<s;n++)i+="&d_cid_ic="+T.encodeAndBuildRequest(a[n],"%01");return i}return""},getIsOptedOut:function(){this.instance?this.instance.isOptedOut([this,this.isOptedOutCallback],this.VisitorAPI.OptOut.GLOBAL,!0):(this.isOptedOut=!1,this.isOptedOutCallbackCalled=!0)},isOptedOutCallback:function(e){this.isOptedOut=e,this.isOptedOutCallbackCalled=!0,O.registerRequest()},getLoadTimeout:function(){var e=this.instance;if(e){if("function"==typeof e.getLoadTimeout)return e.getLoadTimeout();if(void 0!==e.loadTimeout)return e.loadTimeout}return this.TIME_TO_CATCH_ALL_REQUESTS_RELEASE}},declaredId:{declaredId:{init:null,request:null},declaredIdCombos:{},setDeclaredId:function(e,t){var r=P.isPopulatedString,n=encodeURIComponent;if(e===Object(e)&&r(t)){var s=e.dpid,i=e.dpuuid,a=null;if(r(s)&&r(i))return a=n(s)+"$"+n(i),!0===this.declaredIdCombos[a]?"setDeclaredId: combo exists for type '"+t+"'":(this.declaredIdCombos[a]=!0,this.declaredId[t]={dpid:s,dpuuid:i},"setDeclaredId: succeeded for type '"+t+"'")}return"setDeclaredId: failed for type '"+t+"'"},getDeclaredIdQueryString:function(){var e=this.declaredId.request,t=this.declaredId.init,r=encodeURIComponent,n="";return null!==e?n="&d_dpid="+r(e.dpid)+"&d_dpuuid="+r(e.dpuuid):null!==t&&(n="&d_dpid="+r(t.dpid)+"&d_dpuuid="+r(t.dpuuid)),n}},registerRequest:function(e){var t,r=this.firingQueue;e===Object(e)&&r.push(e),this.firing||!r.length||c&&!DIL.windowLoaded||(this.adms.isOptedOutCallbackCalled||this.adms.getIsOptedOut(),this.adms.calledBack&&!this.adms.isOptedOut&&this.adms.isOptedOutCallbackCalled&&(this.adms.isOptedOutCallbackCalled=!1,(t=r.shift()).src=t.src.replace(/demdex.net\/event\?d_nsid=/,"demdex.net/event?"+this.adms.getMIDQueryString()+"d_nsid="),P.isPopulatedString(t.corsPostData)&&(t.corsPostData=t.corsPostData.replace(/^d_nsid=/,this.adms.getMIDQueryString()+"d_nsid=")),w.fireRequest(t),this.firstRequestHasFired||"script"!==t.tag&&"cors"!==t.tag||(this.firstRequestHasFired=!0)))},processVisitorAPI:function(){this.adms.process(g||window.Visitor)},getCoopQueryString:function(){var e="";return!0===f?e="&d_coop_safe=1":!1===f&&(e="&d_coop_unsafe=1"),e}},L={sendingMessages:!1,messages:[],messagesPosted:[],messagesReceived:[],jsonForComparison:[],jsonDuplicates:[],jsonWaiting:[],jsonProcessed:[],requestToProcess:function(e,t){var r,n=this;function s(){n.jsonForComparison.push(e),n.jsonWaiting.push([e,t])}if(e&&!P.isEmptyObject(e))if(r=JSON.stringify(e.dests||[]),this.jsonForComparison.length){var i,a,o,d=!1;for(i=0,a=this.jsonForComparison.length;i<a;i++)if(o=this.jsonForComparison[i],r===JSON.stringify(o.dests||[])){d=!0;break}d?this.jsonDuplicates.push(e):s()}else s();if(this.jsonWaiting.length){var u=this.jsonWaiting.shift();this.process(u[0],u[1]),this.requestToProcess()}this.messages.length&&!this.sendingMessages&&this.sendMessages()},process:function(e,t){var r,n,s,i,a,o=encodeURIComponent;if(t===Object(t)&&T.encodeAndBuildRequest(["",t.dpid||"",t.dpuuid||""],","),(r=e.dests)&&r instanceof Array&&(n=r.length))for(s=0;s<n;s++)i=r[s],a=[o("dests"),o(i.id||""),o(i.y||""),o(i.c||"")],this.addMessage(a.join("|"));this.jsonProcessed.push(e)},addMessage:function(e){this.messages.push(e)},sendMessages:function(){this.sendingMessages||(this.sendingMessages=!0,this.messages.length?(this.publishDestinations(this.messages),this.messages=[],this.sendingMessages=!1):this.sendingMessages=!1)},publishDestinations:function(e){var t=O.adms.instance;t&&"function"==typeof t.publishDestinations&&t.publishDestinations(n,e,function(e){I.push("visitor.publishDestinations() result: "+(e.error||e.message))}),Array.prototype.push.apply(this.messagesPosted,e)}},C={traits:function(e){return P.isValidPdata(e)&&(S.sids instanceof Array||(S.sids=[]),T.extendArray(S.sids,e)),this},pixels:function(e){return P.isValidPdata(e)&&(S.pdata instanceof Array||(S.pdata=[]),T.extendArray(S.pdata,e)),this},logs:function(e){return P.isValidLogdata(e)&&(S.logdata!==Object(S.logdata)&&(S.logdata={}),T.extendObject(S.logdata,e)),this},customQueryParams:function(e){return P.isEmptyObject(e)||T.extendObject(S,e,O.reservedKeys),this},signals:function(e,t){var r,n=e;if(!P.isEmptyObject(n)){if(t&&"string"==typeof t)for(r in n={},e)e.hasOwnProperty(r)&&(n[t+r]=e[r]);T.extendObject(S,n,O.reservedKeys)}return this},declaredId:function(e){return O.declaredId.setDeclaredId(e,"request"),this},result:function(e){return"function"==typeof e&&(S.callback=e),this},afterResult:function(e){return"function"==typeof e&&(S.postCallbackFn=e),this},useImageRequest:function(){return S.useImageRequest=!0,this},clearData:function(){return S={},this},submit:function(){return w.submitRequest(S),S={},this},getPartner:function(){return n},getContainerNSID:function(){return s},getEventLog:function(){return I},getState:function(){var t={},r={};return T.extendObject(t,O,{registerRequest:!0}),T.extendObject(r,L,{requestToProcess:!0,process:!0,sendMessages:!0}),{initConfig:e,pendingRequest:S,otherRequestInfo:t,destinationPublishingInfo:r,log:I}},idSync:function(){throw new Error("Please use the `idSyncByURL` method of the Experience Cloud ID Service (Visitor) instance")},aamIdSync:function(){throw new Error("Please use the `idSyncByDataSource` method of the Experience Cloud ID Service (Visitor) instance")},passData:function(e){return P.isEmptyObject(e)?"Error: json is empty or not an object":(w.defaultCallback(e),e)},getPlatformParams:function(){return O.platformParams},getEventCallConfigParams:function(){var e,t=O,r=t.modStatsParams,n=t.platformParams;if(!r){for(e in r={},n)n.hasOwnProperty(e)&&!t.nonModStatsParams[e]&&(r[e.replace(/^d_/,"")]=n[e]);!0===f?r.coop_safe=1:!1===f&&(r.coop_unsafe=1),t.modStatsParams=r}return r},setAsCoopSafe:function(){return f=!0,this},setAsCoopUnsafe:function(){return f=!1,this}},w={corsMetadata:function(){var e="none";return"undefined"!=typeof XMLHttpRequest&&XMLHttpRequest===Object(XMLHttpRequest)&&("withCredentials"in new XMLHttpRequest?e="XMLHttpRequest":new Function("/*@cc_on return /^10/.test(@_jscript_version) @*/")()&&(e="XMLHttpRequest")),{corsType:e}}(),getCORSInstance:function(){return"none"===this.corsMetadata.corsType?null:new window[this.corsMetadata.corsType]},submitRequest:function(e){return O.registerRequest(w.createQueuedRequest(e)),!0},createQueuedRequest:function(e){var t,r,n,s,a,o=e.callback,d="img";if(!P.isEmptyObject(i))for(n in i)if(i.hasOwnProperty(n)){if(null==(s=i[n])||""===s)continue;if(n in e&&!(s in e)&&!(s in O.reservedKeys)){if(null==(a=e[n])||""===a)continue;e[s]=a}}return P.isValidPdata(e.sids)||(e.sids=[]),P.isValidPdata(e.pdata)||(e.pdata=[]),P.isValidLogdata(e.logdata)||(e.logdata={}),e.logdataArray=T.convertObjectToKeyValuePairs(e.logdata,"=",!0),e.logdataArray.push("_ts="+(new Date).getTime()),"function"!=typeof o&&(o=this.defaultCallback),t=this.makeRequestSrcData(e),(r=this.getCORSInstance())&&!0!==e.useImageRequest&&(d="cors"),{tag:d,src:t.src,corsSrc:t.corsSrc,callbackFn:o,postCallbackFn:e.postCallbackFn,useImageRequest:!!e.useImageRequest,requestData:e,corsInstance:r,corsPostData:t.corsPostData}},defaultCallback:function(e,t){var r,n,s,i,o,d,u,c,l;if((r=e.stuff)&&r instanceof Array&&(n=r.length))for(s=0;s<n;s++)(i=r[s])&&i===Object(i)&&(o=i.cn,d=i.cv,void 0!==(u=i.ttl)&&""!==u||(u=Math.floor(T.getMaxCookieExpiresInMinutes()/60/24)),c=i.dmn||"."+document.domain.replace(/^www\./,""),l=i.type,o&&(d||"number"==typeof d)&&("var"!==l&&(u=parseInt(u,10))&&!isNaN(u)&&T.setCookie(o,d,24*u*60,"/",c,!1),D.stuffed[o]=d));var f,h,p=e.uuid;P.isPopulatedString(p)&&(P.isEmptyObject(a)||("string"==typeof(f=a.path)&&f.length||(f="/"),h=parseInt(a.days,10),isNaN(h)&&(h=100),T.setCookie(a.name||"aam_did",p,24*h*60,f,a.domain||"."+document.domain.replace(/^www\./,""),!0===a.secure))),O.abortRequests||L.requestToProcess(e,t)},makeRequestSrcData:function(e){e.sids=P.removeEmptyArrayValues(e.sids||[]),e.pdata=P.removeEmptyArrayValues(e.pdata||[]);var t=O,r=t.platformParams,s=T.encodeAndBuildRequest(e.sids,","),i=T.encodeAndBuildRequest(e.pdata,","),a=(e.logdataArray||[]).join("&");delete e.logdataArray;var o,d,u,c=_.IS_HTTPS?"https://":"http://",l=t.declaredId.getDeclaredIdQueryString(),f=t.adms.instance?t.adms.getCustomerIDsQueryString(t.adms.getCustomerIDs()):"",h=function(){var r,n,s,i,a=[];for(r in e)if(!(r in t.reservedKeys)&&e.hasOwnProperty(r))if(n=e[r],r=encodeURIComponent(r),n instanceof Array)for(s=0,i=n.length;s<i;s++)a.push(r+"="+encodeURIComponent(n[s]));else a.push(r+"="+encodeURIComponent(n));return a.length?"&"+a.join("&"):""}(),p="d_nsid="+r.d_nsid+t.getCoopQueryString()+l+f+(s.length?"&d_sid="+s:"")+(i.length?"&d_px="+i:"")+(a.length?"&d_ld="+encodeURIComponent(a):""),g="&d_rtbd="+r.d_rtbd+"&d_jsonv="+r.d_jsonv+"&d_dst="+r.d_dst;return u=d=(o=c+n+".demdex.net/event")+"?"+p+g+h,d.length>2048&&(d=d.substring(0,2048).substring(0,d.lastIndexOf("&"))),{corsSrc:o+"?_ts="+(new Date).getTime(),src:d,originalSrc:u,corsPostData:p+g+h,isDeclaredIdCall:""!==l}},fireRequest:function(e){if("img"===e.tag)this.fireImage(e);else{var t=O.declaredId,r=t.declaredId.request||t.declaredId.init||{},n={dpid:r.dpid||"",dpuuid:r.dpuuid||""};this.fireCORS(e,n)}},fireImage:function(e){var r,n,s=O;s.abortRequests||(s.firing=!0,r=new Image(0,0),s.sent.push(e),r.onload=function(){s.firing=!1,s.fired.push(e),s.num_of_img_responses++,s.registerRequest()},n=function(r){t="imgAbortOrErrorHandler received the event of type "+r.type,I.push(t),s.abortRequests=!0,s.firing=!1,s.errored.push(e),s.num_of_img_errors++,s.registerRequest()},r.addEventListener("error",n),r.addEventListener("abort",n),r.src=e.src)},fireCORS:function(e,r){var s=this,i=O,a=this.corsMetadata.corsType,o=e.corsSrc,d=e.corsInstance,u=e.corsPostData,c=e.postCallbackFn,l="function"==typeof c;if(!i.abortRequests&&!m){i.firing=!0;try{d.open("post",o,!0),"XMLHttpRequest"===a&&(d.withCredentials=!0,d.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),d.onreadystatechange=function(){4===this.readyState&&200===this.status&&function(a){var o;try{if((o=JSON.parse(a))!==Object(o))return void s.handleCORSError(e,r,"Response is not JSON")}catch(t){return void s.handleCORSError(e,r,"Error parsing response as JSON")}try{var d=e.callbackFn;i.firing=!1,i.fired.push(e),i.num_of_cors_responses++,d(o,r),l&&c(o,r)}catch(e){e.message="DIL handleCORSResponse caught error with message "+e.message,t=e.message,I.push(t),e.filename=e.filename||"dil.js",e.partner=n,DIL.errorModule.handleError(e);try{d({error:e.name+"|"+e.message},r),l&&c({error:e.name+"|"+e.message},r)}catch(e){}}finally{i.registerRequest()}}(this.responseText)}),d.onerror=function(){s.handleCORSError(e,r,"onerror")},d.ontimeout=function(){s.handleCORSError(e,r,"ontimeout")},d.send(u)}catch(t){this.handleCORSError(e,r,"try-catch")}i.sent.push(e),i.declaredId.declaredId.request=null}},handleCORSError:function(e,t,r){O.num_of_cors_errors++,O.corsErrorSources.push(r)},handleRequestError:function(e,t){var r=O;I.push(e),r.abortRequests=!0,r.firing=!1,r.errored.push(t),r.registerRequest()}},P={isValidPdata:function(e){return!!(e instanceof Array&&this.removeEmptyArrayValues(e).length)},isValidLogdata:function(e){return!this.isEmptyObject(e)},isEmptyObject:function(e){if(e!==Object(e))return!0;var t;for(t in e)if(e.hasOwnProperty(t))return!1;return!0},removeEmptyArrayValues:function(e){var t,r=0,n=e.length,s=[];for(r=0;r<n;r++)void 0!==(t=e[r])&&null!==t&&""!==t&&s.push(t);return s},isPopulatedString:function(e){return"string"==typeof e&&e.length}},T={convertObjectToKeyValuePairs:function(e,t,r){var n,s,i=[];for(n in t||(t="="),e)e.hasOwnProperty(n)&&void 0!==(s=e[n])&&null!==s&&""!==s&&i.push(n+t+(r?encodeURIComponent(s):s));return i},encodeAndBuildRequest:function(e,t){return e.map(function(e){return encodeURIComponent(e)}).join(t)},getCookie:function(e){var t,r,n,s=e+"=",i=document.cookie.split(";");for(t=0,r=i.length;t<r;t++){for(n=i[t];" "===n.charAt(0);)n=n.substring(1,n.length);if(0===n.indexOf(s))return decodeURIComponent(n.substring(s.length,n.length))}return null},setCookie:function(e,t,r,n,s,i){var a=new Date;r&&(r=1e3*r*60),document.cookie=e+"="+encodeURIComponent(t)+(r?";expires="+new Date(a.getTime()+r).toUTCString():"")+(n?";path="+n:"")+(s?";domain="+s:"")+(i?";secure":"")},extendArray:function(e,t){return e instanceof Array&&t instanceof Array&&(Array.prototype.push.apply(e,t),!0)},extendObject:function(e,t,r){var n;if(e===Object(e)&&t===Object(t)){for(n in t)if(t.hasOwnProperty(n)){if(!P.isEmptyObject(r)&&n in r)continue;e[n]=t[n]}return!0}return!1},getMaxCookieExpiresInMinutes:function(){return _.SIX_MONTHS_IN_MINUTES},replaceMethodsWithFunction:function(e,t){var r;if(e===Object(e)&&"function"==typeof t)for(r in e)e.hasOwnProperty(r)&&"function"==typeof e[r]&&(e[r]=t)}};"error"===n&&0===s&&window.addEventListener("load",function(){DIL.windowLoaded=!0});var E=!1,R=function(){E||(E=!0,O.registerRequest(),j())},j=function(){setTimeout(function(){h||O.firstRequestHasFired||("function"==typeof p?C.afterResult(p).submit():C.submit())},DIL.constants.TIME_TO_DEFAULT_REQUEST)},A=document;"error"!==n&&(DIL.windowLoaded?R():"complete"!==A.readyState&&"loaded"!==A.readyState?window.addEventListener("load",function(){DIL.windowLoaded=!0,R()}):(DIL.windowLoaded=!0,R())),O.declaredId.setDeclaredId(u,"init"),O.processVisitorAPI();_.IS_IE_LESS_THAN_10&&T.replaceMethodsWithFunction(C,function(){return this}),this.api=C,this.getStuffedVariable=function(e){var t=D.stuffed[e];return t||"number"==typeof t||(t=T.getCookie(e))||"number"==typeof t||(t=""),t},this.validators=P,this.helpers=T,this.constants=_,this.log=I,v&&(this.pendingRequest=S,this.requestController=O,this.destinationPublishing=L,this.requestProcs=w,this.variables=D,this.callWindowLoadFunctions=R)},DIL.extendStaticPropertiesAndMethods=function(e){var t;if(e===Object(e))for(t in e)e.hasOwnProperty(t)&&(this[t]=e[t])},DIL.extendStaticPropertiesAndMethods({version:"8.0",jsonVersion:1,constants:{TIME_TO_DEFAULT_REQUEST:50},variables:{scriptNodeList:document.getElementsByTagName("script")},windowLoaded:!1,dils:{},isAddedPostWindowLoad:function(){var e=arguments[0];this.windowLoaded="function"==typeof e?!!e():"boolean"!=typeof e||e},create:function(e){try{return new DIL(e)}catch(e){throw new Error("Error in attempt to create DIL instance with DIL.create(): "+e.message)}},registerDil:function(e,t,r){var n=t+"$"+r;n in this.dils||(this.dils[n]=e)},getDil:function(e,t){var r;return"string"!=typeof e&&(e=""),t||(t=0),(r=e+"$"+t)in this.dils?this.dils[r]:new Error("The DIL instance with partner = "+e+" and containerNSID = "+t+" was not found")},dexGetQSVars:function(e,t,r){var n=this.getDil(t,r);return n instanceof this?n.getStuffedVariable(e):""}}),DIL.errorModule=function(){var e=DIL.create({partner:"error",containerNSID:0,ignoreHardDependencyOnVisitorAPI:!0}),t={harvestererror:14138,destpuberror:14139,dpmerror:14140,generalerror:14137,error:14137,noerrortypedefined:15021,evalerror:15016,rangeerror:15017,referenceerror:15018,typeerror:15019,urierror:15020},r=!1;return{activate:function(){r=!0},handleError:function(n){if(!r)return"DIL error module has not been activated";n!==Object(n)&&(n={});var s=n.name?(n.name+"").toLowerCase():"",i=s in t?t[s]:t.noerrortypedefined,a=[],o={name:s,filename:n.filename?n.filename+"":"",partner:n.partner?n.partner+"":"no_partner",site:n.site?n.site+"":document.location.href,message:n.message?n.message+"":""};return a.push(i),e.api.pixels(a).logs(o).useImageRequest().submit(),"DIL error report sent"},pixelMap:t}}(),DIL.tools={},DIL.modules={helpers:{handleModuleError:function(e,t,r){var n="",s=t||"Error caught in DIL module/submodule: ";return e===Object(e)?n=s+(e.message||"err has no message"):(n=s+"err is not a valid object",e={}),e.message=n,r instanceof DIL&&(e.partner=r.api.getPartner()),DIL.errorModule.handleError(e),this.errorMessage=n,n}}}),window.DIL&&DIL.tools&&DIL.modules&&(DIL.tools.getMetaTags=function(){var e,t,r,n,s,i={},a=document.getElementsByTagName("meta");for(e=0,r=arguments.length;e<r;e++)if(null!==(n=arguments[e]))for(t=0;t<a.length;t++)if((s=a[t]).name===n){i[n]=s.content;break}return i},DIL.tools.decomposeURI=function(e){var t=document.createElement("a");return t.href=e||document.referrer,{hash:t.hash,host:t.host.split(":").shift(),hostname:t.hostname,href:t.href,pathname:t.pathname.replace(/^\//,""),protocol:t.protocol,search:t.search,uriParams:function(e,r){return t.search.replace(/^(\/|\?)?|\/$/g,"").split("&").map(function(t){var r=t.split("=");e[r.shift()]=r.shift()}),e}({})}},DIL.tools.getSearchReferrer=function(e,t){var r=DIL.getDil("error"),n=DIL.tools.decomposeURI(e||document.referrer),s="",i="",a={DEFAULT:{queryParam:"q"},SEARCH_ENGINES:[t===Object(t)?t:{},{hostPattern:/aol\./},{hostPattern:/ask\./},{hostPattern:/bing\./},{hostPattern:/google\./},{hostPattern:/yahoo\./,queryParam:"p"}]},o=a.DEFAULT;return(s=a.SEARCH_ENGINES.filter(function(e){return!(!e.hasOwnProperty("hostPattern")||!n.hostname.match(e.hostPattern))}).shift())?{valid:!0,name:n.hostname,keywords:(r.helpers.extendObject(o,s),i=o.queryPattern?(s=(""+n.search).match(o.queryPattern))?s[1]:"":n.uriParams[o.queryParam],decodeURIComponent(i||"").replace(/\+|%20/g," "))}:{valid:!1,name:"",keywords:""}},DIL.modules.GA=s,DIL.modules.siteCatalyst=i)}]);

;
// File: /js/news/common/public/static/js/vendor/adobe/visitor_api_v3.3.0.js
/**
 * @license
 * Adobe Visitor API for JavaScript version: 3.3.0
 * Copyright 2018 Adobe, Inc. All Rights Reserved
 * More info available at https://marketing.adobe.com/resources/help/en_US/mcvid/
 */
var e=function(){"use strict";function e(){return{callbacks:{},add:function(e,t){this.callbacks[e]=this.callbacks[e]||[];var i=this.callbacks[e].push(t)-1;return function(){this.callbacks[e].splice(i,1)}},execute:function(e,t){if(this.callbacks[e]){t=void 0===t?[]:t,t=t instanceof Array?t:[t];try{for(;this.callbacks[e].length;){var i=this.callbacks[e].shift();"function"==typeof i?i.apply(null,t):i instanceof Array&&i[1].apply(i[0],t)}delete this.callbacks[e]}catch(e){}}},executeAll:function(e,t){(t||e&&!v.isObjectEmpty(e))&&Object.keys(this.callbacks).forEach(function(t){var i=void 0!==e[t]?e[t]:"";this.execute(t,i)},this)},hasCallbacks:function(){return Boolean(Object.keys(this.callbacks).length)}}}function t(e){for(var t=/^\d+$/,i=0,n=e.length;i<n;i++)if(!t.test(e[i]))return!1;return!0}function i(e,t){for(;e.length<t.length;)e.push("0");for(;t.length<e.length;)t.push("0")}function n(e,t){for(var i=0;i<e.length;i++){var n=parseInt(e[i],10),r=parseInt(t[i],10);if(n>r)return 1;if(r>n)return-1}return 0}function r(e,r){if(e===r)return 0;var a=e.toString().split("."),s=r.toString().split(".");return t(a.concat(s))?(i(a,s),n(a,s)):NaN}var a="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};Object.assign=Object.assign||function(e){for(var t,i,n=1;n<arguments.length;++n){i=arguments[n];for(t in i)Object.prototype.hasOwnProperty.call(i,t)&&(e[t]=i[t])}return e};var s={HANDSHAKE:"HANDSHAKE",GETSTATE:"GETSTATE",PARENTSTATE:"PARENTSTATE"},o={MCMID:"MCMID",MCAID:"MCAID",MCAAMB:"MCAAMB",MCAAMLH:"MCAAMLH",MCOPTOUT:"MCOPTOUT",CUSTOMERIDS:"CUSTOMERIDS"},l={MCMID:"getMarketingCloudVisitorID",MCAID:"getAnalyticsVisitorID",MCAAMB:"getAudienceManagerBlob",MCAAMLH:"getAudienceManagerLocationHint",MCOPTOUT:"getOptOut"},d={CUSTOMERIDS:"getCustomerIDs"},c={MCMID:"getMarketingCloudVisitorID",MCAAMB:"getAudienceManagerBlob",MCAAMLH:"getAudienceManagerLocationHint",MCOPTOUT:"getOptOut",MCAID:"getAnalyticsVisitorID",CUSTOMERIDS:"getCustomerIDs"},u={MC:"MCMID",A:"MCAID",AAM:"MCAAMB"},f={MCMID:"MCMID",MCOPTOUT:"MCOPTOUT",MCAID:"MCAID",MCAAMLH:"MCAAMLH",MCAAMB:"MCAAMB"},g={UNKNOWN:0,AUTHENTICATED:1,LOGGED_OUT:2},m={GLOBAL:"global"},_={MESSAGES:s,STATE_KEYS_MAP:o,ASYNC_API_MAP:l,SYNC_API_MAP:d,ALL_APIS:c,FIELDGROUP_TO_FIELD:u,FIELDS:f,AUTH_STATE:g,OPT_OUT:m},h=_.STATE_KEYS_MAP,p=function(e){function t(){}function i(t,i){var n=this;return function(){var t=e(0,h.MCMID),r={};return r[h.MCMID]=t,n.setStateAndPublish(r),i(t),t}}this.getMarketingCloudVisitorID=function(e){e=e||t;var n=this.findField(h.MCMID,e),r=i.call(this,h.MCMID,e);return void 0!==n?n:r()}},C=_.MESSAGES,S=_.ASYNC_API_MAP,I=_.SYNC_API_MAP,D=function(){function e(){}function t(e,t){var i=this;return function(){return i.callbackRegistry.add(e,t),i.messageParent(C.GETSTATE),""}}function i(i){this[S[i]]=function(n){n=n||e;var r=this.findField(i,n),a=t.call(this,i,n);return void 0!==r?r:a()}}function n(t){this[I[t]]=function(){return this.findField(t,e)||{}}}Object.keys(S).forEach(i,this),Object.keys(I).forEach(n,this)},A=_.ASYNC_API_MAP,M=function(){Object.keys(A).forEach(function(e){this[A[e]]=function(t){this.callbackRegistry.add(e,t)}},this)},v=function(e,t){return t={exports:{}},e(t,t.exports),t.exports}(function(e,t){t.isObjectEmpty=function(e){return e===Object(e)&&0===Object.keys(e).length},t.isValueEmpty=function(e){return""===e||t.isObjectEmpty(e)},t.getIeVersion=function(){if(document.documentMode)return document.documentMode;for(var e=7;e>4;e--){var t=document.createElement("div");if(t.innerHTML="\x3c!--[if IE "+e+"]><span></span><![endif]--\x3e",t.getElementsByTagName("span").length)return t=null,e;t=null}return null},t.encodeAndBuildRequest=function(e,t){return e.map(encodeURIComponent).join(t)},t.isObject=function(e){return null!==e&&"object"==typeof e&&!1===Array.isArray(e)}}),y=(v.isObjectEmpty,v.isValueEmpty,v.getIeVersion,v.encodeAndBuildRequest,v.isObject,e),b=_.MESSAGES,T={0:"prefix",1:"orgID",2:"state"},k=function(e,t){this.parse=function(e){try{var t={};return e.data.split("|").forEach(function(e,i){if(void 0!==e){t[T[i]]=2!==i?e:JSON.parse(e)}}),t}catch(e){}},this.isInvalid=function(i){var n=this.parse(i);if(!n||Object.keys(n).length<2)return!0;var r=e!==n.orgID,a=!t||i.origin!==t,s=-1===Object.keys(b).indexOf(n.prefix);return r||a||s},this.send=function(i,n,r){var a=n+"|"+e;r&&r===Object(r)&&(a+="|"+JSON.stringify(r));try{i.postMessage(a,t)}catch(e){}}},O=_.MESSAGES,E=function(e,t,i,n){function r(e){Object.assign(m,e)}function s(e){Object.assign(m.state,e),m.callbackRegistry.executeAll(m.state)}function o(e){if(!C.isInvalid(e)){h=!1;var t=C.parse(e);m.setStateAndPublish(t.state)}}function l(e){!h&&_&&(h=!0,C.send(n,e))}function d(){r(new p(i._generateID)),m.getMarketingCloudVisitorID(),m.callbackRegistry.executeAll(m.state,!0),a.removeEventListener("message",c)}function c(e){if(!C.isInvalid(e)){var t=C.parse(e);h=!1,a.clearTimeout(m._handshakeTimeout),a.removeEventListener("message",c),r(new D(m)),a.addEventListener("message",o),m.setStateAndPublish(t.state),m.callbackRegistry.hasCallbacks()&&l(O.GETSTATE)}}function u(){_&&postMessage?(a.addEventListener("message",c),l(O.HANDSHAKE),m._handshakeTimeout=setTimeout(d,250)):d()}function f(){a.s_c_in||(a.s_c_il=[],a.s_c_in=0),m._c="Visitor",m._il=a.s_c_il,m._in=a.s_c_in,m._il[m._in]=m,a.s_c_in++}function g(){function e(e){0!==e.indexOf("_")&&"function"==typeof i[e]&&(m[e]=function(){})}Object.keys(i).forEach(e),m.getSupplementalDataID=i.getSupplementalDataID}var m=this,_=t.whitelistParentDomain;m.state={},m.version=i.version,m.marketingCloudOrgID=e,m.cookieDomain=i.cookieDomain||"",m._instanceType="child";var h=!1,C=new k(e,_);m.callbackRegistry=y(),m.init=function(){f(),g(),r(new M(m)),u()},m.findField=function(e,t){if(m.state[e])return t(m.state[e]),m.state[e]},m.messageParent=l,m.setStateAndPublish=s},L=_.MESSAGES,P=_.ALL_APIS,R=_.ASYNC_API_MAP,F=_.FIELDGROUP_TO_FIELD,w=function(e,t){function i(){var t={};return Object.keys(P).forEach(function(i){var n=P[i],r=e[n]();v.isValueEmpty(r)||(t[i]=r)}),t}function n(){var t=[];return e._loading&&Object.keys(e._loading).forEach(function(i){if(e._loading[i]){var n=F[i];t.push(n)}}),t.length?t:null}function r(t){return function i(r){var a=n();if(a){var s=R[a[0]];e[s](i,!0)}else t()}}function a(e,n){var r=i();t.send(e,n,r)}function s(e){l(e),a(e,L.HANDSHAKE)}function o(e){r(function(){a(e,L.PARENTSTATE)})()}function l(i){function n(n){r.call(e,n),t.send(i,L.PARENTSTATE,{CUSTOMERIDS:e.getCustomerIDs()})}var r=e.setCustomerIDs;e.setCustomerIDs=n}return function(e){if(!t.isInvalid(e)){(t.parse(e).prefix===L.HANDSHAKE?s:o)(e.source)}}},V=function(e,t){function i(e){return function(i){n[e]=i,r++,r===a&&t(n)}}var n={},r=0,a=Object.keys(e).length;Object.keys(e).forEach(function(t){var n=e[t];if(n.fn){var r=n.args||[];r.unshift(i(t)),n.fn.apply(n.context||null,r)}})},N=function(e){var t;if(!e&&a.location&&(e=a.location.hostname),t=e)if(/^[0-9.]+$/.test(t))t="";else{var i=",ac,ad,ae,af,ag,ai,al,am,an,ao,aq,ar,as,at,au,aw,ax,az,ba,bb,be,bf,bg,bh,bi,bj,bm,bo,br,bs,bt,bv,bw,by,bz,ca,cc,cd,cf,cg,ch,ci,cl,cm,cn,co,cr,cu,cv,cw,cx,cz,de,dj,dk,dm,do,dz,ec,ee,eg,es,et,eu,fi,fm,fo,fr,ga,gb,gd,ge,gf,gg,gh,gi,gl,gm,gn,gp,gq,gr,gs,gt,gw,gy,hk,hm,hn,hr,ht,hu,id,ie,im,in,io,iq,ir,is,it,je,jo,jp,kg,ki,km,kn,kp,kr,ky,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mh,mk,ml,mn,mo,mp,mq,mr,ms,mt,mu,mv,mw,mx,my,na,nc,ne,nf,ng,nl,no,nr,nu,nz,om,pa,pe,pf,ph,pk,pl,pm,pn,pr,ps,pt,pw,py,qa,re,ro,rs,ru,rw,sa,sb,sc,sd,se,sg,sh,si,sj,sk,sl,sm,sn,so,sr,st,su,sv,sx,sy,sz,tc,td,tf,tg,th,tj,tk,tl,tm,tn,to,tp,tr,tt,tv,tw,tz,ua,ug,uk,us,uy,uz,va,vc,ve,vg,vi,vn,vu,wf,ws,yt,",n=t.split("."),r=n.length-1,s=r-1;if(r>1&&n[r].length<=2&&(2===n[r-1].length||i.indexOf(","+n[r]+",")<0)&&s--,s>0)for(t="";r>=s;)t=n[r]+(t?".":"")+t,r--}return t},x={compare:r,isLessThan:function(e,t){return r(e,t)<0},areVersionsDifferent:function(e,t){return 0!==r(e,t)},isGreaterThan:function(e,t){return r(e,t)>0},isEqual:function(e,t){return 0===r(e,t)}},j=!!a.postMessage,U={postMessage:function(e,t,i){var n=1;t&&(j?i.postMessage(e,t.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):t&&(i.location=t.replace(/#.*$/,"")+"#"+ +new Date+n+++"&"+e))},receiveMessage:function(e,t){var i;try{j&&(e&&(i=function(i){if("string"==typeof t&&i.origin!==t||"[object Function]"===Object.prototype.toString.call(t)&&!1===t(i.origin))return!1;e(i)}),a.addEventListener?a[e?"addEventListener":"removeEventListener"]("message",i):a[e?"attachEvent":"detachEvent"]("onmessage",i))}catch(e){}}},H=function(e){var t,i,n="0123456789",r="",a="",s=8,o=10,l=10;if(1==e){for(n+="ABCDEF",t=0;16>t;t++)i=Math.floor(Math.random()*s),r+=n.substring(i,i+1),i=Math.floor(Math.random()*s),a+=n.substring(i,i+1),s=16;return r+"-"+a}for(t=0;19>t;t++)i=Math.floor(Math.random()*o),r+=n.substring(i,i+1),0===t&&9==i?o=3:(1==t||2==t)&&10!=o&&2>i?o=10:2<t&&(o=10),i=Math.floor(Math.random()*l),a+=n.substring(i,i+1),0===t&&9==i?l=3:(1==t||2==t)&&10!=l&&2>i?l=10:2<t&&(l=10);return r+a},B=function(e,t){return{corsMetadata:function(){var e="none",t=!0;return"undefined"!=typeof XMLHttpRequest&&XMLHttpRequest===Object(XMLHttpRequest)&&("withCredentials"in new XMLHttpRequest?e="XMLHttpRequest":"undefined"!=typeof XDomainRequest&&XDomainRequest===Object(XDomainRequest)&&(t=!1),Object.prototype.toString.call(a.HTMLElement).indexOf("Constructor")>0&&(t=!1)),{corsType:e,corsCookiesEnabled:t}}(),getCORSInstance:function(){return"none"===this.corsMetadata.corsType?null:new a[this.corsMetadata.corsType]},fireCORS:function(t,i,n){function r(e){var i;try{if((i=JSON.parse(e))!==Object(i))return void s.handleCORSError(t,null,"Response is not JSON")}catch(e){return void s.handleCORSError(t,e,"Error parsing response as JSON")}try{for(var n=t.callback,r=a,o=0;o<n.length;o++)r=r[n[o]];r(i)}catch(e){s.handleCORSError(t,e,"Error forming callback function")}}var s=this;i&&(t.loadErrorHandler=i);try{var o=this.getCORSInstance();o.open("get",t.corsUrl+"&ts="+(new Date).getTime(),!0),"XMLHttpRequest"===this.corsMetadata.corsType&&(o.withCredentials=!0,o.timeout=e.loadTimeout,o.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),o.onreadystatechange=function(){4===this.readyState&&200===this.status&&r(this.responseText)}),o.onerror=function(e){s.handleCORSError(t,e,"onerror")},o.ontimeout=function(e){s.handleCORSError(t,e,"ontimeout")},o.send(),e._log.requests.push(t.corsUrl)}catch(e){this.handleCORSError(t,e,"try-catch")}},handleCORSError:function(t,i,n){e.CORSErrors.push({corsData:t,error:i,description:n}),t.loadErrorHandler&&("ontimeout"===n?t.loadErrorHandler(!0):t.loadErrorHandler(!1))}}},G={POST_MESSAGE_ENABLED:!!a.postMessage,DAYS_BETWEEN_SYNC_ID_CALLS:1,MILLIS_PER_DAY:864e5,ADOBE_MC:"adobe_mc",ADOBE_MC_SDID:"adobe_mc_sdid",VALID_VISITOR_ID_REGEX:/^[0-9a-fA-F\-]+$/,ADOBE_MC_TTL_IN_MIN:5,VERSION_REGEX:/vVersion\|((\d+\.)?(\d+\.)?(\*|\d+))(?=$|\|)/},q=function(e,t){var i=a.document;return{THROTTLE_START:3e4,MAX_SYNCS_LENGTH:649,throttleTimerSet:!1,id:null,onPagePixels:[],iframeHost:null,getIframeHost:function(e){if("string"==typeof e){var t=e.split("/");return t[0]+"//"+t[2]}},subdomain:null,url:null,getUrl:function(){var t,n="http://fast.",r="?d_nsid="+e.idSyncContainerID+"#"+encodeURIComponent(i.location.origin);return this.subdomain||(this.subdomain="nosubdomainreturned"),e.loadSSL&&(n=e.idSyncSSLUseAkamai?"https://fast.":"https://"),t=n+this.subdomain+".demdex.net/dest5.html"+r,this.iframeHost=this.getIframeHost(t),this.id="destination_publishing_iframe_"+this.subdomain+"_"+e.idSyncContainerID,t},checkDPIframeSrc:function(){var t="?d_nsid="+e.idSyncContainerID+"#"+encodeURIComponent(i.location.href);"string"==typeof e.dpIframeSrc&&e.dpIframeSrc.length&&(this.id="destination_publishing_iframe_"+(e._subdomain||this.subdomain||(new Date).getTime())+"_"+e.idSyncContainerID,this.iframeHost=this.getIframeHost(e.dpIframeSrc),this.url=e.dpIframeSrc+t)},idCallNotProcesssed:null,doAttachIframe:!1,startedAttachingIframe:!1,iframeHasLoaded:null,iframeIdChanged:null,newIframeCreated:null,originalIframeHasLoadedAlready:null,iframeLoadedCallbacks:[],regionChanged:!1,timesRegionChanged:0,sendingMessages:!1,messages:[],messagesPosted:[],messagesReceived:[],messageSendingInterval:G.POST_MESSAGE_ENABLED?null:100,jsonForComparison:[],jsonDuplicates:[],jsonWaiting:[],jsonProcessed:[],canSetThirdPartyCookies:!0,receivedThirdPartyCookiesNotification:!1,readyToAttachIframePreliminary:function(){return!(e.idSyncDisableSyncs||e.disableIdSyncs||e.idSyncDisable3rdPartySyncing||e.disableThirdPartyCookies||e.disableThirdPartyCalls)},readyToAttachIframe:function(){return this.readyToAttachIframePreliminary()&&(this.doAttachIframe||e._doAttachIframe)&&(this.subdomain&&"nosubdomainreturned"!==this.subdomain||e._subdomain)&&this.url&&!this.startedAttachingIframe},attachIframe:function(){function e(){r=i.createElement("iframe"),r.sandbox="allow-scripts allow-same-origin",r.title="Adobe ID Syncing iFrame",r.id=n.id,r.name=n.id+"_name",r.style.cssText="display: none; width: 0; height: 0;",r.src=n.url,n.newIframeCreated=!0,t(),i.body.appendChild(r)}function t(e){r.addEventListener("load",function(){r.className="aamIframeLoaded",n.iframeHasLoaded=!0,n.fireIframeLoadedCallbacks(e),n.requestToProcess()})}this.startedAttachingIframe=!0;var n=this,r=i.getElementById(this.id);r?"IFRAME"!==r.nodeName?(this.id+="_2",this.iframeIdChanged=!0,e()):(this.newIframeCreated=!1,"aamIframeLoaded"!==r.className?(this.originalIframeHasLoadedAlready=!1,t("The destination publishing iframe already exists from a different library, but hadn't loaded yet.")):(this.originalIframeHasLoadedAlready=!0,this.iframeHasLoaded=!0,this.iframe=r,this.fireIframeLoadedCallbacks("The destination publishing iframe already exists from a different library, and had loaded alresady."),this.requestToProcess())):e(),this.iframe=r},fireIframeLoadedCallbacks:function(e){this.iframeLoadedCallbacks.forEach(function(t){"function"==typeof t&&t({message:e||"The destination publishing iframe was attached and loaded successfully."})}),this.iframeLoadedCallbacks=[]},requestToProcess:function(t){function i(){r.jsonForComparison.push(t),r.jsonWaiting.push(t),r.processSyncOnPage(t)}var n,r=this;if(t===Object(t)&&t.ibs)if(n=JSON.stringify(t.ibs||[]),this.jsonForComparison.length){var a,s,o,l=!1;for(a=0,s=this.jsonForComparison.length;a<s;a++)if(o=this.jsonForComparison[a],n===JSON.stringify(o.ibs||[])){l=!0;break}l?this.jsonDuplicates.push(t):i()}else i();if((this.receivedThirdPartyCookiesNotification||!G.POST_MESSAGE_ENABLED||this.iframeHasLoaded)&&this.jsonWaiting.length){var d=this.jsonWaiting.shift();this.process(d),this.requestToProcess()}e.idSyncDisableSyncs||e.disableIdSyncs||!this.iframeHasLoaded||!this.messages.length||this.sendingMessages||(this.throttleTimerSet||(this.throttleTimerSet=!0,setTimeout(function(){r.messageSendingInterval=G.POST_MESSAGE_ENABLED?null:150},this.THROTTLE_START)),this.sendingMessages=!0,this.sendMessages())},getRegionAndCheckIfChanged:function(t,i){var n=e._getField("MCAAMLH"),r=t.d_region||t.dcs_region;return n?r&&(e._setFieldExpire("MCAAMLH",i),e._setField("MCAAMLH",r),parseInt(n,10)!==r&&(this.regionChanged=!0,this.timesRegionChanged++,e._setField("MCSYNCSOP",""),e._setField("MCSYNCS",""),n=r)):(n=r)&&(e._setFieldExpire("MCAAMLH",i),e._setField("MCAAMLH",n)),n||(n=""),n},processSyncOnPage:function(e){var t,i,n,r;if((t=e.ibs)&&t instanceof Array&&(i=t.length))for(n=0;n<i;n++)r=t[n],r.syncOnPage&&this.checkFirstPartyCookie(r,"","syncOnPage")},process:function(e){var t,i,n,r,a,s=encodeURIComponent,o=!1;if((t=e.ibs)&&t instanceof Array&&(i=t.length))for(o=!0,n=0;n<i;n++)r=t[n],a=[s("ibs"),s(r.id||""),s(r.tag||""),v.encodeAndBuildRequest(r.url||[],","),s(r.ttl||""),"","",r.fireURLSync?"true":"false"],r.syncOnPage||(this.canSetThirdPartyCookies?this.addMessage(a.join("|")):r.fireURLSync&&this.checkFirstPartyCookie(r,a.join("|")));o&&this.jsonProcessed.push(e)},checkFirstPartyCookie:function(t,i,n){var r="syncOnPage"===n,a=r?"MCSYNCSOP":"MCSYNCS";e._readVisitor();var s,o,l=e._getField(a),d=!1,c=!1,u=Math.ceil((new Date).getTime()/G.MILLIS_PER_DAY);l?(s=l.split("*"),o=this.pruneSyncData(s,t.id,u),d=o.dataPresent,c=o.dataValid,d&&c||this.fireSync(r,t,i,s,a,u)):(s=[],this.fireSync(r,t,i,s,a,u))},pruneSyncData:function(e,t,i){var n,r,a,s=!1,o=!1;for(r=0;r<e.length;r++)n=e[r],a=parseInt(n.split("-")[1],10),n.match("^"+t+"-")?(s=!0,i<a?o=!0:(e.splice(r,1),r--)):i>=a&&(e.splice(r,1),r--);return{dataPresent:s,dataValid:o}},manageSyncsSize:function(e){if(e.join("*").length>this.MAX_SYNCS_LENGTH)for(e.sort(function(e,t){return parseInt(e.split("-")[1],10)-parseInt(t.split("-")[1],10)});e.join("*").length>this.MAX_SYNCS_LENGTH;)e.shift()},fireSync:function(t,i,n,r,a,s){var o=this;if(t){if("img"===i.tag){var l,d,c,u,f=i.url,g=e.loadSSL?"https:":"http:";for(l=0,d=f.length;l<d;l++){c=f[l],u=/^\/\//.test(c);var m=new Image;m.addEventListener("load",function(t,i,n,r){return function(){o.onPagePixels[t]=null,e._readVisitor();var s,l=e._getField(a),d=[];if(l){s=l.split("*");var c,u,f;for(c=0,u=s.length;c<u;c++)f=s[c],f.match("^"+i.id+"-")||d.push(f)}o.setSyncTrackingData(d,i,n,r)}}(this.onPagePixels.length,i,a,s)),m.src=(u?g:"")+c,this.onPagePixels.push(m)}}}else this.addMessage(n),this.setSyncTrackingData(r,i,a,s)},addMessage:function(t){var i=encodeURIComponent,n=i(e._enableErrorReporting?"---destpub-debug---":"---destpub---");this.messages.push((G.POST_MESSAGE_ENABLED?"":n)+t)},setSyncTrackingData:function(t,i,n,r){t.push(i.id+"-"+(r+Math.ceil(i.ttl/60/24))),this.manageSyncsSize(t),e._setField(n,t.join("*"))},sendMessages:function(){var e,t=this,i="",n=encodeURIComponent;this.regionChanged&&(i=n("---destpub-clear-dextp---"),this.regionChanged=!1),this.messages.length?G.POST_MESSAGE_ENABLED?(e=i+n("---destpub-combined---")+this.messages.join("%01"),this.postMessage(e),this.messages=[],this.sendingMessages=!1):(e=this.messages.shift(),this.postMessage(i+e),setTimeout(function(){t.sendMessages()},this.messageSendingInterval)):this.sendingMessages=!1},postMessage:function(e){U.postMessage(e,this.url,this.iframe.contentWindow),this.messagesPosted.push(e)},receiveMessage:function(e){var t,i=/^---destpub-to-parent---/;"string"==typeof e&&i.test(e)&&(t=e.replace(i,"").split("|"),"canSetThirdPartyCookies"===t[0]&&(this.canSetThirdPartyCookies="true"===t[1],this.receivedThirdPartyCookiesNotification=!0,this.requestToProcess()),this.messagesReceived.push(e))},processIDCallData:function(n){(null==this.url||n.subdomain&&"nosubdomainreturned"===this.subdomain)&&("string"==typeof e._subdomain&&e._subdomain.length?this.subdomain=e._subdomain:this.subdomain=n.subdomain||"",this.url=this.getUrl()),n.ibs instanceof Array&&n.ibs.length&&(this.doAttachIframe=!0),this.readyToAttachIframe()&&(e.idSyncAttachIframeOnWindowLoad?(t.windowLoaded||"complete"===i.readyState||"loaded"===i.readyState)&&this.attachIframe():this.attachIframeASAP()),"function"==typeof e.idSyncIDCallResult?e.idSyncIDCallResult(n):this.requestToProcess(n),"function"==typeof e.idSyncAfterIDCallResult&&e.idSyncAfterIDCallResult(n)},canMakeSyncIDCall:function(t,i){return e._forceSyncIDCall||!t||i-t>G.DAYS_BETWEEN_SYNC_ID_CALLS},attachIframeASAP:function(){function e(){t.startedAttachingIframe||(i.body?t.attachIframe():setTimeout(e,30))}var t=this;e()}}},Y={audienceManagerServer:{},audienceManagerServerSecure:{},cookieDomain:{},cookieLifetime:{},cookieName:{},disableThirdPartyCalls:{},idSyncAfterIDCallResult:{},idSyncAttachIframeOnWindowLoad:{},idSyncContainerID:{},idSyncDisable3rdPartySyncing:{},disableThirdPartyCookies:{},idSyncDisableSyncs:{},disableIdSyncs:{},idSyncIDCallResult:{},idSyncSSLUseAkamai:{},isCoopSafe:{},loadSSL:{},loadTimeout:{},marketingCloudServer:{},marketingCloudServerSecure:{},overwriteCrossDomainMCIDAndAID:{},resetBeforeVersion:{},sdidParamExpiry:{},serverState:{},sessionCookieName:{},secureCookie:{},takeTimeoutMetrics:{},trackingServer:{},trackingServerSecure:{},whitelistIframeDomains:{},whitelistParentDomain:{}},X={getConfigNames:function(){return Object.keys(Y)},getConfigs:function(){return Y}},W=function(e,t,i){function n(e){var t=e;return function(e){var i=e||c.location.href;try{var n=d._extractParamFromUri(i,t);if(n)return y.parsePipeDelimetedKeyValues(n)}catch(e){}}}function r(e){function t(e,t){e&&e.match(G.VALID_VISITOR_ID_REGEX)&&t(e)}t(e[m],d.setMarketingCloudVisitorID),d._setFieldExpire(I,-1),t(e[C],d.setAnalyticsVisitorID)}function s(e){e=e||{},d._supplementalDataIDCurrent=e.supplementalDataIDCurrent||"",d._supplementalDataIDCurrentConsumed=e.supplementalDataIDCurrentConsumed||{},d._supplementalDataIDLast=e.supplementalDataIDLast||"",d._supplementalDataIDLastConsumed=e.supplementalDataIDLastConsumed||{}}function o(e){function t(e,t,i){return i=i?i+="|":i,i+=e+"="+encodeURIComponent(t)}function i(e,i){var n=i[0],r=i[1];return null!=r&&r!==D&&(e=t(n,r,e)),e}var n=e.reduce(i,"");return function(e){var t=y.getTimestampInSeconds();return e=e?e+="|":e,e+="TS="+t}(n)}function l(e){var t=e.minutesToLive,i="";return(d.idSyncDisableSyncs||d.disableIdSyncs)&&(i=i||"Error: id syncs have been disabled"),"string"==typeof e.dpid&&e.dpid.length||(i=i||"Error: config.dpid is empty"),"string"==typeof e.url&&e.url.length||(i=i||"Error: config.url is empty"),void 0===t?t=20160:(t=parseInt(t,10),(isNaN(t)||t<=0)&&(i=i||"Error: config.minutesToLive needs to be a positive number")),{error:i,ttl:t}}if(!i||i.split("").reverse().join("")!==e)throw new Error("Please use `Visitor.getInstance` to instantiate Visitor.");var d=this;d.version="3.3.0";var c=a,u=c.Visitor;u.version=d.version,u.AuthState=_.AUTH_STATE,u.OptOut=_.OPT_OUT,c.s_c_in||(c.s_c_il=[],c.s_c_in=0),d._c="Visitor",d._il=c.s_c_il,d._in=c.s_c_in,d._il[d._in]=d,c.s_c_in++,d._instanceType="regular",d._log={requests:[]},d.marketingCloudOrgID=e,d.cookieName="AMCV_"+e,d.sessionCookieName="AMCVS_"+e,d.cookieDomain=N(),d.cookieDomain===c.location.hostname&&(d.cookieDomain=""),d.loadSSL=c.location.protocol.toLowerCase().indexOf("https")>=0,d.loadTimeout=3e4,d.CORSErrors=[],d.marketingCloudServer=d.audienceManagerServer="dpm.demdex.net",d.sdidParamExpiry=30;var f=c.document,g=null,m="MCMID",h="MCIDTS",p="A",C="MCAID",S="AAM",I="MCAAMB",D="NONE",A=function(e){return!Object.prototype[e]},M=B(d);d.FIELDS=_.FIELDS,d.cookieRead=function(e){e=encodeURIComponent(e);var t=(";"+f.cookie).split(" ").join(";"),i=t.indexOf(";"+e+"="),n=i<0?i:t.indexOf(";",i+1);return i<0?"":decodeURIComponent(t.substring(i+2+e.length,n<0?t.length:n))},d.cookieWrite=function(e,t,i){var n,r=d.cookieLifetime,a="";if(t=""+t,r=r?(""+r).toUpperCase():"",i&&"SESSION"!==r&&"NONE"!==r){if(n=""!==t?parseInt(r||0,10):-60)i=new Date,i.setTime(i.getTime()+1e3*n);else if(1===i){i=new Date;var s=i.getYear();i.setYear(s+2+(s<1900?1900:0))}}else i=0;return e&&"NONE"!==r?(d.configs&&d.configs.secureCookie&&"https:"===location.protocol&&(a="Secure"),f.cookie=encodeURIComponent(e)+"="+encodeURIComponent(t)+"; path=/;"+(i?" expires="+i.toGMTString()+";":"")+(d.cookieDomain?" domain="+d.cookieDomain+";":"")+a,d.cookieRead(e)===t):0},d.resetState=function(e){e?d._mergeServerState(e):s()},d._isAllowedDone=!1,d._isAllowedFlag=!1,d.isAllowed=function(){return d._isAllowedDone||(d._isAllowedDone=!0,(d.cookieRead(d.cookieName)||d.cookieWrite(d.cookieName,"T",1))&&(d._isAllowedFlag=!0)),d._isAllowedFlag},d.setMarketingCloudVisitorID=function(e){d._setMarketingCloudFields(e)},d._use1stPartyMarketingCloudServer=!1,d.getMarketingCloudVisitorID=function(e,t){if(d.isAllowed()){d.marketingCloudServer&&d.marketingCloudServer.indexOf(".demdex.net")<0&&(d._use1stPartyMarketingCloudServer=!0);var i=d._getAudienceManagerURLData("_setMarketingCloudFields"),n=i.url;return d._getRemoteField(m,n,e,t,i)}return""},d.getVisitorValues=function(e,t){var i={MCMID:{fn:d.getMarketingCloudVisitorID,args:[!0],context:d},MCOPTOUT:{fn:d.isOptedOut,args:[void 0,!0],context:d},MCAID:{fn:d.getAnalyticsVisitorID,args:[!0],context:d},MCAAMLH:{fn:d.getAudienceManagerLocationHint,args:[!0],context:d},MCAAMB:{fn:d.getAudienceManagerBlob,args:[!0],context:d}},n=t&&t.length?y.pluck(i,t):i;V(n,e)},d._currentCustomerIDs={},d._customerIDsHashChanged=!1,d._newCustomerIDsHash="",d.setCustomerIDs=function(e){function t(){d._customerIDsHashChanged=!1}if(d.isAllowed()&&e){if(!v.isObject(e)||v.isObjectEmpty(e))return!1;d._readVisitor();var i,n;for(i in e)if(A(i)&&(n=e[i]))if("object"==typeof n){var r={};n.id&&(r.id=n.id),void 0!=n.authState&&(r.authState=n.authState),d._currentCustomerIDs[i]=r}else d._currentCustomerIDs[i]={id:n};var a=d.getCustomerIDs(),s=d._getField("MCCIDH"),o="";s||(s=0);for(i in a)A(i)&&(n=a[i],o+=(o?"|":"")+i+"|"+(n.id?n.id:"")+(n.authState?n.authState:""));d._newCustomerIDsHash=String(d._hash(o)),d._newCustomerIDsHash!==s&&(d._customerIDsHashChanged=!0,d._mapCustomerIDs(t))}},d.getCustomerIDs=function(){d._readVisitor();var e,t,i={};for(e in d._currentCustomerIDs)A(e)&&(t=d._currentCustomerIDs[e],i[e]||(i[e]={}),t.id&&(i[e].id=t.id),void 0!=t.authState?i[e].authState=t.authState:i[e].authState=u.AuthState.UNKNOWN);return i},d.setAnalyticsVisitorID=function(e){d._setAnalyticsFields(e)},d.getAnalyticsVisitorID=function(e,t,i){if(!y.isTrackingServerPopulated()&&!i)return d._callCallback(e,[""]),"";if(d.isAllowed()){var n="";if(i||(n=d.getMarketingCloudVisitorID(function(t){d.getAnalyticsVisitorID(e,!0)})),n||i){var r=i?d.marketingCloudServer:d.trackingServer,a="";d.loadSSL&&(i?d.marketingCloudServerSecure&&(r=d.marketingCloudServerSecure):d.trackingServerSecure&&(r=d.trackingServerSecure));var s={};if(r){var o="http"+(d.loadSSL?"s":"")+"://"+r+"/id",l="d_visid_ver="+d.version+"&mcorgid="+encodeURIComponent(d.marketingCloudOrgID)+(n?"&mid="+encodeURIComponent(n):"")+(d.idSyncDisable3rdPartySyncing||d.disableThirdPartyCookies?"&d_coppa=true":""),c=["s_c_il",d._in,"_set"+(i?"MarketingCloud":"Analytics")+"Fields"];a=o+"?"+l+"&callback=s_c_il%5B"+d._in+"%5D._set"+(i?"MarketingCloud":"Analytics")+"Fields",s.corsUrl=o+"?"+l,s.callback=c}return s.url=a,d._getRemoteField(i?m:C,a,e,t,s)}}return""},d.getAudienceManagerLocationHint=function(e,t){if(d.isAllowed()){if(d.getMarketingCloudVisitorID(function(t){d.getAudienceManagerLocationHint(e,!0)})){var i=d._getField(C);if(!i&&y.isTrackingServerPopulated()&&(i=d.getAnalyticsVisitorID(function(t){d.getAudienceManagerLocationHint(e,!0)})),i||!y.isTrackingServerPopulated()){var n=d._getAudienceManagerURLData(),r=n.url;return d._getRemoteField("MCAAMLH",r,e,t,n)}}}return""},d.getLocationHint=d.getAudienceManagerLocationHint,d.getAudienceManagerBlob=function(e,t){if(d.isAllowed()){if(d.getMarketingCloudVisitorID(function(t){d.getAudienceManagerBlob(e,!0)})){var i=d._getField(C);if(!i&&y.isTrackingServerPopulated()&&(i=d.getAnalyticsVisitorID(function(t){d.getAudienceManagerBlob(e,!0)})),i||!y.isTrackingServerPopulated()){var n=d._getAudienceManagerURLData(),r=n.url;return d._customerIDsHashChanged&&d._setFieldExpire(I,-1),d._getRemoteField(I,r,e,t,n)}}}return""},d._supplementalDataIDCurrent="",d._supplementalDataIDCurrentConsumed={},d._supplementalDataIDLast="",d._supplementalDataIDLastConsumed={},d.getSupplementalDataID=function(e,t){d._supplementalDataIDCurrent||t||(d._supplementalDataIDCurrent=d._generateID(1));var i=d._supplementalDataIDCurrent;return d._supplementalDataIDLast&&!d._supplementalDataIDLastConsumed[e]?(i=d._supplementalDataIDLast,d._supplementalDataIDLastConsumed[e]=!0):i&&(d._supplementalDataIDCurrentConsumed[e]&&(d._supplementalDataIDLast=d._supplementalDataIDCurrent,d._supplementalDataIDLastConsumed=d._supplementalDataIDCurrentConsumed,d._supplementalDataIDCurrent=i=t?"":d._generateID(1),d._supplementalDataIDCurrentConsumed={}),i&&(d._supplementalDataIDCurrentConsumed[e]=!0)),i},d.getOptOut=function(e,t){if(d.isAllowed()){var i=d._getAudienceManagerURLData("_setMarketingCloudFields"),n=i.url;return d._getRemoteField("MCOPTOUT",n,e,t,i)}return""},d.isOptedOut=function(e,t,i){if(d.isAllowed()){t||(t=u.OptOut.GLOBAL);var n=d.getOptOut(function(i){var n=i===u.OptOut.GLOBAL||i.indexOf(t)>=0;d._callCallback(e,[n])},i);return n?n===u.OptOut.GLOBAL||n.indexOf(t)>=0:null}return!1},d._fields=null,d._fieldsExpired=null,d._hash=function(e){var t,i,n=0;if(e)for(t=0;t<e.length;t++)i=e.charCodeAt(t),n=(n<<5)-n+i,n&=n;return n},d._generateID=H,d._generateLocalMID=function(){var e=d._generateID(0);return T.isClientSideMarketingCloudVisitorID=!0,e},d._callbackList=null,d._callCallback=function(e,t){try{"function"==typeof e?e.apply(c,t):e[1].apply(e[0],t)}catch(e){}},d._registerCallback=function(e,t){t&&(null==d._callbackList&&(d._callbackList={}),void 0==d._callbackList[e]&&(d._callbackList[e]=[]),d._callbackList[e].push(t))},d._callAllCallbacks=function(e,t){if(null!=d._callbackList){var i=d._callbackList[e];if(i)for(;i.length>0;)d._callCallback(i.shift(),t)}},d._addQuerystringParam=function(e,t,i,n){var r=encodeURIComponent(t)+"="+encodeURIComponent(i),a=y.parseHash(e),s=y.hashlessUrl(e);if(-1===s.indexOf("?"))return s+"?"+r+a;var o=s.split("?"),l=o[0]+"?",d=o[1];return l+y.addQueryParamAtLocation(d,r,n)+a},d._extractParamFromUri=function(e,t){var i=new RegExp("[\\?&#]"+t+"=([^&#]*)"),n=i.exec(e);if(n&&n.length)return decodeURIComponent(n[1])},d._parseAdobeMcFromUrl=n(G.ADOBE_MC),d._parseAdobeMcSdidFromUrl=n(G.ADOBE_MC_SDID),d._attemptToPopulateSdidFromUrl=function(t){var i=d._parseAdobeMcSdidFromUrl(t),n=1e9;i&&i.TS&&(n=y.getTimestampInSeconds()-i.TS),i&&i.SDID&&i.MCORGID===e&&n<d.sdidParamExpiry&&(d._supplementalDataIDCurrent=i.SDID,d._supplementalDataIDCurrentConsumed.SDID_URL_PARAM=!0)},d._attemptToPopulateIdsFromUrl=function(){var t=d._parseAdobeMcFromUrl();if(t&&t.TS){var i=y.getTimestampInSeconds(),n=i-t.TS;if(Math.floor(n/60)>G.ADOBE_MC_TTL_IN_MIN||t.MCORGID!==e)return;r(t)}},d._mergeServerState=function(e){if(e)try{if(e=function(e){return y.isObject(e)?e:JSON.parse(e)}(e),e[d.marketingCloudOrgID]){var t=e[d.marketingCloudOrgID];!function(e){y.isObject(e)&&d.setCustomerIDs(e)}(t.customerIDs),s(t.sdid)}}catch(e){throw new Error("`serverState` has an invalid format.")}},d._timeout=null,d._loadData=function(e,t,i,n){t=d._addQuerystringParam(t,"d_fieldgroup",e,1),n.url=d._addQuerystringParam(n.url,"d_fieldgroup",e,1),n.corsUrl=d._addQuerystringParam(n.corsUrl,"d_fieldgroup",e,1),T.fieldGroupObj[e]=!0,n===Object(n)&&n.corsUrl&&"XMLHttpRequest"===M.corsMetadata.corsType&&M.fireCORS(n,i,e)},d._clearTimeout=function(e){null!=d._timeout&&d._timeout[e]&&(clearTimeout(d._timeout[e]),d._timeout[e]=0)},d._settingsDigest=0,d._getSettingsDigest=function(){if(!d._settingsDigest){var e=d.version;d.audienceManagerServer&&(e+="|"+d.audienceManagerServer),d.audienceManagerServerSecure&&(e+="|"+d.audienceManagerServerSecure),d._settingsDigest=d._hash(e)}return d._settingsDigest},d._readVisitorDone=!1,d._readVisitor=function(){if(!d._readVisitorDone){d._readVisitorDone=!0;var e,t,i,n,r,a,s=d._getSettingsDigest(),o=!1,l=d.cookieRead(d.cookieName),c=new Date;if(null==d._fields&&(d._fields={}),l&&"T"!==l)for(l=l.split("|"),l[0].match(/^[\-0-9]+$/)&&(parseInt(l[0],10)!==s&&(o=!0),l.shift()),l.length%2==1&&l.pop(),e=0;e<l.length;e+=2)t=l[e].split("-"),i=t[0],n=l[e+1],t.length>1?(r=parseInt(t[1],10),a=t[1].indexOf("s")>0):(r=0,a=!1),o&&("MCCIDH"===i&&(n=""),r>0&&(r=c.getTime()/1e3-60)),i&&n&&(d._setField(i,n,1),r>0&&(d._fields["expire"+i]=r+(a?"s":""),(c.getTime()>=1e3*r||a&&!d.cookieRead(d.sessionCookieName))&&(d._fieldsExpired||(d._fieldsExpired={}),d._fieldsExpired[i]=!0)));!d._getField(C)&&y.isTrackingServerPopulated()&&(l=d.cookieRead("s_vi"))&&(l=l.split("|"),l.length>1&&l[0].indexOf("v1")>=0&&(n=l[1],e=n.indexOf("["),e>=0&&(n=n.substring(0,e)),n&&n.match(G.VALID_VISITOR_ID_REGEX)&&d._setField(C,n)))}},d._appendVersionTo=function(e){var t="vVersion|"+d.version,i=e?d._getCookieVersion(e):null;return i?x.areVersionsDifferent(i,d.version)&&(e=e.replace(G.VERSION_REGEX,t)):e+=(e?"|":"")+t,e},d._writeVisitor=function(){var e,t,i=d._getSettingsDigest()
;for(e in d._fields)A(e)&&d._fields[e]&&"expire"!==e.substring(0,6)&&(t=d._fields[e],i+=(i?"|":"")+e+(d._fields["expire"+e]?"-"+d._fields["expire"+e]:"")+"|"+t);i=d._appendVersionTo(i),d.cookieWrite(d.cookieName,i,1)},d._getField=function(e,t){return null==d._fields||!t&&d._fieldsExpired&&d._fieldsExpired[e]?null:d._fields[e]},d._setField=function(e,t,i){null==d._fields&&(d._fields={}),d._fields[e]=t,i||d._writeVisitor()},d._getFieldList=function(e,t){var i=d._getField(e,t);return i?i.split("*"):null},d._setFieldList=function(e,t,i){d._setField(e,t?t.join("*"):"",i)},d._getFieldMap=function(e,t){var i=d._getFieldList(e,t);if(i){var n,r={};for(n=0;n<i.length;n+=2)r[i[n]]=i[n+1];return r}return null},d._setFieldMap=function(e,t,i){var n,r=null;if(t){r=[];for(n in t)A(n)&&(r.push(n),r.push(t[n]))}d._setFieldList(e,r,i)},d._setFieldExpire=function(e,t,i){var n=new Date;n.setTime(n.getTime()+1e3*t),null==d._fields&&(d._fields={}),d._fields["expire"+e]=Math.floor(n.getTime()/1e3)+(i?"s":""),t<0?(d._fieldsExpired||(d._fieldsExpired={}),d._fieldsExpired[e]=!0):d._fieldsExpired&&(d._fieldsExpired[e]=!1),i&&(d.cookieRead(d.sessionCookieName)||d.cookieWrite(d.sessionCookieName,"1"))},d._findVisitorID=function(e){return e&&("object"==typeof e&&(e=e.d_mid?e.d_mid:e.visitorID?e.visitorID:e.id?e.id:e.uuid?e.uuid:""+e),e&&"NOTARGET"===(e=e.toUpperCase())&&(e=D),e&&(e===D||e.match(G.VALID_VISITOR_ID_REGEX))||(e="")),e},d._setFields=function(e,t){if(d._clearTimeout(e),null!=d._loading&&(d._loading[e]=!1),T.fieldGroupObj[e]&&T.setState(e,!1),"MC"===e){!0!==T.isClientSideMarketingCloudVisitorID&&(T.isClientSideMarketingCloudVisitorID=!1);var i=d._getField(m);if(!i||d.overwriteCrossDomainMCIDAndAID){if(!(i="object"==typeof t&&t.mid?t.mid:d._findVisitorID(t))){if(d._use1stPartyMarketingCloudServer&&!d.tried1stPartyMarketingCloudServer)return d.tried1stPartyMarketingCloudServer=!0,void d.getAnalyticsVisitorID(null,!1,!0);i=d._generateLocalMID()}d._setField(m,i)}i&&i!==D||(i=""),"object"==typeof t&&((t.d_region||t.dcs_region||t.d_blob||t.blob)&&d._setFields(S,t),d._use1stPartyMarketingCloudServer&&t.mid&&d._setFields(p,{id:t.id})),d._callAllCallbacks(m,[i])}if(e===S&&"object"==typeof t){var n=604800;void 0!=t.id_sync_ttl&&t.id_sync_ttl&&(n=parseInt(t.id_sync_ttl,10));var r=b.getRegionAndCheckIfChanged(t,n);d._callAllCallbacks("MCAAMLH",[r]);var a=d._getField(I);(t.d_blob||t.blob)&&(a=t.d_blob,a||(a=t.blob),d._setFieldExpire(I,n),d._setField(I,a)),a||(a=""),d._callAllCallbacks(I,[a]),!t.error_msg&&d._newCustomerIDsHash&&d._setField("MCCIDH",d._newCustomerIDsHash)}if(e===p){var s=d._getField(C);s&&!d.overwriteCrossDomainMCIDAndAID||(s=d._findVisitorID(t),s?s!==D&&d._setFieldExpire(I,-1):s=D,d._setField(C,s)),s&&s!==D||(s=""),d._callAllCallbacks(C,[s])}if(d.idSyncDisableSyncs||d.disableIdSyncs)b.idCallNotProcesssed=!0;else{b.idCallNotProcesssed=!1;var o={};o.ibs=t.ibs,o.subdomain=t.subdomain,b.processIDCallData(o)}if(t===Object(t)){var l,c;d.isAllowed()&&(l=d._getField("MCOPTOUT")),l||(l=D,t.d_optout&&t.d_optout instanceof Array&&(l=t.d_optout.join(",")),c=parseInt(t.d_ottl,10),isNaN(c)&&(c=7200),d._setFieldExpire("MCOPTOUT",c,!0),d._setField("MCOPTOUT",l)),d._callAllCallbacks("MCOPTOUT",[l])}},d._loading=null,d._getRemoteField=function(e,t,i,n,r){var a,s="",o=y.isFirstPartyAnalyticsVisitorIDCall(e),l={MCAAMLH:!0,MCAAMB:!0};if(d.isAllowed()){d._readVisitor(),s=d._getField(e,!0===l[e]);if(function(){return(!s||d._fieldsExpired&&d._fieldsExpired[e])&&(!d.disableThirdPartyCalls||o)}()){if(e===m||"MCOPTOUT"===e?a="MC":"MCAAMLH"===e||e===I?a=S:e===C&&(a=p),a)return!t||null!=d._loading&&d._loading[a]||(null==d._loading&&(d._loading={}),d._loading[a]=!0,d._loadData(a,t,function(t){if(!d._getField(e)){t&&T.setState(a,!0);var i="";e===m?i=d._generateLocalMID():a===S&&(i={error_msg:"timeout"}),d._setFields(a,i)}},r)),d._registerCallback(e,i),s||(t||d._setFields(a,{id:D}),"")}else s||(e===m?(d._registerCallback(e,i),s=d._generateLocalMID(),d.setMarketingCloudVisitorID(s)):e===C?(d._registerCallback(e,i),s="",d.setAnalyticsVisitorID(s)):(s="",n=!0))}return e!==m&&e!==C||s!==D||(s="",n=!0),i&&n&&d._callCallback(i,[s]),s},d._setMarketingCloudFields=function(e){d._readVisitor(),d._setFields("MC",e)},d._mapCustomerIDs=function(e){d.getAudienceManagerBlob(e,!0)},d._setAnalyticsFields=function(e){d._readVisitor(),d._setFields(p,e)},d._setAudienceManagerFields=function(e){d._readVisitor(),d._setFields(S,e)},d._getAudienceManagerURLData=function(e){var t=d.audienceManagerServer,i="",n=d._getField(m),r=d._getField(I,!0),a=d._getField(C),s=a&&a!==D?"&d_cid_ic=AVID%01"+encodeURIComponent(a):"";if(d.loadSSL&&d.audienceManagerServerSecure&&(t=d.audienceManagerServerSecure),t){var o,l,c=d.getCustomerIDs();if(c)for(o in c)A(o)&&(l=c[o],s+="&d_cid_ic="+encodeURIComponent(o)+"%01"+encodeURIComponent(l.id?l.id:"")+(l.authState?"%01"+l.authState:""));e||(e="_setAudienceManagerFields");var u="http"+(d.loadSSL?"s":"")+"://"+t+"/id",f="d_visid_ver="+d.version+"&d_rtbd=json&d_ver=2"+(!n&&d._use1stPartyMarketingCloudServer?"&d_verify=1":"")+"&d_orgid="+encodeURIComponent(d.marketingCloudOrgID)+"&d_nsid="+(d.idSyncContainerID||0)+(n?"&d_mid="+encodeURIComponent(n):"")+(d.idSyncDisable3rdPartySyncing||d.disableThirdPartyCookies?"&d_coppa=true":"")+(!0===g?"&d_coop_safe=1":!1===g?"&d_coop_unsafe=1":"")+(r?"&d_blob="+encodeURIComponent(r):"")+s,_=["s_c_il",d._in,e];return i=u+"?"+f+"&d_cb=s_c_il%5B"+d._in+"%5D."+e,{url:i,corsUrl:u+"?"+f,callback:_}}return{url:i}},d.appendVisitorIDsTo=function(e){try{var t=[[m,d._getField(m)],[C,d._getField(C)],["MCORGID",d.marketingCloudOrgID]];return d._addQuerystringParam(e,G.ADOBE_MC,o(t))}catch(t){return e}},d.appendSupplementalDataIDTo=function(e,t){if(!(t=t||d.getSupplementalDataID(y.generateRandomString(),!0)))return e;try{var i=o([["SDID",t],["MCORGID",d.marketingCloudOrgID]]);return d._addQuerystringParam(e,G.ADOBE_MC_SDID,i)}catch(t){return e}};var y={parseHash:function(e){var t=e.indexOf("#");return t>0?e.substr(t):""},hashlessUrl:function(e){var t=e.indexOf("#");return t>0?e.substr(0,t):e},addQueryParamAtLocation:function(e,t,i){var n=e.split("&");return i=null!=i?i:n.length,n.splice(i,0,t),n.join("&")},isFirstPartyAnalyticsVisitorIDCall:function(e,t,i){if(e!==C)return!1;var n;return t||(t=d.trackingServer),i||(i=d.trackingServerSecure),!("string"!=typeof(n=d.loadSSL?i:t)||!n.length)&&(n.indexOf("2o7.net")<0&&n.indexOf("omtrdc.net")<0)},isObject:function(e){return Boolean(e&&e===Object(e))},removeCookie:function(e){document.cookie=encodeURIComponent(e)+"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"+(d.cookieDomain?" domain="+d.cookieDomain+";":"")},isTrackingServerPopulated:function(){return!!d.trackingServer||!!d.trackingServerSecure},getTimestampInSeconds:function(){return Math.round((new Date).getTime()/1e3)},parsePipeDelimetedKeyValues:function(e){return e.split("|").reduce(function(e,t){var i=t.split("=");return e[i[0]]=decodeURIComponent(i[1]),e},{})},generateRandomString:function(e){e=e||5;for(var t="",i="abcdefghijklmnopqrstuvwxyz0123456789";e--;)t+=i[Math.floor(Math.random()*i.length)];return t},parseBoolean:function(e){return"true"===e||"false"!==e&&null},replaceMethodsWithFunction:function(e,t){for(var i in e)e.hasOwnProperty(i)&&"function"==typeof e[i]&&(e[i]=t);return e},pluck:function(e,t){return t.reduce(function(t,i){return e[i]&&(t[i]=e[i]),t},Object.create(null))}};d._helpers=y;var b=q(d,u);d._destinationPublishing=b,d.timeoutMetricsLog=[];var T={isClientSideMarketingCloudVisitorID:null,MCIDCallTimedOut:null,AnalyticsIDCallTimedOut:null,AAMIDCallTimedOut:null,fieldGroupObj:{},setState:function(e,t){switch(e){case"MC":!1===t?!0!==this.MCIDCallTimedOut&&(this.MCIDCallTimedOut=!1):this.MCIDCallTimedOut=t;break;case p:!1===t?!0!==this.AnalyticsIDCallTimedOut&&(this.AnalyticsIDCallTimedOut=!1):this.AnalyticsIDCallTimedOut=t;break;case S:!1===t?!0!==this.AAMIDCallTimedOut&&(this.AAMIDCallTimedOut=!1):this.AAMIDCallTimedOut=t}}};d.isClientSideMarketingCloudVisitorID=function(){return T.isClientSideMarketingCloudVisitorID},d.MCIDCallTimedOut=function(){return T.MCIDCallTimedOut},d.AnalyticsIDCallTimedOut=function(){return T.AnalyticsIDCallTimedOut},d.AAMIDCallTimedOut=function(){return T.AAMIDCallTimedOut},d.idSyncGetOnPageSyncInfo=function(){return d._readVisitor(),d._getField("MCSYNCSOP")},d.idSyncByURL=function(e){var t=l(e||{});if(t.error)return t.error;var i,n,r=e.url,a=encodeURIComponent,s=b;return r=r.replace(/^https:/,"").replace(/^http:/,""),i=v.encodeAndBuildRequest(["",e.dpid,e.dpuuid||""],","),n=["ibs",a(e.dpid),"img",a(r),t.ttl,"",i],s.addMessage(n.join("|")),s.requestToProcess(),"Successfully queued"},d.idSyncByDataSource=function(e){return e===Object(e)&&"string"==typeof e.dpuuid&&e.dpuuid.length?(e.url="//dpm.demdex.net/ibs:dpid="+e.dpid+"&dpuuid="+e.dpuuid,d.idSyncByURL(e)):"Error: config or config.dpuuid is empty"},d.publishDestinations=function(e,t,i){if(i="function"==typeof i?i:function(){},"string"!=typeof e||!e.length)return void i({error:"subdomain is not a populated string."});if(!(t instanceof Array&&t.length))return void i({error:"messages is not a populated array."});var n=b;if(!n.readyToAttachIframePreliminary())return void i({error:"The destination publishing iframe is disabled in the Visitor library."});var r=!1;if(t.forEach(function(e){"string"==typeof e&&e.length&&(n.addMessage(e),r=!0)}),!r)return void i({error:"None of the messages are populated strings."});n.iframe?(i({message:"The destination publishing iframe is already attached and loaded."}),n.requestToProcess()):!d.subdomain&&d._getField(m)?(n.subdomain=e,n.doAttachIframe=!0,n.url=n.getUrl(),n.readyToAttachIframe()?(n.iframeLoadedCallbacks.push(function(e){i({message:"Attempted to attach and load the destination publishing iframe through this API call. Result: "+(e.message||"no result")})}),n.attachIframe()):i({error:"Encountered a problem in attempting to attach and load the destination publishing iframe through this API call."})):n.iframeLoadedCallbacks.push(function(e){i({message:"Attempted to attach and load the destination publishing iframe through normal Visitor API processing. Result: "+(e.message||"no result")})})},d._getCookieVersion=function(e){e=e||d.cookieRead(d.cookieName);var t=G.VERSION_REGEX.exec(e);return t&&t.length>1?t[1]:null},d._resetAmcvCookie=function(e){var t=d._getCookieVersion();t&&!x.isLessThan(t,e)||y.removeCookie(d.cookieName)},d.setAsCoopSafe=function(){g=!0},d.setAsCoopUnsafe=function(){g=!1},d.init=function(){!function(){if(t&&"object"==typeof t){d.configs=Object.create(null);for(var e in t)A(e)&&(d[e]=t[e],d.configs[e]=t[e]);d.idSyncContainerID=d.idSyncContainerID||0,g="boolean"==typeof d.isCoopSafe?d.isCoopSafe:y.parseBoolean(d.isCoopSafe),d.resetBeforeVersion&&d._resetAmcvCookie(d.resetBeforeVersion),d._attemptToPopulateIdsFromUrl(),d._attemptToPopulateSdidFromUrl(),d._readVisitor();var i=d._getField(h),n=Math.ceil((new Date).getTime()/G.MILLIS_PER_DAY);d.idSyncDisableSyncs||d.disableIdSyncs||!b.canMakeSyncIDCall(i,n)||(d._setFieldExpire(I,-1),d._setField(h,n)),d.getMarketingCloudVisitorID(),d.getAudienceManagerLocationHint(),d.getAudienceManagerBlob(),d._mergeServerState(d.serverState)}else d._attemptToPopulateIdsFromUrl(),d._attemptToPopulateSdidFromUrl()}(),function(){if(!d.idSyncDisableSyncs&&!d.disableIdSyncs){b.checkDPIframeSrc();var e=function(){var e=b;e.readyToAttachIframe()&&e.attachIframe()};c.addEventListener("load",function(){u.windowLoaded=!0,e()});try{U.receiveMessage(function(e){b.receiveMessage(e.data)},b.iframeHost)}catch(e){}}}(),function(){d.whitelistIframeDomains&&G.POST_MESSAGE_ENABLED&&(d.whitelistIframeDomains=d.whitelistIframeDomains instanceof Array?d.whitelistIframeDomains:[d.whitelistIframeDomains],d.whitelistIframeDomains.forEach(function(t){var i=new k(e,t),n=w(d,i);U.receiveMessage(n,t)}))}()}};return W.getInstance=function(e,t){if(!e)throw new Error("Visitor requires Adobe Marketing Cloud Org ID.");e.indexOf("@")<0&&(e+="@AdobeOrg");var i=function(){var t=a.s_c_il;if(t)for(var i=0;i<t.length;i++){var n=t[i];if(n&&"Visitor"===n._c&&n.marketingCloudOrgID===e)return n}}();if(i)return i;var n=e,r=n.split("").reverse().join(""),s=new W(e,null,r);t===Object(t)&&t.cookieDomain&&(s.cookieDomain=t.cookieDomain),function(){a.s_c_il.splice(--a.s_c_in,1)}();var o=v.getIeVersion();if("number"==typeof o&&o<10)return s._helpers.replaceMethodsWithFunction(s,function(){});var l=function(){try{return a.self!==a.parent}catch(e){return!0}}()&&!function(e){return e.cookieWrite("TEST_AMCV_COOKIE","T",1),"T"===e.cookieRead("TEST_AMCV_COOKIE")&&(e._helpers.removeCookie("TEST_AMCV_COOKIE"),!0)}(s)&&a.parent?new E(e,t,s,a.parent):new W(e,t,r);return s=null,l.init(),l},function(){function e(){W.windowLoaded=!0}a.addEventListener?a.addEventListener("load",e):a.attachEvent&&a.attachEvent("onload",e),W.codeLoadEnd=(new Date).getTime()}(),W.config=X,a.Visitor=W,W}();

;
// File: /js/news/common/public/static/js/module/ad/adobeDataLayer.js
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

  /* global $, RTBF, DIL, Visitor */

  if (typeof DIL !== 'function' || typeof Visitor !== 'function') {
    return;
  }

  if (!RTBF.cookiePolicy || RTBF.cookiePolicy && !RTBF.cookiePolicy.hasSignedAds()) {
    return;
  }

  var $body = $('body');
  var adConfig = $body.data('adConfig');
  var now = new Date();
  var visitor = Visitor.getInstance('988F5B2F5B864CF10A495C1F@AdobeOrg');

  var data = {
    title: document.title,
    type: 'article',
    category_lvl1: adConfig.categoryList[0] || '',
    category_lvl2: adConfig.categoryList[1] || '',
    category_lvl3: adConfig.categoryList[2] || '',
    hourofday: now.getHours(),
    dayofweek: now.getDay() || 7, // convert sunday to 7
    dayofmonth: now.getDate(),
    authenticated: false
  };

  var partnerDil = DIL.create({
    partner: 'rmb',
    uuidCookie: {
      name: 'aam_uuid',
      days: 30
    },
    visitorService: {
      namespace: '988F5B2F5B864CF10A495C1F@AdobeOrg'
    }
  });

  RTBF.sso.fetch(function (error, user) {
    if (!error) {
      data.authenticated = true;

      visitor.setCustomerIDs({
        'crmid': {
          'id': user.dmpHash,
          'authState': Visitor.AuthState.AUTHENTICATED
        }
      });
    }

    partnerDil.api.signals(data, 'c_');
    partnerDil.api.submit();
  });
});
;
// File: /js/news/common/public/static/js/RTBF/ad.js
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

/**
* Ad class
* Depends: adhese sdk
* Depends: pebble js
* Depends: lazySizes (async ads only)
* Depends: postscribe
* Depends: loadJS
*
**/
/* globals postscribe:true, _, ga, jQuery, crtg_content, cX */

// eslint-disable-next-line no-use-before-define
var RTBF = RTBF || {};
// eslint-disable-next-line no-use-before-define
var Adhese = Adhese || {};

(function ($, window, document, RTBF, Adhese) {
  // eslint-disable-line no-shadow
  'use strict';

  var Ad = (function () {
    function Ad() {
      var _this = this;

      _classCallCheck(this, Ad);

      this.$body = $('body');
      this.host = 'https://ads-ipm.adhese.com/';
      this.skinHost = 'https://ads-rmb.adhese.com';
      this.previewHost = 'https://ipm-preview.adhese.org';
      this.resizeTimeout = null;
      this.konventoScript = 'https://pool-pebblemedia.adhese.com/cssu/Konvento_rtbf.js';
      this.debug = window.location.href.indexOf('debug') > -1;
      _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
      this.hasSkin = false;
      this.$skinContainer = $();
      this.testAdBlockUrl = 'https://ads-ipm.adhese.com/ping.json';
      this.firstUrl = true;

      // Consent of the user by default none (for no custom tracking)
      this.consent = 'none';
      if (RTBF && RTBF.cookiePolicy) {
        this.consent = RTBF.cookiePolicy.hasSignedAds() ? 'all' : 'none';
      }

      // Whether the ads are blocked or not.
      this.blocked = null;

      // callbacks proxies
      window.callItBack = $.proxy(this.rubiconCallback, this);
      window.admetaCallback = $.proxy(this.admetaCallback, this);

      this.types = {
        leaderboard: {
          adTypes: ['LEADERBOARD_TOP'],
          adFormats: ['largeleaderboard', 'largeleaderboard-expandable_bb', 'leaderboard', 'leaderboard-expandable_bb', 'billboard', 'tvleaderboard', 'responsivetakeover', 'MEGABANNER_BOTTOM'],
          ratios: ['728by90', '840by150', '970by250', '640by150', '840by250', '1920by250']
        },
        doubleimu: {
          adTypes: ['HALFPAGE_CENTER'],
          adFormats: ['halfpage', 'mediumrectangle', 'mediumrectangle-expandable_bl'],
          ratios: ['300by500']
        },
        imu: {
          adTypes: ['RECTANGLE_CENTER'],
          adFormats: ['mediumrectangle', 'mediumrectangle-expandable_bl'],
          ratios: ['300by250']
        },
        mmr: {
          adTypes: ['MOBILE_RECTANGLE_M'],
          adFormats: ['mobilemediumrectangle'],
          ratios: ['300by250']
        },
        mob: {
          adTypes: ['MOB640x150'],
          adFormats: ['mobilelargeleaderboard', 'mobileresponsivetakeover', 'mobilestaticwidebanner', 'mobileleaderbordxl', 'mobileleaderbordxl2'],
          ratios: ['640by150']
        },
        konvento: {
          adTypes: ['konvento'],
          adFormats: ['konvento'],
          ratios: []
        },
        floorad: {
          adTypes: ['STICKY_FLOORAD'],
          adFormats: ['floorad'],
          ratios: []
        },
        skin: {
          adTypes: ['SKIN'],
          adFormats: [''],
          ratios: ['640by150'] // ratio only for mobile version
        }
      };

      // ad blockers test
      this.testPartners().then(function () {
        // david marketplace scripts loading
        RTBF.loader.js(['https://c.pebblemedia.be/js/data/david/_david_publishers_master_rmb.js', 'https://scdn.cxense.com/cx.js'], function () {
          _this.adhese = new Adhese();
          if (typeof postscribe === 'function') _this.init();
        });
      });
    }

    _createClass(Ad, [{
      key: 'init',
      value: function init() {
        var _this2 = this;

        // eslint-disable-line complexity
        this.config = this.$body.data('adConfig');
        this.blockedApi = this.config.blockedApi; // ad blockers log api
        this.categories = this.config.categoryList.join(';');
        this.rmbCategory = this.config.rmbCategory || '';
        this.rmbProgram = this.config.rmbProgram || '';
        this.rmbSkinVastUrl = this.config.rmbSkinVastUrl || '';

        this.bind();

        // best effort for primary imu & mmr on homepages
        if (!this.$body.find('.js-ad-primary.js-ad-imu, .js-ad-primary.js-ad-doubleimu').length) {
          this.$body.find('.js-ad-imu:first').addClass('js-ad-primary');
        }

        if (!this.$body.find('.js-ad-primary.js-ad-mmr').length) {
          this.$body.find('.js-ad-mmr:first').addClass('js-ad-primary');
        }

        var $primaries = this.$body.find('.js-ad-primary');
        var $secondaries = this.$body.find('.js-ad:visible').not($primaries);

        var $skins = $primaries.filter('.js-ad-skin');
        var $leaderboard = $primaries.filter('.js-ad-leaderboard');
        var $mob = $primaries.not('.js-ad-skin').filter('.js-ad-mob');
        var $others = $primaries.not($skins).not($leaderboard).not($mob);

        // if there is a skin, leaderboard must not be shown
        if ($skins.length) {
          this.prepare($skins);

          $skins.on('ad-prepared', function (e) {
            var data = $(e.target).data('adData');

            if (data) {
              _this2.prepare($others);
              $leaderboard.addClass('hidden js-ad-prepared');
              $mob.addClass('hidden js-ad-prepared');
            } else {
              _this2.campaign($primaries.not('.js-ad-skin'));
            }
          });
        } else {
          this.campaign($primaries.not('.js-ad-skin'));
        }

        this.prepare($secondaries);
      }
    }, {
      key: 'bind',
      value: function bind() {
        var _this3 = this;

        // contentinserted is from infinite, blockready for blockloader
        this.$body.on('contentinserted.ad blockready.ad', function (e, data) {
          e.preventDefault();
          if (data && data.container) {
            var $adNodes = data.container.find('.js-ad:visible');
            _this3.prepare($adNodes);
          }
        });

        this.$body.on('lazybeforeunveil.ad', '.js-ad', function (e) {
          e.preventDefault();
          var $node = $(e.target);

          _this3.load($node);
        });

        $(window).on('resize.ad', function (e) {
          // eslint-disable-line no-unused-vars
          clearTimeout(_this3.resizeTimeout);
          _this3.resizeTimeout = window.setTimeout(function () {
            var $visibleAds = _this3.$body.find('.js-ad:visible');

            _this3.prepare($visibleAds);
            _this3.applyTransformScale($visibleAds);

            if (_this3.hasSkin && RTBF.Utils.isDesktop()) {
              _this3.$skinContainer.addClass('is-active');
            } else if (_this3.hasSkin) {
              _this3.$skinContainer.removeClass('is-active');
            }
          }, 150);
        });
      }
    }, {
      key: 'unbind',
      value: function unbind() {
        this.$body.off('.ad');
      }
    }, {
      key: 'getAdType',
      value: function getAdType(type) {
        if (!this.types[type]) return false;
        return this.types[type].adTypes[0];
      }
    }, {
      key: 'isValidAdFormat',
      value: function isValidAdFormat(type, format) {
        if (!this.types[type]) return false;
        return this.types[type].adFormats.indexOf(format) > -1;
      }
    }, {
      key: 'getAdheseUrl',
      value: function getAdheseUrl(tag, campaign, isPrimary) {
        var extraParam = arguments[3] === undefined ? '' : arguments[3];
        // eslint-disable-line complexity
        var adhese = new Adhese();
        var host = tag === 'SKIN' ? this.skinHost : this.host; // Skin is managed by the RMB
        var publication = tag === 'SKIN' ? this.config.rmbPublication : this.config.publication;
        var location = tag === 'SKIN' ? this.config.rmbLocation : this.config.location;
        var categories = tag === 'SKIN' ? this.rmbCategories : this.categories;

        adhese.init({
          debug: false,
          host: host,
          previewHost: this.previewHost,
          location: '_' + publication + '_' + location + '_'
        });

        var ad = adhese.tag(tag, isPrimary ? {} : { position: '2_' });

        // Build url
        adhese.registerRequestParameter('inallowfloat' + extraParam, ''); // allows 2 floating ads to coexist + rubicon or admeta
        adhese.registerRequestParameter('ct', categories); // concatenated categories
        adhese.registerRequestParameter('se', categories); // concatenated categories, apparently still needed
        adhese.registerRequestParameter('tl', RTBF.cookiePolicy && RTBF.cookiePolicy.hasSignedAds() ? 'all' : 'none'); // targeted delivery of ads

        // Criteo implementation
        if (this.firstUrl) {
          adhese.criteoUserSync({ nid: '4465' });
          this.firstUrl = false;
        }

        if (this.consent !== 'none') {
          // Pubmatic implementation (https://jira.rtbf.be/browse/WWWCOMMON-811)
          adhese.syncUser('pubmatic', { pubmatic_publisher_id: '156572' });
        }

        // eslint-disable-next-line camelcase
        if (crtg_content) {
          adhese.registerRequestParameter('sg', crtg_content.slice(0, -1));
        }

        // david marketplace
        // @see https://jira.rtbf.be/browse/WWWCOMMON-845
        adhese.registerRequestParameter('dg', cX.getUserSegmentIds({ persistedQueryId: '5a69daf3234c0d9a48fcb98edde199ce892308e7' }).join(';'));
        adhese.registerRequestParameter('xu', 'language;fr');

        if (campaign) {
          adhese.addRequestString(campaign);
        }

        if (ad.swfSrc && ad.swfSrc.indexOf('preview/json/tag') === -1) {
          // temporary fix to allow json response
          ad.swfSrc = ad.swfSrc.replace('preview/tag', 'preview/json/tag');
        }

        return ad.swfSrc || adhese.getRequestUri(ad, { type: 'json' });
      }
    }, {
      key: 'fetch',
      value: function fetch($node) {
        var _this4 = this;

        // eslint-disable-line complexity
        var type = $node.data('type');
        var adType = this.getAdType(type);
        var campaign = $node.data('adCampaign');
        var isPrimary = $node.hasClass('js-ad-primary');
        var rubiconDone = $node.data('rubiconDone') ? true : false; // eslint-disable-line no-unneeded-ternary
        var admetaDone = $node.data('admetaDone') ? true : false; // eslint-disable-line no-unneeded-ternary
        var defer = $.Deferred(); // eslint-disable-line new-cap
        var extraParam = '';
        var adheseUrl = '';

        if (type === 'konvento') {
          return defer.resolve({
            ext: 'konvento',
            height: '150px'
          });
        }

        if (admetaDone) {
          extraParam = ';admeta';
        } else if (!rubiconDone) {
          extraParam = ';rbcn';
        }

        if (type === 'skin') {
          adheseUrl = this.getSkinUrl();
        } else {
          adheseUrl = this.getAdheseUrl(adType, campaign, isPrimary, extraParam);
        }

        this.log('fetch', adheseUrl, {
          type: type,
          adType: adType,
          campaign: campaign,
          isPrimary: isPrimary,
          rubiconDone: rubiconDone,
          admetaDone: admetaDone
        });

        $.ajax(adheseUrl, { dataType: 'json', xhrFields: { withCredentials: true } }).done(function (result) {
          var data = result && result[0] ? result[0] : false;

          if (!data) {
            if (!rubiconDone) {
              // If we didn't received any data, retry without rubicon
              $node.data('rubiconDone', true);

              return _this4.fetch($node).then(function (data) {
                return defer.resolve(data);
              });
            }

            _this4.log('no-data', 'No data received from ' + adheseUrl);
            return defer.reject('No data received from ' + adheseUrl);
          }

          // Invalid format.
          if (!_this4.isValidAdFormat(type, data.adFormat)) {
            _this4.log('bad-format', 'The format ' + data.adFormat + ' is not suitable for ' + adType);
            return defer.reject('The format ' + data.adFormat + ' is not suitable for ' + adType);
          }

          return defer.resolve(data);
        }).fail(function (jqXHR, textStatus, errorThrown) {
          return defer.reject('Error HTTP for ' + adheseUrl + ' - ' + errorThrown);
        });

        return defer;
      }
    }, {
      key: 'prepare',
      value: function prepare() {
        var _this5 = this;

        var $nodes = arguments[0] === undefined ? $() : arguments[0];

        var $filtered = $nodes.not('.js-ad-prepared');

        if (!$filtered.length) return;

        $filtered.each(function (i, e) {
          var $node = $(e);

          _this5.fetch($node).done(function (data) {
            _this5.log('prepare', 'Prepare', {
              ad: data
            });

            $node.data('adData', data);

            // Skin has a "slave" node for mobile. (one call => two formats => two nodes)
            if ($node.data('type') === 'skin') {
              $nodes.filter('.js-ad-skin-mobile:first').data('adData', data).addClass('lazyload');
            }

            $node.addClass('js-ad-prepared lazyload');

            _this5.log('received'); // ga stats
            _this5.log($node.data('rubiconDone') ? 'second-level' : 'first-level');
          }).fail(function (error, adheseUrl) {
            // eslint-disable-line no-unused-vars
            _this5.log('http-error', 'XHR fail ' + error);
            if ($node.hasClass('js-ad-hideable')) $node.addClass('hidden');
          }).always(function () {
            // we will pass here only once per ad
            _this5.log('asked'); // ga stats
            $node.addClass('js-ad-prepared');
            $node.trigger('ad-prepared');
          });
        });
      }
    }, {
      key: 'load',
      value: function load() {
        var _this6 = this;

        var $nodes = arguments[0] === undefined ? $() : arguments[0];

        var $filtered = $nodes.not('.js-ad-loaded');

        if (!$filtered.length) return false;

        $filtered.addClass('js-ad-loaded').each(function (i, e) {
          // eslint-disable-line complexity
          var $node = $(e);
          var $wrapper = $node.find('.js-ad-wrapper');
          var adData = $node.data('adData');

          if (!adData) return; // continue

          _this6.log('load', 'Load', {
            ad: adData
          });

          _this6.setupRatio($node);

          switch (adData.ext) {
            case 'gif':
            case 'html':
            case 'jpg':
            case 'png':
            case 'swf':
            case 'zip':
              if (adData.adFormat === 'floorad') {
                if ($('.js-breaking:visible').length) return; // continue
                _this6.buildFloorAd(adData, $wrapper);
              } else if (adData.adType === 'SKIN') {
                _this6.buildSkin($node);
              } else {
                $wrapper.html(adData.tag);
                _this6.resize($node);
              }
              break;

            case 'advar':

              var tag = null;
              var json = null;

              if (adData.adFormat === 'mobileresponsivetakeover' || adData.adFormat === 'responsivetakeover') {
                // responsivetakeover
                try {
                  tag = adData.tag.replace(/'/g, '"');
                  json = JSON.parse(tag);

                  json.url = adData.url;
                } catch (e) {
                  _this6.log('error', 'Error in adlet template json parse: ' + tag);
                  return; // continue
                }
                _this6.buildResponsiveTakeover(json, $wrapper);
              } else {
                $wrapper.empty();
                tag = adData.tag.indexOf('<script') !== 0 ? '<script>' + adData.tag + '</script>' : adData.tag;

                postscribe($wrapper, tag, { done: function done() {
                    _this6.postscribeDone($node);
                  } });
              }
              break;

            case 'js':
              if (adData.adFormat === 'floorad') {
                if ($('.js-breaking:visible').length) return; // continue
                _this6.buildFloorAd({ tag: '' }, $wrapper);
                var tpl = $wrapper.find('.js-ad-tpl');

                postscribe(tpl, adData.body, { done: function done() {
                    _this6.postscribeDone($node);
                  } });
              } else {
                $wrapper.empty();
                postscribe($wrapper, adData.body, { done: function done() {
                    _this6.postscribeDone($node);
                  } });
              }
              break;

            case 'konvento':
              $wrapper.empty();
              postscribe($wrapper, $('<script>', { async: 'async', src: _this6.konventoScript })[0].outerHTML, { done: function done() {
                  _this6.postscribeDone($node);
                } });
              break;

            default:
              return; // continue
          }

          _this6.sendTracking(adData);

          _this6.log('display', adData.adFormat); // ga stats

          /* eslint-disable quote-props */

          var displayValue = {
            'largeleaderboard': 2,
            'largeleaderboard-expandable_bb': 2,
            'leaderboard': 2,
            'leaderboard-expandable_bb': 2,
            'billboard': 2,
            'tvleaderboard': 2,
            'responsivetakeover': 6,
            'halfpage': 2,
            'mediumrectangle': 1,
            'mediumrectangle-expandable_bl': 1,
            'mobilemediumrectangle': 1,
            'mobilelargeleaderboard': 2,
            'mobileresponsivetakeover': 6,
            'konvento': 0,
            'floorad': 2
          };

          /* eslint-enable */

          if (typeof displayValue[adData.adFormat] !== 'undefined' && displayValue[adData.adFormat] >= 0) {
            _this6.gaSendEvent('display', adData.adFormat, displayValue[adData.adFormat]);
          }

          $node.trigger('ad-loaded');
        });
      }
    }, {
      key: 'sendTracking',
      value: function sendTracking(adData) {
        // eslint-disable-line complexity
        // tracking url (3rd party tracking pixel img)
        if (adData.trackingUrl && adData.trackingUrl.indexOf('//') > -1) {
          this.adhese.helper.addTrackingPixel(adData.trackingUrl);
        } else if (adData.adFormat === 'responsivetakeover' && adData.tag.length) {
          // the responsive takeover has a special config with a json wrongly encoded with single quotes
          try {
            var jsonTag = JSON.parse(adData.tag.replace(/'/g, '"'));

            if (jsonTag.tracking_url && jsonTag.tracking_url.length) {
              this.adhese.helper.addTrackingPixel(jsonTag.tracking_url);
            }
          } catch (e) {
            this.log('error', 'Error in json parse for takeover', e);
          }
        }

        // tracker call
        if (adData.tracker && adData.tracker.length) {
          // We can remove the code to force https from 2016/04/01
          if (adData.tracker.indexOf('http://ads-pebblemedia.adhese.com/') > -1) {
            adData.tracker = adData.tracker.replace('http://', 'https://');
          }
          $.ajax(adData.tracker, { xhrFields: { withCredentials: true } });
        }
      }
    }, {
      key: 'buildResponsiveTakeover',
      value: function buildResponsiveTakeover(json, $container) {
        json['mobile_fallback'] = json['mobile-fallback']; // eslint-disable-line dot-notation

        var tpl = $container.find('script[type="text/template"]').html();
        var ad = _.template(tpl);

        $container.html($(ad(json)));
      }
    }, {
      key: 'buildFloorAd',
      value: function buildFloorAd(json, $container) {
        var _this7 = this;

        var count = 15;
        var tpl = $container.find('script[type="text/template"]').html();
        var ad = _.template(tpl);

        $container.html($(ad(json)));
        var $countdown = $container.find('.js-ad-countdown');

        // click close
        $container.find('.js-ad-header').on('click', function (e) {
          e.preventDefault();
          $container.parent('.js-ad-floorad').remove();
        });

        // close after 15 seconds
        this.floorInterval = window.setInterval(function () {
          count--;
          if (count <= 0) {
            clearInterval(_this7.floorInterval);
            $container.parent('.js-ad-floorad').remove();
          } else {
            $countdown.html(count === 1 ? count + ' seconde' : count + ' secondes');
          }
        }, 1000);
      }
    }, {
      key: 'buildSkin',
      value: function buildSkin($node) {
        var $wrapper = $node.find('.js-ad-wrapper');
        var tpl = $node.find('script[type="text/template"]').html();
        var ad = _.template(tpl);
        var adData = $node.data('adData');

        this.hasSkin = true;

        if ($node.hasClass('js-ad-skin-mobile')) {
          $wrapper.html($(ad({ img: adData.swfSrc2nd, url: adData.url })));

          // zero-size-skin-mobile : 'hides' from user to avoid page jump but still be triggered by lazysizes because technically 'visible'
          $node.removeClass('zero-size-skin-mobile');
        } else {
          this.$skinContainer = $node.closest('.js-ad-skin-container');
          this.$skinBgColor = $node.closest('.js-ad-skin-bg-color');
          this.$skinBgColor.css('background-color', adData.extraField1);
          $node.css('background-image', 'url(' + adData.swfSrc + ')');
          $wrapper.html($(ad({ url: adData.url })));
          if (RTBF.Utils.isDesktop()) this.$skinContainer.addClass('is-active');
        }
      }
    }, {
      key: 'campaign',
      value: function campaign() {
        var _this8 = this;

        var $nodes = arguments[0] === undefined ? $() : arguments[0];

        if (!$nodes.length) return;

        var $first = $nodes.first();

        this.prepare($first);

        $first.on('ad-prepared', function () {
          var data = $first.data('adData');

          $nodes.data('adCampaign', data ? data.dm : '');
          _this8.prepare($nodes.not($first));
        });
      }
    }, {
      key: 'rubiconCallback',

      // rubicon: injected scripts do crap stuff
      // then call this callback to either write an ad
      // or has nothing then we make a new prepare() for the node
      // crap detection of the node, they send the slotName
      // slotName is like '_rtbf-info_others_-TopLarge'
      // slotName is not unique, it will always rewrite all the imu_2 into the first imu_2
      value: function rubiconCallback(data) {
        var _this9 = this;

        var $nodes = $('.js-ad-loaded');
        var ad = data.ads[0];
        var slotName = data.inventory.slotname;

        $.each($nodes, function (i, e) {
          var $node = $(e);
          var adData = $node.data('adData');

          if (adData.slotName === slotName) {
            if (ad.status === 'ok') {
              var newAdData = {};

              if (ad.type === 'script') {
                newAdData.ext = 'js';
                newAdData.body = '<script>' + ad.script + '</script>';
              } else if (ad.type === 'html') {
                newAdData.ext = 'html';
                newAdData.body = ad.html;
              }

              $node.removeClass('js-ad-loaded');
              $node.data('adData', newAdData).data('oldAdData', adData).data('rubiconData', data);
              _this9.load($node);
            } else {
              $node.data('rubiconDone', true);
              $node.removeClass('js-ad-prepared js-ad-loaded lazyloaded');
              _this9.prepare($node);
            }

            return false // exit loop
            ;
          }
        });
      }
    }, {
      key: 'admetaCallback',

      /*
       * [admetaCallback description]
       * @param  {string} slotName      request url part (not needed as url is rebuilded anyway)
       * @param  {[type]} placeholderId unique id identifier of the placeholder (usually pebbleWrapxxx)
       * @return {VOID}
       */
      value: function admetaCallback(slotName, placeholderId) {
        this.log('admetaCallback', 'init', [slotName, placeholderId]);

        var $node = $('#' + placeholderId).closest('.js-ad');

        if ($node.length) {
          var adData = $node.data('adData');
          var $wrapper = $node.find('.js-ad-wrapper');

          this.log('admetaCallback', 'node found', [$node, adData, $wrapper]);

          $node.data('admetaDone', true);
          $node.removeClass('js-ad-prepared js-ad-loaded lazyloaded');
          this.prepare($node);
        }
      }
    }, {
      key: 'getSkinUrl',
      value: function getSkinUrl() {
        var url = this.rmbSkinVastUrl.replace('{format}', 'SKIN');

        url = url.replace('{website}', 'www.rtbf.be');
        url = url.replace('{groupepresse}', 'rtbf');
        url = url.replace('{consent}', this.consent);
        url = url.replace(/{.*?}/g, '');

        // add a timestamp (to avoid caching asked by adhese)
        var timestamp = new Date().getTime();

        url += '?t=' + timestamp;

        return url;
      }
    }, {
      key: 'setupRatio',
      value: function setupRatio($node) {
        // eslint-disable-line complexity
        var $wrapper = $node.find('.js-ad-wrapper');
        var type = $node.data('type');
        var ratio = $node.data('ratio');
        var data = $node.data('adData');

        // Do nothing if no current ratio defined
        if (!ratio || !$wrapper.length) return;

        $wrapper.removeClass('rtbf-ad__ratio rtbf-ad__ratio--' + ratio);

        // No ratio for template ads
        if (data.ext === 'advar' && (data.adFormat === 'responsivetakeover' || data.adFormat === 'mobileresponsivetakeover')) return;

        ratio = data.width + 'by' + data.height;

        if (!this.types[type].ratios.length) return;

        // Defaults to the first ratio
        if (this.types[type].ratios.indexOf(ratio) < 0) {
          ratio = this.types[type].ratios[0];
        }

        $node.data('ratio', ratio);
        $wrapper.addClass('rtbf-ad__ratio rtbf-ad__ratio--' + ratio);
      }
    }, {
      key: 'postscribeDone',
      value: function postscribeDone($node) {
        this.resize($node);
      }
    }, {
      key: 'resize',
      value: function resize($node) {
        var _this10 = this;

        this.applyTransformScale($node);
        window.setTimeout(function () {
          _this10.applyTransformScale($node);
        }, 2000);
      }
    }, {
      key: 'applyTransformScale',
      value: function applyTransformScale() {
        var $nodes = arguments[0] === undefined ? $() : arguments[0];

        $nodes.each(function (i, e) {
          var $node = $(e);
          var $iframeNode = $node.find('iframe');

          if ($iframeNode.length) {
            var ratio = $node.find('.js-ad-wrapper').width() / $iframeNode.width();

            ratio = Math.min(1, ratio);

            /* eslint-disable quote-props */

            $iframeNode.css({
              '-ms-zoom': ratio,
              '-moz-transform': 'scale(' + ratio + ')',
              '-o-transform': 'scale(' + ratio + ')',
              '-webkit-transform': 'scale(' + ratio + ')',
              'transform': 'scale(' + ratio + ')',
              '-moz-transform-origin': '0 0',
              '-o-transform-origin': '0 0',
              '-webkit-transform-origin': '0 0',
              'transform-origin': '0 0'
            });
          }
        });
      }
    }, {
      key: 'gaSendEvent',
      value: function gaSendEvent(eventAction) {
        var eventLabel = arguments[1] === undefined ? null : arguments[1];
        var eventValue = arguments[2] === undefined ? null : arguments[2];

        var gaActions = ['blocked', 'not-blocked', 'display'];

        // GA stats
        if (typeof ga === 'function' && gaActions.indexOf(eventAction) > -1) {
          var eventObject = { hitType: 'event', eventCategory: 'ads', eventAction: eventAction, nonInteraction: true };

          if (eventLabel) {
            eventObject.eventLabel = eventLabel;
          }
          if (eventValue) {
            eventObject.eventValue = eventValue;
          }
          ga('send', eventObject);
        }
      }
    }, {
      key: 'log',
      value: function log(key, message, data) {
        if (this.debug) console.log('[Ad]', key, message, data);
      }
    }, {
      key: 'testPartners',
      value: function testPartners() {
        var _this11 = this;

        var defer = $.Deferred(); // eslint-disable-line new-cap

        if (this.blocked !== null) {
          return this.blocked ? defer.reject() : defer.resolve();
        }

        $.ajax({ url: this.testAdBlockUrl, method: 'HEAD' }).then(function () {
          if (typeof Adhese === 'function') {
            _this11.log('not-blocked');
            _this11.gaSendEvent('not-blocked');
            _this11.blocked = false;
            return defer.resolve();
          } else {
            // eslint-disable-line no-else-return
            return defer.reject();
          }
        }).fail(function () {
          _this11.log('blocked');
          _this11.gaSendEvent('blocked');
          _this11.blocked = true;
          return defer.reject();
        });

        return defer;
      }
    }]);

    return Ad;
  })();

  $(function () {
    RTBF.ad = new Ad();
    RTBF.ad.$body.trigger('ad-start');
  });
})(jQuery, window, document, RTBF, Adhese);
// ga stats
// no way to breakpoint that :/ @see onresize too
// load that rubicon crap
// prepare another call to manage that empty rubicon response (that will be the third call, one made by rubicon)
/* eslint-enable */
// eslint-disable-line no-console
;