export function validatePath(object: any, path: (string | number)[]) {
    if (!object || typeof object !== 'object' || !path || !path.length) {
        return false;
    }

    let p = object;
    for (var i = 0, len = path.length; i < len; i++) {
        let k = path[i];

        if (!(p as Object).hasOwnProperty(k) || ((i !== len - 1) && (p[k] != void 0 && typeof p[k] !== 'object'))) {
            return false;
        }

        p = p[k];
    }

    return true;
}

export default validatePath;
