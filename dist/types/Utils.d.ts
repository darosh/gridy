import { Directions } from "./Directions";
import { AnyTile, ITile, TileMap } from "./ITile";
export declare function instance<T>(obj: T): T;
export declare function enumerate(obj: any): any;
export declare function maped(available: TileMap, selection: Directions<AnyTile>): [number, ITile<any>][];
export declare function toMap(tiles: AnyTile[]): Map<string, AnyTile>;
export declare function toArray(m: Map<any, AnyTile>): AnyTile[];
