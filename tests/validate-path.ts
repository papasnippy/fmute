import { _validatePath } from '../src/validate-path';

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

test('validate path 1', () => {
    expect(_validatePath(source, ['a', 'c', 'v'])).toBe(true);
});

test('validate path 2', () => {
    expect(_validatePath(source, ['a', 'c'])).toBe(true);
});

test('validate path 3', () => {
    expect(_validatePath(source, ['a', 'x'])).toBe(false);
});

test('validate path 4', () => {
    expect(_validatePath(source, ['a', 'c', 'u'])).toBe(false);
});

test('validate path 5', () => {
    expect(_validatePath(source, ['a', 'z', 'v'])).toBe(false);
});

test('validate path 6', () => {
    expect(_validatePath(null, ['a', 'z', 'v'])).toBe(false);
});

test('validate path 7', () => {
    expect(_validatePath(source, ['a', 'c', 'v', 'u'])).toBe(false);
});

