import { cloneDeep } from 'lodash';
import { set } from '../src';

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
    expect(set(source, ['a', 'c', 'v'], 300)).toEqual({
        a: {
            c: {
                v: 300
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
    });
});

test('set: new values', () => {
    expect(set(source, ['a', 'c', 'x'], 300)).toEqual({
        a: {
            c: {
                v: 100,
                x: 300
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
    });
});

test('set: new route', () => {
    expect(set(source, ['a', 'c', 'x', 'f'], 300)).toEqual({
        a: {
            c: {
                v: 100,
                x: {
                    f: 300
                }
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
    });
});

test('set: array 1', () => {
    expect(set(source, ['a', 'e', 2], 400)).toEqual({
        a: {
            c: {
                v: 100
            },
            e: [
                100,
                {
                    x: 200
                },
                400
            ]
        },
        b: {
            d: {
                u: 200
            }
        }
    });
});

test('set: array 2', () => {
    expect(set(source, ['a', 'e', 1], 400)).toEqual({
        a: {
            c: {
                v: 100
            },
            e: [
                100,
                400,
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

test('set: array (new index)', () => {
    expect(set(source, ['a', 'e', 3], 400)).toEqual({
        a: {
            c: {
                v: 100
            },
            e: [
                100,
                {
                    x: 200
                },
                300,
                400
            ]
        },
        b: {
            d: {
                u: 200
            }
        }
    });
});

test('set: invalid target 1', () => {
    expect(set(null, ['a', 'e', 3], 400)).toEqual({
        a: {
            e: {
                '3': 400
            }
        }
    });
});

test('set: invalid target 2', () => {
    expect(() => {
        set(source, ['a', 'c', 'v', 'b'], 400);
    }).toThrow();
});

test('set: invalid route 1', () => {
    let s = set(source, [], 400);
    expect(s).toEqual(model);
    expect(s).toBe(source);
});

test('set: invalid route 2', () => {
    let s = set(source, null, 400);
    expect(s).toEqual(model);
    expect(s).toBe(source);
});

test('set: model comparison', () => {
    expect(source).toEqual(model);
});
