var APP = APP || {};

APP.GBody = function (name, pos, color, size, mass, time, active) {
    if (!(this instanceof APP.GBody)) {
        return new APP.GBody(pos, color, size, mass, time, active);
    }

    this.degree = function (degrees) {
        return degrees * (Math.PI / 180);
    };
    this.normalizeAngle = function (radians) {
        var deg360 = Math.PI * 2;
        radians %= deg360;

        return radians + ( radians < 0 ? deg360 : 0 );
    };

    var colors = [
        "#67ced3", '#0bbc9f', '#ffab89',
        '#21af65', '#2f99e3', '#9b58b5',
        "#1bbc9b", '#a5f0ed', '#b3454e',
        '#7aba40'
    ];
    this.name = name;
    this.pos   = pos || {x:0, y:0};
    this.color = color || colors[Math.floor(Math.random() * colors.length)];
    this.size  = size || 20;
    this.mass  = mass || 20;
    this.active = active || false;

    this.speed = this.degree(360) / 1000 / time;
    this.angle = 0;
    this.time = 1;
    this.radius = 0;

    this.distance = function (point) {
        var catet1 = this.pos.x - point.x,
            catet2 = this.pos.y - point.y;
        return Math.sqrt(catet1*catet1 + catet2*catet2);
    };

    this.diff = function (point) {
        var x = this.pos.x - point.x,
            y = this.pos.y - point.y;
        return {x:x, y:y};
    };

    this.g_force = function (dist, mass) {
        return ((this.mass * mass) / dist*dist) / 11000000;
    };

    this.centr_force = function (dist) {
        var speed2 = Math.pow(this.speed*10000, 2) / 68;
        return -(this.mass * (speed2 / dist));
    };

    this.apply_force = function (force, center) {
        if (center.x > this.pos.x) {
            this.pos.x += force;
        } else {
            this.pos.x -= force;
        }
        if (center.y > this.pos.y) {
            this.pos.y += force;
        } else {
            this.pos.y -= force;
        }
    };

    /**
     * Update object
     * @return {undefined}
     */
    this.update = function (objects) {
        if (this.active) {
            var solar_center = {x:$(window).width()/2, y:$(window).height()/2},
                angle = this.time * this.speed,
                radius = this.distance(solar_center),
                sides = this.diff(solar_center),
                c_force = this.centr_force(radius);

            this.radius = Math.floor(radius);

            var newAngle = Math.atan2(sides.x, sides.y) - angle * 50;

            var x = Math.sin(newAngle) * radius + solar_center.x;
            var y = Math.cos(newAngle) * radius + solar_center.y;

            this.pos.x = x;
            this.pos.y = y;

            for (var i = 0, max = objects.length; i < max; i++) {
                if (this.name !== objects[i].name) {
                    var gf = this.g_force(radius, objects[i].mass);
                    this.apply_force(gf, objects[i].pos);
                }
            }

            this.apply_force(c_force, solar_center);
        }
    };

    /**
     * Draw object
     * @param  {object} ctx canvas context
     * @return {undefined}
     */
    this.draw = function (ctx) {

        if (this.name !== "sun") {
            ctx.save();

            ctx.fillStyle = "#fff";
            ctx.textAlign = "center";
            ctx.fillText(this.radius, this.pos.x, this.pos.y + this.size + 5);

            ctx.restore();

            ctx.save();
            ctx.globalAlpha = 0.15;
            ctx.strokeStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo($(window).width()/2, $(window).height()/2);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc($(window).width()/2, $(window).height()/2, this.radius, 0, Math.PI*2, false);
            ctx.closePath();
            ctx.stroke();
            ctx.globalAlpha = 0.02;
            ctx.fillStyle = this.color;
            ctx.fill();

            ctx.restore();
        }

        ctx.save();

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.size/2, 0, Math.PI*2, false);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size / 2.5;
        ctx.globalAlpha = 0.3;
        ctx.stroke();

        ctx.restore();
    };
};