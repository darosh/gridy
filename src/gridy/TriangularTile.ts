/// <reference path="ITile.ts" />
/// <reference path="Integer2.ts" />

module Gridy {
    'use strict';

    export class TriangularTile extends Integer2 implements ITile<Integer2> {
        static directions:Array<TriangularTile> = [
            new TriangularTile(0, 0, true),
            new TriangularTile(-1, 0, false),
            new TriangularTile(0, -1, false)
        ];

        s:boolean;

        constructor(x:Integer = 0, y:Integer = 0, s:boolean = false) {
            super(x, y);
            this.s = s;
        }

        v():Array<any> {
            return [this.x, this.y, this.s];
        }

        toString():string {
            return this.v().join(',');
        }

        shift():TriangularTile {
            return TriangularTile.directions[0];
        }

        directions():Array<TriangularTile> {
            return TriangularTile.directions;
        }

        add(a:TriangularTile):TriangularTile {
            var r:Integer2 = super.add(a);
            return new TriangularTile(r.x, r.y);
        }

        scale(a:Integer):TriangularTile {
            var r:Integer2 = super.scale(a);
            return new TriangularTile(r.x, r.y);
        }

        neighbors():Array<TriangularTile> {
            var results:Array<any> = [];

            for (var dir:Integer = 0; dir < 3; dir++) {
                results.push(this.add(TriangularTile.directions[dir]));
            }

            return results;
        }
    }
}
