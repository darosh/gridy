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
export function maped(available, selection) {
    return selection.filter((t) => available.has(t[1].key))
        .map((t) => [t[0], available.get(t[1].key)]);
}
export function toMap(tiles) {
    return new Map(tiles.map((t) => ([t.key, t])));
}
export function toArray(m) {
    return Array.from(m.values());
}
