import { Directions } from "./Directions";
import { Integer } from "./Integer";
import { Integer2 } from "./Integer2";
import { ITile } from "./ITile";
/**
 * ![](../../examples/output/triangular-tile.svg)
 */
export declare class TriangularTile extends Integer2 implements ITile<Integer2> {
    static directions1: Directions<TriangularTile>;
    static directions2: Directions<TriangularTile>;
    static opposites: any;
    static multiOpposites: {
        [index: string]: {
            [index: string]: number;
        };
    };
    static multiDirections: {
        [index: string]: {
            [index: string]: number;
        };
    };
    s: boolean;
    readonly key: string;
    constructor(x?: Integer, y?: Integer, s?: boolean);
    readonly value: any[];
    toString(): string;
    equals(p: TriangularTile): boolean;
    shift(): TriangularTile;
    directions(): Directions<TriangularTile>;
    opposite(n: number): number;
    add(a: TriangularTile): TriangularTile;
    scale(a: Integer): TriangularTile;
    multiNeighbors(): Directions<TriangularTile>;
    neighbors(): Directions<TriangularTile>;
}
