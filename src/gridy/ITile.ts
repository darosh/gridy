/// <reference path="Integer.ts" />

module Gridy {
    'use strict';

    export interface ITile<T> {
        neighbors():Array<T>;
        directions():Array<T>;
        shift():T;
        cubeLength():number;
        equals(h:T):boolean;
        add(h:T):T;
        scale(k:Integer):T;
        v():Array<any>;
    }
}
