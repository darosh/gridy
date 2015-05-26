/// <reference path="Float.ts" />

module Gridy {
    'use strict';

    export class Rectangle {
        minX:Float = 0;
        maxX:Float = 0;
        minY:Float = 0;
        maxY:Float = 0;

        constructor(minX:Float = 0, maxX:Float = 0, minY:Float = 0, maxY:Float = 0) {
            this.minX = minX;
            this.maxX = maxX;
            this.minY = minY;
            this.maxY = maxY;
        }

        static add(a:Rectangle, b:Rectangle):Rectangle {
            return new Rectangle(
                a.minX + b.minX,
                a.maxX + b.maxX,
                a.minY + b.minY,
                a.maxY + b.maxY
            );
        }
    }
}
