import { Integer } from "./Integer";
import { AnyTile } from "./ITile";
export declare function circle(start: AnyTile, N: Integer): AnyTile[];
export declare function spiral(start: AnyTile, N: Integer, isSpiral?: boolean): AnyTile[];
export declare function intersect(a: AnyTile[], b: AnyTile[]): AnyTile[];
export declare function axes(a: AnyTile[], axe: Integer, odd?: boolean): AnyTile[];
export declare function border(tiles: AnyTile[]): AnyTile[];
export declare function outline(tiles: AnyTile[], available?: AnyTile[]): AnyTile[];
export declare function connections(tiles: AnyTile[]): AnyTile[][];
