import { Directions } from "./Directions";
import { Integer } from "./Integer";
import { Integer2 } from "./Integer2";
import { ITile } from "./ITile";
/**
 * ![](../../examples/output/rectangular-tile.svg)
 */
export declare class RectangularTile extends Integer2 implements ITile<Integer2> {
    static directions: Directions<RectangularTile>;
    static sides: Directions<RectangularTile>;
    shift(): RectangularTile;
    directions(): Directions<RectangularTile>;
    sides(): Directions<RectangularTile>;
    add(a: RectangularTile): RectangularTile;
    scale(a: Integer): RectangularTile;
    neighbors(directions?: Directions<RectangularTile>): Directions<RectangularTile>;
    map(): Map<number, RectangularTile>;
}
