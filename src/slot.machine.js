;(function ($) {
  'use strict';

  $.widget('custom.slotMachine', {

    //Options to be used as defaults
    options: {
      someValue: null
    },

    _create: function () {
      console.log('created');
    },

    destroy: function () {
      console.log('destroyed');
    }
  });
})(jQuery);