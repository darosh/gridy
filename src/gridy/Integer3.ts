/// <reference path="IVector.ts" />
/// <reference path="Integer.ts" />

module Gridy {
    'use strict';

    export class Integer3 implements IVector<Integer> {
        x:Integer;
        y:Integer;
        z:Integer;

        constructor(x:Integer = 0, y:Integer = 0, z:Integer = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        distance(b:Integer3):Integer {
            return Math.floor((Math.abs(this.x - b.x) + Math.abs(this.y - b.y) + Math.abs(this.z - b.z)) / 2);
        }

        add(b:Integer3):Integer3 {
            return new Integer3(this.x + b.x, this.y + b.y, this.z + b.z);
        }

        scale(k:Integer):Integer3 {
            return new Integer3(this.x * k, this.y * k, this.z * k);
        }

        toString():string {
            return this.v().join(',');
        }

        v():Array<Integer> {
            return [this.x, this.y, this.z];
        }

        equals(other:Integer3):boolean {
            return (this.x === other.x) && (this.y === other.y) && (this.z === other.z);
        }

        round():Integer3 {
            return new Integer3(Math.round(this.x), Math.round(this.y), Math.round(this.z));
        }

        cubeLength():Integer {
            return Math.floor((Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)) / 2);
        }
    }
}
