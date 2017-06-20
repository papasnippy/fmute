import { _validatePath } from './validate-path';

function _remove(source: any, path: (string | number)[]) {
    let key = path[0];
    let target: any = Array.isArray(source) ? [] : {};

    if (path.length === 1) {
        target = Object.assign(target, source);
        delete target[key];
        return target;
    }

    path = path.slice(1);
    return Object.assign(target, source, { [key]: remove(source[key], path) });
}

export function remove(source: any, path: string | (string | number)[]): any {
    if (typeof path === 'string') {
        path = path.split('.');
    }

    if (!_validatePath(source, path)) {
        return source;
    }

    return _remove(source, path);
}

export default remove;
