import { Directions } from './Directions';
import { Integer } from './Integer';
import { Integer2 } from './Integer2';
import { ITile } from './ITile';
import { RectangularTile } from './RectangularTile';
/**
 * ![](../../examples/output/rectangular-tile.svg)
 */
export declare class Rectangular8Tile extends Integer2 implements ITile<Integer2> {
    static directions: Directions<Rectangular8Tile>;
    static sides: Directions<Rectangular8Tile>;
    readonly key: string;
    shift(): RectangularTile;
    directions(): Directions<RectangularTile>;
    sides(): Directions<RectangularTile>;
    add(a: RectangularTile): RectangularTile;
    scale(a: Integer): RectangularTile;
    neighbors(): Directions<RectangularTile>;
    sideNeighbors(): Directions<Rectangular8Tile>;
}
