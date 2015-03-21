;(function ($) {
  'use strict';

  $.widget('custom.slotMachine', {

    // Default options
    options: {
      numSlotsToShow: 3,
      easeOutSpeed: 1000,
      minRounds: 7,
      slotDifferenceFactor: 5,
      spinSpeed: 200,
      hasShaders: true,
      hasLever: true
    },

    _create: function () {
      if (this.options.numSlotsToShow % 2 === 0) {
        // Must be an odd number, otherwise we don't have a "middle"
        // row
        throw 'slotMachine: numSlotsToShow must be an odd number';
      }

      this.numRows = this.element.find('.slot-bars').children().length;
      this.numColumns = this.element.find('.slot-bar:nth-child(1) .slot-box').length;

      if (this.numRows === 0 || this.numColumns === 0) {
        throw 'slotMachine: missing slots';
      }

      if (this.options.hasShaders) {
        this._appendShaders();
      }

      if (this.options.hasLever) {
        this._createLever();
      }
      
      this._adjustStyles();
      this._appendExtraSlots();
    },

    _adjustStyles: function () {
      this.element.find('.slot-bar').css('width', 100/this.numColumns + '%');
      this.element.find('.slot-box').css('height', 100/this.options.numSlotsToShow + '%');
    },

    /**
     * Add top and bottom shaders so the middle row will stand
     * out. The height of the shaders should be enough such that
     * only one row will not be covered by them.
     */
    _appendShaders: function () {
      var $slotBars = this.element.find('.slot-bars');
      var $topShader = $('<div class="slot-top-shader"></div>');
      var $bottomShader = $('<div class="slot-bottom-shader"></div>');
      var factor = Math.floor(this.options.numSlotsToShow/2);
      var heightPct = (100/this.options.numSlotsToShow) * factor;
      $topShader.css('height', heightPct + '%');
      $bottomShader.css('height', heightPct + '%');
      $slotBars.prepend($topShader);
      $slotBars.append($bottomShader);
    },

    _createLever: function () {
      var self = this;
      var $slotMain = this.element.find('.slot-main');
      var $lever = $('<div class="slot-lever"></div>');
      var $leverTrack = $('<div class="slot-lever-track"></div>');
      $slotMain.prepend($lever).prepend($leverTrack);

      $lever.draggable({
        axis: 'y',
        containment: $slotMain,
        revert: true,
        stop: function (event, ui) {
          $lever.css({
            left: '',
            top: ''
          });

          if ($slotMain.height() - ui.position.top < 50) {
            self.spin();
          }
        }
      });
    },

    /**
     * We need to duplicate slots so we can use them for animation.
     */
    _appendExtraSlots: function () {
      var self = this;
      this.element.find('.slot-bar').each(function () {
        var $this = $(this);
        for (var i=1; i<= self.options.numSlotsToShow; i=i*2) {
          $this.append($this.children().clone());
        }
        $this.css('bottom', 0);
      });
    },

    spin: function () {
      var $slotBars = this.element.find('.slot-bar');
      var self = this;

      $slotBars.each(function (index) {
        var $currentSlot = $(this);
        var slotSize = $currentSlot.height()/self.options.numSlotsToShow;
        var animateFn = function (ease, count, duration, numRounds, goal) {
          $currentSlot.animate({
            bottom: goal || Math.floor(slotSize*self.numRows)
          }, {
            easing: ease || 'linear',
            duration: duration || self.options.spinSpeed,
            complete: function () {
              if (count > numRounds) {
                // We're done
                return;
              }

              // Completed a cycle, reset it back to 0
              $(this).css('bottom', 0);

              if (count === numRounds) {
                // Last round, randomize the stopping point!
                var randomSlot = Math.floor(Math.random() * self.numRows);
                var stopPoint = Math.floor(randomSlot * slotSize);
                console.log(stopPoint);
                animateFn('easeOutBounce', count + 1, 1000, numRounds, stopPoint);
              } else {
                // Continue for another round
                animateFn(null, count + 1, null, numRounds);
              }
            }
          });
        };

        animateFn(null, 0, null, (index * self.options.slotDifferenceFactor) + self.options.minRounds);
      });
    },

    /**
     * Done playing? Okay, let's destroy it!
     */
    destroy: function () {
      // TODO: clean up!
      console.log('destroyed');
    }
  });

})(jQuery);