import { SQRT_2, SQRT_2_2, SQRT_2_4 } from './Constants';
import { Float } from './Float';
import { Float2 } from './Float2';
import { HexagonalGrid } from './HexagonalGrid';
import { HexagonalTile } from './HexagonalTile';
import { Integer } from './Integer';
import { Shape } from './Shape';

/**
 * ![](../../examples/output/brick-grid.svg)
 */
export class BrickGrid extends HexagonalGrid {
  public angle: Float = 0;

  constructor(scale: Float, orientation: boolean = false, shape: Shape = Shape.Hexagonal, x: Integer = 1, y?: Integer) {
    super(scale, orientation, shape, x, y);
    this.radius = SQRT_2_4 * scale;
  }

  public vertices(orientation?: boolean, scale?: Float): Float2[] {
    const s = (scale === undefined) ? this.scale : scale;
    const points: Float2[] = [];

    for (let i: Integer = 0; i < 4; i++) {
      const angle: Float = Math.PI * (i * 2 - 1) * 2 / 8;

      points.push(new Float2(s * Math.cos(angle) * 0.5, s * Math.sin(angle) * 0.5));
    }

    return points;
  }

  public center(cube: HexagonalTile): Float2 {
    let s: Float2;
    const size: Float = this.scale / 2;

    if (this.orientation) {
      s = new Float2(SQRT_2 * cube.x + SQRT_2_2 * cube.z,  SQRT_2 * cube.z * this.scaleY);
    } else {
      s = new Float2(SQRT_2 * cube.x, (SQRT_2_2 * cube.x + SQRT_2 * cube.z) * this.scaleY);
    }

    return s.scale(size);
  }
}
