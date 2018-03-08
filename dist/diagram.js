(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Diagram = factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Integer2 = function () {
    function Integer2() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        classCallCheck(this, Integer2);

        this.x = x;
        this.y = y;
    }

    createClass(Integer2, [{
        key: "distance",
        value: function distance(b) {
            return Math.floor((Math.abs(this.x - b.x) + Math.abs(this.y - b.y)) / 2);
        }
    }, {
        key: "toString",
        value: function toString() {
            return this.value.toString();
        }
    }, {
        key: "equals",
        value: function equals(p) {
            return this.x === p.x && this.y === p.y;
        }
    }, {
        key: "add",
        value: function add(p) {
            return new Integer2(this.x + p.x, this.y + p.y);
        }
    }, {
        key: "scale",
        value: function scale(d) {
            return new Integer2(this.x * d, this.y * d);
        }
    }, {
        key: "cubeLength",
        value: function cubeLength() {
            return Math.floor((Math.abs(this.x) + Math.abs(this.y)) / 2);
        }
    }, {
        key: "value",
        get: function get$$1() {
            return [this.x, this.y];
        }
    }]);
    return Integer2;
}();

var Float2 = function () {
    createClass(Float2, null, [{
        key: "round",
        value: function round(h) {
            var rx = Math.round(h.x);
            var ry = Math.round(h.y);
            return new Integer2(rx, ry);
        }
    }, {
        key: "lerp",
        value: function lerp(a, b, t) {
            return new Float2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
        }
    }, {
        key: "line",
        value: function line(a, b) {
            var N = a.distance(b);
            var results = [];
            for (var i = 0; i < N + 1; i++) {
                results.push(Float2.round(Float2.lerp(a, b, 1.0 / Math.max(1, N) * i)));
            }
            return results;
        }
    }]);

    function Float2() {
        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        classCallCheck(this, Float2);

        this.x = x;
        this.y = y;
    }

    createClass(Float2, [{
        key: "equals",
        value: function equals(p) {
            return this.x === p.x && this.y === p.y;
        }
    }, {
        key: "scale",
        value: function scale(k) {
            return new Float2(this.x * k, this.y * k);
        }
    }, {
        key: "toString",
        value: function toString() {
            return this.value.toString();
        }
    }, {
        key: "value",
        get: function get$$1() {
            return [this.x, this.y];
        }
    }]);
    return Float2;
}();

/** @external */

var Diagram = function () {
    function Diagram(svg, grid) {
        var animation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        classCallCheck(this, Diagram);

        this.translate = new Float2();
        this.fontSize = 14;
        this.duration = 0;
        this.data = {};
        this.showPolygons = true;
        this.showCenters = false;
        this.showCircles = false;
        this.showAxes = false;
        this.showCoordinates = false;
        this.showTiles = false;
        this.svg = svg;
        this.grid = grid;
        this.animation = animation;
        this.root = svg.append("g");
        this.paths = svg.append("g");
        this.init();
    }

    createClass(Diagram, [{
        key: "init",
        value: function init() {
            if (this.nodes) {
                this.duration = 800;
            }
            this.initRoot();
            this.initTiles();
            if (this.showPolygons) {
                this.polygons(null);
            }
            if (this.showCenters) {
                this.centers(null);
            }
            if (this.showCircles) {
                this.circles(null);
            }
            if (this.showCoordinates) {
                this.coordinates(null);
            }
            if (this.showTiles) {
                this.tiles(null);
            }
            if (this.showAxes) {
                this.axes(null);
            }
            return this;
        }
    }, {
        key: "polygons",
        value: function polygons() {
            var _this = this;

            var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            var polygons = void 0;
            if (show === false) {
                this.all.selectAll("g.polygon").selectAll("polygon").remove();
                this.showPolygons = false;
                return this;
            } else if (show === true && !this.showPolygons) {
                polygons = this.all.selectAll("g.polygon").append("polygon");
                this.showPolygons = true;
            } else if (show !== true) {
                this.tilesEnter.selectAll("g.polygon").append("polygon");
                polygons = this.all.selectAll("g.polygon").selectAll("polygon");
                this.showPolygons = true;
            } else {
                return this;
            }
            var paths = [];
            if (!this.grid.irregular) {
                for (var i = 0; i < (this.grid.tileTypes || 0); i++) {
                    paths.push(this.shapePath(i));
                }
            }
            if (this.grid.tileTypes === 1) {
                polygons.attr("points", function (node) {
                    if (_this.grid.irregular) {
                        return _this.grid.vertices(false, 0, 0, _this.data[node].tile).map(function (p) {
                            return p.x.toFixed(3) + "," + p.y.toFixed(3);
                        }).join(" ");
                    } else {
                        return paths[0];
                    }
                });
            } else {
                polygons.attr("points", function (node) {
                    return _this.grid.getTileType ? paths[_this.grid.getTileType(_this.data[node].tile)] : "";
                });
            }
            this.transition(polygons).attr("transform", "rotate(" + this.grid.orientation * this.grid.angle + ")");
            return this;
        }
        /**
         * Show/hide tile center points
         * @param show
         * @returns {Diagramy.Diagram}
         */

    }, {
        key: "centers",
        value: function centers() {
            var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            if (show === false) {
                this.all.selectAll("g.center").selectAll("circle").remove();
                this.showCenters = false;
                return this;
            } else if (show === true && !this.showCenters) {
                this.all.selectAll("g.center").append("circle").attr("class", "center").attr("r", 5);
                this.showCenters = true;
            } else if (show !== true) {
                this.tilesEnter.selectAll("g.center").append("circle").attr("class", "center").attr("r", 5);
            }
            return this;
        }
    }, {
        key: "circles",
        value: function circles() {
            var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            var circles = void 0;
            if (show === false) {
                this.all.selectAll("g.circle").selectAll("circle").remove();
                this.showCircles = false;
                return this;
            } else if (show === true && !this.showCircles) {
                circles = this.all.selectAll("g.circle").append("circle").attr("class", "circle");
                this.showCircles = true;
            } else if (show !== true) {
                this.tilesEnter.selectAll("g.circle").append("circle").attr("class", "circle");
                circles = this.all.selectAll("g.circle").selectAll("circle");
                this.showCircles = true;
            } else {
                return this;
            }
            this.transition(circles).attr("r", this.grid.radius);
            return this;
        }
    }, {
        key: "coordinates",
        value: function coordinates() {
            var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            var tiles = void 0;
            if (show === false) {
                this.all.selectAll("g.coordinates").selectAll("text").remove();
                this.showCoordinates = false;
                return this;
            } else if (show === true && !this.showCoordinates) {
                tiles = this.all.selectAll("g.coordinates").append("text");
                this.showCoordinates = true;
            } else if (show !== true) {
                this.tilesEnter.selectAll("g.coordinates").append("text");
                tiles = this.all.selectAll("g.coordinates").selectAll("text");
                this.showCoordinates = true;
            } else {
                return this;
            }
            var that = this;
            tiles.attr("y", "0.4em").each(function (node) {
                var p = that.grid.toPoint(that.data[node].tile);
                var selection = d3.select(this);
                selection.selectAll("*").remove();
                selection.append("tspan").attr("class", "x").text(p.x);
                selection.append("tspan").text(", ");
                selection.append("tspan").attr("class", "y").text(p.y);
            });
            return this;
        }
    }, {
        key: "axes",
        value: function axes() {
            var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            var tiles = void 0;
            if (show === false) {
                this.all.selectAll("g.axes").selectAll("text").remove();
                this.showAxes = false;
                return this;
            } else if (show === true && !this.showAxes) {
                tiles = this.all.selectAll("g.axes").append("text");
                this.showAxes = true;
            } else if (show !== true) {
                this.tilesEnter.selectAll("g.axes").append("text");
                tiles = this.all.selectAll("g.axes").selectAll("text");
                this.showAxes = true;
            } else {
                return this;
            }
            var that = this;
            tiles.attr("y", "0.4em").each(function (node) {
                var p = that.grid.toPoint(that.data[node].tile);
                var selection = d3.select(this);
                selection.selectAll("*").remove();
                selection.append("tspan").attr("class", "q").text(p.x.toString(25).replace(/./g, function (t) {
                    return t === "-" ? "-" : String.fromCharCode(t.charCodeAt(0) + (t.charCodeAt(0) >= 97 ? 10 : 49));
                }));
                selection.append("tspan").attr("class", "s").text(p.y + 1);
            });
            return this;
        }
    }, {
        key: "values",
        value: function values(data) {
            var that = this;
            this.all.selectAll("g.values").append("text").attr("y", "0.4em").text(function (node) {
                var p = that.grid.toPoint(that.data[node].tile);
                return data[that.data[node].tile.toString()];
            });
            return this;
        }
    }, {
        key: "tiles",
        value: function tiles() {
            var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            var tiles = void 0;
            if (show === false) {
                this.all.selectAll("g.tiles").selectAll("text").remove();
                this.showTiles = false;
                return this;
            } else if (show === true && !this.showTiles) {
                tiles = this.all.selectAll("g.tiles").append("text");
                this.showTiles = true;
            } else if (show !== true) {
                this.tilesEnter.selectAll("g.tiles").append("text");
                tiles = this.all.selectAll("g.tiles").selectAll("text");
                this.showTiles = true;
            } else {
                return this;
            }
            var that = this;
            tiles.attr("y", "0.4em").each(function (node) {
                var selection = d3.select(this);
                var labels = that.data[node].tile.value;
                if (labels[0] === 0 && labels[1] === 0 && labels[2] === 0) {
                    labels = ["x", "y", "z"];
                }
                if (labels[2] === true) {
                    labels[2] = "T";
                } else if (labels[2] === false) {
                    labels[2] = "F";
                }
                selection.selectAll("*").remove();
                selection.append("tspan").attr("class", "q").text(labels[0]);
                selection.append("tspan").attr("class", "s").text(labels[1]);
                selection.append("tspan").attr("class", "r").text(labels[2]);
            });
            if (this.grid.tileTypes === 1) {
                var o = this.grid.vertices(this.grid.orientation, this.grid.scale - this.fontSize * 1.5);
                this.all.select(".tiles .q").attr("x", o[0].x).attr("y", o[0].y + this.fontSize * 0.4);
                this.all.select(".tiles .s").attr("x", o[2].x).attr("y", o[2].y + this.fontSize * 0.4);
                if (o.length > 4) {
                    this.all.select(".tiles .r").attr("x", o[4].x).attr("y", o[4].y + this.fontSize * 0.4);
                } else if (o.length >= 3) {
                    this.all.select(".tiles .r").attr("x", o[1].x).attr("y", o[1].y + this.fontSize * 0.4);
                }
            }
            return this;
        }
        /**
         * Highlight selected tiles
         * @param tiles Array of selected tiles
         * @param classed Optional highlight class
         * @returns {Diagramy.Diagram} For chain call
         */

    }, {
        key: "highlight",
        value: function highlight(tiles) {
            var _this2 = this;

            var classed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "highlight";

            var tileSet = d3.set(tiles);
            this.all.classed(classed, function (node) {
                return tileSet.has(_this2.data[node].tile);
            });
            return this;
        }
    }, {
        key: "path",
        value: function path(tiles, color) {
            var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

            this.paths.selectAll("*").remove();
            if (!tiles || !tiles.length) {
                return this;
            }
            var path = this.paths.append("path").attr("d", "M 0 0").attr("class", "path").attr("style", "stroke: " + color + "; stroke-width: " + width + "px;");
            var d = [];
            for (var i = 0; i < tiles.length; i++) {
                d.push(i === 0 ? "M" : "L");
                d.push(this.grid.center(tiles[i]).toString());
            }
            path.attr("d", d.join(" "));
            return this;
        }
    }, {
        key: "lines",
        value: function lines(tiles, color) {
            var _this3 = this;

            var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;

            this.paths.selectAll("*").remove();
            if (!tiles || !tiles.length) {
                return this;
            }
            var path = this.paths.selectAll("path").data(tiles).enter().append("path").attr("d", "M 0 0").attr("class", "path").attr("style", "stroke: " + color + "; stroke-width: " + width + "px;");
            path.attr("d", function (t) {
                var d = [];
                for (var i = 0; i < t.length; i++) {
                    d.push(i === 0 ? "M" : "L");
                    d.push(_this3.grid.center(t[i]).toString());
                }
                return d.join(" ");
            });
            return this;
        }
    }, {
        key: "search",
        value: function search(_search) {
            var _this4 = this;

            var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "hsl(90, 80%, 80%)";
            var to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "hsl(200, 80%, 80%)";

            if (!_search) {
                this.all.selectAll("g.polygon").selectAll("polygon").style("fill", null);
                return this;
            }
            var color = d3.interpolate(from, to);
            this.all.selectAll("g.polygon").selectAll("polygon").style("fill", function (node) {
                var v = _search.cost[_this4.data[node].key];
                return v >= 0 ? color(v / (_search.max || 1)) : null;
            });
            return this;
        }
    }, {
        key: "point",
        value: function point(xy) {
            var _this5 = this;

            if (!this.pointElement) {
                this.pointElement = this.svg.append("circle");
                this.pointElement.attr("class", "marker").attr("r", 5);
            }
            var tile = this.grid.position(new Float2(xy[0], xy[1]));
            this.pointElement.attr("transform", "translate(" + (xy[0] + this.translate.x) + "," + (xy[1] + this.translate.y) + ")");
            // console.log(xy, tile)
            this.all.classed("highlight", function (node) {
                return _this5.data[node].tile.equals(tile);
            });
            return this;
        }
    }, {
        key: "mousePoint",
        value: function mousePoint() {
            var _this6 = this;

            this.svg.on("mousemove", function () {
                var xy = d3.mouse(_this6.root.node());
                _this6.point(xy);
            });
            return this;
        }
    }, {
        key: "initRoot",
        value: function initRoot() {
            var bounds = this.grid.bounds();
            this.translate = new Float2((parseFloat(this.svg.attr("width")) - bounds.minX - bounds.maxX) / 2, (parseFloat(this.svg.attr("height")) - bounds.minY - bounds.maxY) / 2);
            this.transition(this.root).attr("transform", "translate(" + this.translate + ")");
            this.transition(this.paths).attr("transform", "translate(" + this.translate + ")");
            // this.root.append("rect").attr("class", "bound")
            // .attr("x", bounds.minX).attr("y", bounds.minY)
            // .attr("width", bounds.maxX - bounds.minX).attr("height", bounds.maxY - bounds.minY);
        }
    }, {
        key: "initTiles",
        value: function initTiles() {
            var _this7 = this;

            this.nodes = this.grid.tiles.map(function (n) {
                var d = { tile: n, key: n.toString(), tileKey: _this7.grid.toPoint(n).toString() };
                _this7.data[d.tileKey] = d;
                return d.tileKey;
            });
            this.tilesElements = this.root.selectAll("g.tile").data(this.nodes, function (d) {
                return d;
            });
            this.transition(this.tilesElements.exit(), 0.5).style("opacity", 0).remove();
            var tilesEnter = this.tilesElements.enter().append("g").attr("class", "tile").style("opacity", this.animation ? 0 : 1).attr("transform", function (node) {
                var center = _this7.grid.center(_this7.data[node].tile);
                return "translate(" + center.x + "," + center.y + ")";
            });
            tilesEnter.append("g").attr("class", "polygon");
            tilesEnter.append("g").attr("class", "center");
            tilesEnter.append("g").attr("class", "circle");
            tilesEnter.append("g").attr("class", "axes");
            tilesEnter.append("g").attr("class", "coordinates");
            tilesEnter.append("g").attr("class", "tiles");
            tilesEnter.append("g").attr("class", "values");
            this.transition(this.tilesElements.merge(tilesEnter)).attr("transform", function (node) {
                var center = _this7.grid.center(_this7.data[node].tile);
                return "translate(" + center.x + "," + center.y + ")";
            }).style("opacity", 1);
            this.tilesEnter = tilesEnter;
            this.all = this.tilesEnter.merge(this.tilesElements);
        }
    }, {
        key: "shapePath",
        value: function shapePath(tileType) {
            return this.grid.vertices(undefined, undefined, tileType).map(function (p) {
                return p.x.toFixed(3) + "," + p.y.toFixed(3);
            }).join(" ");
        }
    }, {
        key: "transition",
        value: function transition(selection) {
            var delta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

            return this.animation && this.duration * delta ? selection.transition().duration(this.duration * delta) : selection;
        }
    }]);
    return Diagram;
}();

return Diagram;

})));
