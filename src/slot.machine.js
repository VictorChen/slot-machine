;(function ($) {
  'use strict';

  // Boilerplate that all slot machines will need!
  var template = '<div class="slot-header"></div>' +
                 '<div class="slot-main">' +
                   '<div class="slot-bars"></div>' +
                 '</div>' +
                 '<div class="slot-display"></div>';

  $.widget('custom.slotMachine', {

    // Default options
    options: {
      title: 'Slot Machine jQuery Plugin',
      items: [
        ['coffee-maker', 'coffee-filter', 'coffee-grounds'],
        ['teapot', 'tea-strainer', 'loose-tea'],
        ['espresso-machine', 'espresso-tamper', 'espresso-beans']
      ]
    },

    _create: function () {
      // Perform basic validation
      this._validateItems(this.options.items);
      this._createSlotMachine();
    },

    /**
     * Basic validate function to make sure that the user is
     * using the slot machine correctly!
     * @param  {[array]} items items in the slot machine
     */
    _validateItems: function (items) {
      if (!items.length) {
        throw 'slotMachine: no items';
      }
      var numSlots = items[0].length;
      for (var i=1; i<items.length; i++) {
        if (items[i].length !== numSlots) {
          throw 'slotMachine: items need to have the same length';
        }
      }
    },

    _createSlotMachine: function () {
      // Create template
      this.element.append(template);

      var $slotBars = this.element.find('.slot-bars');
      var numColumns = this.options.items[0].length;
      var numRows = this.options.items.length;
      var $column, slotClass;
      

      this.element.find('.slot-header').append(this.options.title);

      // Create the slot bars/boxes
      for (var i=0; i<numColumns; i++) {
        $column = $('<div class="slot-bar"></div>');
        for (var j=0; j<numRows; j++) {
          slotClass = this.options.items[j][i];
          $column.append('<div class="slot-box ' + slotClass + '"></div>');
        }
        $slotBars.append($column);
      }
    },

    /**
     * Done playing? Okay, let's destroy it!
     */
    destroy: function () {
      console.log('destroyed');
    }
  });

})(jQuery);