/// <reference path="IVector.ts" />
/// <reference path="Integer.ts" />

module Gridy {
    'use strict';

    export class Integer2 implements IVector<Integer> {
        x:Integer;
        y:Integer;

        constructor(x:Integer = 0, y:Integer = 0) {
            this.x = x;
            this.y = y;
        }

        v():Array<Integer> {
            return [this.x, this.y];
        }

        distance(b:Integer2):Integer {
            return Math.floor((Math.abs(this.x - b.x) + Math.abs(this.y - b.y)) / 2);
        }

        toString():string {
            return this.x + ',' + this.y;
        }

        equals(p:Integer2):boolean {
            return (this.x === p.x) && (this.y === p.y);
        }

        add(p:Integer2):Integer2 {
            return new Integer2(this.x + p.x, this.y + p.y);
        }

        scale(d:Integer):Integer2 {
            return new Integer2(this.x * d, this.y * d);
        }

        cubeLength():Integer {
            return Math.floor((Math.abs(this.x) + Math.abs(this.y)) / 2);
        }
    }
}
