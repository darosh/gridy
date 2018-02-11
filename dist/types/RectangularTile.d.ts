import { Directions } from "./Directions";
import { Integer } from "./Integer";
import { Integer2 } from "./Integer2";
import { ITile } from "./ITile";
/**
 * ![](../../examples/output/rectangular-tile.svg)
 */
export declare class RectangularTile extends Integer2 implements ITile<Integer2> {
    static directions: Directions<RectangularTile>;
    shift(): RectangularTile;
    directions(): Directions<RectangularTile>;
    add(a: RectangularTile): RectangularTile;
    scale(a: Integer): RectangularTile;
    neighbors(): Directions<RectangularTile>;
    map(): Map<number, RectangularTile>;
}
