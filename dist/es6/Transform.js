import { Position } from "./Position";
export function rotate(grid, direction = 1) {
    grid.tiles.forEach((t) => {
        let d = direction;
        while (d > 0) {
            t.right();
            d--;
        }
        while (d < 0) {
            t.left();
            d++;
        }
    });
}
export function translate(grid, position) {
    grid.tiles = grid.tiles.map((t) => grid.toTile ? grid.toTile(grid.toPoint(t).add(position)) : []);
}
export function min(grid) {
    const points = grid.tiles.map((t) => grid.toPoint(t));
    return new Position(Math.min.apply(null, points.map((p) => p.x)), Math.min.apply(null, points.map((p) => p.y)));
}
export function normalize(grid) {
    const m = min(grid);
    m.x = -m.x;
    m.y = -m.y;
    grid.tiles = grid.tiles.map((t) => grid.toTile ? grid.toTile(grid.toPoint(t).add(m)) : []);
}
//# sourceMappingURL=Transform.js.map