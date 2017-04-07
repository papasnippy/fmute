import { Delete } from './delete';
import { set } from './set';
import { setIn } from './set-in';
import { _merge } from './merge';

interface IMerge {
    type: 'merge';
    changes: any;
}

interface IApply {
    type: 'apply';
    fn: (state: any) => any;
}

type TChange = IMerge | IApply;

export class Transaction {
    private _changes: TChange[] = [{ type: 'merge', changes: {} }];

    constructor (private _source: any) {}

    private get _lastChangesMap(): any {
        let n = this._changes[this._changes.length - 1];

        switch (n.type) {
            case 'merge':
                return n.changes;

            case 'apply':
                return {};

            default:
                throw new Error(`Unknown change type ${(n as any).type}`);
        }
    }

    private _copyChanges(change?: TChange) {
        let copyAll = change.type !== 'merge' || this._changes[this._changes.length - 1].type !== 'merge';
        return [].concat(this._changes.slice(0, this._changes.length - (copyAll ? 0 : 1)), [change]);
    }

    private _next(change: TChange) {
        let t = new Transaction(this._source);
        t._changes = this._copyChanges(change);
        return t;
    }

    public set(path: string | (string | number)[], value: any) {
        return this._next({
            type: 'merge',
            changes: set(this._lastChangesMap, path, value)
        });
    }

    public remove(path: string | (string | number)[]) {
        return this._next({
            type: 'merge',
            changes: set(this._lastChangesMap, path, Delete)
        });
    }

    public merge(source: any) {
        return this._next({
            type: 'merge',
            changes: _merge(this._lastChangesMap, source, true)
        });
    }

    public apply(fn: (state: any) => any) {
        return this._next({
            type: 'apply',
            fn
        });
    };

    public setIn(path: string | (string | number)[], fn: (value: any) => any) {
        return this._next({
            type: 'apply',
            fn: source => setIn(source, path, fn)
        });
    }

    public exec(source?: any) {
        source = source === void 0 ? this._source : source;

        for (let i = 0, len = this._changes.length; i < len; i++) {
            let n = this._changes[i];
            switch (n.type) {
                case 'merge':
                    source = _merge(source, n.changes, false);
                    break;

                case 'apply':
                    source = n.fn(source);
                    break;
            }
        }

        return source;
    }
}

export function Chain(source?: any) {
    return new Transaction(source);
}

export default Chain;
