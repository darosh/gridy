import { ANG_4, DEG_TO_RAD } from "./Constants";
export function instance(obj) {
    return new obj.constructor();
}
export function enumerate(obj) {
    const result = {};
    const keys = Object.keys(obj);
    for (const i of keys) {
        const value = parseInt(i, 10);
        if (value >= 0) {
            result[obj[i]] = value;
        }
    }
    return result;
}
export function mapped(available, selection) {
    return selection.filter((t) => available.has(t[1].key))
        .map((t) => [t[0], available.get(t[1].key)]);
}
export function toMap(tiles) {
    return new Map(tiles.map((t) => ([t.key, t])));
}
export function toArray(m) {
    return Array.from(m.values());
}
export function link(tilesMap) {
    for (const tile of tilesMap.values()) {
        tile.links = new Map();
        for (const n of tile.neighbors()) {
            if (tilesMap.has(n[1].key)) {
                tile.links.set(n[0], tilesMap.get(n[1].key));
            }
        }
    }
}
export function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - ANG_4) * DEG_TO_RAD;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians)),
    };
}
export function describeArc(x, y, radius, startAngle, endAngle) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    ].join(" ");
}
