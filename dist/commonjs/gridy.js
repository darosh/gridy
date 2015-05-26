var Gridy;
(function (Gridy) {
    'use strict';
})(Gridy || (Gridy = {}));
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
/// <reference path="Integer.ts" />
var Gridy;
(function (Gridy) {
    'use strict';
})(Gridy || (Gridy = {}));
// From http://www.redblobgames.com/grids/hexagons/
// Copyright 2012 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
// Original source: http://www.redblobgames.com/grids/hexagons/Grid.hx
/// <reference path="IGrid.ts" />
/// <reference path="ITile.ts" />
var Gridy;
(function (Gridy) {
    'use strict';
    var Bounds;
    (function (Bounds) {
        function boundsOfPoints(points) {
            var rectangle = new Gridy.Rectangle();
            for (var i = 0; i < points.length; i++) {
                var p = points[i];
                if (p.x < rectangle.minX) {
                    rectangle.minX = p.x;
                }
                if (p.x > rectangle.maxX) {
                    rectangle.maxX = p.x;
                }
                if (p.y < rectangle.minY) {
                    rectangle.minY = p.y;
                }
                if (p.y > rectangle.maxY) {
                    rectangle.maxY = p.y;
                }
            }
            return rectangle;
        }
        function bounds(grid) {
            var centers = grid.tiles.map(function (tile) {
                return grid.center(tile);
            });
            // TODO use vertices(..,...,tileType) for TriangularGrid;
            var b1 = boundsOfPoints(grid.vertices());
            var b2 = boundsOfPoints(centers);
            return Gridy.Rectangle.add(b1, b2);
        }
        Bounds.bounds = bounds;
    })(Bounds = Gridy.Bounds || (Gridy.Bounds = {}));
})(Gridy || (Gridy = {}));
/// <reference path="IVector.ts" />
/// <reference path="Integer.ts" />
var Gridy;
(function (Gridy) {
    'use strict';
    var Integer3 = (function () {
        function Integer3(x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Integer3.prototype.distance = function (b) {
            return Math.floor((Math.abs(this.x - b.x) + Math.abs(this.y - b.y) + Math.abs(this.z - b.z)) / 2);
        };
        Integer3.prototype.add = function (b) {
            return new Integer3(this.x + b.x, this.y + b.y, this.z + b.z);
        };
        Integer3.prototype.scale = function (k) {
            return new Integer3(this.x * k, this.y * k, this.z * k);
        };
        Integer3.prototype.toString = function () {
            return this.v().join(',');
        };
        Integer3.prototype.v = function () {
            return [this.x, this.y, this.z];
        };
        Integer3.prototype.equals = function (other) {
            return (this.x === other.x) && (this.y === other.y) && (this.z === other.z);
        };
        Integer3.prototype.round = function () {
            return new Integer3(Math.round(this.x), Math.round(this.y), Math.round(this.z));
        };
        Integer3.prototype.cubeLength = function () {
            return Math.floor((Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)) / 2);
        };
        return Integer3;
    })();
    Gridy.Integer3 = Integer3;
})(Gridy || (Gridy = {}));
// From http://www.redblobgames.com/grids/hexagons/
// Copyright 2013 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
// Original source: http://www.redblobgames.com/grids/hexagons/Cube.hx
/// <reference path="Integer3.ts" />
/// <reference path="ITile.ts" />
var Gridy;
(function (Gridy) {
    'use strict';
    var HexagonalTile = (function (_super) {
        __extends(HexagonalTile, _super);
        function HexagonalTile() {
            _super.apply(this, arguments);
        }
        HexagonalTile.prototype.shift = function () {
            return HexagonalTile.directions[4];
        };
        HexagonalTile.prototype.directions = function () {
            return HexagonalTile.directions;
        };
        HexagonalTile.prototype.add = function (a) {
            var r = _super.prototype.add.call(this, a);
            return new HexagonalTile(r.x, r.y, r.z);
        };
        HexagonalTile.prototype.scale = function (a) {
            var r = _super.prototype.scale.call(this, a);
            return new HexagonalTile(r.x, r.y, r.z);
        };
        HexagonalTile.prototype.neighbors = function () {
            var results = [];
            for (var dir = 0; dir < 6; dir++) {
                results.push(this.add(HexagonalTile.directions[dir]));
            }
            return results;
        };
        HexagonalTile.directions = [
            new HexagonalTile(1, -1, 0),
            new HexagonalTile(1, 0, -1),
            new HexagonalTile(0, 1, -1),
            new HexagonalTile(-1, 1, 0),
            new HexagonalTile(-1, 0, 1),
            new HexagonalTile(0, -1, 1)
        ];
        return HexagonalTile;
    })(Gridy.Integer3);
    Gridy.HexagonalTile = HexagonalTile;
})(Gridy || (Gridy = {}));
var Gridy;
(function (Gridy) {
    'use strict';
    (function (GridShape) {
        GridShape[GridShape["TrapezoidalEven"] = 0] = "TrapezoidalEven";
        GridShape[GridShape["TrapezoidalOdd"] = 1] = "TrapezoidalOdd";
        GridShape[GridShape["Hexagonal"] = 2] = "Hexagonal";
        GridShape[GridShape["Triangular"] = 3] = "Triangular";
        GridShape[GridShape["Rhombus"] = 4] = "Rhombus";
    })(Gridy.GridShape || (Gridy.GridShape = {}));
    var GridShape = Gridy.GridShape;
})(Gridy || (Gridy = {}));
// From http://www.redblobgames.com/grids/hexagons/
// Copyright 2012 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
// Original source: http://www.redblobgames.com/grids/hexagons/Grid.hx
/// <reference path="IGrid.ts" />
/// <reference path="HexagonalTile.ts" />
/// <reference path="GridShape.ts" />
/// <reference path="Position.ts" />
/// <reference path="Bounds.ts" />
var Gridy;
(function (Gridy) {
    'use strict';
    var HexagonalGrid = (function () {
        function HexagonalGrid(scale, orientation, shape, x, y) {
            if (y === void 0) { y = null; }
            this.angle = -30;
            this.tileTypes = 1;
            this.scale = scale;
            this.radius = HexagonalGrid.SQRT_3_2 * scale / 2;
            this.orientation = orientation;
            this.x = x;
            this.y = y;
            this.shape = shape;
            if (shape === 0 /* TrapezoidalEven */ && orientation === false) {
                this.toTile = HexagonalGrid.evenQToCube;
                this.toPoint = HexagonalGrid.cubeToEvenQ;
                this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
            }
            else if (shape === 0 /* TrapezoidalEven */ && orientation === true) {
                this.toTile = HexagonalGrid.evenRToCube;
                this.toPoint = HexagonalGrid.cubeToEvenR;
                this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
            }
            else if (shape === 1 /* TrapezoidalOdd */ && orientation === false) {
                this.toTile = HexagonalGrid.oddQToCube;
                this.toPoint = HexagonalGrid.cubeToOddQ;
                this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
            }
            else if (shape === 1 /* TrapezoidalOdd */ && orientation === true) {
                this.toTile = HexagonalGrid.oddRToCube;
                this.toPoint = HexagonalGrid.cubeToOddR;
                this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
            }
            else if (shape === 2 /* Hexagonal */) {
                this.toTile = HexagonalGrid.evenQToCube;
                this.toPoint = HexagonalGrid.cubeToEvenQ;
                this.tiles = HexagonalGrid.hexagonalShape(x);
            }
            else if (shape === 3 /* Triangular */) {
                this.toTile = HexagonalGrid.evenQToCube;
                this.toPoint = HexagonalGrid.cubeToEvenQ;
                this.tiles = HexagonalGrid.triangularShape(x);
            }
            else if (shape === 4 /* Rhombus */) {
                this.toTile = HexagonalGrid.twoAxisToCube;
                this.toPoint = HexagonalGrid.cubeToTwoAxis;
                this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
            }
        }
        HexagonalGrid.twoAxisToCube = function (position) {
            return new Gridy.HexagonalTile(position.x, -position.y - position.x, position.y);
        };
        HexagonalGrid.cubeToTwoAxis = function (tile) {
            return new Gridy.Position(Math.floor(tile.x), Math.floor(tile.z));
        };
        HexagonalGrid.oddQToCube = function (position) {
            /* tslint:disable:no-bitwise */
            var x = position.x, z = position.y - ((position.x - (position.x & 1)) >> 1);
            /* tslint:enable:no-bitwise */
            return new Gridy.HexagonalTile(x, -x - z, z);
        };
        HexagonalGrid.cubeToOddQ = function (tile) {
            var x = Math.floor(tile.x), z = Math.floor(tile.z);
            /* tslint:disable:no-bitwise */
            return new Gridy.Position(x, z + ((x - (x & 1)) >> 1));
            /* tslint:enable:no-bitwise */
        };
        HexagonalGrid.evenQToCube = function (position) {
            /* tslint:disable:no-bitwise */
            var x = position.x, z = position.y - ((position.x + (position.x & 1)) >> 1);
            /* tslint:enable:no-bitwise */
            return new Gridy.HexagonalTile(x, -x - z, z);
        };
        HexagonalGrid.cubeToEvenQ = function (tile) {
            var x = Math.floor(tile.x), z = Math.floor(tile.z);
            /* tslint:disable:no-bitwise */
            return new Gridy.Position(x, z + ((x + (x & 1)) >> 1));
            /* tslint:enable:no-bitwise */
        };
        HexagonalGrid.oddRToCube = function (position) {
            /* tslint:disable:no-bitwise */
            var z = position.y, x = position.x - ((position.y - (position.y & 1)) >> 1);
            /* tslint:enable:no-bitwise */
            return new Gridy.HexagonalTile(x, -x - z, z);
        };
        HexagonalGrid.cubeToOddR = function (tile) {
            var x = Math.floor(tile.x), z = Math.floor(tile.z);
            /* tslint:disable:no-bitwise */
            return new Gridy.Position(x + ((z - (z & 1)) >> 1), z);
            /* tslint:enable:no-bitwise */
        };
        HexagonalGrid.evenRToCube = function (position) {
            /* tslint:disable:no-bitwise */
            var z = position.y, x = position.x - ((position.y + (position.y & 1)) >> 1);
            /* tslint:enable:no-bitwise */
            return new Gridy.HexagonalTile(x, -x - z, z);
        };
        HexagonalGrid.cubeToEvenR = function (tile) {
            var x = Math.floor(tile.x), z = Math.floor(tile.z);
            /* tslint:disable:no-bitwise */
            return new Gridy.Position(x + ((z + (z & 1)) >> 1), z);
            /* tslint:enable:no-bitwise */
        };
        HexagonalGrid.trapezoidalShape = function (minQ, maxQ, minR, maxR, toCube) {
            var hexes = [];
            for (var q = minQ; q < maxQ; q++) {
                for (var r = minR; r < maxR; r++) {
                    hexes.push(toCube(new Gridy.Position(q, r)));
                }
            }
            return hexes;
        };
        HexagonalGrid.triangularShape = function (size) {
            var hexes = [];
            for (var k = 0; k < size; k++) {
                for (var i = 0; i < (k + 1); i++) {
                    hexes.push(new Gridy.HexagonalTile(i, -k, k - i));
                }
            }
            return hexes;
        };
        HexagonalGrid.hexagonalShape = function (size) {
            var hexes = [];
            for (var x = -size; x < size; x++) {
                for (var y = -size; y < size; y++) {
                    var z = -x - y;
                    if (Math.abs(x) < size && Math.abs(y) < size && Math.abs(z) < size) {
                        hexes.push(new Gridy.HexagonalTile(x, y, z));
                    }
                }
            }
            return hexes;
        };
        HexagonalGrid.region = function (xmin, xmax, ymin, ymax, zmin, zmax) {
            var results = [];
            for (var x = xmin; x <= xmax; x++) {
                for (var y = Math.max(ymin, -x - zmax); y <= Math.min(ymax, -x - zmin); y++) {
                    var z = -x - y;
                    results.push(new Gridy.HexagonalTile(x, y, z));
                }
            }
            return results;
        };
        HexagonalGrid.prototype.bounds = function () {
            return Gridy.Bounds.bounds(this);
        };
        HexagonalGrid.prototype.vertices = function (orientation, scale) {
            if (orientation === void 0) { orientation = null; }
            if (scale === void 0) { scale = null; }
            var points = [];
            orientation = (orientation === null) ? false : this.orientation;
            scale = (scale === null) ? this.scale : scale;
            for (var i = 0; i < 6; i++) {
                var angle = 2 * Math.PI * (2 * i - (orientation ? 1 : 0)) / 12;
                points.push(new Gridy.Float2(0.5 * scale * Math.cos(angle), 0.5 * scale * Math.sin(angle)));
            }
            return points;
        };
        HexagonalGrid.prototype.center = function (tile) {
            var s;
            var size = this.scale / 2;
            if (this.orientation) {
                s = new Gridy.Float2(HexagonalGrid.SQRT_3 * tile.x + HexagonalGrid.SQRT_3_2 * tile.z, 1.5 * tile.z);
            }
            else {
                s = new Gridy.Float2(1.5 * tile.x, HexagonalGrid.SQRT_3_2 * tile.x + HexagonalGrid.SQRT_3 * tile.z);
            }
            return s.scale(size);
        };
        HexagonalGrid.prototype.position = function (p) {
            var size = this.scale / 2;
            p = p.scale(1 / size);
            var q, r;
            if (this.orientation) {
                q = HexagonalGrid.SQRT_3_3 * p.x + -1 / 3 * p.y;
                r = 2 / 3 * p.y;
                return new Gridy.HexagonalTile(Math.round(q), Math.round(-q - r), Math.round(r));
            }
            else {
                q = 2 / 3 * p.x;
                r = -1 / 3 * p.x + HexagonalGrid.SQRT_3_3 * p.y;
                return new Gridy.HexagonalTile(Math.round(q), Math.round(-q - r), Math.round(r));
            }
        };
        HexagonalGrid.SQRT_3 = Math.sqrt(3);
        HexagonalGrid.SQRT_3_2 = Math.sqrt(3) / 2;
        HexagonalGrid.SQRT_3_3 = Math.sqrt(3) / 3;
        return HexagonalGrid;
    })();
    Gridy.HexagonalGrid = HexagonalGrid;
})(Gridy || (Gridy = {}));
/// <reference path="HexagonalGrid.ts" />
/// <reference path="GridShape.ts" />
var Gridy;
(function (Gridy) {
    'use strict';
    var BrickGrid = (function (_super) {
        __extends(BrickGrid, _super);
        function BrickGrid(scale, orientation, shape, x, y) {
            if (y === void 0) { y = null; }
            _super.call(this, scale, orientation, shape, x, y);
            this.angle = 0;
            this.radius = Math.sqrt(2) / 4 * scale;
        }
        BrickGrid.prototype.vertices = function (orientation, scale) {
            if (orientation === void 0) { orientation = null; }
            if (scale === void 0) { scale = null; }
            var points = [];
            scale = (scale === null) ? this.scale : scale;
            for (var i = 0; i < 4; i++) {
                var angle = 2 * Math.PI * (2 * i - 1) / 8;
                points.push(new Gridy.Float2(0.5 * scale * Math.cos(angle), 0.5 * scale * Math.sin(angle)));
            }
            return points;
        };
        BrickGrid.prototype.center = function (cube) {
            var s;
            var size = this.scale / 2;
            if (this.orientation) {
                s = new Gridy.Float2(Math.sqrt(2) * cube.x + Math.sqrt(2) / 2 * cube.z, Math.sqrt(2) * cube.z);
            }
            else {
                s = new Gridy.Float2(Math.sqrt(2) * cube.x, Math.sqrt(2) / 2 * cube.x + Math.sqrt(2) * cube.z);
            }
            return s.scale(size);
        };
        return BrickGrid;
    })(Gridy.HexagonalGrid);
    Gridy.BrickGrid = BrickGrid;
})(Gridy || (Gridy = {}));
/// <reference path="Float.ts" />
var Gridy;
(function (Gridy) {
    'use strict';
    var Constants;
    (function (Constants) {
        'use strict';
        Constants.SQRT_3 = Math.sqrt(3);
        Constants.SQRT_3_2 = Math.sqrt(3) / 2;
        Constants.SQRT_3_3 = Math.sqrt(3) / 3;
    })(Constants = Gridy.Constants || (Gridy.Constants = {}));
})(Gridy || (Gridy = {}));
/// <reference path="IVector.ts" />
/// <reference path="Integer.ts" />
/// <reference path="Integer3.ts" />
/// <reference path="Float.ts" />
var Gridy;
(function (Gridy) {
    'use strict';
    var Float3 = (function () {
        function Float3(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Float3.round = function (h) {
            var rx = Math.round(h.x);
            var ry = Math.round(h.y);
            var rz = Math.round(h.z);
            var x_diff = Math.abs(rx - h.x);
            var y_diff = Math.abs(ry - h.y);
            var z_diff = Math.abs(rz - h.z);
            if (x_diff > y_diff && x_diff > z_diff) {
                rx = -ry - rz;
            }
            else if (y_diff > z_diff) {
                ry = -rx - rz;
            }
            else {
                rz = -rx - ry;
            }
            return new Gridy.Integer3(rx, ry, rz);
        };
        Float3.lerp = function (a, b, t) {
            return new Float3(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t);
        };
        Float3.line = function (a, b) {
            var N = a.distance(b);
            var results = [];
            for (var i = 0; i < (N + 1); i++) {
                results.push(Float3.round(Float3.lerp(a, b, 1.0 / Math.max(1, N) * i)));
            }
            return results;
        };
        Float3.prototype.equals = function (other) {
            return (this.x === other.x) && (this.y === other.y) && (this.z === other.z);
        };
        Float3.prototype.v = function () {
            return [this.x, this.y, this.z];
        };
        Float3.prototype.toString = function () {
            return '#{' + this.v().join(',') + '}';
        };
        Float3.prototype.round = function () {
            return Float3.round(this);
        };
        return Float3;
    })();
    Gridy.Float3 = Float3;
})(Gridy || (Gridy = {}));
/// <reference path="IGrid.ts" />
/// <reference path="GridShape.ts" />
var Gridy;
(function (Gridy) {
    'use strict';
    var Grids;
    (function (Grids) {
        Grids.HexagonalGrid = Grids.HexagonalGrid;
        Grids.RectangularGrid = Grids.RectangularGrid;
        Grids.BrickGrid = Grids.BrickGrid;
        Grids.TriangularGrid = Grids.TriangularGrid;
    })(Grids = Gridy.Grids || (Gridy.Grids = {}));
})(Gridy || (Gridy = {}));
var Gridy;
(function (Gridy) {
    'use strict';
    var Utils;
    (function (Utils) {
        function newInstance(obj) {
            var n = {};
            obj.constructor.apply(n);
            return n;
        }
        Utils.newInstance = newInstance;
        function enumerate(obj) {
            var result = {};
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length; i++) {
                var value = parseInt(keys[i], 10);
                if (value >= 0) {
                    result[obj[keys[i]]] = value;
                }
            }
            return result;
        }
        Utils.enumerate = enumerate;
        function look(items) {
            var result = {};
            items.forEach(function (v) {
                result[v.toString()] = true;
            });
            return result;
        }
        Utils.look = look;
    })(Utils = Gridy.Utils || (Gridy.Utils = {}));
})(Gridy || (Gridy = {}));
/// <reference path="ITile.ts" />
/// <reference path="Utils.ts" />
var Gridy;
(function (Gridy) {
    'use strict';
    var Path;
    (function (Path) {
        'use strict';
        function spiral(start, N, spiral) {
            var results = [];
            if (spiral) {
                results.push(start.add(Gridy.Utils.newInstance(start)));
            }
            var neighbors = start.neighbors();
            var c = (neighbors.length === 6) ? 1 : 2;
            for (var k = spiral ? 1 : N; k <= N; k++) {
                var H = start.shift().scale(k);
                for (var i = 0; i < neighbors.length; i++) {
                    for (var j = 0; j < k * c; j++) {
                        results.push(H.add(start));
                        H = H.neighbors()[i];
                    }
                }
            }
            return results;
        }
        Path.spiral = spiral;
        function intersect(a, b) {
            var results = [];
            for (var i = 0; i < a.length; i++) {
                for (var j = 0; j < b.length; j++) {
                    if (a[i].equals(b[j])) {
                        results.push(a[i]);
                    }
                }
            }
            return results;
        }
        Path.intersect = intersect;
        function axes(a, axe, odd) {
            if (odd === void 0) { odd = false; }
            var results = [];
            for (var i = 0; i < a.length; i++) {
                var v = a[i].v();
                var l = (Math.abs(v[axe % v.length]) % 2) === 1;
                if (l === odd) {
                    results.push(a[i]);
                }
            }
            return results;
        }
        Path.axes = axes;
    })(Path = Gridy.Path || (Gridy.Path = {}));
})(Gridy || (Gridy = {}));
/// <reference path="ITile.ts" />
/// <reference path="Integer2.ts" />
var Gridy;
(function (Gridy) {
    'use strict';
    var RectangularTile = (function (_super) {
        __extends(RectangularTile, _super);
        function RectangularTile() {
            _super.apply(this, arguments);
        }
        RectangularTile.prototype.shift = function () {
            return new RectangularTile(-1, 1);
        };
        RectangularTile.prototype.directions = function () {
            return RectangularTile.directions;
        };
        RectangularTile.prototype.add = function (a) {
            var r = _super.prototype.add.call(this, a);
            return new RectangularTile(r.x, r.y);
        };
        RectangularTile.prototype.scale = function (a) {
            var r = _super.prototype.scale.call(this, a);
            return new RectangularTile(r.x, r.y);
        };
        RectangularTile.prototype.neighbors = function () {
            var results = [];
            for (var dir = 0; dir < RectangularTile.directions.length; dir++) {
                results.push(this.add(RectangularTile.directions[dir]));
            }
            return results;
        };
        RectangularTile.directions = [
            new RectangularTile(0, -1),
            new RectangularTile(1, 0),
            new RectangularTile(0, 1),
            new RectangularTile(-1, 0)
        ];
        return RectangularTile;
    })(Gridy.Integer2);
    Gridy.RectangularTile = RectangularTile;
})(Gridy || (Gridy = {}));
// TypeScript version of http://www.redblobgames.com/articles/grids/hexagons/
// Copyright 2013 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
/// <reference path="IGrid.ts" />
/// <reference path="RectangularTile.ts" />
/// <reference path="GridShape.ts" />
/// <reference path="Bounds.ts" />
var Gridy;
(function (Gridy) {
    'use strict';
    var RectangularGrid = (function () {
        function RectangularGrid(scale, orientation, shape, x, y) {
            if (y === void 0) { y = null; }
            this.angle = -45;
            this.tileTypes = 1;
            this.scale = scale;
            this.radius = scale / 2;
            this.orientation = orientation;
            this.x = x;
            this.y = y;
            var results = [];
            for (var px = 0; px < x; px++) {
                for (var py = 0; py < y; py++) {
                    results.push(new Gridy.RectangularTile(px, py));
                }
            }
            this.tiles = results;
            this.toTile = function (p) {
                return new Gridy.RectangularTile(p.x, p.y);
            };
            this.toPoint = function (p) {
                return new Gridy.Position(p.x, p.y);
            };
        }
        /*
         bounds():Rectangle {
         if (this.orientation) {
         return new Rectangle(
         -this.scale * RectangularGrid.SQRT_2 / 2,
         +this.scale * RectangularGrid.SQRT_2 / 2 + ((this.x + this.y - 2) / 2) * this.scale * RectangularGrid.SQRT_2,
         -this.scale * RectangularGrid.SQRT_2 / 2 - (this.x / 2) * this.scale * RectangularGrid.SQRT_2,
         +this.scale * RectangularGrid.SQRT_2 / 2 + (this.y / 2) * this.scale * RectangularGrid.SQRT_2
         );
         } else {
         return new Rectangle(-0.5 * this.scale, (this.x - 0.5) * this.scale, -0.5 * this.scale, (this.y - 0.5) * this.scale);
         }
         }
         */
        RectangularGrid.prototype.bounds = function () {
            return Gridy.Bounds.bounds(this);
        };
        RectangularGrid.prototype.center = function (tile) {
            if (this.orientation) {
                return new Gridy.Float2(tile.x * this.scale / RectangularGrid.SQRT_2 + tile.y * this.scale / RectangularGrid.SQRT_2, tile.y * this.scale / RectangularGrid.SQRT_2 - tile.x * this.scale / RectangularGrid.SQRT_2);
            }
            else {
                return new Gridy.Float2(tile.x * this.scale, tile.y * this.scale);
            }
        };
        RectangularGrid.prototype.vertices = function (orientation, scale) {
            if (orientation === void 0) { orientation = null; }
            if (scale === void 0) { scale = null; }
            var points = [];
            orientation = (orientation === null) ? false : this.orientation;
            scale = (scale === null) ? this.scale : scale;
            if (orientation) {
                scale *= RectangularGrid.SQRT_2;
                points.push(new Gridy.Float2(-scale / 2, 0));
                points.push(new Gridy.Float2(0, -scale / 2));
                points.push(new Gridy.Float2(scale / 2, 0));
                points.push(new Gridy.Float2(0, scale / 2));
            }
            else {
                points.push(new Gridy.Float2(-scale / 2, -scale / 2));
                points.push(new Gridy.Float2(-scale / 2, scale / 2));
                points.push(new Gridy.Float2(scale / 2, scale / 2));
                points.push(new Gridy.Float2(scale / 2, -scale / 2));
            }
            return points;
        };
        RectangularGrid.prototype.position = function (p) {
            return new Gridy.RectangularTile(Math.round(p.x), Math.round(p.y));
        };
        RectangularGrid.SQRT_2 = Math.sqrt(2);
        return RectangularGrid;
    })();
    Gridy.RectangularGrid = RectangularGrid;
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
/// <reference path="ITile.ts" />
/// <reference path="Integer2.ts" />
var Gridy;
(function (Gridy) {
    'use strict';
    var TriangularTile = (function (_super) {
        __extends(TriangularTile, _super);
        function TriangularTile(x, y, s) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (s === void 0) { s = false; }
            _super.call(this, x, y);
            this.s = s;
        }
        TriangularTile.prototype.v = function () {
            return [this.x, this.y, this.s];
        };
        TriangularTile.prototype.toString = function () {
            return this.v().join(',');
        };
        TriangularTile.prototype.shift = function () {
            return TriangularTile.directions[0];
        };
        TriangularTile.prototype.directions = function () {
            return TriangularTile.directions;
        };
        TriangularTile.prototype.add = function (a) {
            var r = _super.prototype.add.call(this, a);
            return new TriangularTile(r.x, r.y);
        };
        TriangularTile.prototype.scale = function (a) {
            var r = _super.prototype.scale.call(this, a);
            return new TriangularTile(r.x, r.y);
        };
        TriangularTile.prototype.neighbors = function () {
            var results = [];
            for (var dir = 0; dir < 3; dir++) {
                results.push(this.add(TriangularTile.directions[dir]));
            }
            return results;
        };
        TriangularTile.directions = [
            new TriangularTile(0, 0, true),
            new TriangularTile(-1, 0, false),
            new TriangularTile(0, -1, false)
        ];
        return TriangularTile;
    })(Gridy.Integer2);
    Gridy.TriangularTile = TriangularTile;
})(Gridy || (Gridy = {}));
/// <reference path="IGrid.ts" />
/// <reference path="TriangularTile.ts" />
/// <reference path="Bounds.ts" />
/// <reference path="GridShape.ts" />
var Gridy;
(function (Gridy) {
    'use strict';
    var TriangularGrid = (function () {
        function TriangularGrid(scale, orientation, shape, x, y) {
            if (y === void 0) { y = null; }
            this.angle = -60;
            this.tileTypes = 2;
            this.scale = scale;
            this.radius = Math.sqrt(3) / 6 * scale;
            this.orientation = orientation;
            this.x = x;
            this.y = y;
            if (shape === 4 /* Rhombus */) {
                this.tiles = this.rhombus();
                this.orientation = false;
            }
            else if (shape === 2 /* Hexagonal */) {
                this.tiles = this.hexagonalShape(x);
                this.orientation = false;
            }
            else {
                this.tiles = this.triangle();
                this.orientation = false;
            }
            this.toPoint = function (tile) {
                return new Gridy.Position(tile.x * 2 + (tile.s ? 1 : 0), tile.y);
            };
        }
        TriangularGrid.prototype.bounds = function () {
            return Gridy.Bounds.bounds(this);
        };
        TriangularGrid.prototype.center = function (tile) {
            return new Gridy.Float2((tile.x * 2 + (tile.s ? 1 : 0) + tile.y) * this.scale / 2, this.scale * (tile.y * (Math.sqrt(3) / 2) + (tile.s ? 0 : -(Math.sqrt(3) / 6))));
        };
        TriangularGrid.prototype.vertices = function (orientation, scale, tileType) {
            if (tileType === void 0) { tileType = 0; }
            if (tileType === 0) {
                return [
                    new Gridy.Float2(0, -this.scale * Math.sqrt(3) / 3),
                    new Gridy.Float2(-this.scale / 2, this.scale * Math.sqrt(3) / 6),
                    new Gridy.Float2(this.scale / 2, this.scale * Math.sqrt(3) / 6)
                ];
            }
            else {
                return [
                    new Gridy.Float2(0, this.scale * (Math.sqrt(3) / 6 + (Math.sqrt(3) / 6))),
                    new Gridy.Float2(-this.scale / 2, -this.scale * (Math.sqrt(3) / 3 - (Math.sqrt(3) / 6))),
                    new Gridy.Float2(this.scale / 2, -this.scale * (Math.sqrt(3) / 3 - (Math.sqrt(3) / 6)))
                ];
            }
        };
        TriangularGrid.prototype.position = function (p) {
            return new Gridy.TriangularTile(Math.round(p.x), Math.round(p.y), false);
        };
        TriangularGrid.prototype.getTileType = function (tile) {
            return tile.s ? 0 : 1;
        };
        TriangularGrid.prototype.rhombus = function () {
            var results = [];
            for (var px = 0; px < this.x; px++) {
                for (var py = 0; py < this.y; py++) {
                    results.push(new Gridy.TriangularTile(px, py, false));
                    results.push(new Gridy.TriangularTile(px, py, true));
                }
            }
            return results;
        };
        TriangularGrid.prototype.triangle = function () {
            var results = [];
            for (var py = 0; py < this.x; py++) {
                for (var px = 0; px < (this.x - py); px++) {
                    results.push(new Gridy.TriangularTile(px, py, false));
                    if (px < (this.x - py - 1)) {
                        results.push(new Gridy.TriangularTile(px, py, true));
                    }
                }
            }
            return results;
        };
        TriangularGrid.prototype.hexagonalShape = function (size) {
            var results = [];
            for (var x = -size; x < size; x++) {
                for (var y = -size; y < size; y++) {
                    if (Math.abs(-x - y) <= size && (x + y) < size) {
                        results.push(new Gridy.TriangularTile(x, y, false));
                    }
                    if ((Math.abs(-x - y) - 1) <= size && (x + y + 1) < size) {
                        results.push(new Gridy.TriangularTile(x, y, true));
                    }
                }
            }
            return results;
        };
        return TriangularGrid;
    })();
    Gridy.TriangularGrid = TriangularGrid;
})(Gridy || (Gridy = {}));
/// <reference path="../../typings/node/node.d.ts" />
module.exports = Gridy;
