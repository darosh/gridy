import { Directions } from './Directions';
import { AnyTile, ITile, TileMap } from './ITile';
export declare function instance<T>(obj: T): T;
export declare function enumerate(obj: any): any;
export declare function mapped(available: TileMap, selection: Directions<AnyTile>): [number, ITile<any>][];
export declare function toMap(tiles: AnyTile[]): Map<string, AnyTile>;
export declare function toArray(m: Map<any, AnyTile>): AnyTile[];
export declare function link(tilesMap: Map<any, AnyTile>): void;
export declare function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): {
    x: number;
    y: number;
};
export declare function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string;
