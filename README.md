# Slot Machine jQuery Widget

## DEMO

http://chenvic.com/slotmachine

## Dependencies

- jQuery
- jQuery UI

## Installing

```
bower install slot-machine
```

Include jQuery and jQuery UI to your page:

```html
<script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
```

Include slot machine js/css:

```html
<link rel="stylesheet" type="text/css" href="slot.machine.css">
<script src="slot.machine.js"></script>
```

## Getting Started

html:

```html
<div id="simple" class="slot-machine">
  <div class="slot-header">Title Text</div>
  <div class="slot-main">
    <div class="slot-reels">
      <ul class="slot-reel">
        <li class="slot-box my-class-1-a"></li>
        <li class="slot-box my-class-2-a"></li>
        <li class="slot-box my-class-3-a"></li>
      </ul>
      <ul class="slot-reel">
        <li class="slot-box my-class-1-a"></li>
        <li class="slot-box my-class-2-b"></li>
        <li class="slot-box my-class-3-c"></li>
      </ul>
      <ul class="slot-reel">
        <li class="slot-box my-class-1-c"></li>
        <li class="slot-box my-class-2-c"></li>
        <li class="slot-box my-class-3-c"></li>
      </ul>
    </div>
  </div>
  <div class="slot-footer">Footer Text</div>
</div>
```

js:

```js
$('#simple').slotMachine();
```

Then, simply style the `slot-box` any way you want (change the color, use an image...etc). You can have as many `slot-reel` as you want and each reel can have as many `slot-box` as you'd like. However, each `slot-reel` must have the same number of slots.

## Constructor Options

- `numSlotsToShow` (3): The number of slots to show at once.

- `spinSpeed` (200): How fast to spin the reels.

- `easeOutSpeed` (1000): The speed for stopping at a particular slot.

- `minRounds` (7): Minimum number of rounds before it should stop.

- `slotDifferenceFactor` (5): How soon/late the current reel should stop after the previous.

- `hasShaders` (true): Whether or not to show the top/bottom shaders to hide all but the current row.

- `leverThreshold` (0.7): How far the lever must be pulled to start the slot machine. Range from 0.0 - 1.0 (percentage).

## Methods

- `$mySlot.slotMachine('spin')`: Triggers the spin

- `$mySlot.slotMachine('destroy')`: Destroys the widget

## Events

- `slotmachine:spin`: triggers before the slot machine starts to spin

- `slotmachine:lose`: triggers when you lose. First argument is the `event` and second is the `results` array of slot indexes.

- `slotmachine:win`: triggers when you win. First argument is the `event` and second is the slot item index.