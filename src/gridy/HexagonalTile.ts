// From http://www.redblobgames.com/grids/hexagons/
// Copyright 2013 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
// Original source: http://www.redblobgames.com/grids/hexagons/Cube.hx

/// <reference path="Integer3.ts" />
/// <reference path="ITile.ts" />

module Gridy {
    'use strict';

    export class HexagonalTile extends Integer3 implements ITile<Integer3> {
        static directions:Array<HexagonalTile> = [
            new HexagonalTile(1, -1, 0),
            new HexagonalTile(1, 0, -1),
            new HexagonalTile(0, 1, -1),
            new HexagonalTile(-1, 1, 0),
            new HexagonalTile(-1, 0, 1),
            new HexagonalTile(0, -1, 1)
        ];

        shift():HexagonalTile {
            return HexagonalTile.directions[4];
        }

        directions():Array<HexagonalTile> {
            return HexagonalTile.directions;
        }

        add(a:HexagonalTile):HexagonalTile {
            var r:Integer3 = super.add(a);
            return new HexagonalTile(r.x, r.y, r.z);
        }

        scale(a:Integer):HexagonalTile {
            var r:Integer3 = super.scale(a);
            return new HexagonalTile(r.x, r.y, r.z);
        }

        neighbors():Array<HexagonalTile> {
            var results:Array<any> = [];

            for (var dir:Integer = 0; dir < 6; dir++) {
                results.push(this.add(HexagonalTile.directions[dir]));
            }

            return results;
        }
    }
}
