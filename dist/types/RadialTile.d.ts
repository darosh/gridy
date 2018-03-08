import { Directions } from "./Directions";
import { Integer } from "./Integer";
import { Integer3 } from "./Integer3";
import { ITile } from "./ITile";
/**
 * ![](../../examples/output/radial-tile.svg)
 * x: radius position
 * y: angle position
 * z: radius width
 * w: angular length
 */
export declare class RadialTile extends Integer3 implements ITile<Integer3> {
    static directions: Directions<RadialTile>;
    private tiles;
    readonly key: string;
    shift(): RadialTile;
    directions(): Directions<RadialTile>;
    add(a: RadialTile): RadialTile;
    scale(a: Integer): RadialTile;
    cubeLength(): Integer;
    neighbors(): Directions<RadialTile>;
}
