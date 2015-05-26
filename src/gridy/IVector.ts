module Gridy {
    'use strict';

    export interface IVector<T> {
        v():Array<T>;
        toString():string;
        equals(b:IVector<T>):boolean;
    }
}
