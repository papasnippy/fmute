import { cloneDeep } from 'lodash';
import { remove } from '../src';

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

test('set: exists values', () => {
    expect(remove(source, ['a', 'c', 'v'])).toEqual({
        a: {
            c: {},
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

test('set: route', () => {
    expect(remove(source, ['a'])).toEqual({
        b: {
            d: {
                u: 200
            }
        }
    });
});

test('set: invalid route 1', () => {
    let r = remove(source, ['a', 'x', 'v']);
    expect(r).toEqual(model);
    expect(r).toBe(source);
});

test('set: invalid route 2', () => {
    let r = remove(source, []);
    expect(r).toEqual(model);
    expect(r).toBe(source);
});

test('set: invalid route 3', () => {
    let r = remove(source, null);
    expect(r).toEqual(model);
    expect(r).toBe(source);
});

test('set: invalid source', () => {
    let r = remove(null, ['a', 'x', 'v']);
    expect(r).toBe(null);
});

test('remove: model comparison', () => {
    expect(source).toEqual(model);
});
