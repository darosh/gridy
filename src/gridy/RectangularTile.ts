/// <reference path="ITile.ts" />
/// <reference path="Integer2.ts" />

module Gridy {
    'use strict';

    export class RectangularTile extends Integer2 implements ITile<Integer2> {
        static directions:Array<RectangularTile> = [
            new RectangularTile(0, -1),
            new RectangularTile(1, 0),
            new RectangularTile(0, 1),
            new RectangularTile(-1, 0)
        ];

        shift():RectangularTile {
            return new RectangularTile(-1, 1);
        }

        directions():Array<RectangularTile> {
            return RectangularTile.directions;
        }

        add(a:RectangularTile):RectangularTile {
            var r:Integer2 = super.add(a);
            return new RectangularTile(r.x, r.y);
        }

        scale(a:Integer):RectangularTile {
            var r:Integer2 = super.scale(a);
            return new RectangularTile(r.x, r.y);
        }

        neighbors():Array<RectangularTile> {
            var results:Array<any> = [];

            for (var dir:Integer = 0; dir < RectangularTile.directions.length; dir++) {
                results.push(this.add(RectangularTile.directions[dir]));
            }

            return results;
        }
    }
}
