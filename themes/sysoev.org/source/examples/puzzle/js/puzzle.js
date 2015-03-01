var Puzzle = Puzzle || {};

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

function rndFromTo(from, to)
{
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function Puzzle (selector, parts) {
    this.cont = $(selector);
    this.canvas = this.cont.find('.e-pieces');
    this.gr_img = $(selector + " img");
    this.orig_img_canvas = this.cont.find('.e-orig-image');
    this.orig_img = new Image();
    this.orig_img.src = this.cont.data('orig');
    this.width = this.gr_img.width();
    this.height = this.gr_img.height();
    this.parts = parts;
    this.orig_loaded = false;
    this.stop_drawning = false;
    this.step = 0;
}

Puzzle.prototype.calc_sizes = function() {
    this.size = ~~Math.sqrt(this.width * this.height / this.parts);

    this.cols = ~~(this.width / this.size);
    this.rows = ~~(this.height / this.size);

    while (this.cols * this.rows < this.parts) {
        this.size--;
        this.cols = ~~(this.width / this.size);
        this.rows = ~~(this.height / this.size);
    }

    this.cont.width(this.size * this.cols + 2);
    this.cont.height(this.size * this.rows + 2);
    this.canvas.width(this.size * this.cols + 10);
    this.canvas.height(this.size * this.rows + 10);
    this.orig_img_canvas.width(this.size * this.cols);
    this.orig_img_canvas.height(this.size * this.rows);

    this.parts = this.cols * this.rows;
}

Puzzle.prototype.draw_orig_image = function(ctx) {
    var self = this;
    this.orig_img.onload = function () {
        ctx.drawImage(self.orig_img, 0, 0, self.width, self.height);
        self.orig_loaded = true;
    };
}

Puzzle.prototype.rnd = function() {
    var sides = [-1, 1]
    return sides[rndFromTo(0, 1)];
}

Puzzle.prototype.get_side = function(near_side) {
    if (near_side === 1) {
        return -1;
    } else {
        return 1;
    }
}

Puzzle.prototype.show = function(pieces) {
    this.calc_sizes();
    this.pieces = pieces;

    var ctx = this.canvas[0].getContext('2d'),
        orig_ctx = this.orig_img_canvas[0].getContext('2d'),
        cur_row = 0,
        cur_col = 0,
        count = 0;

    this.pieces_list = {};

    count = Math.floor(this.parts * (pieces / 100));

    /**
     * Resize ing canvas
     */
    ctx.canvas.width = this.size * this.cols + 10;
    ctx.canvas.height = this.size * this.rows + 10;

    orig_ctx.canvas.width = this.size * this.cols;
    orig_ctx.canvas.height = this.size * this.rows;

    /**
     * Draw orig image
     */
    this.draw_orig_image(orig_ctx);


    for (var i = 0; i <= count; i++) {
        var p, pt, pl, pr, pb, st, sr, sb, sl;

        if (cur_row === this.rows) {
            cur_col += 1;
            cur_row = 0;
        }

        if (cur_row === 0 && cur_col === 0) { // left top corner
            p = new Piece(cur_col, cur_row, this.size, [0, this.rnd(), this.rnd(), 0]);
        } else if (cur_col === 0 && cur_row <= this.rows - 1) { // left side
            pt = this.pieces_list[cur_col + "" + (cur_row - 1)];

            st = this.get_side(pt.sides[2]);

            if (cur_row === this.rows - 1) {
                p = new Piece(cur_col, cur_row, this.size, [st, this.rnd(), 0, 0]);
            } else {
                p = new Piece(cur_col, cur_row, this.size, [st, this.rnd(), this.rnd(), 0]);
            }
        } else if (cur_col < this.cols - 1 && cur_row === 0) { // top side
            pl = this.pieces_list[(cur_col - 1) + "" + cur_row];

            sl = this.get_side(pl.sides[1]);

            p = new Piece(cur_col, cur_row, this.size, [0, this.rnd(), this.rnd(), sl]);
        } else if (cur_col === this.cols - 1 && cur_row === 0) { // top right corner
            pl = this.pieces_list[(cur_col - 1) + "" + cur_row];

            sl = this.get_side(pl.sides[1]);

            p = new Piece(cur_col, cur_row, this.size, [0, 0, this.rnd(), sl]);
        } else if (cur_col < this.cols - 1 && cur_row === this.rows - 1) { // bottom side
            pt = this.pieces_list[cur_col + "" + (cur_row - 1)];
            pl = this.pieces_list[(cur_col - 1) + "" + cur_row];

            st = this.get_side(pt.sides[2]);
            sl = this.get_side(pl.sides[1]);

            p = new Piece(cur_col, cur_row, this.size, [st, this.rnd(), 0, sl]);
        } else if (cur_col === this.cols - 1 && cur_row <= this.rows - 1 && cur_row !== 0) { //right side
            pl = this.pieces_list[(cur_col - 1) + "" + cur_row];
            pt = this.pieces_list[cur_col + "" + (cur_row - 1)];

            sl = this.get_side(pl.sides[1]);
            st = this.get_side(pt.sides[2]);

            if (cur_row === this.rows - 1) {
                p = new Piece(cur_col, cur_row, this.size, [st, 0, 0, sl]);
            } else {
                p = new Piece(cur_col, cur_row, this.size, [st, 0, this.rnd(), sl]);
            }
        } else {
            pl = this.pieces_list[(cur_col - 1) + "" + cur_row];
            pt = this.pieces_list[cur_col + "" + (cur_row - 1)];

            if (pt && pl) {
                sl = this.get_side(pl.sides[1]);
                st = this.get_side(pt.sides[2]);

                p = new Piece(cur_col, cur_row, this.size, [st, this.rnd(), this.rnd(), sl]);
            }
        }

        this.pieces_list[cur_col+""+cur_row] = p;

        cur_row += 1;
    }

    var self = this;
    requestAnimationFrame(function () {
        self.drawPieces(count, ctx);
    });
}

Puzzle.prototype.drawPieces = function(count, ctx) {
    if (this.orig_loaded) {
        this.stop_drawning = true;

        var cur_row = 0,
            cur_col = 0;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for (var i = 0; i <= count; i++) {

            if (cur_row === this.rows) {
                cur_col += 1;
                cur_row = 0;
            }
            if (this.step > 240) {
                this.pieces_list[cur_col+""+cur_row].opacity += 0.1;
            }

            this.pieces_list[cur_col+""+cur_row].draw(ctx, this.orig_img_canvas[0]);

            if (this.pieces_list[cur_col+""+cur_row].opacity < 1) {
                this.stop_drawning = false;
            }
            cur_row += 1;
        }

        this.step += 1;
    }
    if (!this.stop_drawning) {
        var self = this;
        requestAnimationFrame(function () {
            self.drawPieces(count, ctx);
        });
    }
}


Piece = function (col, row, size, sides) {
    this.col = col;
    this.row = row;
    this.size = size;
    this.sides = sides;
    this.x = col * size;
    this.y = row * size;
    this.dof = rndFromTo(10, 100) / 5000;
    this.opacity = Math.random() / 100;
}

Piece.prototype.draw = function(ctx, orig_canvas) {
    if (!this.img) {
        var canvas = document.createElement("canvas")
            new_ctx = canvas.getContext('2d');

        new_ctx.canvas.width = orig_canvas.width + 60;
        new_ctx.canvas.height = orig_canvas.height + 60;

        new_ctx.strokeColor = '#000';
        new_ctx.strokeWidth = 1;

        new_ctx.beginPath();
        new_ctx.moveTo(this.x + 30, this.y + 30);

        if (this.sides[0] === 0) {
            new_ctx.lineTo(this.x + 30 + this.size, this.y + 30);
        } else {
            if (this.sides[0] === 1) {
                this.outside(new_ctx, this.size, this.x + 30, this.y + 30);
            } else {
                this.inside(new_ctx, this.size, this.x + 30, this.y + 30);
            }
        }
        if (this.sides[1] === 0) {
            new_ctx.lineTo(this.x + 30 + this.size, this.y + 30 + this.size);
        } else {
            new_ctx.save();
            new_ctx.translate(this.x + 30 + this.size, this.y + 30);
            new_ctx.rotate(Math.PI/2);

            if (this.sides[1] === 1) {
                this.outside(new_ctx, this.size, 0, 0);
            } else {
                this.inside(new_ctx, this.size, 0, 0);
            }

            new_ctx.restore();
        }
        if (this.sides[2] === 0) {
            new_ctx.lineTo(this.x + 30, this.y + 30 + this.size);
        } else {
            new_ctx.save();
            new_ctx.translate(this.x + 30 + this.size, this.y + 30 + this.size);
            new_ctx.rotate(Math.PI);

            if (this.sides[2] === 1) {
                this.outside(new_ctx, this.size, 0, 0);
            } else {
                this.inside(new_ctx, this.size, 0, 0);
            }
            new_ctx.restore();
        }
        if (this.sides[3] === 0) {
            new_ctx.lineTo(this.x + 30, this.y + 30 + this.size);
        } else {
            new_ctx.save();
            new_ctx.translate(this.x + 30, this.y + 30 + this.size);
            new_ctx.rotate(270 * Math.PI/180);

            if (this.sides[3] === 1) {
                this.outside(new_ctx, this.size, 0, 0);
            } else {
                this.inside(new_ctx, this.size, 0, 0);
            }
            new_ctx.restore();
        }

        new_ctx.closePath();
        new_ctx.stroke();
        new_ctx.clip();

        new_ctx.drawImage(orig_canvas, 30, 30);

        new_ctx.stroke();

        new_ctx.translate(this.x + 30, this.y + 30);

        this.img = canvas;
    }
    ctx.save();
    ctx.globalAlpha=this.opacity;
    ctx.drawImage(this.img, -29, -29);
    ctx.restore();
    this.opacity += this.dof;
}

Piece.prototype.outside = function(ctx, s, cx, cy) {
    ctx.lineTo(cx+s*.34, cy);
    ctx.bezierCurveTo(cx+s*.5, cy, cx+s*.4, cy+s*-0.15, cx+s*.4, cy+s*-0.15);
    ctx.bezierCurveTo(cx+s*.3, cy+s*-0.3, cx+s*.5, cy+s*-0.3, cx+s*.5, cy+s*-0.3);
    ctx.bezierCurveTo(cx+s*.7, cy+s*-0.3, cx+s*.6, cy+s*-0.15, cx+s*.6, cy+s*-0.15);
    ctx.bezierCurveTo(cx+s*.5, cy, cx+s*.65, cy, cx+s*.65, cy);
    ctx.lineTo(cx+s, cy);
}
Piece.prototype.inside = function(ctx, s, cx, cy) {
    ctx.lineTo(cx+s*.35, cy);
    ctx.bezierCurveTo(cx+s*.505, cy+.05, cx+s*.405, cy+s*.155, cx+s*.405, cy+s*.1505);
    ctx.bezierCurveTo(cx+s*.3,  cy+s*.3, cx+s*.5,  cy+s*.3, cx+s*.5,  cy+s*.3);
    ctx.bezierCurveTo(cx+s*.7, cy+s*.29, cx+s*.6, cy+s*.15, cx+s*.6, cy+s*.15);
    ctx.bezierCurveTo(cx+s*.5, cy, cx+s*.65, cy, cx+s*.65, cy);
    ctx.lineTo(cx+s, cy);
}

$(function(){
    var puzzle = new Puzzle('.puzzle1', 50);
    puzzle.show(80);

    var puzzle2 = new Puzzle('.puzzle2', 50);
    puzzle2.show(50);
});