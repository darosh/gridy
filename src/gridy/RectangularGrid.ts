// TypeScript version of http://www.redblobgames.com/articles/grids/hexagons/
// Copyright 2013 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>

/// <reference path="IGrid.ts" />
/// <reference path="RectangularTile.ts" />
/// <reference path="GridShape.ts" />
/// <reference path="Bounds.ts" />

module Gridy {
    'use strict';

    export class RectangularGrid implements IGrid<RectangularTile> {
        static SQRT_2:Float = Math.sqrt(2);

        tiles:Array<RectangularTile>;
        orientation:boolean;
        scale:Float;
        angle:Float = -45;
        x:Integer;
        y:Integer;
        toTile:(point:Position) => RectangularTile;
        toPoint:(tile:RectangularTile) => Position;
        tileTypes:Integer = 1;
        radius:Float;

        constructor(scale:Float, orientation:boolean, shape:GridShape, x:Integer, y:Integer = null) {
            this.scale = scale;
            this.radius = scale / 2;
            this.orientation = orientation;
            this.x = x;
            this.y = y;

            var results:Array<RectangularTile> = [];

            for (var px:Integer = 0; px < x; px++) {
                for (var py:Integer = 0; py < y; py++) {
                    results.push(new RectangularTile(px, py));
                }
            }

            this.tiles = results;


            this.toTile = function (p:Position):RectangularTile {
                return new RectangularTile(p.x, p.y);
            };

            this.toPoint = function (p:RectangularTile):Position {
                return new Position(p.x, p.y);
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

        bounds():Rectangle {
            return Bounds.bounds(this);
        }

        center(tile:RectangularTile):Float2 {
            if (this.orientation) {
                return new Float2(
                    tile.x * this.scale / RectangularGrid.SQRT_2 + tile.y * this.scale / RectangularGrid.SQRT_2,
                    tile.y * this.scale / RectangularGrid.SQRT_2 - tile.x * this.scale / RectangularGrid.SQRT_2
                );
            } else {
                return new Float2(tile.x * this.scale, tile.y * this.scale);
            }
        }

        vertices(orientation:boolean = null, scale:Float = null):Array<Float2> {
            var points:Array<Float2> = [];
            orientation = (orientation === null) ? false : this.orientation;
            scale = (scale === null) ? this.scale : scale;

            if (orientation) {
                scale *= RectangularGrid.SQRT_2;

                points.push(new Float2(-scale / 2, 0));
                points.push(new Float2(0, -scale / 2));
                points.push(new Float2(scale / 2, 0));
                points.push(new Float2(0, scale / 2));
            } else {
                points.push(new Float2(-scale / 2, -scale / 2));
                points.push(new Float2(-scale / 2, scale / 2));
                points.push(new Float2(scale / 2, scale / 2));
                points.push(new Float2(scale / 2, -scale / 2));
            }

            return points;
        }

        position(p:Float2):RectangularTile {
            return new RectangularTile(Math.round(p.x), Math.round(p.y));
        }
    }
}
