import { Rectangle } from "./Rectangle";
// From http://www.redblobgames.com/grids/hexagons/
// Copyright 2012 Red Blob Games <redblobgames@gmail.com>
// License: Apache v2.0 <http://www.apache.org/licenses/LICENSE-2.0.html>
// Original source: http://www.redblobgames.com/grids/hexagons/Grid.hx
function boundsOfPoints(points) {
    const rectangle = new Rectangle(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
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
export function bounds(grid) {
    if (grid.tileTypes === 2) {
        let sum = [];
        const centers = grid.tiles.reduce((r, tile) => {
            r[grid.getTileType(tile)].push(grid.center(tile));
            return r;
        }, [[], []]);
        for (let i = 0; i < 2; i++) {
            const b1 = boundsOfPoints(grid.vertices(grid.orientation, undefined, i));
            const b2 = boundsOfPoints(centers[i]);
            sum = sum.concat(Rectangle.points(Rectangle.add(b1, b2)));
        }
        return boundsOfPoints(sum);
    }
    else {
        const centers = grid.tiles.map((tile) => {
            return grid.center(tile);
        });
        const b1 = boundsOfPoints(grid.vertices(grid.orientation));
        const b2 = boundsOfPoints(centers);
        return Rectangle.add(b1, b2);
    }
}
