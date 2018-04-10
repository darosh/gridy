(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.Gridy = {})));
}(this, (function (exports) { 'use strict';

    (function (Shape) {
        Shape[Shape["Even"] = 0] = "Even";
        Shape[Shape["Odd"] = 1] = "Odd";
        Shape[Shape["Hexagonal"] = 2] = "Hexagonal";
        Shape[Shape["Triangular"] = 3] = "Triangular";
        Shape[Shape["Rhombus"] = 4] = "Rhombus";
    })(exports.Shape || (exports.Shape = {}));
    //# sourceMappingURL=Shape.js.map

    const SQRT_3 = Math.sqrt(3);
    const SQRT_3_2 = Math.sqrt(3) / 2;
    const SQRT_3_3 = Math.sqrt(3) / 3;
    const SQRT_3_6 = Math.sqrt(3) / 6;
    const SQRT_2 = Math.sqrt(2);
    const SQRT_2_2 = Math.sqrt(2) / 2;
    const SQRT_2_4 = Math.sqrt(2) / 4;
    const DEG_TO_RAD = Math.PI / 180;
    const ANG = 360;
    //# sourceMappingURL=Constants.js.map

    class Integer2 {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        get value() {
            return [this.x, this.y];
        }
        distance(b) {
            return Math.floor((Math.abs(this.x - b.x) + Math.abs(this.y - b.y)) / 2);
        }
        toString() {
            return this.value.toString();
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
    //# sourceMappingURL=Integer2.js.map

    class Float2 {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        static ROUND(h) {
            const rx = Math.round(h.x);
            const ry = Math.round(h.y);
            return new Integer2(rx, ry);
        }
        static LERP(a, b, t) {
            return new Float2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
        }
        static LINE(a, b) {
            const N = a.distance(b);
            const results = [];
            for (let i = 0; i < (N + 1); i++) {
                results.push(Float2.ROUND(Float2.LERP(a, b, 1 / Math.max(1, N) * i)));
            }
            return results;
        }
        equals(p) {
            return (this.x === p.x) && (this.y === p.y);
        }
        get value() {
            return [this.x, this.y];
        }
        scale(k) {
            return new Float2(this.x * k, this.y * k);
        }
        toString() {
            return this.value.toString();
        }
    }
    //# sourceMappingURL=Float2.js.map

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
        static ADD(a, b) {
            return new Rectangle(a.minX + b.minX, a.maxX + b.maxX, a.minY + b.minY, a.maxY + b.maxY);
        }
        static POINTS(a) {
            return [
                new Float2(a.minX, a.minY),
                new Float2(a.maxX, a.minY),
                new Float2(a.minX, a.maxY),
                new Float2(a.maxX, a.maxY)
            ];
        }
    }
    //# sourceMappingURL=Rectangle.js.map

    // From http://www.redblobgames.com/grids/hexagons/
    // Copyright 2012 Red Blob Games <redblobgames@gmail.com>
    // License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
    // Original source: http://www.redblobgames.com/grids/hexagons/Grid.hx
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
        if (grid.tileTypes === 2) {
            let sum = [];
            const centers = grid.tiles.reduce((r, tile) => {
                r[grid.getTileType(tile)].push(grid.center(tile));
                return r;
            }, [[], []]);
            for (let i = 0; i < 2; i++) {
                const b1 = boundsOfPoints(grid.vertices(grid.orientation, undefined, i));
                const b2 = boundsOfPoints(centers[i]);
                sum = sum.concat(Rectangle.POINTS(Rectangle.ADD(b1, b2)));
            }
            return boundsOfPoints(sum);
        }
        else {
            const centers = grid.tiles.map((tile) => {
                return grid.center(tile);
            });
            const b1 = boundsOfPoints(grid.vertices(grid.orientation));
            const b2 = boundsOfPoints(centers);
            return Rectangle.ADD(b1, b2);
        }
    }
    //# sourceMappingURL=bounds.js.map

    var Axes4;
    (function (Axes4) {
        Axes4[Axes4["N"] = -1] = "N";
        Axes4[Axes4["S"] = 1] = "S";
        Axes4[Axes4["W"] = -2] = "W";
        Axes4[Axes4["E"] = 2] = "E";
    })(Axes4 || (Axes4 = {}));
    var Axes8;
    (function (Axes8) {
        Axes8[Axes8["N"] = 1] = "N";
        Axes8[Axes8["E"] = 2] = "E";
        Axes8[Axes8["NW"] = 3] = "NW";
        Axes8[Axes8["SW"] = 4] = "SW";
        Axes8[Axes8["S"] = -1] = "S";
        Axes8[Axes8["W"] = -2] = "W";
        Axes8[Axes8["SE"] = -3] = "SE";
        Axes8[Axes8["NE"] = -4] = "NE";
    })(Axes8 || (Axes8 = {}));
    var Axes6;
    (function (Axes6) {
        Axes6[Axes6["N"] = -1] = "N";
        Axes6[Axes6["S"] = 1] = "S";
        Axes6[Axes6["NW"] = -2] = "NW";
        Axes6[Axes6["SE"] = 2] = "SE";
        Axes6[Axes6["NE"] = -3] = "NE";
        Axes6[Axes6["SW"] = 3] = "SW";
    })(Axes6 || (Axes6 = {}));
    //# sourceMappingURL=Axes.js.map

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
            return this.value.toString();
        }
        get value() {
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
    //# sourceMappingURL=Integer3.js.map

    // From http://www.redblobgames.com/grids/hexagons/
    // Copyright 2013 Red Blob Games <redblobgames@gmail.com>
    // License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
    // Original source: http://www.redblobgames.com/grids/hexagons/Cube.hx
    /**
     * ![](../../examples/output/hexagonal-tile.svg)
     */
    class HexagonalTile extends Integer3 {
        constructor() {
            super(...arguments);
            this.tiles = [];
        }
        get key() {
            return this.toString();
        }
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
        neighbors() {
            const results = [];
            for (const a of HexagonalTile.directions) {
                results.push([a[0], this.add(a[1])]);
            }
            return results;
        }
        right() {
            const x = this.x;
            this.x = -this.z;
            this.z = -this.y;
            this.y = -x;
            return this;
        }
        left() {
            const z = this.z;
            this.z = -this.x;
            this.x = -this.y;
            this.y = -z;
            return this;
        }
    }
    HexagonalTile.directions = [
        [Axes6.NW, new HexagonalTile(1, -1, 0)],
        [Axes6.NE, new HexagonalTile(1, 0, -1)],
        [Axes6.N, new HexagonalTile(0, 1, -1)],
        [Axes6.SE, new HexagonalTile(-1, 1, 0)],
        [Axes6.SW, new HexagonalTile(-1, 0, 1)],
        [Axes6.S, new HexagonalTile(0, -1, 1)]
    ];
    //# sourceMappingURL=HexagonalTile.js.map

    //# sourceMappingURL=Position.js.map

    var TileType;
    (function (TileType) {
        TileType[TileType["Simple"] = 1] = "Simple";
        TileType[TileType["Variable"] = 2] = "Variable";
    })(TileType || (TileType = {}));
    //# sourceMappingURL=TileType.js.map

    // From http://www.redblobgames.com/grids/hexagons/
    // Copyright 2012 Red Blob Games <redblobgames@gmail.com>
    // License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
    // Original source: http://www.redblobgames.com/grids/hexagons/Grid.hx
    /**
     * ![](../../examples/output/hexagonal-grid.svg)
     */
    class HexagonalGrid {
        constructor(scale, orientation = false, shape = exports.Shape.Hexagonal, x = 1, y) {
            this.scaleY = -1;
            this.angle = -30;
            this.tileTypes = TileType.Simple;
            this.scale = scale;
            this.radius = SQRT_3_2 * scale / SQRT_3_2 / 2;
            this.orientation = orientation;
            const yy = y || x;
            this.x = x;
            this.y = yy;
            this.shape = shape;
            if (shape === exports.Shape.Even && orientation === false) {
                this.toTile = HexagonalGrid.EVEN_Q_TO_CUBE;
                this.toPoint = HexagonalGrid.CUBE_TO_EVEN_Q;
                this.tiles = HexagonalGrid.TRAPEZOIDAL_SHAPE(0, x, 0, yy, this.toTile);
            }
            else if (shape === exports.Shape.Even && orientation === true) {
                this.toTile = HexagonalGrid.EVEN_R_TO_CUBE;
                this.toPoint = HexagonalGrid.CUBE_TO_EVEN_R;
                this.tiles = HexagonalGrid.TRAPEZOIDAL_SHAPE(0, x, 0, yy, this.toTile);
            }
            else if (shape === exports.Shape.Odd && orientation === false) {
                this.toTile = HexagonalGrid.ODD_Q_TO_CUBE;
                this.toPoint = HexagonalGrid.CUBE_TO_ODD_Q;
                this.tiles = HexagonalGrid.TRAPEZOIDAL_SHAPE(0, x, 0, yy, this.toTile);
            }
            else if (shape === exports.Shape.Odd && orientation === true) {
                this.toTile = HexagonalGrid.ODD_R_TO_CUBE;
                this.toPoint = HexagonalGrid.CUBE_TO_ODD_R;
                this.tiles = HexagonalGrid.TRAPEZOIDAL_SHAPE(0, x, 0, yy, this.toTile);
            }
            else if (shape === exports.Shape.Hexagonal) {
                // this.toTile = HexagonalGrid.EVEN_Q_TO_CUBE;
                // this.toPoint = HexagonalGrid.CUBE_TO_EVEN_Q;
                this.toTile = HexagonalGrid.TWO_AXIS_TO_CUBE;
                this.toPoint = HexagonalGrid.CUBE_TO_TWO_AXIS;
                this.tiles = HexagonalGrid.HEXAGONAL_SHAPE(x);
            }
            else if (shape === exports.Shape.Triangular) {
                this.toTile = HexagonalGrid.EVEN_Q_TO_CUBE;
                this.toPoint = HexagonalGrid.CUBE_TO_EVEN_Q;
                this.tiles = HexagonalGrid.TRIANGULAR_SHAPE(x);
            }
            else { // if (shape === Shape.Rhombus)
                this.toTile = HexagonalGrid.TWO_AXIS_TO_CUBE;
                this.toPoint = HexagonalGrid.CUBE_TO_TWO_AXIS;
                this.tiles = HexagonalGrid.TRAPEZOIDAL_SHAPE(0, x, 0, yy, this.toTile);
            }
        }
        static TWO_AXIS_TO_CUBE(position) {
            return new HexagonalTile(position.x, -position.y - position.x, position.y);
        }
        static CUBE_TO_TWO_AXIS(tile) {
            return new Integer2(tile.x, tile.z);
        }
        static TWO_AXIS_TO_CUBE_XY(position) {
            return new HexagonalTile(position.x, position.y, -position.x - position.y);
        }
        static CUBE_TO_TWO_AXIS_XY(tile) {
            return new Integer2(tile.x, tile.y);
        }
        static TWO_AXIS_TO_CUBE_YZ(position) {
            return new HexagonalTile(-position.x - position.y, position.x, position.y);
        }
        static CUBE_TO_TWO_AXIS_YZ(tile) {
            return new Integer2(tile.y, tile.z);
        }
        static ODD_Q_TO_CUBE(position) {
            /* tslint:disable:no-bitwise */
            const x = position.x;
            const z = position.y - ((position.x - (position.x & 1)) >> 1);
            /* tslint:enable:no-bitwise */
            return new HexagonalTile(x, -x - z, z);
        }
        static CUBE_TO_ODD_Q(tile) {
            const x = tile.x;
            const z = tile.z;
            /* tslint:disable:no-bitwise */
            return new Integer2(x, z + ((x - (x & 1)) >> 1));
            /* tslint:enable:no-bitwise */
        }
        static EVEN_Q_TO_CUBE(position) {
            /* tslint:disable:no-bitwise */
            const x = position.x;
            const z = position.y - ((position.x + (position.x & 1)) >> 1);
            /* tslint:enable:no-bitwise */
            return new HexagonalTile(x, -x - z, z);
        }
        static CUBE_TO_EVEN_Q(tile) {
            const x = tile.x;
            const z = tile.z;
            /* tslint:disable:no-bitwise */
            return new Integer2(x, z + ((x + (x & 1)) >> 1));
            /* tslint:enable:no-bitwise */
        }
        static ODD_R_TO_CUBE(position) {
            /* tslint:disable:no-bitwise */
            const z = position.y;
            const x = position.x - ((position.y - (position.y & 1)) >> 1);
            /* tslint:enable:no-bitwise */
            return new HexagonalTile(x, -x - z, z);
        }
        static CUBE_TO_ODD_R(tile) {
            const x = tile.x;
            const z = tile.z;
            /* tslint:disable:no-bitwise */
            return new Integer2(x + ((z - (z & 1)) >> 1), z);
            /* tslint:enable:no-bitwise */
        }
        static EVEN_R_TO_CUBE(position) {
            /* tslint:disable:no-bitwise */
            const z = position.y;
            const x = position.x - ((position.y + (position.y & 1)) >> 1);
            /* tslint:enable:no-bitwise */
            return new HexagonalTile(x, -x - z, z);
        }
        static CUBE_TO_EVEN_R(tile) {
            const x = tile.x;
            const z = tile.z;
            /* tslint:disable:no-bitwise */
            return new Integer2(x + ((z + (z & 1)) >> 1), z);
            /* tslint:enable:no-bitwise */
        }
        static TRAPEZOIDAL_SHAPE(minQ, maxQ, minR, maxR, toCube) {
            const hexes = [];
            for (let q = minQ; q < maxQ; q++) {
                for (let r = minR; r < maxR; r++) {
                    hexes.push(toCube(new Integer2(q, r)));
                }
            }
            return hexes;
        }
        static TRIANGULAR_SHAPE(size) {
            const hexes = [];
            for (let k = 0; k < size; k++) {
                for (let i = 0; i < (k + 1); i++) {
                    hexes.push(new HexagonalTile(i, -k, k - i));
                }
            }
            return hexes;
        }
        static HEXAGONAL_SHAPE(size) {
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
        static REGION(xmin, xmax, ymin, ymax, zmin, zmax) {
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
            let s = (scale === undefined) ? this.scale : scale;
            s /= SQRT_3_2;
            const o = (orientation === undefined) ? false : this.orientation;
            for (let i = 0; i < 6; i++) {
                const angle = Math.PI * (i * 2 - (o ? 1 : 0)) * 2 / 12;
                points.push(new Float2(s * Math.cos(angle) * 0.5, s * Math.sin(angle) * 0.5));
            }
            return points;
        }
        center(tile) {
            let s;
            const size = this.scale / SQRT_3_2 / 2;
            if (this.orientation) {
                s = new Float2(SQRT_3 * tile.x + SQRT_3_2 * tile.z, tile.z * this.scaleY * 1.5);
            }
            else {
                s = new Float2(tile.x * 1.5, (SQRT_3_2 * tile.x + SQRT_3 * tile.z) * this.scaleY);
            }
            return s.scale(size);
        }
        position(p) {
            const size = this.scale / 2;
            const pp = p.scale(1 / size);
            pp.y *= this.scaleY;
            let q;
            let r;
            if (this.orientation) {
                q = SQRT_3_3 * pp.x + -1 / 3 * pp.y;
                r = 2 / 3 * pp.y;
            }
            else {
                q = 2 / 3 * pp.x;
                r = -1 / 3 * pp.x + SQRT_3_3 * pp.y;
            }
            return new HexagonalTile(Math.round(q), Math.round(-q - r), Math.round(r));
        }
        tile(x, y) {
            return this.toTile ? this.toTile(new Integer2(x, y)) : undefined;
        }
    }
    HexagonalGrid.shapes = [exports.Shape.Hexagonal,
        exports.Shape.Rhombus, exports.Shape.Even, exports.Shape.Odd, exports.Shape.Triangular];
    //# sourceMappingURL=HexagonalGrid.js.map

    /**
     * ![](../../examples/output/brick-grid.svg)
     */
    class BrickGrid extends HexagonalGrid {
        constructor(scale, orientation = false, shape = exports.Shape.Hexagonal, x = 1, y) {
            super(scale, orientation, shape, x, y);
            this.angle = 0;
            this.radius = SQRT_2_4 * scale;
        }
        vertices(orientation, scale) {
            const s = (scale === undefined) ? this.scale : scale;
            const points = [];
            for (let i = 0; i < 4; i++) {
                const angle = Math.PI * (i * 2 - 1) * 2 / 8;
                points.push(new Float2(s * Math.cos(angle) * 0.5, s * Math.sin(angle) * 0.5));
            }
            return points;
        }
        center(cube) {
            let s;
            const size = this.scale / 2;
            if (this.orientation) {
                s = new Float2(SQRT_2 * cube.x + SQRT_2_2 * cube.z, SQRT_2 * cube.z * this.scaleY);
            }
            else {
                s = new Float2(SQRT_2 * cube.x, (SQRT_2_2 * cube.x + SQRT_2 * cube.z) * this.scaleY);
            }
            return s.scale(size);
        }
    }
    //# sourceMappingURL=BrickGrid.js.map

    /**
     * ![](../../examples/output/triangular-tile.svg)
     */
    class TriangularTile extends Integer2 {
        constructor(x = 0, y = 0, s = false) {
            super(x, y);
            this.s = s;
        }
        get key() {
            return this.toString();
        }
        get value() {
            return [this.x, this.y, this.s];
        }
        toString() {
            return this.value.toString();
        }
        equals(p) {
            return (this.s === p.s) && super.equals(p);
        }
        shift() {
            return TriangularTile.directions1[0][1];
        }
        directions() {
            return this.s ? TriangularTile.directions2 : TriangularTile.directions1;
        }
        opposite(n) {
            return TriangularTile.opposites[this.s.toString()][n];
        }
        add(a) {
            const r = super.add(a);
            return new TriangularTile(r.x, r.y, a.s);
        }
        scale(a) {
            const r = super.scale(a);
            return new TriangularTile(r.x, r.y);
        }
        multiNeighbors() {
            const results = [];
            for (let dir = 1; dir < 4; dir++) {
                const d = TriangularTile.multiDirections[this.s.toString()][dir];
                const t = this.s ? TriangularTile.directions2[d][1] : TriangularTile.directions1[d][1];
                results.push([dir, this.add(t)]);
                results.push([TriangularTile.multiOpposites[this.s.toString()][dir], this.add(t)]);
            }
            return results;
        }
        neighbors() {
            const results = [];
            for (let dir = 0; dir < 3; dir++) {
                results.push([TriangularTile.directions1[dir][0],
                    this.add(this.s ? TriangularTile.directions2[dir][1] : TriangularTile.directions1[dir][1])]);
            }
            return results;
        }
    }
    TriangularTile.directions1 = [
        [1, new TriangularTile(0, 0, true)],
        [2, new TriangularTile(-1, 0, true)],
        [3, new TriangularTile(0, -1, true)]
    ];
    TriangularTile.directions2 = [
        [1, new TriangularTile(0, 1, false)],
        [2, new TriangularTile(0, 0, false)],
        [3, new TriangularTile(1, 0, false)]
    ];
    TriangularTile.opposites = {
        false: {
            1: 3,
            2: 1,
            3: 2
        },
        true: {
            1: 2,
            2: 3,
            3: 1
        }
    };
    TriangularTile.multiOpposites = {
        false: {
            '-1': 2,
            '-2': 3,
            '-3': 1,
            1: -3,
            2: -1,
            3: -2
        },
        true: {
            '-1': 3,
            '-2': 1,
            '-3': 2,
            1: -2,
            2: -3,
            3: -1
        }
    };
    TriangularTile.multiDirections = {
        false: {
            1: 0,
            2: 2,
            3: 1
        },
        true: {
            1: 0,
            2: 2,
            3: 1
        }
    };
    //# sourceMappingURL=TriangularTile.js.map

    /**
     * ![](../../examples/output/triangular-grid.svg)
     */
    class TriangularGrid {
        constructor(scale, orientation = false, shape = exports.Shape.Triangular, x = 1, y = 1) {
            this.scaleY = -1;
            this.angle = -60;
            this.tileTypes = TileType.Variable;
            this.scale = scale;
            this.radius = SQRT_3_6 * scale / SQRT_3_2;
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
            this.toTile = (position) => {
                return new TriangularTile(position.x / 2 - (position.x % 2), position.y);
            };
        }
        bounds() {
            return bounds(this);
        }
        center(tile) {
            const scale = this.scale / SQRT_3_2;
            return new Float2((tile.x * 2 + (tile.s ? 1 : 0) + tile.y) * scale / 2, scale * (tile.y * (SQRT_3_2) + (tile.s ? 0 : -(SQRT_3_6))) * this.scaleY);
        }
        vertices(orientation, scale, tileType = 0) {
            let s = (scale === undefined) ? this.scale : scale;
            s /= SQRT_3_2;
            if (this.scaleY > 0 ? tileType === 0 : tileType !== 0) {
                return [
                    new Float2(0, -s * SQRT_3_3),
                    new Float2(-s / 2, s * SQRT_3_6),
                    new Float2(s / 2, s * SQRT_3_6)
                ];
            }
            else {
                return [
                    new Float2(0, s * (SQRT_3_6 + (SQRT_3_6))),
                    new Float2(-s / 2, -s * (SQRT_3_3 - (SQRT_3_6))),
                    new Float2(s / 2, -s * (SQRT_3_3 - (SQRT_3_6)))
                ];
            }
        }
        position(p) {
            return new TriangularTile(Math.round(p.x), Math.round(p.y), false);
        }
        getTileType(tile) {
            return tile.s ? 0 : 1;
        }
        tile(x, y) {
            return new TriangularTile(Math.floor(x / 2), y, !!(x % 2));
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
    TriangularGrid.shapes = [exports.Shape.Hexagonal, exports.Shape.Rhombus, exports.Shape.Triangular];
    //# sourceMappingURL=TriangularGrid.js.map

    class Float3 {
        constructor(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        static ROUND(h) {
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
        static LERP(a, b, t) {
            return new Float3(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t);
        }
        static LINE(a, b) {
            const N = a.distance(b);
            const results = [];
            for (let i = 0; i < (N + 1); i++) {
                results.push(Float3.ROUND(Float3.LERP(a, b, 1 / Math.max(1, N) * i)));
            }
            return results;
        }
        equals(other) {
            return (this.x === other.x) && (this.y === other.y) && (this.z === other.z);
        }
        get value() {
            return [this.x, this.y, this.z];
        }
        toString() {
            return this.value.toString();
        }
        round() {
            return Float3.ROUND(this);
        }
    }
    //# sourceMappingURL=Float3.js.map

    /**
     * ![](../../examples/output/radial-tile.svg)
     * x: angle position
     * y: radius position
     * z: radius width
     * w: angular length
     */
    class RadialTile extends Integer3 {
        constructor() {
            super(...arguments);
            this.tiles = [];
        }
        get value() {
            return [this.x, this.y];
        }
        get key() {
            return this.toString();
        }
        shift() {
            return new RadialTile(-1, 1, 0);
        }
        directions() {
            return RadialTile.directions;
        }
        add(a) {
            const length = this.z || a.z;
            let angle = this.x + a.x;
            angle = angle % length;
            angle = (angle + length) % length;
            return new RadialTile(angle, this.y + a.y, length);
        }
        scale(a) {
            return new RadialTile(this.x, this.y * a, this.z);
        }
        cubeLength() {
            return Math.floor(Math.abs(this.y));
        }
        neighbors() {
            const results = [];
            for (const a of RadialTile.directions) {
                results.push([a[0], this.add(a[1])]);
            }
            return results;
        }
    }
    RadialTile.directions = [
        [Axes4.N, new RadialTile(0, -1, 0)],
        [Axes4.S, new RadialTile(0, 1, 0)],
        [Axes4.E, new RadialTile(1, 0, 0)],
        [Axes4.W, new RadialTile(-1, 0, 0)]
    ];
    //# sourceMappingURL=RadialTile.js.map

    /**
     * ![](../../examples/output/Radial-grid.svg)
     */
    class RadialGrid {
        constructor(scale, orientation = false, shape = exports.Shape.Even, x = 1, y = 1, tile = RadialTile, startY = 0) {
            this.scaleY = -1;
            this.angle = -0;
            this.tileTypes = TileType.Simple;
            this.irregular = true;
            this.scale = scale;
            this.radius = scale / 2;
            this.orientation = orientation;
            this.x = x;
            this.y = y;
            this.startY = startY;
            this.tileCtor = tile;
            const results = [];
            for (let px = 0; px < x; px++) {
                for (let py = startY; py < y; py++) {
                    results.push(new tile(px, py, x));
                }
            }
            this.tiles = results;
            this.toTile = (p) => new this.tileCtor(p.x, p.y);
            this.toPoint = (p) => new Integer2(p.x, p.y);
        }
        bounds() {
            const r = this.scale * this.y;
            return new Rectangle(-r, r, -r, r);
            // return bounds(this);
        }
        vertices(orientation, scale, tileType, tile) {
            const t = tile;
            const points = [];
            const c = this.center(t);
            points.push(this.center(new Float3(t.x - 0.5, t.y - 0.5, t.z)));
            points.push(this.center(new Float3(t.x + 0.5, t.y - 0.5, t.z)));
            points.push(this.center(new Float3(t.x + 0.5, t.y + 0.5, t.z)));
            points.push(this.center(new Float3(t.x - 0.5, t.y + 0.5, t.z)));
            return points.map((p) => new Float2(p.x - c.x, p.y - c.y));
        }
        path(tile) {
            const p = this.vertices(false, 0, 0, tile);
            const c = this.center(tile);
            const r1 = this.scale * tile.y;
            const r2 = this.scale * (tile.y + 1);
            return `M ${p[0].x} ${p[0].y} A ${r1} ${r1} 0 0 0 ${p[1].x} ${p[1].y} `
                + `L ${p[2].x} ${p[2].y} A ${r2} ${r2} 0 0 1 ${p[3].x} ${p[3].y} Z`;
        }
        position(p) {
            return new this.tileCtor(Math.round(p.x / this.scale), Math.round(p.y / this.scale * this.scaleY));
        }
        tile(x, y) {
            return this.toTile(new Integer2(x, y));
        }
        center(tile) {
            let angle;
            if (this.orientation) {
                angle = tile.x + 0.5;
                angle = angle % tile.z;
                angle = (angle + tile.z) % tile.z;
                angle = (angle * DEG_TO_RAD) * (ANG / tile.z);
            }
            else {
                angle = (tile.x * DEG_TO_RAD) * (ANG / tile.z);
            }
            return new Float2((tile.y + 0.5) * this.scale * Math.sin(angle), (tile.y + 0.5) * this.scale * Math.cos(angle));
        }
    }
    //# sourceMappingURL=RadialGrid.js.map

    /**
     * ![](../../examples/output/rectangular-tile.svg)
     */
    class RectangularTile extends Integer2 {
        get key() {
            return this.toString();
        }
        shift() {
            return new RectangularTile(-1, 1);
        }
        directions() {
            return RectangularTile.directions;
        }
        add(a) {
            const r = super.add(a);
            return new RectangularTile(r.x, r.y);
        }
        scale(a) {
            const r = super.scale(a);
            return new RectangularTile(r.x, r.y);
        }
        neighbors() {
            const results = [];
            for (const dir of RectangularTile.directions) {
                results.push([dir[0], this.add(dir[1])]);
            }
            return results;
        }
    }
    RectangularTile.directions = [
        [Axes4.N, new RectangularTile(0, -1)],
        [Axes4.E, new RectangularTile(1, 0)],
        [Axes4.S, new RectangularTile(0, 1)],
        [Axes4.W, new RectangularTile(-1, 0)]
    ];
    //# sourceMappingURL=RectangularTile.js.map

    // TypeScript version of http://www.redblobgames.com/articles/grids/hexagons/
    // Copyright 2013 Red Blob Games <redblobgames@gmail.com>
    // License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
    /**
     * ![](../../examples/output/rectangular-grid.svg)
     */
    class RectangularGrid {
        constructor(scale, orientation = false, shape = exports.Shape.Even, x = 1, y = 1, tile = RectangularTile, startY = 0) {
            this.scaleY = -1;
            this.angle = -45;
            this.tileTypes = TileType.Simple;
            this.scale = scale;
            this.radius = scale / 2;
            this.orientation = orientation;
            this.x = x;
            this.y = y;
            this.startY = y;
            this.tileCtor = tile;
            const results = [];
            for (let px = 0; px < x; px++) {
                for (let py = startY; py < y; py++) {
                    results.push(new tile(px, py));
                }
            }
            this.tiles = results;
            this.toTile = (p) => new this.tileCtor(p.x, p.y);
            this.toPoint = (p) => new Integer2(p.x, p.y);
        }
        bounds() {
            return bounds(this);
        }
        center(tile) {
            if (this.orientation) {
                return new Float2(tile.x * this.scale / SQRT_2 + tile.y * this.scale * this.scaleY / SQRT_2, tile.y * this.scale * this.scaleY / SQRT_2 - tile.x * this.scale / SQRT_2);
            }
            else {
                return new Float2(tile.x * this.scale, tile.y * this.scale * this.scaleY);
            }
        }
        vertices(orientation, scale) {
            const points = [];
            let s = (scale === undefined) ? this.scale : scale;
            const o = (orientation === undefined) ? false : this.orientation;
            if (o) {
                s *= SQRT_2;
                points.push(new Float2(-s / 2, 0));
                points.push(new Float2(0, -s / 2));
                points.push(new Float2(s / 2, 0));
                points.push(new Float2(0, s / 2));
            }
            else {
                points.push(new Float2(-s / 2, -s / 2));
                points.push(new Float2(-s / 2, s / 2));
                points.push(new Float2(s / 2, s / 2));
                points.push(new Float2(s / 2, -s / 2));
            }
            return points;
        }
        position(p) {
            return new this.tileCtor(Math.round(p.x / this.scale), Math.round(p.y / this.scale * this.scaleY));
        }
        tile(x, y) {
            return this.toTile(new Integer2(x, y));
        }
    }
    //# sourceMappingURL=RectangularGrid.js.map

    /**
     * ![](../../examples/output/radial-tile.svg)
     * x: angle position
     * y: radius position
     * z: angular length
     */
    class Radial8Tile extends Integer3 {
        constructor() {
            super(...arguments);
            this.tiles = [];
        }
        get value() {
            return [this.x, this.y];
        }
        get key() {
            return this.toString();
        }
        shift() {
            return new Radial8Tile(-1, 1, 0);
        }
        directions() {
            return Radial8Tile.directions;
        }
        add(a) {
            const length = this.z || a.z;
            let angle = this.x + a.x;
            angle = angle % length;
            angle = (angle + length) % length;
            return new Radial8Tile(angle, this.y + a.y, length);
        }
        scale(a) {
            return new Radial8Tile(this.x, this.y * a, this.z);
        }
        cubeLength() {
            return Math.floor(Math.abs(this.y));
        }
        neighbors() {
            const results = [];
            for (const a of Radial8Tile.directions) {
                results.push([a[0], this.add(a[1])]);
            }
            return results;
        }
    }
    Radial8Tile.directions = [
        [Axes8.N, new Radial8Tile(0, -1, 0)],
        [Axes8.E, new Radial8Tile(1, 0, 0)],
        [Axes8.NW, new Radial8Tile(-1, -1, 0)],
        [Axes8.SW, new Radial8Tile(1, -1, 0)],
        [Axes8.S, new Radial8Tile(0, 1, 0)],
        [Axes8.W, new Radial8Tile(-1, 0, 0)],
        [Axes8.SE, new Radial8Tile(1, 1, 0)],
        [Axes8.NE, new Radial8Tile(-1, 1, 0)]
    ];
    //# sourceMappingURL=Radial8Tile.js.map

    /**
     * ![](../../examples/output/rectangular-tile.svg)
     */
    class Rectangular8Tile extends Integer2 {
        get key() {
            return this.toString();
        }
        shift() {
            return new Rectangular8Tile(-1, 1);
        }
        directions() {
            return Rectangular8Tile.directions;
        }
        sides() {
            return Rectangular8Tile.sides;
        }
        add(a) {
            const r = super.add(a);
            return new Rectangular8Tile(r.x, r.y);
        }
        scale(a) {
            const r = super.scale(a);
            return new Rectangular8Tile(r.x, r.y);
        }
        neighbors() {
            const results = [];
            for (const dir of Rectangular8Tile.directions) {
                results.push([dir[0], this.add(dir[1])]);
            }
            return results;
        }
        sideNeighbors() {
            const results = [];
            for (const dir of RectangularTile.directions) {
                results.push([dir[0], this.add(dir[1])]);
            }
            return results;
        }
    }
    Rectangular8Tile.directions = [
        [Axes8.N, new Rectangular8Tile(0, -1)],
        [Axes8.E, new Rectangular8Tile(1, 0)],
        [Axes8.NW, new Rectangular8Tile(-1, -1)],
        [Axes8.SW, new Rectangular8Tile(1, -1)],
        [Axes8.S, new Rectangular8Tile(0, 1)],
        [Axes8.W, new Rectangular8Tile(-1, 0)],
        [Axes8.SE, new Rectangular8Tile(1, 1)],
        [Axes8.NE, new Rectangular8Tile(-1, 1)]
    ];
    Rectangular8Tile.sides = [
        Rectangular8Tile.directions[0],
        Rectangular8Tile.directions[1],
        Rectangular8Tile.directions[4],
        Rectangular8Tile.directions[5]
    ];
    //# sourceMappingURL=Rectangular8Tile.js.map

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
    function mapped(available, selection) {
        return selection.filter((t) => available.has(t[1].key))
            .map((t) => [t[0], available.get(t[1].key)]);
    }
    function toMap(tiles) {
        return new Map(tiles.map((t) => ([t.key, t])));
    }
    function toArray(m) {
        return Array.from(m.values());
    }
    function link(tilesMap) {
        for (const tile of tilesMap.values()) {
            tile.links = new Map();
            for (const n of tile.multiNeighbors ? tile.multiNeighbors() : tile.neighbors()) {
                if (tilesMap.has(n[1].key)) {
                    tile.links.set(n[0], tilesMap.get(n[1].key));
                }
            }
        }
    }
    //# sourceMappingURL=Utils.js.map

    // From http://www.redblobgames.com/grids/hexagons/
    // Copyright 2013 Red Blob Games <redblobgames@gmail.com>
    // License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
    // Original source: http://www.redblobgames.com/grids/hexagons/ui.js
    class Search {
        constructor(start, maxMovement, maxMagnitude, blocked, available) {
            this.cost = {};
            this.previous = {};
            this.max = 0;
            const starts = start.value ? [start] : start;
            this.start = starts[0];
            const blockedMap = blocked ? toMap(blocked) : undefined;
            const availableMap = available ? toMap(available) : undefined;
            for (const s of starts) {
                this.cost[s.key] = 0;
                this.previous[s.key] = null;
            }
            const fringes = [starts];
            for (let k = 0; k < maxMovement && fringes[k].length > 0; k++) {
                fringes[k + 1] = [];
                for (const tile of fringes[k]) {
                    const neighbors = tile.neighbors();
                    for (const dir of neighbors) {
                        const neighbor = dir[1];
                        if (availableMap && !availableMap.has(neighbor.key)) {
                            continue;
                        }
                        if ((this.cost[neighbor.key] === undefined)
                            && ((blockedMap && !blockedMap.has(neighbor.key)) || (!blocked))
                            && neighbor.cubeLength() <= maxMagnitude) {
                            this.cost[neighbor.key] = k + 1;
                            this.max = Math.max(this.max, k + 1);
                            this.previous[neighbor.key] = tile;
                            fringes[k + 1].push(neighbor);
                        }
                    }
                }
            }
        }
        path(end, max = false) {
            const ends = end.value ? [end] : end;
            const min = (max ? Math.max : Math.min)
                .apply(null, ends.map((e) => this.cost[e.key]).filter((e) => e !== undefined));
            const path = [];
            let node = ends.find((e) => this.cost[e.key] === min) || null;
            while (node) {
                path.push(node);
                node = node.equals(this.start) ? null : this.previous[node.key];
            }
            return path;
        }
    }
    //# sourceMappingURL=Search.js.map

    function rotate(grid, direction = 1) {
        grid.tiles.forEach((t) => {
            let d = direction;
            while (d > 0) {
                t.right();
                d--;
            }
            while (d < 0) {
                t.left();
                d++;
            }
        });
    }
    function translate(grid, position) {
        grid.tiles = grid.tiles.map((t) => grid.toTile ? grid.toTile(grid.toPoint(t).add(position)) : []);
    }
    function min(grid) {
        const points = grid.tiles.map((t) => grid.toPoint(t));
        return new Integer2(Math.min.apply(null, points.map((p) => p.x)), Math.min.apply(null, points.map((p) => p.y)));
    }
    function normalize(grid) {
        const m = min(grid);
        m.x = -m.x;
        m.y = -m.y;
        grid.tiles = grid.tiles.map((t) => grid.toTile ? grid.toTile(grid.toPoint(t).add(m)) : []);
    }
    //# sourceMappingURL=Transform.js.map

    function circle(start, N) {
        return spiral(start, N, false);
    }
    function spiral(start, N, isSpiral = true) {
        const results = [];
        if (isSpiral) {
            results.push(start.add(instance(start)));
        }
        const neighbors = start.sideNeighbors ? start.sideNeighbors() : start.neighbors();
        const c = (neighbors.length === 6) ? 1 : 2;
        for (let k = isSpiral ? 1 : N; k <= N; k++) {
            let H = start.shift().scale(k);
            for (let i = 0; i < neighbors.length; i++) {
                for (let j = 0; j < k * c; j++) {
                    results.push(H.add(start));
                    H = (H.sideNeighbors ? H.sideNeighbors() : H.neighbors())[i][1];
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
            const v = i.value;
            const l = (Math.abs(v[axe % v.length]) % 2) === 1;
            if (l === odd) {
                results.push(i);
            }
        }
        return results;
    }
    function border(tiles) {
        const tileMap = toMap(tiles);
        return tiles.filter((t) => mapped(tileMap, t.neighbors()).length < t.directions().length);
    }
    function outline(tiles, available) {
        const map = new Map();
        const tileMap = toMap(tiles);
        const availableMap = available ? toMap(available) : undefined;
        tiles.forEach((t) => {
            const n = new Map(mapped(tileMap, t.neighbors()));
            const d = new Map(t.directions());
            if (n.size < d.size) {
                for (const [k, v] of d) {
                    if (!n.has(k)) {
                        const w = t.add(v);
                        if (availableMap) {
                            map.set(w.key, availableMap.get(w.key));
                        }
                        else {
                            map.set(w.key, w);
                        }
                    }
                }
            }
        });
        return Array.from(map.values());
    }
    function connections(tiles) {
        const c = [];
        const available = toMap(tiles);
        for (const t of tiles) {
            const m = new Map(mapped(available, t.neighbors()));
            const s = Array.from(m.keys()).filter((k) => (k > 0) && !m.has(t.opposite ? t.opposite(k) : -k));
            for (const k of s) {
                const l = [];
                let i = t;
                while (i) {
                    l.push(i);
                    i = new Map(mapped(available, i.neighbors())).get(k);
                }
                c.push(l);
            }
        }
        return c;
    }
    //# sourceMappingURL=Path.js.map

    //# sourceMappingURL=index.js.map

    exports.BrickGrid = BrickGrid;
    exports.HexagonalGrid = HexagonalGrid;
    exports.TriangularGrid = TriangularGrid;
    exports.RadialGrid = RadialGrid;
    exports.RectangularGrid = RectangularGrid;
    exports.Position = Integer2;
    exports.HexagonalTile = HexagonalTile;
    exports.Radial8Tile = Radial8Tile;
    exports.RadialTile = RadialTile;
    exports.Rectangular8Tile = Rectangular8Tile;
    exports.RectangularTile = RectangularTile;
    exports.TriangularTile = TriangularTile;
    exports.Float2 = Float2;
    exports.Float3 = Float3;
    exports.Integer2 = Integer2;
    exports.Integer3 = Integer3;
    exports.Search = Search;
    exports.normalize = normalize;
    exports.translate = translate;
    exports.rotate = rotate;
    exports.enumerate = enumerate;
    exports.instance = instance;
    exports.toMap = toMap;
    exports.toArray = toArray;
    exports.link = link;
    exports.axes = axes;
    exports.intersect = intersect;
    exports.circle = circle;
    exports.spiral = spiral;
    exports.border = border;
    exports.outline = outline;
    exports.connections = connections;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=gridy.js.map
