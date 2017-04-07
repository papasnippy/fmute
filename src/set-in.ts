export function setIn(source: any, path: string | (string | number)[], fn: (value: any) => any): any {
    if (!path) {
        return source;
    }

    if (typeof path === 'string') {
        path = path.split('.');
    }

    let length = path.length;

    if (!length) {
        return source;
    }

    if (source != void 0 && typeof source !== 'object') {
        throw new Error(`Cannot set property to non-object value.`);
    }

    let key = path[0];
    source = source || {};
    let target = Array.isArray(source) ? [] : {};

    if (length === 1) {
        return Object.assign(target, source, { [key]: fn(source[key]) });
    }

    path = path.slice(1);

    return Object.assign(target, source, { [key]: setIn(source[key], path, fn) });
}

export default setIn;
