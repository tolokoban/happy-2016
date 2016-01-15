# happy-2016
Just an "happy new year" animation with puppets.

[Launch demo](http://tolokoban.github.io/happy-2016)!

## How it works?

I used only DIVs that I move around and rotate with CSS.

Each character is made hierarchically:
```html
<div id="F" class="perso">
    <div class="head"></div>
    <div class="body"></div>
    <div class="front arm">
        <div class="front arm1"></div>            
        <div class="front arm2"></div>
    </div>
    <div class="back arm">
        <div class="back arm1"></div>            
        <div class="back arm2"></div>
    </div>
    <div class="back leg">
        <div class="back leg1"></div>            
        <div class="back leg2"></div>
    </div>
    <div class="front leg">
        <div class="front leg1"></div>            
        <div class="front leg2"></div>
    </div>
</div>
```
The leg is a child of to the thigh. Then, when the thigh rotate, the leg rotate too.

I positionned the rotation center of each body's part with CSS. HEre is an example for the head of first character:
```css
#F .head  { 
    background-image: url(head1.png);
    width: 12vh;
    height: 14vh;
    left: -1vh;
    top: -11vh;
    transform-origin: 4vh 13vh;
}
```
In order to make my animation work on every kind of screen size, I use the unit `vh` which is relative to the display height. `100vh` is equivalent to the full display height.
Why did I use `vh` instead of `vw`? Because I wanted prevent overlapping of the _Bonne Année_ and the 5 characters, and because most of the targeted displays are in landscape mode. For phones or tablets, it is easy to turn it if the scene overflows horizontally on portrait displays.


After trying to use CSS transitions, I found easier to use direct Javascript for the animation. So I wrote the class __`Perso`__ in order to _program_ sequential animations.
```js
/**
 * Move linearly to `(x, y)`. This target must be reached at time `t`.
 */
Perso.prototype.move = function(t, x, y)
```
```js
/**
 * Rotate to angle `ang` the body's part `id`. This target must be reached at time `t`.
 */
Perso.prototype.rotate = function(t, id, ang)
```

To prevent animation to stop, I add random move and rotation when the program ends.
Because I wanted smooth rotations and not noisy, I used `cosines`:
```js
return value + radius * (Math.cos(-t * seed1) + Math.sin(t * seed2));
```

