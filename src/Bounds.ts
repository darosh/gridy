import { Float2 } from "./Float2";
import { IGrid } from "./IGrid";
import { Integer } from "./Integer";
import { AnyTile, ITile } from "./ITile";
import { Rectangle } from "./Rectangle";

// From http://www.redblobgames.com/grids/hexagons/
// Copyright 2012 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
// Original source: http://www.redblobgames.com/grids/hexagons/Grid.hx

function boundsOfPoints(points: Float2[]): Rectangle {
  const rectangle: Rectangle = new Rectangle(Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY);

  for (const p of points) {
    if (p.x < rectangle.minX) {
      rectangle.minX = p.x;
    }
    if (p.x > rectangle.maxX) {
      rectangle.maxX = p.x;
    }
    if (p.y < rectangle.minY) {
      rectangle.minY = p.y;
    }
    if (p.y > rectangle.maxY) {
      rectangle.maxY = p.y;
    }
  }
  return rectangle;
}

export function bounds(grid: IGrid<any>): Rectangle {
  const centers: Float2[] = grid.tiles.map((tile: AnyTile): Float2 => {
    return grid.center(tile);
  });

  // TODO use vertices(..,...,tileType) for TriangularGrid;

  const b1: Rectangle = boundsOfPoints(grid.vertices());
  const b2: Rectangle = boundsOfPoints(centers);

  return Rectangle.add(b1, b2);
}
