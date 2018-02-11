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
