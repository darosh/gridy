module Gridy {
    'use strict';

    export module Utils {
        export function newInstance<T>(obj:T):T {
            var n:any = {};
            obj.constructor.apply(n);
            return n;
        }

        export function enumerate(obj:any):any {
            var result:any = {};

            var keys:string[] = Object.keys(obj);

            for (var i:number = 0; i < keys.length; i++) {
                var value:number = parseInt(keys[i], 10);

                if (value >= 0) {
                    result[obj[keys[i]]] = value;
                }
            }

            return result;
        }

        export function look(items:Array<any>):{[key:string]:any} {
            var result:{[key:string]:any} = {};

            items.forEach(function (v:any):void {
                result[v.toString()] = true;
            });

            return result;
        }
    }
}
