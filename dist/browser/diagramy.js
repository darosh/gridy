(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Diagramy = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var Gridy;
(function (Gridy) {
    'use strict';
})(Gridy || (Gridy = {}));
/// <reference path="Integer.ts" />
var Gridy;
(function (Gridy) {
    'use strict';
})(Gridy || (Gridy = {}));
var Gridy;
(function (Gridy) {
    'use strict';
})(Gridy || (Gridy = {}));
/// <reference path="IVector.ts" />
/// <reference path="Integer.ts" />
var Gridy;
(function (Gridy) {
    'use strict';
    var Integer2 = (function () {
        function Integer2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        Integer2.prototype.v = function () {
            return [this.x, this.y];
        };
        Integer2.prototype.distance = function (b) {
            return Math.floor((Math.abs(this.x - b.x) + Math.abs(this.y - b.y)) / 2);
        };
        Integer2.prototype.toString = function () {
            return this.x + ',' + this.y;
        };
        Integer2.prototype.equals = function (p) {
            return (this.x === p.x) && (this.y === p.y);
        };
        Integer2.prototype.add = function (p) {
            return new Integer2(this.x + p.x, this.y + p.y);
        };
        Integer2.prototype.scale = function (d) {
            return new Integer2(this.x * d, this.y * d);
        };
        Integer2.prototype.cubeLength = function () {
            return Math.floor((Math.abs(this.x) + Math.abs(this.y)) / 2);
        };
        return Integer2;
    })();
    Gridy.Integer2 = Integer2;
})(Gridy || (Gridy = {}));
var Gridy;
(function (Gridy) {
    'use strict';
})(Gridy || (Gridy = {}));
/// <reference path="IVector.ts" />
/// <reference path="Integer.ts" />
/// <reference path="Integer2.ts" />
/// <reference path="Float.ts" />
var Gridy;
(function (Gridy) {
    'use strict';
    var Float2 = (function () {
        function Float2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        Float2.round = function (h) {
            var rx = Math.round(h.x);
            var ry = Math.round(h.y);
            return new Gridy.Integer2(rx, ry);
        };
        Float2.lerp = function (a, b, t) {
            return new Float2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
        };
        Float2.line = function (a, b) {
            var N = a.distance(b);
            var results = [];
            for (var i = 0; i < (N + 1); i++) {
                results.push(Float2.round(Float2.lerp(a, b, 1.0 / Math.max(1, N) * i)));
            }
            return results;
        };
        Float2.prototype.equals = function (p) {
            return (this.x === p.x) && (this.y === p.y);
        };
        Float2.prototype.v = function () {
            return [this.x, this.y];
        };
        Float2.prototype.scale = function (k) {
            return new Float2(this.x * k, this.y * k);
        };
        Float2.prototype.toString = function () {
            return this.v().join(',');
        };
        return Float2;
    })();
    Gridy.Float2 = Float2;
})(Gridy || (Gridy = {}));
/// <reference path="Integer2.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gridy;
(function (Gridy) {
    'use strict';
    var Position = (function (_super) {
        __extends(Position, _super);
        function Position() {
            _super.apply(this, arguments);
        }
        return Position;
    })(Gridy.Integer2);
    Gridy.Position = Position;
})(Gridy || (Gridy = {}));
/// <reference path="Float.ts" />
var Gridy;
(function (Gridy) {
    'use strict';
    var Rectangle = (function () {
        function Rectangle(minX, maxX, minY, maxY) {
            if (minX === void 0) { minX = 0; }
            if (maxX === void 0) { maxX = 0; }
            if (minY === void 0) { minY = 0; }
            if (maxY === void 0) { maxY = 0; }
            this.minX = 0;
            this.maxX = 0;
            this.minY = 0;
            this.maxY = 0;
            this.minX = minX;
            this.maxX = maxX;
            this.minY = minY;
            this.maxY = maxY;
        }
        Rectangle.add = function (a, b) {
            return new Rectangle(a.minX + b.minX, a.maxX + b.maxX, a.minY + b.minY, a.maxY + b.maxY);
        };
        return Rectangle;
    })();
    Gridy.Rectangle = Rectangle;
})(Gridy || (Gridy = {}));
/// <reference path="Integer.ts" />
/// <reference path="Float.ts" />
/// <reference path="Float2.ts" />
/// <reference path="Position.ts" />
/// <reference path="Rectangle.ts" />
var Gridy;
(function (Gridy) {
    'use strict';
})(Gridy || (Gridy = {}));
// From http://www.redblobgames.com/grids/hexagons/
// Copyright 2013 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
// Original source: http://www.redblobgames.com/grids/hexagons/ui.js
/// <reference path="ITile.ts" />
var Gridy;
(function (Gridy) {
    'use strict';
    var Search = (function () {
        function Search(start, maxMovement, maxMagnitude, blocked, available) {
            var _this = this;
            if (available === void 0) { available = null; }
            this.cost = {};
            this.previous = {};
            this.max = 0;
            this.start = start;
            this.cost[start.toString()] = 0;
            this.previous[start.toString()] = null;
            var fringes = [[start]];
            for (var k = 0; k < maxMovement && fringes[k].length > 0; k++) {
                fringes[k + 1] = [];
                fringes[k].forEach(function (tile) {
                    var neighbors = tile.neighbors();
                    for (var dir = 0; dir < neighbors.length; dir++) {
                        var neighbor = neighbors[dir];
                        if (available && !available[neighbor.toString()]) {
                            continue;
                        }
                        if ((_this.cost[neighbor.toString()] === undefined) && !blocked[neighbor.toString()] && neighbor.cubeLength() <= maxMagnitude) {
                            _this.cost[neighbor.toString()] = k + 1;
                            _this.max = Math.max(_this.max, k + 1);
                            _this.previous[neighbor.toString()] = tile;
                            fringes[k + 1].push(neighbor);
                        }
                    }
                });
            }
        }
        Search.prototype.path = function (end) {
            var path = [];
            var node = end;
            while (node) {
                path.push(node);
                node = node.equals(this.start) ? null : this.previous[node.toString()];
            }
            return path;
        };
        return Search;
    })();
    Gridy.Search = Search;
})(Gridy || (Gridy = {}));
// From http://www.redblobgames.com/grids/hexagons/
// Copyright 2013 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
// Original source: http://www.redblobgames.com/grids/hexagons/ui.js
/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />
/// <reference path="../gridy/ITile.ts" />
/// <reference path="../gridy/Float2.ts" />
/// <reference path="../gridy/IGrid.ts" />
/// <reference path="../gridy/Search.ts" />
var Diagramy;
(function (Diagramy) {
    'use strict';
    /* tslint:disable:no-var-requires */
    var d3 = global.d3 || require('d3');
    var Diagram = (function () {
        function Diagram(svg, grid, animation) {
            if (animation === void 0) { animation = true; }
            this.fontSize = 14;
            this.duration = 0;
            this.data = {};
            this._polygons = true;
            this._centers = false;
            this._circles = false;
            this._coordinates = false;
            this._tileCoordinates = false;
            this.svg = svg;
            this.grid = grid;
            this.animation = animation;
            this.root = svg.append('g');
            this.paths = svg.append('g');
            this.init();
        }
        Diagram.prototype.init = function () {
            if (this.nodes) {
                this.duration = 800;
            }
            this.initRoot();
            var tilesEnter = this.initTiles();
            if (this._polygons) {
                this.polygons(tilesEnter);
            }
            if (this._centers) {
                this.centers(tilesEnter);
            }
            if (this._circles) {
                this.circles(tilesEnter);
            }
            if (this._coordinates) {
                this.coordinates(tilesEnter);
            }
            if (this._tileCoordinates) {
                this.tileCoordinates(tilesEnter);
            }
            return this;
        };
        Diagram.prototype.polygons = function (show) {
            var _this = this;
            if (show === void 0) { show = true; }
            var tiles;
            if (show === false) {
                this.tiles.selectAll('g.polygon').selectAll('polygon').remove();
                this._polygons = false;
                return this;
            }
            else if (show === true && !this._polygons) {
                tiles = this.tiles.selectAll('g.polygon');
                tiles.append('polygon');
                this._polygons = true;
            }
            else if (show !== true) {
                tiles = show.selectAll('g.polygon');
                tiles.append('polygon');
            }
            var polygons = this.tiles.selectAll('g.polygon').selectAll('polygon');
            var paths = [];
            for (var i = 0; i < this.grid.tileTypes; i++) {
                paths.push(this.shapePath(i));
            }
            if (this.grid.tileTypes === 1) {
                polygons.attr('points', paths[0]);
            }
            else {
                polygons.attr('points', function (node) {
                    return paths[_this.grid.getTileType(_this.data[node].tile)];
                });
            }
            this.transition(polygons).attr('transform', 'rotate(' + (this.grid.orientation * this.grid.angle) + ')');
            return this;
        };
        Diagram.prototype.centers = function (show) {
            if (show === void 0) { show = true; }
            var tiles;
            if (show === false) {
                this.tiles.selectAll('g.center').selectAll('circle').remove();
                this._centers = false;
                return this;
            }
            else if (show === true && !this._centers) {
                tiles = this.tiles.selectAll('g.center');
                tiles.append('circle').attr('class', 'center').attr('r', 5);
                this._centers = true;
            }
            else if (show !== true) {
                tiles = show.selectAll('g.center');
                tiles.append('circle').attr('class', 'center').attr('r', 5);
            }
            return this;
        };
        Diagram.prototype.circles = function (show) {
            if (show === void 0) { show = true; }
            var tiles;
            if (show === false) {
                this.tiles.selectAll('g.circle').selectAll('circle').remove();
                this._circles = false;
                return this;
            }
            else if (show === true && !this._circles) {
                tiles = this.tiles.selectAll('g.circle');
                tiles.append('circle').attr('class', 'circle');
                this._circles = true;
            }
            else if (show !== true) {
                tiles = show.selectAll('g.circle');
                tiles.append('circle').attr('class', 'circle');
            }
            this.transition(this.tiles.selectAll('g.circle').selectAll('circle')).attr('r', this.grid.radius);
            return this;
        };
        Diagram.prototype.coordinates = function (show) {
            if (show === void 0) { show = true; }
            var tiles;
            if (show === false) {
                this.tiles.selectAll('g.coordinates').selectAll('text').remove();
                this._coordinates = false;
                return this;
            }
            else if (show === true && !this._coordinates) {
                tiles = this.tiles.selectAll('g.coordinates');
                this._coordinates = true;
            }
            else if (show !== true) {
                tiles = show.selectAll('g.coordinates');
            }
            if (tiles) {
                var _this = this;
                tiles.append('text').attr('y', '0.4em').each(function (node) {
                    var p = _this.grid.toPoint(_this.data[node].tile);
                    var selection = d3.select(this);
                    selection.append('tspan').attr('class', 'x').text(p.x);
                    selection.append('tspan').text(', ');
                    selection.append('tspan').attr('class', 'y').text(p.y);
                });
            }
            return this;
        };
        Diagram.prototype.tileCoordinates = function (show) {
            if (show === void 0) { show = true; }
            var tiles;
            if (show === false) {
                this.tiles.selectAll('g.tile-coordinates').selectAll('text').remove();
                this._tileCoordinates = false;
                return this;
            }
            else if (show === true && !this._tileCoordinates) {
                tiles = this.tiles.selectAll('g.tile-coordinates');
                this._tileCoordinates = true;
            }
            else if (show !== true) {
                this.tiles.selectAll('g.tile-coordinates').selectAll('text').remove();
                // tiles = show.selectAll('g.tile-coordinates');
                tiles = this.tiles.selectAll('g.tile-coordinates');
            }
            if (tiles) {
                var _this = this;
                tiles.append('text').attr('y', '0.4em').each(function (node) {
                    var selection = d3.select(this);
                    var labels = _this.data[node].tile.v();
                    if (labels[0] === 0 && labels[1] === 0 && labels[2] === 0) {
                        labels = ['x', 'y', 'z'];
                    }
                    if (labels[2] === true) {
                        labels[2] = 'T';
                    }
                    else if (labels[2] === false) {
                        labels[2] = 'F';
                    }
                    selection.append('tspan').attr('class', 'q').text(labels[0]);
                    selection.append('tspan').attr('class', 's').text(labels[1]);
                    selection.append('tspan').attr('class', 'r').text(labels[2]);
                });
                var o = this.grid.vertices(this.grid.orientation, this.grid.scale - this.fontSize * 1.5);
                this.tiles.select('.q').attr('x', o[0].x).attr('y', o[0].y + this.fontSize * 0.4);
                this.tiles.select('.s').attr('x', o[2].x).attr('y', o[2].y + this.fontSize * 0.4);
                if (o.length > 4) {
                    this.tiles.select('.r').attr('x', o[4].x).attr('y', o[4].y + this.fontSize * 0.4);
                }
                else if (o.length >= 3) {
                    this.tiles.select('.r').attr('x', o[1].x).attr('y', o[1].y + this.fontSize * 0.4);
                }
            }
            return this;
        };
        Diagram.prototype.highlight = function (tiles, classed) {
            var _this = this;
            if (classed === void 0) { classed = 'highlight'; }
            var tileSet = d3.set(tiles);
            this.tiles.classed(classed, function (node) {
                return tileSet.has(_this.data[node].tile);
            });
            return this;
        };
        Diagram.prototype.path = function (tiles) {
            this.paths.selectAll('*').remove();
            if (!tiles || !tiles.length) {
                return this;
            }
            var path = this.paths.append('path').attr('d', 'M 0 0').attr('class', 'path');
            var d = [];
            for (var i = 0; i < tiles.length; i++) {
                d.push(i === 0 ? 'M' : 'L');
                d.push(this.grid.center(tiles[i]).toString());
            }
            path.attr('d', d.join(' '));
            return this;
        };
        Diagram.prototype.search = function (search, from, to) {
            var _this = this;
            if (from === void 0) { from = 'hsl(90, 80%, 80%)'; }
            if (to === void 0) { to = 'hsl(200, 80%, 80%)'; }
            if (!search) {
                this.tiles.selectAll('g.polygon').selectAll('polygon').style('fill', null);
                return this;
            }
            var color = d3.interpolate(from, to);
            this.tiles.selectAll('g.polygon').selectAll('polygon').style('fill', function (node) {
                var v = search.cost[_this.data[node].key];
                return (v >= 0) ? color(v / (search.max || 1)) : null;
            });
            return this;
        };
        Diagram.prototype.point = function (xy) {
            var _this = this;
            if (!this.pointElement) {
                this.pointElement = this.svg.append('circle');
                this.pointElement.attr('class', 'marker').attr('r', 5);
            }
            var tile = this.grid.position(new Gridy.Float2(xy[0], xy[1]));
            this.pointElement.attr('transform', 'translate(' + (xy[0] + this.translate.x) + ',' + (xy[1] + this.translate.y) + ')');
            this.tiles.classed('highlight', function (node) {
                return _this.data[node].tile.equals(tile);
            });
            return this;
        };
        Diagram.prototype.mousePoint = function () {
            var _this = this;
            this.svg.on('mousemove', function () {
                var xy = d3.mouse(_this.root.node());
                _this.point(xy);
            });
            return this;
        };
        Diagram.prototype.initRoot = function () {
            var bounds = this.grid.bounds();
            this.translate = new Gridy.Float2((parseFloat(this.svg.attr('width')) - bounds.minX - bounds.maxX) / 2, (parseFloat(this.svg.attr('height')) - bounds.minY - bounds.maxY) / 2);
            this.transition(this.root).attr('transform', 'translate(' + this.translate + ')');
            this.transition(this.paths).attr('transform', 'translate(' + this.translate + ')');
        };
        Diagram.prototype.initTiles = function () {
            var _this = this;
            this.nodes = this.grid.tiles.map(function (n) {
                var d = { tile: n, key: n.toString(), tileKey: _this.grid.toPoint(n).toString() };
                _this.data[d.tileKey] = d;
                return d.tileKey;
            });
            this.tiles = this.root.selectAll('g.tile').data(this.nodes, function (d) {
                return d;
            });
            this.transition(this.tiles.exit(), 0.5).style('opacity', 0).remove();
            var tilesEnter = this.tiles.enter().append('g').attr('class', 'tile').style('opacity', this.animation ? 0 : 1).attr('transform', function (node) {
                var center = _this.grid.center(_this.data[node].tile);
                return 'translate(' + center.x + ',' + center.y + ')';
            });
            tilesEnter.append('g').attr('class', 'polygon').empty();
            tilesEnter.append('g').attr('class', 'center').empty();
            tilesEnter.append('g').attr('class', 'circle').empty();
            tilesEnter.append('g').attr('class', 'coordinates').empty();
            tilesEnter.append('g').attr('class', 'tile-coordinates').empty();
            this.transition(this.tiles).attr('transform', function (node) {
                var center = _this.grid.center(_this.data[node].tile);
                return 'translate(' + center.x + ',' + center.y + ')';
            }).style('opacity', 1);
            return tilesEnter;
        };
        Diagram.prototype.shapePath = function (tileType) {
            return this.grid.vertices(null, null, tileType).map(function (p) {
                return p.x.toFixed(3) + ',' + p.y.toFixed(3);
            }).join(' ');
        };
        Diagram.prototype.transition = function (selection, delta) {
            if (delta === void 0) { delta = 1; }
            return ((this.animation && (this.duration * delta)) ? selection.transition().duration(this.duration * delta) : selection);
        };
        return Diagram;
    })();
    Diagramy.Diagram = Diagram;
})(Diagramy || (Diagramy = {}));
/// <reference path="../../typings/node/node.d.ts" />
module.exports = Diagramy;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"d3":undefined}]},{},[1])(1)
});