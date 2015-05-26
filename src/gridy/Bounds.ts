// From http://www.redblobgames.com/grids/hexagons/
// Copyright 2012 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
// Original source: http://www.redblobgames.com/grids/hexagons/Grid.hx

/// <reference path="IGrid.ts" />
/// <reference path="ITile.ts" />

module Gridy {
    'use strict';
    export module Bounds {
        function boundsOfPoints(points:Array<Float2>):Rectangle {
            var rectangle:Rectangle = new Rectangle();

            for (var i:Integer = 0; i < points.length; i++) {
                var p:Float2 = points[i];

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

        export function bounds(grid:IGrid<any>):Rectangle {
            var centers:Array<Float2> = grid.tiles.map((tile:ITile<any>):Float2 => {
                return grid.center(tile);
            });

            // TODO use vertices(..,...,tileType) for TriangularGrid;

            var b1:Rectangle = boundsOfPoints(grid.vertices());
            var b2:Rectangle = boundsOfPoints(centers);

            return Rectangle.add(b1, b2);
        }
    }
}
