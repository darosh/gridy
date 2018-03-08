import { Directions } from "./Directions";
import { Integer } from "./Integer";
import { Integer3 } from "./Integer3";
import { ITile } from "./ITile";
/**
 * ![](../../examples/output/radial-tile.svg)
 * x: radius position
 * y: angle position
 * z: angular length
 */
export declare class Radial8Tile extends Integer3 implements ITile<Integer3> {
    static directions: Directions<Radial8Tile>;
    private tiles;
    readonly key: string;
    shift(): Radial8Tile;
    directions(): Directions<Radial8Tile>;
    add(a: Radial8Tile): Radial8Tile;
    scale(a: Integer): Radial8Tile;
    cubeLength(): Integer;
    neighbors(): Directions<Radial8Tile>;
}
