/// <reference path="HexagonalGrid.ts" />
/// <reference path="GridShape.ts" />

module Gridy {
    'use strict';

    export class BrickGrid extends HexagonalGrid {
        angle:Float = 0;

        constructor(scale:Float, orientation:boolean, shape:GridShape, x:Integer, y:Integer = null) {
            super(scale, orientation, shape, x, y);
            this.radius = Math.sqrt(2) / 4 * scale;
        }

        vertices(orientation:boolean = null, scale:Float = null):Array<Float2> {
            var points:Array<Float2> = [];
            scale = (scale === null) ? this.scale : scale;

            for (var i:Integer = 0; i < 4; i++) {
                var angle:Float = 2 * Math.PI * (2 * i - 1) / 8;

                points.push(new Float2(0.5 * scale * Math.cos(angle), 0.5 * scale * Math.sin(angle)));
            }

            return points;
        }

        center(cube:HexagonalTile):Float2 {
            var s:Float2;
            var size:Float = this.scale / 2;

            if (this.orientation) {
                s = new Float2(Math.sqrt(2) * cube.x + Math.sqrt(2) / 2 * cube.z, Math.sqrt(2) * cube.z);
            } else {
                s = new Float2(Math.sqrt(2) * cube.x, Math.sqrt(2) / 2 * cube.x + Math.sqrt(2) * cube.z);
            }

            return s.scale(size);
        }
    }
}
