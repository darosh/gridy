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
export function look(items, values = false) {
    const result = {};
    items.forEach((v) => {
        result[v.toString()] = values ? v : true;
    });
    return result;
}
export function neighbors(tiles) {
    function _neighbors() {
        return this._neighbors_data;
    }
    const values = look(tiles, true);
    tiles.forEach((t) => {
        t._neighbors_data = t.neighbors().map((n) => values[n[1]]).filter((n) => n !== undefined);
        t._neighbors = _neighbors;
        t.neighbors = _neighbors;
    });
}
export function connections(tiles) {
    const c = [];
    return c;
}
