(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Gridy = {})));
}(this, (function (exports) { 'use strict';

(function (Shape) {
    Shape[Shape["TrapezoidalEven"] = 0] = "TrapezoidalEven";
    Shape[Shape["TrapezoidalOdd"] = 1] = "TrapezoidalOdd";
    Shape[Shape["Hexagonal"] = 2] = "Hexagonal";
    Shape[Shape["Triangular"] = 3] = "Triangular";
    Shape[Shape["Rhombus"] = 4] = "Rhombus";
    // RhombusEven,
    // RhombusOdd,
})(exports.Shape || (exports.Shape = {}));

const SQRT_3 = Math.sqrt(3);
const SQRT_3_2 = Math.sqrt(3) / 2;
const SQRT_3_3 = Math.sqrt(3) / 3;
const SQRT_3_6 = Math.sqrt(3) / 6;
const SQRT_2 = Math.sqrt(2);
const SQRT_2_2 = Math.sqrt(2) / 2;
const SQRT_2_4 = Math.sqrt(2) / 4;

class Integer2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    v() {
        return [this.x, this.y];
    }
    distance(b) {
        return Math.floor((Math.abs(this.x - b.x) + Math.abs(this.y - b.y)) / 2);
    }
    toString() {
        return this.x + "," + this.y;
    }
    equals(p) {
        return (this.x === p.x) && (this.y === p.y);
    }
    add(p) {
        return new Integer2(this.x + p.x, this.y + p.y);
    }
    scale(d) {
        return new Integer2(this.x * d, this.y * d);
    }
    cubeLength() {
        return Math.floor((Math.abs(this.x) + Math.abs(this.y)) / 2);
    }
}

class Float2 {
    static round(h) {
        const rx = Math.round(h.x);
        const ry = Math.round(h.y);
        return new Integer2(rx, ry);
    }
    static lerp(a, b, t) {
        return new Float2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
    }
    static line(a, b) {
        const N = a.distance(b);
        const results = [];
        for (let i = 0; i < (N + 1); i++) {
            results.push(Float2.round(Float2.lerp(a, b, 1.0 / Math.max(1, N) * i)));
        }
        return results;
    }
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    equals(p) {
        return (this.x === p.x) && (this.y === p.y);
    }
    v() {
        return [this.x, this.y];
    }
    scale(k) {
        return new Float2(this.x * k, this.y * k);
    }
    toString() {
        return this.v().join(",");
    }
}

class Rectangle {
    constructor(minX = 0, maxX = 0, minY = 0, maxY = 0) {
        this.minX = 0;
        this.maxX = 0;
        this.minY = 0;
        this.maxY = 0;
        this.minX = minX;
        this.maxX = maxX;
        this.minY = minY;
        this.maxY = maxY;
    }
    static add(a, b) {
        return new Rectangle(a.minX + b.minX, a.maxX + b.maxX, a.minY + b.minY, a.maxY + b.maxY);
    }
}

function boundsOfPoints(points) {
    const rectangle = new Rectangle(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
    for (const p of points) {
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
    const centers = grid.tiles.map((tile) => {
        return grid.center(tile);
    });
    // TODO use vertices(..,...,tileType) for TriangularGrid;
    const b1 = boundsOfPoints(grid.vertices());
    const b2 = boundsOfPoints(centers);
    return Rectangle.add(b1, b2);
}

class Integer3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    distance(b) {
        return Math.floor((Math.abs(this.x - b.x) + Math.abs(this.y - b.y) + Math.abs(this.z - b.z)) / 2);
    }
    add(b) {
        return new Integer3(this.x + b.x, this.y + b.y, this.z + b.z);
    }
    scale(k) {
        return new Integer3(this.x * k, this.y * k, this.z * k);
    }
    toString() {
        return this.v().join(",");
    }
    v() {
        return [this.x, this.y, this.z];
    }
    equals(other) {
        return (this.x === other.x) && (this.y === other.y) && (this.z === other.z);
    }
    round() {
        return new Integer3(Math.round(this.x), Math.round(this.y), Math.round(this.z));
    }
    cubeLength() {
        return Math.floor((Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)) / 2);
    }
}

class HexagonalTile extends Integer3 {
    shift() {
        return HexagonalTile.directions[4][1];
    }
    directions() {
        return HexagonalTile.directions;
    }
    add(a) {
        const r = super.add(a);
        return new HexagonalTile(r.x, r.y, r.z);
    }
    scale(a) {
        const r = super.scale(a);
        return new HexagonalTile(r.x, r.y, r.z);
    }
    // neighbors(): Array<HexagonalTile> {
    //   var results: Array<any> = [];
    //   for (var dir: Integer = 0; dir < 6; dir++) {
    //     results.push(this.add(HexagonalTile.directions[dir]));
    //   }
    //   return results;
    // }
    neighbors() {
        const results = [];
        for (const a of HexagonalTile.directions) {
            results.push([a[0], this.add(a[1])]);
        }
        return results;
    }
    map() {
        return new Map(this.neighbors());
    }
}
HexagonalTile.directions = [
    [1, new HexagonalTile(1, -1, 0)],
    [2, new HexagonalTile(1, 0, -1)],
    [3, new HexagonalTile(0, 1, -1)],
    [-1, new HexagonalTile(-1, 1, 0)],
    [-2, new HexagonalTile(-1, 0, 1)],
    [-3, new HexagonalTile(0, -1, 1)],
];

var TileType;
(function (TileType) {
    TileType[TileType["Simple"] = 1] = "Simple";
    TileType[TileType["Variable"] = 2] = "Variable";
})(TileType || (TileType = {}));

class HexagonalGrid {
    constructor(scale, orientation = false, shape = exports.Shape.Hexagonal, x = 1, y) {
        this.angle = -30;
        this.tileTypes = TileType.Simple;
        this.scale = scale;
        this.radius = SQRT_3_2 * scale / 2;
        this.orientation = orientation;
        y = y || x;
        this.x = x;
        this.y = y;
        this.shape = shape;
        if (shape === exports.Shape.TrapezoidalEven && orientation === false) {
            this.toTile = HexagonalGrid.evenQToCube;
            this.toPoint = HexagonalGrid.cubeToEvenQ;
            this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
        }
        else if (shape === exports.Shape.TrapezoidalEven && orientation === true) {
            this.toTile = HexagonalGrid.evenRToCube;
            this.toPoint = HexagonalGrid.cubeToEvenR;
            this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
        }
        else if (shape === exports.Shape.TrapezoidalOdd && orientation === false) {
            this.toTile = HexagonalGrid.oddQToCube;
            this.toPoint = HexagonalGrid.cubeToOddQ;
            this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
        }
        else if (shape === exports.Shape.TrapezoidalOdd && orientation === true) {
            this.toTile = HexagonalGrid.oddRToCube;
            this.toPoint = HexagonalGrid.cubeToOddR;
            this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
        }
        else if (shape === exports.Shape.Hexagonal) {
            this.toTile = HexagonalGrid.evenQToCube;
            this.toPoint = HexagonalGrid.cubeToEvenQ;
            this.tiles = HexagonalGrid.hexagonalShape(x);
        }
        else if (shape === exports.Shape.Triangular) {
            this.toTile = HexagonalGrid.evenQToCube;
            this.toPoint = HexagonalGrid.cubeToEvenQ;
            this.tiles = HexagonalGrid.triangularShape(x);
        }
        else if (shape === exports.Shape.Rhombus) {
            this.toTile = HexagonalGrid.twoAxisToCube;
            this.toPoint = HexagonalGrid.cubeToTwoAxis;
            this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
            // } else if (shape === Shape.RhombusEven) {
            //   this.toTile = HexagonalGrid.twoAxisToCubeEven;
            //   this.toPoint = HexagonalGrid.cubeToTwoAxisEven;
            //   this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
            // } else if (shape === Shape.RhombusOdd) {
            //   this.toTile = HexagonalGrid.twoAxisToCubeOdd;
            //   this.toPoint = HexagonalGrid.cubeToTwoAxisOdd;
            //   this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
        }
        else {
            this.tiles = [];
            this.toPoint = () => new Integer2();
        }
    }
    static twoAxisToCube(position) {
        return new HexagonalTile(position.x, -position.y - position.x, position.y);
    }
    // public static twoAxisToCubeEven(position: Position): HexagonalTile {
    //   return new HexagonalTile(position.x + position.y, -position.y + position.x, -position.x);
    // }
    // public static twoAxisToCubeOdd(position: Position): HexagonalTile {
    //   return new HexagonalTile(-position.y, -position.y - position.x, position.x + position.y);
    // }
    static cubeToTwoAxis(tile) {
        return new Integer2(Math.floor(tile.x), Math.floor(tile.z));
    }
    // public static cubeToTwoAxisEven(tile: HexagonalTile): Position {
    //   return new Position(Math.floor(-tile.z), Math.floor(tile.x + tile.z));
    // }
    // public static cubeToTwoAxisOdd(tile: HexagonalTile): Position {
    //   return new Position(Math.floor(tile.x + tile.z), Math.floor(-tile.x));
    // }
    static oddQToCube(position) {
        /* tslint:disable:no-bitwise */
        const x = position.x;
        const z = position.y - ((position.x - (position.x & 1)) >> 1);
        /* tslint:enable:no-bitwise */
        return new HexagonalTile(x, -x - z, z);
    }
    static cubeToOddQ(tile) {
        const x = Math.floor(tile.x);
        const z = Math.floor(tile.z);
        /* tslint:disable:no-bitwise */
        return new Integer2(x, z + ((x - (x & 1)) >> 1));
        /* tslint:enable:no-bitwise */
    }
    static evenQToCube(position) {
        /* tslint:disable:no-bitwise */
        const x = position.x;
        const z = position.y - ((position.x + (position.x & 1)) >> 1);
        /* tslint:enable:no-bitwise */
        return new HexagonalTile(x, -x - z, z);
    }
    static cubeToEvenQ(tile) {
        const x = Math.floor(tile.x);
        const z = Math.floor(tile.z);
        /* tslint:disable:no-bitwise */
        return new Integer2(x, z + ((x + (x & 1)) >> 1));
        /* tslint:enable:no-bitwise */
    }
    static oddRToCube(position) {
        /* tslint:disable:no-bitwise */
        const z = position.y;
        const x = position.x - ((position.y - (position.y & 1)) >> 1);
        /* tslint:enable:no-bitwise */
        return new HexagonalTile(x, -x - z, z);
    }
    static cubeToOddR(tile) {
        const x = Math.floor(tile.x);
        const z = Math.floor(tile.z);
        /* tslint:disable:no-bitwise */
        return new Integer2(x + ((z - (z & 1)) >> 1), z);
        /* tslint:enable:no-bitwise */
    }
    static evenRToCube(position) {
        /* tslint:disable:no-bitwise */
        const z = position.y;
        const x = position.x - ((position.y + (position.y & 1)) >> 1);
        /* tslint:enable:no-bitwise */
        return new HexagonalTile(x, -x - z, z);
    }
    static cubeToEvenR(tile) {
        const x = Math.floor(tile.x);
        const z = Math.floor(tile.z);
        /* tslint:disable:no-bitwise */
        return new Integer2(x + ((z + (z & 1)) >> 1), z);
        /* tslint:enable:no-bitwise */
    }
    static trapezoidalShape(minQ, maxQ, minR, maxR, toCube) {
        const hexes = [];
        for (let q = minQ; q < maxQ; q++) {
            for (let r = minR; r < maxR; r++) {
                hexes.push(toCube(new Integer2(q, r)));
            }
        }
        return hexes;
    }
    // static trapezoidalShapeOdd(minQ: Integer, maxQ: Integer,
    //   minR: Integer, maxR: Integer,
    //   toCube: (position: Position) => HexagonalTile): Array<HexagonalTile> {
    //   var hexes: Array<HexagonalTile> = [];
    //   for (var q: Integer = maxQ - 1; q >= minQ; q--) {
    //     const shift = maxQ - q - 1
    //     for (var r: Integer = minR; r < maxR; r++) {
    //       hexes.push(toCube(new Position(q, r + shift)));
    //     }
    //   }
    //   return hexes;
    // }
    // static trapezoidalShapeEven(minQ: Integer, maxQ: Integer,
    //   minR: Integer, maxR: Integer,
    //   toCube: (position: Position) => HexagonalTile): Array<HexagonalTile> {
    //   var hexes: Array<HexagonalTile> = [];
    //   for (var q: Integer = maxQ - 1; q >= minQ; q--) {
    //     const shift = maxQ - q - 1
    //     for (var r: Integer = minR; r < maxR; r++) {
    //       hexes.push(toCube(new Position(r + shift, q)));
    //     }
    //   }
    //   return hexes;
    // }
    static triangularShape(size) {
        const hexes = [];
        for (let k = 0; k < size; k++) {
            for (let i = 0; i < (k + 1); i++) {
                hexes.push(new HexagonalTile(i, -k, k - i));
            }
        }
        return hexes;
    }
    static hexagonalShape(size) {
        const hexes = [];
        for (let x = -size; x < size; x++) {
            for (let y = -size; y < size; y++) {
                const z = -x - y;
                if (Math.abs(x) < size && Math.abs(y) < size && Math.abs(z) < size) {
                    hexes.push(new HexagonalTile(x, y, z));
                }
            }
        }
        return hexes;
    }
    static region(xmin, xmax, ymin, ymax, zmin, zmax) {
        const results = [];
        for (let x = xmin; x <= xmax; x++) {
            for (let y = Math.max(ymin, -x - zmax); y <= Math.min(ymax, -x - zmin); y++) {
                const z = -x - y;
                results.push(new HexagonalTile(x, y, z));
            }
        }
        return results;
    }
    bounds() {
        return bounds(this);
    }
    vertices(orientation, scale) {
        const points = [];
        scale = (scale === undefined) ? this.scale : scale;
        orientation = (orientation === undefined) ? false : this.orientation;
        for (let i = 0; i < 6; i++) {
            const angle = 2 * Math.PI * (2 * i - (orientation ? 1 : 0)) / 12;
            points.push(new Float2(0.5 * scale * Math.cos(angle), 0.5 * scale * Math.sin(angle)));
        }
        return points;
    }
    center(tile) {
        let s;
        const size = this.scale / 2;
        if (this.orientation) {
            s = new Float2(SQRT_3 * tile.x + SQRT_3_2 * tile.z, 1.5 * tile.z);
        }
        else {
            s = new Float2(1.5 * tile.x, SQRT_3_2 * tile.x + SQRT_3 * tile.z);
        }
        return s.scale(size);
    }
    position(p) {
        const size = this.scale / 2;
        p = p.scale(1 / size);
        let q;
        let r;
        if (this.orientation) {
            q = SQRT_3_3 * p.x + -1 / 3 * p.y;
            r = 2 / 3 * p.y;
        }
        else {
            q = 2 / 3 * p.x;
            r = -1 / 3 * p.x + SQRT_3_3 * p.y;
        }
        return new HexagonalTile(Math.round(q), Math.round(-q - r), Math.round(r));
    }
}

class BrickGrid extends HexagonalGrid {
    constructor(scale, orientation, shape, x, y) {
        super(scale, orientation, shape, x, y);
        this.angle = 0;
        this.radius = SQRT_2_4 * scale;
    }
    vertices(orientation, scale) {
        scale = (scale === undefined) ? this.scale : scale;
        const points = [];
        for (let i = 0; i < 4; i++) {
            const angle = 2 * Math.PI * (2 * i - 1) / 8;
            points.push(new Float2(0.5 * scale * Math.cos(angle), 0.5 * scale * Math.sin(angle)));
        }
        return points;
    }
    center(cube) {
        let s;
        const size = this.scale / 2;
        if (this.orientation) {
            s = new Float2(SQRT_2 * cube.x + SQRT_2_2 * cube.z, SQRT_2 * cube.z);
        }
        else {
            s = new Float2(SQRT_2 * cube.x, SQRT_2_2 * cube.x + SQRT_2 * cube.z);
        }
        return s.scale(size);
    }
}

class TriangularTile extends Integer2 {
    constructor(x = 0, y = 0, s = false) {
        super(x, y);
        this.s = s;
    }
    v() {
        return [this.x, this.y, this.s];
    }
    toString() {
        return this.v().join(",");
    }
    shift() {
        return TriangularTile.directions1[0][1];
    }
    directions() {
        return TriangularTile.directions1;
    }
    add(a) {
        const r = super.add(a);
        return new TriangularTile(r.x, r.y, a.s);
    }
    scale(a) {
        const r = super.scale(a);
        return new TriangularTile(r.x, r.y);
    }
    neighbors() {
        const results = [];
        for (let dir = 0; dir < 3; dir++) {
            results.push([TriangularTile.directions1[dir][0],
                this.add(this.s ? TriangularTile.directions2[dir][1] : TriangularTile.directions1[dir][1])]);
        }
        return results;
    }
    map() {
        return new Map(this.neighbors());
    }
}
TriangularTile.directions1 = [
    [1, new TriangularTile(0, 0, true)],
    [2, new TriangularTile(-1, 0, true)],
    [3, new TriangularTile(0, -1, true)],
];
TriangularTile.directions2 = [
    [1, new TriangularTile(0, 0, false)],
    [2, new TriangularTile(1, 0, false)],
    [3, new TriangularTile(0, 1, false)],
];

class TriangularGrid {
    constructor(scale, orientation = false, shape = exports.Shape.Triangular, x = 1, y = 1) {
        this.angle = -60;
        this.tileTypes = TileType.Variable;
        this.scale = scale;
        this.radius = SQRT_3_6 * scale;
        this.orientation = orientation;
        this.x = x;
        this.y = y;
        if (shape === exports.Shape.Rhombus) {
            this.tiles = this.rhombus();
            this.orientation = false;
        }
        else if (shape === exports.Shape.Hexagonal) {
            this.tiles = this.hexagonalShape(x);
            this.orientation = false;
        }
        else {
            this.tiles = this.triangle();
            this.orientation = false;
        }
        this.toPoint = (tile) => {
            return new Integer2(tile.x * 2 + (tile.s ? 1 : 0), tile.y);
        };
    }
    bounds() {
        return bounds(this);
    }
    center(tile) {
        return new Float2((tile.x * 2 + (tile.s ? 1 : 0) + tile.y) * this.scale / 2, this.scale * (tile.y * (SQRT_3_2) + (tile.s ? 0 : -(SQRT_3_6))));
    }
    vertices(orientation, scale, tileType = 0) {
        scale = (scale === undefined) ? this.scale : scale;
        if (tileType === 0) {
            return [
                new Float2(0, -scale * SQRT_3_3),
                new Float2(-scale / 2, scale * SQRT_3_6),
                new Float2(scale / 2, scale * SQRT_3_6),
            ];
        }
        else {
            return [
                new Float2(0, scale * (SQRT_3_6 + (SQRT_3_6))),
                new Float2(-scale / 2, -scale * (SQRT_3_3 - (SQRT_3_6))),
                new Float2(scale / 2, -scale * (SQRT_3_3 - (SQRT_3_6))),
            ];
        }
    }
    position(p) {
        return new TriangularTile(Math.round(p.x), Math.round(p.y), false);
    }
    getTileType(tile) {
        return tile.s ? 0 : 1;
    }
    rhombus() {
        const results = [];
        for (let px = 0; px < this.x; px++) {
            for (let py = 0; py < this.y; py++) {
                results.push(new TriangularTile(px, py, false));
                results.push(new TriangularTile(px, py, true));
            }
        }
        return results;
    }
    triangle() {
        const results = [];
        for (let py = 0; py < this.x; py++) {
            for (let px = 0; px < (this.x - py); px++) {
                results.push(new TriangularTile(px, py, false));
                if (px < (this.x - py - 1)) {
                    results.push(new TriangularTile(px, py, true));
                }
            }
        }
        return results;
    }
    hexagonalShape(size) {
        const results = [];
        for (let x = -size; x < size; x++) {
            for (let y = -size; y < size; y++) {
                if (Math.abs(-x - y) <= size && (x + y) < size) {
                    results.push(new TriangularTile(x, y, false));
                }
                if ((Math.abs(-x - y) - 1) <= size && (x + y + 1) < size) {
                    results.push(new TriangularTile(x, y, true));
                }
            }
        }
        return results;
    }
}

class RectangularTile extends Integer2 {
    shift() {
        return new RectangularTile(-1, 1);
    }
    directions() {
        return RectangularTile.directions;
    }
    sides() {
        return RectangularTile.sides;
    }
    add(a) {
        const r = super.add(a);
        return new RectangularTile(r.x, r.y);
    }
    scale(a) {
        const r = super.scale(a);
        return new RectangularTile(r.x, r.y);
    }
    neighbors(directions = RectangularTile.directions) {
        const results = [];
        for (const dir of directions) {
            results.push([dir[0], this.add(dir[1])]);
        }
        return results;
    }
    map() {
        return new Map(this.neighbors());
    }
}
RectangularTile.directions = [
    [1, new RectangularTile(0, -1)],
    [2, new RectangularTile(1, 0)],
    [3, new RectangularTile(-1, -1)],
    [4, new RectangularTile(1, -1)],
    [-1, new RectangularTile(0, 1)],
    [-2, new RectangularTile(-1, 0)],
    [-3, new RectangularTile(1, 1)],
    [-4, new RectangularTile(-1, 1)],
];
RectangularTile.sides = [
    RectangularTile.directions[0],
    RectangularTile.directions[1],
    RectangularTile.directions[4],
    RectangularTile.directions[5],
];

// TypeScript version of http://www.redblobgames.com/articles/grids/hexagons/
// Copyright 2013 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
/**
 * ![](../../examples/output/rectangular-grid.svg)
 */
class RectangularGrid {
    constructor(scale, orientation = false, shape = exports.Shape.TrapezoidalEven, x = 1, y = 1, sidesOnly = false, tile = RectangularTile) {
        this.angle = -45;
        this.tileTypes = TileType.Simple;
        this.scale = scale;
        this.radius = scale / 2;
        this.orientation = orientation;
        this.x = x;
        this.y = y;
        this.tile = tile;
        const results = [];
        for (let px = 0; px < x; px++) {
            for (let py = 0; py < y; py++) {
                results.push(new tile(px, py));
            }
        }
        this.tiles = results;
        this.toTile = (p) => new this.tile(p.x, p.y);
        this.toPoint = (p) => new Integer2(p.x, p.y);
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
    bounds() {
        return bounds(this);
    }
    center(tile) {
        if (this.orientation) {
            return new Float2(tile.x * this.scale / SQRT_2 + tile.y * this.scale / SQRT_2, tile.y * this.scale / SQRT_2 - tile.x * this.scale / SQRT_2);
        }
        else {
            return new Float2(tile.x * this.scale, tile.y * this.scale);
        }
    }
    vertices(orientation, scale) {
        const points = [];
        scale = (scale === undefined) ? this.scale : scale;
        orientation = (orientation === undefined) ? false : this.orientation;
        if (orientation) {
            scale *= SQRT_2;
            points.push(new Float2(-scale / 2, 0));
            points.push(new Float2(0, -scale / 2));
            points.push(new Float2(scale / 2, 0));
            points.push(new Float2(0, scale / 2));
        }
        else {
            points.push(new Float2(-scale / 2, -scale / 2));
            points.push(new Float2(-scale / 2, scale / 2));
            points.push(new Float2(scale / 2, scale / 2));
            points.push(new Float2(scale / 2, -scale / 2));
        }
        return points;
    }
    position(p) {
        return new this.tile(Math.round(p.x), Math.round(p.y));
    }
}

class RectangularSimpleTile extends Integer2 {
    shift() {
        return new RectangularSimpleTile(-1, 1);
    }
    directions() {
        return RectangularSimpleTile.directions;
    }
    add(a) {
        const r = super.add(a);
        return new RectangularSimpleTile(r.x, r.y);
    }
    scale(a) {
        const r = super.scale(a);
        return new RectangularSimpleTile(r.x, r.y);
    }
    neighbors(directions = RectangularSimpleTile.directions) {
        const results = [];
        for (const dir of directions) {
            results.push([dir[0], this.add(dir[1])]);
        }
        return results;
    }
    map() {
        return new Map(this.neighbors());
    }
}
RectangularSimpleTile.directions = [
    [1, new RectangularSimpleTile(0, -1)],
    [2, new RectangularSimpleTile(1, 0)],
    [-1, new RectangularSimpleTile(0, 1)],
    [-2, new RectangularSimpleTile(-1, 0)],
];

class Float3 {
    static round(h) {
        let rx = Math.round(h.x);
        let ry = Math.round(h.y);
        let rz = Math.round(h.z);
        const xDiff = Math.abs(rx - h.x);
        const yDiff = Math.abs(ry - h.y);
        const zDiff = Math.abs(rz - h.z);
        if (xDiff > yDiff && xDiff > zDiff) {
            rx = -ry - rz;
        }
        else if (yDiff > zDiff) {
            ry = -rx - rz;
        }
        else {
            rz = -rx - ry;
        }
        return new Integer3(rx, ry, rz);
    }
    static lerp(a, b, t) {
        return new Float3(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t);
    }
    static line(a, b) {
        const N = a.distance(b);
        const results = [];
        for (let i = 0; i < (N + 1); i++) {
            results.push(Float3.round(Float3.lerp(a, b, 1.0 / Math.max(1, N) * i)));
        }
        return results;
    }
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    equals(other) {
        return (this.x === other.x) && (this.y === other.y) && (this.z === other.z);
    }
    v() {
        return [this.x, this.y, this.z];
    }
    toString() {
        return "#{" + this.v().join(",") + "}";
    }
    round() {
        return Float3.round(this);
    }
}

// From http://www.redblobgames.com/grids/hexagons/
// Copyright 2013 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
// Original source: http://www.redblobgames.com/grids/hexagons/ui.js
class Search {
    constructor(start, maxMovement, maxMagnitude, blocked, available) {
        this.cost = {};
        this.previous = {};
        this.max = 0;
        const starts = start.v ? [start] : start;
        this.start = starts[0];
        starts.forEach((s) => {
            this.cost[s.toString()] = 0;
            this.previous[s.toString()] = null;
        });
        const fringes = [starts];
        for (let k = 0; k < maxMovement && fringes[k].length > 0; k++) {
            fringes[k + 1] = [];
            fringes[k].forEach((tile) => {
                const neighbors = tile.neighbors();
                for (const dir of neighbors) {
                    const neighbor = dir[1];
                    if (available && !available[neighbor.toString()]) {
                        continue;
                    }
                    if ((this.cost[neighbor.toString()] === undefined)
                        && ((blocked && !blocked[neighbor.toString()]) || (!blocked))
                        && neighbor.cubeLength() <= maxMagnitude) {
                        this.cost[neighbor.toString()] = k + 1;
                        this.max = Math.max(this.max, k + 1);
                        this.previous[neighbor.toString()] = tile;
                        fringes[k + 1].push(neighbor);
                    }
                }
            });
        }
    }
    path(end, max = false) {
        const ends = end.v ? [end] : end;
        const min = (max ? Math.max : Math.min)
            .apply(null, ends.map((e) => this.cost[e.toString()]).filter((e) => e !== undefined));
        const path = [];
        let node = ends.find((e) => this.cost[e.toString()] === min) || null;
        while (node) {
            path.push(node);
            node = node.equals(this.start) ? null : this.previous[node.toString()];
        }
        return path;
    }
}

function instance(obj) {
    return new obj.constructor();
}
function enumerate(obj) {
    const result = {};
    const keys = Object.keys(obj);
    for (const i of keys) {
        const value = parseInt(i, 10);
        if (value >= 0) {
            result[obj[i]] = value;
        }
    }
    return result;
}
function look(items, values = false) {
    const result = {};
    items.forEach((v) => {
        result[v.toString()] = values ? v : true;
    });
    return result;
}
function neighbors(tiles) {
    function _neighbors() {
        return this._neighbors_data;
    }
    const values = look(tiles, true);
    tiles.forEach((t) => {
        t._neighbors_data = t.neighbors().filter((n) => values[n[1]] !== undefined)
            .map((n) => [n[0], values[n[1]]]);
        t._neighbors = _neighbors;
        t.neighbors = _neighbors;
    });
}
function map(tiles) {
    function _map() {
        return this._map_data || (this._map_data = this._map());
    }
    tiles.forEach((t) => {
        t._map = t.map;
        t.map = _map;
    });
}
function connections(tiles) {
    const c = [];
    for (const t of tiles) {
        const m = t.map();
        const s = Array.from(m.keys()).filter((k) => (k > 0) && !m.has(-k));
        for (const k of s) {
            const l = [];
            let i = t;
            while (i) {
                l.push(i);
                i = i.map().get(k);
            }
            c.push(l);
        }
    }
    return c;
}

function spiral(start, N, isSpiral) {
    const results = [];
    if (isSpiral) {
        results.push(start.add(instance(start)));
    }
    const neighbors$$1 = start.neighbors(start.sides ? start.sides() : undefined);
    const c = (neighbors$$1.length === 6) ? 1 : 2;
    for (let k = isSpiral ? 1 : N; k <= N; k++) {
        let H = start.shift().scale(k);
        for (let i = 0; i < neighbors$$1.length; i++) {
            for (let j = 0; j < k * c; j++) {
                results.push(H.add(start));
                H = H.neighbors(H.sides ? H.sides() : undefined)[i][1];
            }
        }
    }
    return results;
}
function intersect(a, b) {
    const results = [];
    for (const i of a) {
        for (const j of b) {
            if (i.equals(j)) {
                results.push(i);
            }
        }
    }
    return results;
}
function axes(a, axe, odd = false) {
    const results = [];
    for (const i of a) {
        const v = i.v();
        const l = (Math.abs(v[axe % v.length]) % 2) === 1;
        if (l === odd) {
            results.push(i);
        }
    }
    return results;
}

exports.BrickGrid = BrickGrid;
exports.HexagonalGrid = HexagonalGrid;
exports.TriangularGrid = TriangularGrid;
exports.RectangularGrid = RectangularGrid;
exports.Position = Integer2;
exports.HexagonalTile = HexagonalTile;
exports.RectangularTile = RectangularTile;
exports.RectangularSimpleTile = RectangularSimpleTile;
exports.TriangularTile = TriangularTile;
exports.Float2 = Float2;
exports.Float3 = Float3;
exports.Integer2 = Integer2;
exports.Integer3 = Integer3;
exports.Search = Search;
exports.enumerate = enumerate;
exports.look = look;
exports.instance = instance;
exports.neighbors = neighbors;
exports.map = map;
exports.connections = connections;
exports.axes = axes;
exports.intersect = intersect;
exports.spiral = spiral;

Object.defineProperty(exports, '__esModule', { value: true });

})));
