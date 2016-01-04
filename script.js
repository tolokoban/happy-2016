// Animation frame in milliseconds.
var FRAME = 500;

window.addEventListener("DOMContentLoaded", function() {
    document.querySelector('header').style.transform = "translateY(0)";
    document.querySelector('footer').style.transform = "translateY(0)";
    document.body.style.backgroundColor = "#756";
    
    var F = new Perso('F');
    var K = new Perso('K');
    var M = new Perso('M');
    var A = new Perso('A');
    var H = new Perso('H');
    var persos = [F, K, M, A, H];
    var scale = 11;
    var xF = -4 * scale;
    var xM = -2 * scale;
    var xA = -.2 * scale;
    var xH = 1.3 * scale;
    var xK = 2.5 * scale;
    F.move(5, xF, 0);
    M.move(5, xM, 0);
    A.move(5, xA, 0);
    H.move(5, xH, 0);
    K.move(5, xK, 0);

    persos.forEach(function (perso) {
        var period = .5 + .2 * Math.random();
        var time = period;
        while (time < 5.5) {
            perso.rotate(time, 'Af', 45);
            perso.rotate(time, 'Ab', -45);
            perso.rotate(time, 'Lf', 45);
            perso.rotate(time, 'Lb', -45);
            perso.rotate(time, 'L2f', -45);
            perso.rotate(time, 'L2b', -45);
            time += period;
            perso.rotate(time, 'Af', -45);
            perso.rotate(time, 'Ab', 45);
            perso.rotate(time, 'Lf', -45);
            perso.rotate(time, 'Lb', 45);
            perso.rotate(time, 'L2f', -45);
            perso.rotate(time, 'L2b', -45);
            time += period;
        }
    });

    H.rotate(6 + Math.random()*.5, 'Af', noise(0));
    H.rotate(6 + Math.random()*.5, 'Ab', noise(0));
    H.rotate(6 + Math.random()*.5, 'Lf', noise(0));
    H.rotate(6 + Math.random()*.5, 'Lb', noise(0));
    H.rotate(6 + Math.random()*.5, 'L2f', noise(0));
    H.rotate(6 + Math.random()*.5, 'L2b', noise(0));

    H.rotate(7 + Math.random()*.5, 'Af', noise(40));
    H.rotate(7 + Math.random()*.5, 'Ab', noise(40));

    M.rotate(6 + Math.random()*.5, 'Af', noise(-90));
    M.rotate(6 + Math.random()*.5, 'Ab', noise(-90));
    M.rotate(6 + Math.random()*.5, 'Lf', noise(0));
    M.rotate(6 + Math.random()*.5, 'Lb', noise(0));
    M.rotate(6 + Math.random()*.5, 'L2f', noise(-90));
    M.rotate(6 + Math.random()*.5, 'L2b', noise(-90));
    M.move(6, xM, 9);

    A.rotate(6 + Math.random()*.5, 'Af', noise(-90));
    A.rotate(6 + Math.random()*.5, 'Ab', noise(-90));
    A.rotate(6 + Math.random()*.5, 'Lf', noise(0));
    A.rotate(6 + Math.random()*.5, 'Lb', noise(0));
    A.rotate(6 + Math.random()*.5, 'L2f', noise(-90));
    A.rotate(6 + Math.random()*.5, 'L2b', noise(-90));
    A.move(6, xA, 9);

    K.rotate(6 + Math.random()*.5, 'Af', noise(-90));
    K.rotate(6 + Math.random()*.5, 'Ab', noise(-90));
    K.rotate(6 + Math.random()*.5, 'Lf', noise(0));
    K.rotate(6 + Math.random()*.5, 'Lb', noise(-90));
    K.rotate(6 + Math.random()*.5, 'L2f', noise(-100));
    K.rotate(6 + Math.random()*.5, 'L2b', noise(100));
    K.move(6, xK, 10);

    F.rotate(5, 'B', 0);

    F.rotate(6 + Math.random()*.5, 'B', noise(30));
    F.rotate(6 + Math.random()*.5, 'Af', noise(90));
    F.rotate(6 + Math.random()*.5, 'Ab', noise(90));
    F.rotate(6 + Math.random()*.5, 'Lf', noise(0));
    F.rotate(6 + Math.random()*.5, 'Lb', noise(0));
    F.rotate(6 + Math.random()*.5, 'L2f', noise(-120));
    F.rotate(6 + Math.random()*.5, 'L2b', noise(-120));

    F.rotate(7 + Math.random()*.5, 'A2f', noise(0));
    F.rotate(7 + Math.random()*.5, 'A2b', noise(0));

    F.rotate(7.5 + Math.random()*.5, 'A2f', noise(-40));
    F.rotate(7.5 + Math.random()*.5, 'A2b', noise(-40));
    F.move(7.5, xF, 10);

    persos.forEach(function (perso) {
        perso.start();
    });

    var anim = function() {
        persos.forEach(function (perso) {
            perso.play();
        });

        window.requestAnimationFrame(function() {
            anim();
        });
    };
    anim();
});


var Perso = function(id) {
    var elem = document.getElementById(id);
    this._id = id;
    this._children = {
        H: elem.querySelector('.head'),
        B: elem.querySelector('.body'),
        Af: elem.querySelector('.arm.front'),
        A2f: elem.querySelector('.arm2.front'),
        Ab: elem.querySelector('.arm.back'),
        A2b: elem.querySelector('.arm2.back'),
        Lf: elem.querySelector('.leg.front'),
        L2f: elem.querySelector('.leg2.front'),
        Lb: elem.querySelector('.leg.back'),
        L2b: elem.querySelector('.leg2.back')
    };
    this._elem = elem;
    this._x = [[0, 100 + 50 * Math.random()]];
    this._y = [[0, 0]];
    this._scaleX = [[0, 1]];
    this._rotate = {
        H: [[0, 0]],
        B: [[0, 0]],
        Af: [[0, 0]],
        A2f: [[0, 0]],
        Ab: [[0, 0]],
        A2b: [[0, 0]],
        Lf: [[0, 0]],
        L2f: [[0, 0]],
        Lb: [[0, 0]],
        L2b: [[0, 0]]
    };
    this._seedX = [Math.random(), Math.random()];
    this._seedY = [Math.random(), Math.random()];
    this._seeds = {
        H: [Math.random(), Math.random()],
        B: [Math.random(), Math.random()],
        Af: [Math.random(), Math.random()],
        A2f: [Math.random(), Math.random()],
        Ab: [Math.random(), Math.random()],
        A2b: [Math.random(), Math.random()],
        Lf: [Math.random(), Math.random()],
        L2f: [Math.random(), Math.random()],
        Lb: [Math.random(), Math.random()],
        L2b: [Math.random(), Math.random()]
    };
};


/**
 * If  `arr`  is equal  to  `[[0,  10],  [1000,  3], [2000,  20]]`  then
 * `interpolate(arr, 1700)` will be equal to:
 * 3 + (20 - 3) * (1700 - 1000) / (2000 - 1000)
 */
function interpolate(arr, t, seed1, seed2, radius) {
    if (arr.length < 1) return 0;
    if (arr.length == 1) return arr[0][1];
    if (t < 1) return arr[0][1];

    if (typeof seed1 === 'undefined') seed1 = 0;
    if (typeof seed2 === 'undefined') seed2 = .7;
    if (typeof radius === 'undefined') radius = .07;


    var i;
    // A couple with `time` and `value`.
    var item;
    var time, value;
    var lastTime = 0;
    var lastValue = 0;
    for (i = 0 ; i < arr.length ; i++) {
        item = arr[i];
        time = item[0];
        value = item[1];
        if (time >= t) {
            value = lastValue + (value - lastValue)
                * (t - lastTime) / (time - lastTime);
            return value;
        }
        lastTime = time;
        lastValue = value;
    }

    // `t` is beyond this array. Let's take the last value with a little
    // random.
    item = arr[arr.length - 1];
    value = item[1];
    // Slow down rotation speed.
    t = t * .01;
    seed1 = 1 + seed1;
    seed2 = 1 + seed2;
    return value + radius * (Math.cos(-t * seed1) + Math.sin(t * seed2));
}


Perso.prototype.start = function() {
    this._t0 = Date.now();
};


Perso.prototype.play = function() {
    var t = Date.now() - this._t0;
    var x = interpolate(this._x, t, this._seedX[0], this._seedX[1]);
    var y = interpolate(this._y, t, this._seedY[0], this._seedY[1]);
    var transform = "";
    // Agathe is flipped horizontally.
    if (this._id == 'A') {
        transform += "scale(-1,1) ";
    }
    transform += "translate(" + x + "vh, " + y + "vh)";

    var id, child;
    // Angle.
    var ang;
    // Transform.
    var tr;

    for (id in this._children) {
        if (id == 'B') {
            transform += " rotate("
                + interpolate(this._rotate.B, t, this._seedX[0], this._seedY[1])
                + "deg)";
        } else {
            child = this._children[id];
            if (!child) continue;
            ang = interpolate(this._rotate[id], t, this._seeds[id][0], this._seeds[id][1], .3);
            tr = "rotate(" + ang + "deg)";
            child.style.transform = tr;
        }
    }
    console.log(transform);
    this._elem.style.transform = transform;
};


Perso.prototype.move = function(t, x, y) {
    this._x.push([t * 1000, x]);
    this._y.push([t * 1000, y]);
};


Perso.prototype.scale = function(t, sx) {
    this._scale.push(t * 1000, sx);
};


Perso.prototype.rotate = function(t, id, ang) {
    this._rotate[id].push([t * 1000, ang]);
};


function noise(v) {
    return v * (.95 + .1 * Math.random());
}
