import { cloneDeep } from 'lodash';
import { merge, Delete } from '../src';

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

let sourceArray = ['a', 'b', 'c'];

let model = cloneDeep(source);
let modelArray = cloneDeep(sourceArray);

test('merge: delete 1', () => {
    expect(merge(source, { a: Delete })).toEqual({
        b: {
            d: {
                u: 200
            }
        }
    });
});

test('merge: delete 2', () => {
    expect(merge(source, { a: { c: Delete } })).toEqual({
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
    expect(merge(source, {
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
    expect(merge(source, { a: { z: Delete } })).toEqual(model);
});

test('merge: invalid target', () => {
    expect(merge(null, { a: { z: Delete } })).toEqual({ a: { z: Delete } });
});

test('merge: invalid source', () => {
    expect(merge(source, null)).toBe(null);
});

test('merge: array 1', () => {
    expect(merge(sourceArray, { '1': 'x' })).toEqual(['a', 'x', 'c']);
});

test('merge: array 2', () => {
    expect(merge(sourceArray, ['q', 'w'])).toEqual(['q', 'w', 'c']);
});

test('merge: array 3', () => {
    let a = new Array(3);
    a[1] = 'v';
    expect(merge(sourceArray, a)).toEqual(['a', 'v', 'c']);
});

test('merge: model comparison', () => {
    expect(source).toEqual(model);
});

test('merge: model array comparison', () => {
    expect(sourceArray).toEqual(modelArray);
});
