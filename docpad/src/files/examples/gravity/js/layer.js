var APP = APP || {};

APP.layers = (function () {
    var layers = {};

    return {
        /**
         * Add new layer in layers stack
         * @param  {string} cont selector for layer container
         * @param  {string} name of new layer
         * @param  {number} zindex
         * @return {APP.layers}
         */
        add_layer: function (cont, layer_name, zindex) {
            zindex = zindex || 0;
            if (typeof layers[layer_name] === "undefined") {
                var tpl = '<canvas id="'+layer_name+'" style="z-index: '+zindex+'"></canvas>';

                cont = $(cont);
                cont.append(tpl);

                var canvas = document.getElementById(layer_name);
                    canvas.width = cont.width();
                    canvas.height = $(window).height();
                var ctx = canvas.getContext("2d");

                layers[layer_name] = {
                    params: {
                        zindex: zindex,
                        ctx: ctx,
                        width: canvas.width,
                        height: canvas.height
                    },
                    objects: []
                };
            } else {
                throw "Layer with name '" + layer_name + "'' alredy exists!";
            }
            return this;
        },

        /**
         * Add object to layer
         * @param  {string} layer_name name of layer where add the object
         * @param  {object} obj        GBody object
         * @return {APP.layers}
         */
        add_obj: function (layer_name, obj) {
            if (layers[layer_name]) {
                layers[layer_name].objects.push(obj);
            } else {
                throw "Layer with name '" + layer_name + "'' does not exists!";
            }
            return this;
        },

        delete_obj: function (layer_name, name) {
            if (layers[layer_name]) {

                for (var i = 0, max = layers[layer_name].objects.length; i < max; i++) {
                    if (layers[layer_name].objects[i].name === name) {
                        layers[layer_name].objects.splice(i,1);
                        break;
                    }
                }
            } else {
                throw "Layer with name '" + layer_name + "'' does not exists!";
            }
            return this;
        },

        click: function (layer_name, coords, fn) {
            fn(layers[layer_name].objects, coords);
        },

        /**
         * Draw all objects in layer
         * @param  {string} layer_name
         * @param  {array} objects
         * @return {APP.layers}
         */
        draw: function (layer_name, objects) {
            if (layers[layer_name]) {

                layers[layer_name].params.ctx.clearRect(0, 0,
                    layers[layer_name].params.width,
                    layers[layer_name].params.height);

                for (var i = 0, max = layers[layer_name].objects.length; i < max; i++) {
                    if (layers[layer_name].objects[i]) {
                        layers[layer_name].objects[i].update(objects);
                        layers[layer_name].objects[i].draw(layers[layer_name].params.ctx, layers[layer_name].params.name);
                    }
                }
            } else {
                throw "Layer with name '" + layer_name + "'' does not exists!";
            }
            return this;
        }
    };
})();