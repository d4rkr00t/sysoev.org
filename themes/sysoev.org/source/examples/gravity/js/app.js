var APP = APP || {};

var distance;
distance = function (p1, p2) {
    var catet1 = p1.x - p2.x,
        catet2 = p1.y - p2.y;
    return Math.sqrt(catet1*catet1 + catet2*catet2);
};

/**
 * Main DEMO controller
 * @return {undefined}
 */
APP.controller = function () {
    var i,
        layers = APP.layers,
        requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    window.requestAnimationFrame = requestAnimationFrame;

    var center = {x: $(document).width()/2, y:$(document).height()/2},
        count = 0;

    var gen_rnd_planet;
    gen_rnd_planet = function(x, y, id) {
        var size = Math.floor(Math.random()*40) + 10;
        var mass = Math.floor(Math.random()*40) + 10;
        var time = Math.floor(Math.random()*120) + 50;
        return new APP.GBody("planet"+id, {x: x, y:y}, false, size, mass, time, true);
    };

    layers.add_layer("#container", "sun", 2);
    layers.add_layer("#container", "planets", 1);
    layers.add_layer("#container", "tmp", 3);

    var objects = [
        new APP.GBody("sun", center, '#fbc118', 110, 100, 0)
    ];

    var x = $(document).width()/2 + 50,
        y = $(document).height()/2 + 50;
    for (i = 0; i < 3; i++) {
        x += Math.floor(Math.random()*50) + 40;
        y += Math.floor(Math.random()*50) + 40;
        count += 1;
        objects.push(gen_rnd_planet(x, y, i));
    }

    for (i = 0, max = objects.length; i < max; i++) {
        if (i === 0) {
            layers.add_obj("sun", objects[i]);
            layers.draw("sun");
        } else {
            layers.add_obj("planets", objects[i]);
        }
    }

    /**
     * Game draw logic
     */
    var step;
    step = function() {
        layers.draw("planets", objects);
        layers.draw("tmp", []);

        requestAnimationFrame(step);
    };

    /**
     * Drag on canvas on canvas
     */
    var drag = 0,
        drag_start_pos = {x:0,y:0},
        drag_cont = $("#container"),
        tmp_planet = false;

    drag_cont.mousedown(function (evt) {
        drag = 1;
        drag_start_pos.x = evt.pageX;
        drag_start_pos.y = evt.pageY;
    }).mousemove(function (evt) {
        var cur_pos = {x: evt.pageX, y:evt.pageY};
        var size = distance(drag_start_pos, cur_pos);

        if (size < 10) {
            size = 10;
        } else if (size > 80) {
            size = 80;
        }

        if (drag === 1) {
            var mass = Math.floor(Math.random()*40) + 10;
            var time = Math.floor(Math.random()*120) + 50;
            tmp_planet = new APP.GBody("tmp_planet", drag_start_pos, false, size, mass, time, 0);
            layers.add_obj("tmp", tmp_planet);

            drag = 2;
        } else if (tmp_planet) {
            tmp_planet.size = size;
        }
    }).mouseup(function (evt) {

        if (drag === 2) {
            drag = 0;
            objects.push(new APP.GBody("planet"+objects.length,
                tmp_planet.pos,
                tmp_planet.color,
                tmp_planet.size,
                tmp_planet.mass,
                0,
                true));

            objects[objects.length-1].speed = tmp_planet.speed;

            layers.add_obj("planets", objects[objects.length-1]);

            tmp_planet = null;
            drag_start_pos = {x:0,y:0};
        } else {
            drag = 0;
            layers.click('planets', {x: evt.pageX, y: evt.pageY}, function (objs, coords) {
                for (var i = 0, max = objs.length; i < max; i++) {
                    var r = objs[i].size/2,
                        s = objs[i].size / 2.5;
                    if ((coords.x > objs[i].pos.x - r - s) && (coords.x < objs[i].pos.x + r + s) &&
                        (coords.y > objs[i].pos.y - r - s) && (coords.y < objs[i].pos.y + r + s)) {
                        layers.delete_obj('planets', objs[i].name);
                        break;
                    }
                }
            });
        }

        layers.delete_obj("tmp", "tmp_planet");
    });

    requestAnimationFrame(step);
};

$(function(){
    APP.controller();
});