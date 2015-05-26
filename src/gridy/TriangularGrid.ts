/// <reference path="IGrid.ts" />
/// <reference path="TriangularTile.ts" />
/// <reference path="Bounds.ts" />
/// <reference path="GridShape.ts" />

module Gridy {
    'use strict';

    export class TriangularGrid implements IGrid<TriangularTile> {
        tiles:Array<TriangularTile>;
        orientation:boolean;
        scale:Float;
        angle:Float = -60;
        x:Integer;
        y:Integer;
        toTile:(position:Position) => TriangularTile;
        toPoint:(tile:TriangularTile) => Position;
        tileTypes:Integer = 2;
        radius:Float;

        constructor(scale:Float, orientation:boolean, shape:GridShape, x:Integer, y:Integer = null) {
            this.scale = scale;
            this.radius = Math.sqrt(3) / 6 * scale;
            this.orientation = orientation;
            this.x = x;
            this.y = y;

            if (shape === GridShape.Rhombus) {
                this.tiles = this.rhombus();
                this.orientation = false;
            } else if (shape === GridShape.Hexagonal) {
                this.tiles = this.hexagonalShape(x);
                this.orientation = false;
            } else {
                this.tiles = this.triangle();
                this.orientation = false;
            }

            this.toPoint = function (tile:TriangularTile):Position {
                return new Position(tile.x * 2 + (tile.s ? 1 : 0), tile.y);
            };
        }

        bounds():Rectangle {
            return Bounds.bounds(this);
        }

        center(tile:TriangularTile):Float2 {
            return new Float2(
                (tile.x * 2 + (tile.s ? 1 : 0) + tile.y) * this.scale / 2,
                this.scale * (tile.y * (Math.sqrt(3) / 2) + (tile.s ? 0 : -(Math.sqrt(3) / 6)))
            );
        }

        vertices(orientation:boolean, scale:Float, tileType:Integer = 0):Array<Float2> {
            if (tileType === 0) {
                return [
                    new Float2(0, -this.scale * Math.sqrt(3) / 3),
                    new Float2(-this.scale / 2, this.scale * Math.sqrt(3) / 6),
                    new Float2(this.scale / 2, this.scale * Math.sqrt(3) / 6)
                ];
            } else {
                return [
                    new Float2(0, this.scale * (Math.sqrt(3) / 6 + (Math.sqrt(3) / 6))),
                    new Float2(-this.scale / 2, -this.scale * (Math.sqrt(3) / 3 - (Math.sqrt(3) / 6))),
                    new Float2(this.scale / 2, -this.scale * (Math.sqrt(3) / 3 - (Math.sqrt(3) / 6)))
                ];
            }
        }

        position(p:Float2):TriangularTile {
            return new TriangularTile(Math.round(p.x), Math.round(p.y), false);
        }

        getTileType(tile:TriangularTile):Integer {
            return tile.s ? 0 : 1;
        }

        private rhombus():Array<TriangularTile> {
            var results:Array<TriangularTile> = [];

            for (var px:Integer = 0; px < this.x; px++) {
                for (var py:Integer = 0; py < this.y; py++) {
                    results.push(new TriangularTile(px, py, false));
                    results.push(new TriangularTile(px, py, true));
                }
            }

            return results;
        }

        private triangle():Array<TriangularTile> {
            var results:Array<TriangularTile> = [];

            for (var py:Integer = 0; py < this.x; py++) {
                for (var px:Integer = 0; px < (this.x - py); px++) {
                    results.push(new TriangularTile(px, py, false));

                    if (px < (this.x - py - 1)) {
                        results.push(new TriangularTile(px, py, true));
                    }
                }
            }

            return results;
        }

        private hexagonalShape(size:Integer):Array<TriangularTile> {
            var results:Array<TriangularTile> = [];

            for (var x:Integer = -size; x < size; x++) {
                for (var y:Integer = -size; y < size; y++) {
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
}
