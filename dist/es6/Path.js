import { instance } from "./Utils";
export function spiral(start, N, isSpiral) {
    const results = [];
    if (isSpiral) {
        results.push(start.add(instance(start)));
    }
    const neighbors = start.neighbors(start.sides ? start.sides() : undefined);
    const c = (neighbors.length === 6) ? 1 : 2;
    for (let k = isSpiral ? 1 : N; k <= N; k++) {
        let H = start.shift().scale(k);
        for (let i = 0; i < neighbors.length; i++) {
            for (let j = 0; j < k * c; j++) {
                results.push(H.add(start));
                H = H.neighbors(H.sides ? H.sides() : undefined)[i][1];
            }
        }
    }
    return results;
}
export function intersect(a, b) {
    const results = [];
    for (const i of a) {
        for (const j of b) {
            if (i.equals(j)) {
                results.push(i);
            }
        }
    }
    return results;
}
export function axes(a, axe, odd = false) {
    const results = [];
    for (const i of a) {
        const v = i.v();
        const l = (Math.abs(v[axe % v.length]) % 2) === 1;
        if (l === odd) {
            results.push(i);
        }
    }
    return results;
}
export function border(tiles) {
    return tiles.filter((t) => t.neighbors().length < t.directions().length);
}
export function outline(tiles) {
    const map = new Map();
    tiles.forEach((t) => {
        const n = new Map(t.neighbors());
        const d = new Map(t.directions());
        if (n.size < d.size) {
            for (const [k, v] of d) {
                if (!n.has(k)) {
                    const w = t.add(v);
                    map.set(w.v().toString(), w);
                }
            }
        }
    });
    return Array.from(map.values());
}
