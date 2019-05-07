
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