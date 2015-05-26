/// <reference path="IVector.ts" />
/// <reference path="Integer.ts" />
/// <reference path="Integer3.ts" />
/// <reference path="Float.ts" />

module Gridy {
    'use strict';

    export class Float3 implements IVector<Float> {
        x:Float;
        y:Float;
        z:Float;

        constructor(x:Float, y:Float, z:Float) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        static round(h:Float3):Integer3 {
            var rx:Integer = Math.round(h.x);
            var ry:Integer = Math.round(h.y);
            var rz:Integer = Math.round(h.z);

            var x_diff:Float = Math.abs(rx - h.x);
            var y_diff:Float = Math.abs(ry - h.y);
            var z_diff:Float = Math.abs(rz - h.z);

            if (x_diff > y_diff && x_diff > z_diff) {
                rx = -ry - rz;
            } else if (y_diff > z_diff) {
                ry = -rx - rz;
            } else {
                rz = -rx - ry;
            }

            return new Integer3(rx, ry, rz);
        }


        static lerp(a:Integer3, b:Integer3, t:Float):Float3 {
            return new Float3(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, a.z + (b.z - a.z) * t);
        }

        static line(a:Integer3, b:Integer3):Array<Integer3> {
            var N:Integer = a.distance(b);
            var results:Array<Integer3> = [];

            for (var i:Integer = 0; i < (N + 1); i++) {
                results.push(Float3.round(Float3.lerp(a, b, 1.0 / Math.max(1, N) * i)));
            }

            return results;
        }

        equals(other:Float3):boolean {
            return (this.x === other.x) && (this.y === other.y) && (this.z === other.z);
        }

        v():Array<Float> {
            return [this.x, this.y, this.z];
        }

        toString():string {
            return '#{' + this.v().join(',') + '}';
        }

        round():Integer3 {
            return Float3.round(this);
        }
    }
}
