import { Integer } from "./Integer";
import { ITile } from "./ITile";
export declare function spiral(start: ITile<any>, N: Integer, isSpiral: boolean): ITile<any>[];
export declare function intersect(a: ITile<any>[], b: ITile<any>[]): ITile<any>[];
export declare function axes(a: ITile<any>[], axe: Integer, odd?: boolean): ITile<any>[];
export declare function border(tiles: ITile<any>[]): ITile<any>[];
export declare function outline(tiles: ITile<any>[]): ITile<any>[];
