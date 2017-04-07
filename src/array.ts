export function insert<T>(source: T[], index: number, ...values: T[]): T[] {
    if (index < 0) {
        return unshift(source, ...values);
    }

    return [].concat(source.slice(0, index), values, source.slice(index));
}

export function pop<T>(source: T[], f?: (v: T) => void): T[] {
    const { length } = source;

    if (!length) {
        return this;
    }

    if (f) {
        f(source[length - 1]);
    }

    return source.slice(0, length - 1);
}

export function push<T>(source: T[], ...values: T[]): T[] {
    return [].concat(source, values);
}

export function reverse<T>(source: T[]): T[] {
    return source.slice().reverse();
}

export function shift<T>(source: T[], f?: (v: T) => void): T[] {
    const { length } = source;

    if (!length) {
        return this;
    }

    if (f) {
        f(source[0]);
    }

    return source.slice(1);
}

export function unshift<T>(source: T[], ...values: T[]): T[] {
    return [].concat(values, source);
}

export function splice<T>(source: T[], start: number, deleteCount: number, ...items: T[]) {
    let left = source.slice(0, start);
    let middle = deleteCount ? source.slice(start, start + deleteCount) : [];
    let right = source.slice(start + deleteCount);
    return {
        removed: middle,
        array: [].concat(left, items, right) as T[]
    };
}

