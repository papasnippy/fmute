import { Delete } from './delete';

export function merge(target: any, source: any) {
    if (!target || !source || typeof target !== 'object' || typeof source !== 'object') {
        return source;
    }

    target = Array.isArray(target) ? target.slice() : { ...target };

    const keys = Object.keys(source);
    for (let i = 0, len = keys.length; i < len; i++) {
        let k = keys[i];
        let v = source[k];

        if (v === Delete) {
            delete target[k];
            continue;
        }

        target[k] = merge(target[k], source[k]);
    }

    return target;
}

export default merge;
