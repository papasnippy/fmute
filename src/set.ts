export function set(source: any, path: (string | number)[], value: any): any {
    let length = path.length;

    if (!length) {
        return source;
    }

    if (source != void 0 && typeof source !== 'object') {
        throw new Error(`Cannot set property to non-object value.`);
    }

    let key = path[0];
    let target = Array.isArray(source || {}) ? [] : {};

    if (length === 1) {
        return Object.assign(target, source, { [key]: value });
    }

    path = path.slice(1);

    return Object.assign(target, source, { [key]: set(source[key], path, value) });
}

export default set;
