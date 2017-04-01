import { set } from '../src';

test('set: exists values', () => {
    let source = {
        a: {
            c: {
                v: 100
            }
        },
        b: {
            d: {
                u: 200
            }
        }
    };

    let test1 = set(source, ['a', 'c', 'v'], 300);

    expect(test1).toEqual({
        a: {
            c: {
                v: 300
            }
        },
        b: {
            d: {
                u: 200
            }
        }
    });

    expect(test1).not.toBe(source);
    expect(test1.a).not.toBe(source.a);
    expect(test1.a.c).not.toBe(source.a.c);
    expect(test1.a.c.v).toBe(300);
    expect(test1.b).toBe(source.b);
    expect(test1.b.d).toBe(source.b.d);
});

test('set: new values', () => {
    let source = {
        a: {
            c: {
                v: 100
            }
        },
        b: {
            d: {
                u: 200
            }
        }
    };

    let test1 = set(source, ['a', 'c', 'x'], 300);

    expect(test1).toEqual({
        a: {
            c: {
                v: 100,
                x: 300
            }
        },
        b: {
            d: {
                u: 200
            }
        }
    });

    expect(test1).not.toBe(source);
    expect(test1.a).not.toBe(source.a);
    expect(test1.a.c).not.toBe(source.a.c);
    expect(test1.a.c.v).toBe(100);
    expect(test1.a.c.x).toBe(300);
    expect(test1.b).toBe(source.b);
    expect(test1.b.d).toBe(source.b.d);
});

test('set: new route', () => {
    let source = {
        a: {
            c: {
                v: 100
            }
        },
        b: {
            d: {
                u: 200
            }
        }
    };

    let test1 = set(source, ['a', 'c', 'x', 'f'], 300);

    expect(test1).toEqual({
        a: {
            c: {
                v: 100,
                x: {
                    f: 300
                }
            }
        },
        b: {
            d: {
                u: 200
            }
        }
    });

    expect(test1).not.toBe(source);
    expect(test1.a).not.toBe(source.a);
    expect(test1.a.c).not.toBe(source.a.c);
    expect(test1.a.c.v).toBe(100);
    expect(test1.a.c.x.f).toBe(300);
    expect(test1.b).toBe(source.b);
    expect(test1.b.d).toBe(source.b.d);
});

test('set: array', () => {
    let source = {
        a: [
            100,
            {
                x: 200
            }
        ],
        b: {
            y: 300
        }
    };

    let test1 = set(source, ['a', 2], 400);
    expect(test1).toEqual({
        a: [
            100,
            {
                x: 200
            },
            400
        ],
        b: {
            y: 300
        }
    });

    let test2 = set(source, ['a', 1], 400);
    expect(test2).toEqual({
        a: [
            100,
            400
        ],
        b: {
            y: 300
        }
    });

    let test3 = set(source, ['a', 1, 'x'], 400);
    expect(test3).toEqual({
        a: [
            100,
            {
                x: 400
            }
        ],
        b: {
            y: 300
        }
    });

    expect(test1).not.toBe(source);
    expect(test2).not.toBe(source);
    expect(test3).not.toBe(source);

    expect(test1.a).not.toBe(source.a);
    expect(test2.a).not.toBe(source.a);
    expect(test3.a).not.toBe(source.a);

    expect(test1.b).toBe(source.b);
    expect(test2.b).toBe(source.b);
    expect(test3.b).toBe(source.b);

    expect(test3.a[1]).not.toBe(source.a[1]);
});

