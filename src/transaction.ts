import { Delete } from './delete';
import { set } from './set';
import { _merge } from './merge';

export class Transaction {
    private _changes: (Function | any)[] = [{}];

    constructor (private _source: any) {}

    private get _lastChange() {
        let change = this._changes[this._changes.length - 1];
        return typeof change === 'function' ? {} : change;
    }

    private _copyChanges(change: Function | any) {
        let copyAll = typeof change === 'function' || typeof this._changes[this._changes.length - 1] === 'function';
        return [].concat(this._changes.slice(0, this._changes.length - (copyAll ? 0 : 1)), [change]);
    }

    private _next(change: Function | any) {
        let t = new Transaction(this._source);
        t._changes = this._copyChanges(change);
        return t;
    }

    public set(path: string | (string | number)[], value: any) {
        return this._next(set(this._lastChange, path, value));
    }

    public remove(path: string | (string | number)[]) {
        return this._next(set(this._lastChange, path, Delete));
    }

    public merge(source: any) {
        return this._next(_merge(this._lastChange, source, true));
    }

    public apply(fn: (state: any) => any) {
        return this._next(fn);
    };

    public exec(source?: any) {
        source = source === void 0 ? this._source : source;

        for (let i = 0, len = this._changes.length; i < len; i++) {
            let change = this._changes[i];
            source = typeof change === 'function' ? change(source) : _merge(source, change, false);
        }

        return source;
    }
}

export function Chain(source?: any) {
    return new Transaction(source);
}

export default Chain;
