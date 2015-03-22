# Slot Machine jQuery Widget

## Dependencies

- jQuery
- jQuery UI

## Installing

```
bower install slot-machine
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

## Options

- `numSlotsToShow` (3): The number of slots to show at once.

- `spinSpeed` (200): How fast to spin the reels.

- `easeOutSpeed` (1000): The speed for stopping at a particular slot.

- `minRounds` (7): Minimum number of rounds before it should stop.

- `slotDifferenceFactor` (5): How soon/late the current reel should stop after the previous.

- `hasShaders` (true): Whether or not to show the top/bottom shaders to hide all but the current row.

- `leverThreshold` (0.7): How far the lever must be pulled to start the slot machine. Range from 0.0 - 1.0 (percentage).