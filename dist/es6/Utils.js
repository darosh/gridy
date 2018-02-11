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
        t._neighbors_data = t.neighbors().filter((n) => values[n[1]] !== undefined)
            .map((n) => [n[0], values[n[1]]]);
        t._neighbors = _neighbors;
        t.neighbors = _neighbors;
    });
}
export function map(tiles) {
    function _map() {
        return this._map_data || (this._map_data = this._map());
    }
    tiles.forEach((t) => {
        t._map = t.map;
        t.map = _map;
    });
}
export function connections(tiles) {
    const c = [];
    for (const t of tiles) {
        const m = t.map();
        const s = Array.from(m.keys()).filter((k) => (k > 0) && !m.has(-k));
        for (const k of s) {
            const l = [];
            let i = t;
            while (i) {
                l.push(i);
                i = i.map().get(k);
            }
            c.push(l);
        }
    }
    return c;
}
