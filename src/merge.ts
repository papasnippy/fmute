import { Delete } from './delete';

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

        target[k] = _merge(target[k], source[k]);
    }

    return target;
}

export function merge(target: any, source: any) {
    return _merge(target, source, false);
}

export default merge;
