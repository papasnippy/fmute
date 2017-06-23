/**
 * Special type for deleting.
 */
export const Delete = Symbol('fmute/delete');

export function _merge(target: any, source: any, memorizing?: boolean) {
    if (!target || !source || typeof target !== 'object' || typeof source !== 'object') {
        return source;
    }

    target = Array.isArray(target) ? target.slice() : { ...target };

    const keys = Object.keys(source);
    for (let i = 0, len = keys.length; i < len; i++) {
        let k = keys[i];
        let v = source[k];

        if (v === Delete) {
            if (memorizing) {
                target[k] = v;
            } else {
                delete target[k];
            }
            continue;
        }

        target[k] = _merge(target[k], source[k], memorizing);
    }

    return target;
}

export function merge(to: any, from: any) {
    return _merge(to, from, false);
}

export default merge;
