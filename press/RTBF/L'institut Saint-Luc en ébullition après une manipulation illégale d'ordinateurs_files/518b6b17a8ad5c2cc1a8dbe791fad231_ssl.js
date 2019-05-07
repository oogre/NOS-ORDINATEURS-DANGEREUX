
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