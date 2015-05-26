/// <reference path="IVector.ts" />
/// <reference path="Integer.ts" />
/// <reference path="Integer2.ts" />
/// <reference path="Float.ts" />

module Gridy {
    'use strict';

    export class Float2 implements IVector<Float> {
        x:Float;
        y:Float;

        constructor(x:Float = 0, y:Float = 0) {
            this.x = x;
            this.y = y;
        }

        static round(h:Float2):Integer2 {
            var rx:Integer = Math.round(h.x);
            var ry:Integer = Math.round(h.y);

            return new Integer2(rx, ry);
        }

        static lerp(a:Integer2, b:Integer2, t:Float):Float2 {
            return new Float2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
        }

        static line(a:Integer2, b:Integer2):Array<Integer2> {
            var N:Integer = a.distance(b);
            var results:Array<Integer2> = [];

            for (var i:Integer = 0; i < (N + 1); i++) {
                results.push(Float2.round(Float2.lerp(a, b, 1.0 / Math.max(1, N) * i)));
            }

            return results;
        }

        equals(p:Float2):boolean {
            return (this.x === p.x) && (this.y === p.y);
        }

        v():Array<Float> {
            return [this.x, this.y];
        }

        scale(k:Float):Float2 {
            return new Float2(this.x * k, this.y * k);
        }

        toString():string {
            return this.v().join(',');
        }
    }
}
