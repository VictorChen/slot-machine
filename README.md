# Slot Machine jQuery Widget

## Dependencies

- jQuery
- jQuery UI

## Installing

```
bower install slot-machine
```

## Getting Started

```html
<div id="simple" class="slot-machine" style="width: 400px; height: 400px;">
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

```js
$('#simple').slotMachine();
```