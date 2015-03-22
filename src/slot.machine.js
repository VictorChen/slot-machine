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
      leverThreshold: 0.7
    },

    _create: function () {
      if (this.options.numSlotsToShow % 2 === 0) {
        // Must be an odd number, otherwise we wont't have a "middle" row
        throw 'slotMachine: numSlotsToShow must be an odd number';
      }

      // Cache these since we will use them later
      this.$slotReels = this.element.find('.slot-reels');
      this.$slotReel = this.$slotReels.children();
      this.numRows = this.$slotReel.length;
      this.numReels = this.$slotReel.eq(0).children().length;

      if (this.options.hasShaders) {
        this._appendShaders();
      }

      this._createLever();
      this._appendExtraSlots();
      this._makeResponsive();
    },

    /**
     * Add the top and bottom shaders so the middle row will stand
     * out.
     */
    _appendShaders: function () {
      // Calculate the height in percentage of the shaders so only
      // one row will not be covered.
      var factor = Math.floor(this.options.numSlotsToShow/2);
      var heightPct = (100/this.options.numSlotsToShow) * factor;

      // Create the shaders
      this.$topShader = $('<div class="slot-top-shader"></div>');
      this.$bottomShader = $('<div class="slot-bottom-shader"></div>');

      // Set the calculated height
      this.$topShader.css('height', heightPct + '%');
      this.$bottomShader.css('height', heightPct + '%');

      // Add them to our slot machine!
      this.$slotReels.prepend(this.$topShader).append(this.$bottomShader);
    },

    /**
     * It's not a slot machine without a lever! Let's create one.
     */
    _createLever: function () {
      var self = this;
      var $slotMain = this.element.find('.slot-main');

      // Create the lever handler
      this.$lever = $('<div class="slot-lever"></div>');

      // Create the level track
      this.$leverTrack = $('<div class="slot-lever-track"></div>');

      // Add them to our slot machine!
      $slotMain.prepend(this.$lever).prepend(this.$leverTrack);

      var leverHeight = this.$lever.height();

      // Make it draggable
      this.$lever.draggable({
        axis: 'y', // Only allow vertical dragging
        containment: $slotMain, // No dragging outside of our slot machine!
        revert: true, // Go back to initial position after drag
        stop: function (event, ui) {
          // Remove the added styles from dragging so it defaults back to
          // our css. This allows the position to stay responsive when
          // resizing the slot machine
          self.$lever.css({left: '', top: ''});

          // Percentage of lever pulled
          var leverPct = ui.position.top / ($slotMain.height() - leverHeight);

          // Spin only if the distance is within the threshold
          if (leverPct >= self.options.leverThreshold) {
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
      this.extraSlots = [];

      this.$slotReel.each(function () {
        var duplicateSlots;
        var $this = $(this);

        // Add slots depending on how many slots can be shown at once
        for (var i=1; i<= self.options.numSlotsToShow; i=i*2) {
          // Save the cloned slots so we can destroy them later
          duplicateSlots = $this.children().clone();
          self.extraSlots.push.apply(self.extraSlots, duplicateSlots);

          // Add cloned slots
          $this.append(duplicateSlots);
        }

        // Align the last slot on the bottom
        $this.css('bottom', 0);
      });
    },

    /**
     * Add styles to reels/slots so they will be responsive.
     */
    _makeResponsive: function () {
      // Add width % so all the reels will have the same width
      this.$slotReel.css('width', 100/this.numRows + '%');

      // Set the height of each slot
      var slotHeightPct = 100/this.options.numSlotsToShow + '%';
      this.element.find('.slot-box').css('height', slotHeightPct);
    },

    /**
     * During the last round of the spin, we need to randomize the
     * slot that the reel will stop in.
     * @param  {[number]} self this
     * @param  {[number]} slotSize height of a slot
     * @return {[object]} random index and bottom position
     */
    _getRandomSlot: function (self, slotSize) {
      // Get a random slot index
      var randomSlot = Math.floor(Math.random() * self.numRows);

      // Calculate the position of the index in terms of pixels
      var stopPoint = Math.floor(randomSlot * slotSize);

      // Go forward one round
      stopPoint += Math.floor(slotSize * self.numRows);

      // Amount of slots to rotate back.
      var offset = Math.floor(self.options.numSlotsToShow / 2);
      stopPoint -= Math.floor(offset * slotSize);

      return {
        index: randomSlot,
        bottom: stopPoint
      };
    },

    /**
     * Animate the spinning by moving the reel up/down.
     * @param  {$object} self this
     * @param  {$object} $reel the reel to spin
     * @param  {[number]} slotSize  height of a slot
     * @param  {[number]} lastSlot 'bottom' position of the reel of the last slot
     * @param  {[number]} count current round
     * @param  {[number]} numRounds number of rounds to spin
     * @param  {[object]} promise resolves when the animation is complete
     */
    _spinAnimation: function (self, $reel, slotSize, lastSlot, count, numRounds, promise) {
      var isLastSpin = count >= numRounds;
      var randomSlot = isLastSpin? self._getRandomSlot(self, slotSize) : null;

      $reel.animate({
        bottom: (randomSlot && randomSlot.bottom) || lastSlot
      }, {
        easing: isLastSpin? 'easeOutBounce' : 'linear',
        duration: isLastSpin? self.options.easeOutSpeed : self.options.spinSpeed,
        complete: function () {
          if (!isLastSpin) {
            // Completed a cycle, reset it back to 0
            $(this).css('bottom', 0);

            // Continue for another round
            self._spinAnimation(self, $reel, slotSize, lastSlot, count + 1, numRounds, promise);
          } else {
            promise.resolve(randomSlot.index);
          }
        }
      });
    },

    /**
     * Start the slot machine!
     */
    spin: function () {
      var self = this;

      // Fire an event before starting
      this._trigger(':spin');

      // Calculate the height of a slot
      var slotSize = this.$slotReel.eq(0).height() / self.options.numSlotsToShow;
      var lastSlot = Math.floor(slotSize * self.numRows);

      // Keep track of when all the reels are done spinning
      var spinPromises = [];

      this.$slotReel.each(function (index) {
        // Number of rounds before the reel should stop. We need to ensure that
        // the first reel will finish before the next reel and so on.
        var numRounds = (index * self.options.slotDifferenceFactor) + self.options.minRounds;

        // Promise to keep track of when the asynchronous animation is done
        var promise = $.Deferred();
        spinPromises.push(promise);

        // Spin each reel
        self._spinAnimation(self, $(this), slotSize, lastSlot, 0, numRounds, promise);
      });

      // All done!
      $.when.apply($, spinPromises).done(self._processResults.bind(self));
    },

    /**
     * Determine whether or not the slots line up. Trigger win/lose
     * events depending on the result.
     */
    _processResults: function () {
      for (var i=1; i<arguments.length; i++) {
        if (arguments[i] !== arguments[0]) {
          // Convert arguments into an actual array
          // Trigger the lose event
          this._trigger(':lose', null, [$.makeArray(arguments)]);
          return;
        }
      }

      // Trigger the win event with the slot index
      this._trigger(':win', null, [arguments[0]]);
    },

    /**
     * Remove everything that was added
     */
    _destroy: function () {
      // Remove shaders
      if (this.options.hasShaders) {
        this.$topShader.remove();
        this.$bottomShader.remove();
      }

      // Remove lever
      this.$lever.remove();
      this.$leverTrack.remove();
      
      // Remove cloned slots
      $.each(this.extraSlots, function (index, $slot) {
        $slot.remove();
      });
    }
  });

})(jQuery);