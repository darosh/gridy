/// <reference path="Integer.ts" />
/// <reference path="Float.ts" />
/// <reference path="Float2.ts" />
/// <reference path="Position.ts" />
/// <reference path="Rectangle.ts" />

module Gridy {
    'use strict';

    export interface IGrid<T> {
        tiles:Array<T>;
        orientation:any;
        scale:Float;
        angle:Float;
        x:Integer;
        y:Integer;
        toTile:(position:Position) => T;
        toPoint:(tile:T) => Position;
        tileTypes:Integer;
        radius:Float;

        bounds():Rectangle;
        center(tile:T):Float2;
        vertices(orientation?:boolean, scale?:Float, tileType?:Integer):Array<Float2>;
        position(position:Float2):T;
        getTileType?(tile:T):Integer;
    }
}
