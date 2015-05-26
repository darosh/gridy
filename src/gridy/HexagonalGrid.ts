// From http://www.redblobgames.com/grids/hexagons/
// Copyright 2012 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
// Original source: http://www.redblobgames.com/grids/hexagons/Grid.hx

/// <reference path="IGrid.ts" />
/// <reference path="HexagonalTile.ts" />
/// <reference path="GridShape.ts" />
/// <reference path="Position.ts" />
/// <reference path="Bounds.ts" />

module Gridy {
    'use strict';

    export class HexagonalGrid implements IGrid<HexagonalTile> {
        static SQRT_3:Float = Math.sqrt(3);
        static SQRT_3_2:Float = Math.sqrt(3) / 2;
        static SQRT_3_3:Float = Math.sqrt(3) / 3;

        tiles:Array<HexagonalTile>;
        orientation:boolean;
        scale:Float;
        angle:Float = -30;
        x:Integer;
        y:Integer;
        toTile:(position:Position) => HexagonalTile;
        toPoint:(tile:HexagonalTile) => Position;
        tileTypes:Integer = 1;
        radius:Float;

        shape:GridShape;

        constructor(scale:Float, orientation:boolean, shape:GridShape, x:Integer, y:Integer = null) {
            this.scale = scale;
            this.radius = HexagonalGrid.SQRT_3_2 * scale / 2;
            this.orientation = orientation;
            this.x = x;
            this.y = y;
            this.shape = shape;

            if (shape === GridShape.TrapezoidalEven && orientation === false) {
                this.toTile = HexagonalGrid.evenQToCube;
                this.toPoint = HexagonalGrid.cubeToEvenQ;
                this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
            } else if (shape === GridShape.TrapezoidalEven && orientation === true) {
                this.toTile = HexagonalGrid.evenRToCube;
                this.toPoint = HexagonalGrid.cubeToEvenR;
                this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
            } else if (shape === GridShape.TrapezoidalOdd && orientation === false) {
                this.toTile = HexagonalGrid.oddQToCube;
                this.toPoint = HexagonalGrid.cubeToOddQ;
                this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
            } else if (shape === GridShape.TrapezoidalOdd && orientation === true) {
                this.toTile = HexagonalGrid.oddRToCube;
                this.toPoint = HexagonalGrid.cubeToOddR;
                this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
            } else if (shape === GridShape.Hexagonal) {
                this.toTile = HexagonalGrid.evenQToCube;
                this.toPoint = HexagonalGrid.cubeToEvenQ;
                this.tiles = HexagonalGrid.hexagonalShape(x);
            } else if (shape === GridShape.Triangular) {
                this.toTile = HexagonalGrid.evenQToCube;
                this.toPoint = HexagonalGrid.cubeToEvenQ;
                this.tiles = HexagonalGrid.triangularShape(x);
            } else if (shape === GridShape.Rhombus) {
                this.toTile = HexagonalGrid.twoAxisToCube;
                this.toPoint = HexagonalGrid.cubeToTwoAxis;
                this.tiles = HexagonalGrid.trapezoidalShape(0, x, 0, y, this.toTile);
            }
        }

        static twoAxisToCube(position:Position):HexagonalTile {
            return new HexagonalTile(position.x, -position.y - position.x, position.y);
        }

        static cubeToTwoAxis(tile:HexagonalTile):Position {
            return new Position(Math.floor(tile.x), Math.floor(tile.z));
        }

        static oddQToCube(position:Position):HexagonalTile {
            /* tslint:disable:no-bitwise */
            var x:Integer = position.x,
                z:Integer = position.y - ((position.x - (position.x & 1)) >> 1);
            /* tslint:enable:no-bitwise */

            return new HexagonalTile(x, -x - z, z);
        }

        static cubeToOddQ(tile:HexagonalTile):Position {
            var x:Integer = Math.floor(tile.x),
                z:Integer = Math.floor(tile.z);

            /* tslint:disable:no-bitwise */
            return new Position(x, z + ((x - (x & 1)) >> 1));
            /* tslint:enable:no-bitwise */
        }

        static evenQToCube(position:Position):HexagonalTile {
            /* tslint:disable:no-bitwise */
            var x:Integer = position.x,
                z:Integer = position.y - ((position.x + (position.x & 1)) >> 1);
            /* tslint:enable:no-bitwise */

            return new HexagonalTile(x, -x - z, z);
        }

        static cubeToEvenQ(tile:HexagonalTile):Position {
            var x:Integer = Math.floor(tile.x),
                z:Integer = Math.floor(tile.z);

            /* tslint:disable:no-bitwise */
            return new Position(x, z + ((x + (x & 1)) >> 1));
            /* tslint:enable:no-bitwise */
        }

        static oddRToCube(position:Position):HexagonalTile {
            /* tslint:disable:no-bitwise */
            var z:Integer = position.y,
                x:Integer = position.x - ((position.y - (position.y & 1)) >> 1);
            /* tslint:enable:no-bitwise */

            return new HexagonalTile(x, -x - z, z);
        }

        static cubeToOddR(tile:HexagonalTile):Position {
            var x:Integer = Math.floor(tile.x),
                z:Integer = Math.floor(tile.z);

            /* tslint:disable:no-bitwise */
            return new Position(x + ((z - (z & 1)) >> 1), z);
            /* tslint:enable:no-bitwise */
        }

        static evenRToCube(position:Position):HexagonalTile {
            /* tslint:disable:no-bitwise */
            var z:Integer = position.y,
                x:Integer = position.x - ((position.y + (position.y & 1)) >> 1);
            /* tslint:enable:no-bitwise */

            return new HexagonalTile(x, -x - z, z);
        }

        static cubeToEvenR(tile:HexagonalTile):Position {
            var x:Integer = Math.floor(tile.x),
                z:Integer = Math.floor(tile.z);

            /* tslint:disable:no-bitwise */
            return new Position(x + ((z + (z & 1)) >> 1), z);
            /* tslint:enable:no-bitwise */
        }

        static trapezoidalShape(minQ:Integer, maxQ:Integer,
                                minR:Integer, maxR:Integer,
                                toCube:(position:Position) => HexagonalTile):Array<HexagonalTile> {
            var hexes:Array<HexagonalTile> = [];

            for (var q:Integer = minQ; q < maxQ; q++) {
                for (var r:Integer = minR; r < maxR; r++) {
                    hexes.push(toCube(new Position(q, r)));
                }
            }

            return hexes;
        }

        static triangularShape(size:Integer):Array<HexagonalTile> {
            var hexes:Array<HexagonalTile> = [];

            for (var k:Integer = 0; k < size; k++) {
                for (var i:Integer = 0; i < (k + 1); i++) {
                    hexes.push(new HexagonalTile(i, -k, k - i));
                }
            }

            return hexes;
        }

        static hexagonalShape(size:Integer):Array<HexagonalTile> {
            var hexes:Array<HexagonalTile> = [];

            for (var x:Integer = -size; x < size; x++) {
                for (var y:Integer = -size; y < size; y++) {
                    var z:Integer = -x - y;

                    if (Math.abs(x) < size && Math.abs(y) < size && Math.abs(z) < size) {
                        hexes.push(new HexagonalTile(x, y, z));
                    }
                }
            }

            return hexes;
        }

        static region(xmin:Integer, xmax:Integer, ymin:Integer, ymax:Integer, zmin:Integer, zmax:Integer):Array<HexagonalTile> {
            var results:Array<HexagonalTile> = [];

            for (var x:Integer = xmin; x <= xmax; x++) {
                for (var y:Integer = Math.max(ymin, -x - zmax); y <= Math.min(ymax, -x - zmin); y++) {
                    var z:Integer = -x - y;
                    results.push(new HexagonalTile(x, y, z));
                }
            }

            return results;
        }

        bounds():Rectangle {
            return Bounds.bounds(this);
        }

        vertices(orientation:boolean = null, scale:Float = null):Array<Float2> {
            var points:Array<Float2> = [];
            orientation = (orientation === null) ? false : this.orientation;
            scale = (scale === null) ? this.scale : scale;

            for (var i:Integer = 0; i < 6; i++) {
                var angle:Float = 2 * Math.PI * (2 * i - (orientation ? 1 : 0)) / 12;

                points.push(new Float2(0.5 * scale * Math.cos(angle), 0.5 * scale * Math.sin(angle)));
            }

            return points;
        }

        center(tile:HexagonalTile):Float2 {
            var s:Float2;
            var size:Float = this.scale / 2;

            if (this.orientation) {
                s = new Float2(HexagonalGrid.SQRT_3 * tile.x + HexagonalGrid.SQRT_3_2 * tile.z, 1.5 * tile.z);
            } else {
                s = new Float2(1.5 * tile.x, HexagonalGrid.SQRT_3_2 * tile.x + HexagonalGrid.SQRT_3 * tile.z);
            }

            return s.scale(size);
        }

        position(p:Float2):HexagonalTile {
            var size:Float = this.scale / 2;
            p = p.scale(1 / size);

            var q:Float,
                r:Float;

            if (this.orientation) {
                q = HexagonalGrid.SQRT_3_3 * p.x + -1 / 3 * p.y;
                r = 2 / 3 * p.y;

                return new HexagonalTile(Math.round(q), Math.round(-q - r), Math.round(r));
            } else {
                q = 2 / 3 * p.x;
                r = -1 / 3 * p.x + HexagonalGrid.SQRT_3_3 * p.y;

                return new HexagonalTile(Math.round(q), Math.round(-q - r), Math.round(r));
            }
        }
    }
}
