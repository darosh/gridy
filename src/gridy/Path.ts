/// <reference path="ITile.ts" />
/// <reference path="Utils.ts" />

module Gridy {
    'use strict';

    export module Path {
        'use strict';

        export function spiral(start:ITile<any>, N:Integer, spiral:boolean):Array<ITile<any>> {
            var results:Array<ITile<any>> = [];

            if (spiral) {
                results.push(start.add(Utils.newInstance(start)));
            }

            var neighbors:Array<ITile<any>> = start.neighbors();
            var c:Integer = (neighbors.length === 6) ? 1 : 2;

            for (var k:Integer = spiral ? 1 : N; k <= N; k++) {
                var H:ITile<any> = start.shift().scale(k);

                for (var i:Integer = 0; i < neighbors.length; i++) {
                    for (var j:Integer = 0; j < k * c; j++) {
                        results.push(H.add(start));
                        H = H.neighbors()[i];
                    }
                }
            }

            return results;
        }

        export function intersect(a:Array<ITile<any>>, b:Array<ITile<any>>):Array<ITile<any>> {
            var results:Array<ITile<any>> = [];

            for (var i:Integer = 0; i < a.length; i++) {
                for (var j:Integer = 0; j < b.length; j++) {
                    if (a[i].equals(b[j])) {
                        results.push(a[i]);
                    }
                }
            }

            return results;
        }

        export function axes(a:Array<ITile<any>>, axe:Integer, odd:boolean = false):Array<ITile<any>> {
            var results:Array<ITile<any>> = [];

            for (var i:Integer = 0; i < a.length; i++) {
                var v:Array<any> = a[i].v();
                var l:boolean = (Math.abs(v[axe % v.length]) % 2) === 1;

                if (l === odd) {
                    results.push(a[i]);
                }
            }

            return results;
        }
    }
}
