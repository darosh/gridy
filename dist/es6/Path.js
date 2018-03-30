import { instance, mapped, toMap } from './Utils';
export function circle(start, N) {
    return spiral(start, N, false);
}
export function spiral(start, N, isSpiral = true) {
    const results = [];
    if (isSpiral) {
        results.push(start.add(instance(start)));
    }
    const neighbors = start.sideNeighbors ? start.sideNeighbors() : start.neighbors();
    const c = (neighbors.length === 6) ? 1 : 2;
    for (let k = isSpiral ? 1 : N; k <= N; k++) {
        let H = start.shift().scale(k);
        for (let i = 0; i < neighbors.length; i++) {
            for (let j = 0; j < k * c; j++) {
                results.push(H.add(start));
                H = (H.sideNeighbors ? H.sideNeighbors() : H.neighbors())[i][1];
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
        const v = i.value;
        const l = (Math.abs(v[axe % v.length]) % 2) === 1;
        if (l === odd) {
            results.push(i);
        }
    }
    return results;
}
export function border(tiles) {
    const tileMap = toMap(tiles);
    return tiles.filter((t) => mapped(tileMap, t.neighbors()).length < t.directions().length);
}
export function outline(tiles, available) {
    const map = new Map();
    const tileMap = toMap(tiles);
    const availableMap = available ? toMap(available) : undefined;
    tiles.forEach((t) => {
        const n = new Map(mapped(tileMap, t.neighbors()));
        const d = new Map(t.directions());
        if (n.size < d.size) {
            for (const [k, v] of d) {
                if (!n.has(k)) {
                    const w = t.add(v);
                    if (availableMap) {
                        map.set(w.key, availableMap.get(w.key));
                    }
                    else {
                        map.set(w.key, w);
                    }
                }
            }
        }
    });
    return Array.from(map.values());
}
export function connections(tiles) {
    const c = [];
    const available = toMap(tiles);
    for (const t of tiles) {
        const m = new Map(mapped(available, t.neighbors()));
        const s = Array.from(m.keys()).filter((k) => (k > 0) && !m.has(t.opposite ? t.opposite(k) : -k));
        for (const k of s) {
            const l = [];
            let i = t;
            while (i) {
                l.push(i);
                i = new Map(mapped(available, i.neighbors())).get(k);
            }
            c.push(l);
        }
    }
    return c;
}
//# sourceMappingURL=Path.js.map