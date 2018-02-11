import { Directions } from "./Directions";
import { Integer } from "./Integer";
import { Integer2 } from "./Integer2";
import { ITile } from "./ITile";
/**
 * ![](../../examples/output/rectangular-tile.svg)
 */
export declare class RectangularSimpleTile extends Integer2 implements ITile<Integer2> {
    static directions: Directions<RectangularSimpleTile>;
    shift(): RectangularSimpleTile;
    directions(): Directions<RectangularSimpleTile>;
    add(a: RectangularSimpleTile): RectangularSimpleTile;
    scale(a: Integer): RectangularSimpleTile;
    neighbors(directions?: Directions<RectangularSimpleTile>): Directions<RectangularSimpleTile>;
    map(): Map<number, RectangularSimpleTile>;
}
