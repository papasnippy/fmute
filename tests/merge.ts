import { cloneDeep } from 'lodash';
import { _merge, Delete } from '../src';

let source = {
    a: {
        c: {
            v: 100
        },
        e: [
            100,
            {
                x: 200
            },
            300
        ]
    },
    b: {
        d: {
            u: 200
        }
    }
};

let model = cloneDeep(source);

test('merge: delete 1', () => {
    expect(_merge(source, { a: Delete })).toEqual({
        b: {
            d: {
                u: 200
            }
        }
    });
});

test('merge: delete 2', () => {
    expect(_merge(source, { a: { c: Delete } })).toEqual({
        a: {
            e: [
                100,
                {
                    x: 200
                },
                300
            ]
        },
        b: {
            d: {
                u: 200
            }
        }
    });
});

test('merge: combined', () => {
    expect(_merge(source, {
        a: {
            c: Delete,
            e: {
                '0': -1
            },
            f: {
                q: 1
            }
        },
        b: {
            d: {
                u: [
                    1,
                    2,
                    3
                ]
            }
        },
        f: {
            b: true
        }
    })).toEqual({
        a: {
            e: [
                -1,
                {
                    x: 200
                },
                300
            ],
            f: {
                q: 1
            }
        },
        b: {
            d: {
                u: [
                    1,
                    2,
                    3
                ]
            }
        },
        f: {
            b: true
        }
    });
});

test('merge: delete non-existent', () => {
    expect(_merge(source, { a: { z: Delete } })).toEqual(model);
});

test('merge: model comparison', () => {
    expect(source).toEqual(model);
});
