import { setIn } from './set-in';

export function set(source: any, path: string | (string | number)[], value: any): any {
    return setIn(source, path, () => value);
}

export default set;
