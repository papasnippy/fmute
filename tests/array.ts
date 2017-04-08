import { insert, pop, push, reverse, shift, unshift, splice } from '../src';

let source = ['a', 'b', 'c', 'd', 'e'];
let model = source.slice();

test('array: insert 1', () => {
    expect(insert(source, 2, 'x', 'y')).toEqual(['a', 'b', 'x', 'y', 'c', 'd', 'e']);
});

test('array: insert 2', () => {
    expect(insert(source, -2, 'x', 'y')).toEqual(['x', 'y', 'a', 'b', 'c', 'd', 'e']);
});

test('array: insert 3', () => {
    expect(insert(source, 20, 'x', 'y')).toEqual(['a', 'b', 'c', 'd', 'e', 'x', 'y']);
});

test('array: pop 1', () => {
    expect(pop(source)).toEqual(['a', 'b', 'c', 'd']);
});

test('array: pop 2', () => {
    expect(pop(source, (v) => {
        expect(v).toBe('e');
    })).toEqual(['a', 'b', 'c', 'd']);
});

test('array: pop 3', () => {
    expect(pop([])).toEqual([]);
});

test('array: push', () => {
    expect(push(source, 'x', 'y')).toEqual(['a', 'b', 'c', 'd', 'e', 'x', 'y']);
});

test('array: reverse', () => {
    expect(reverse(source)).toEqual(['e', 'd', 'c', 'b', 'a']);
});

test('array: shift 1', () => {
    expect(shift(source)).toEqual(['b', 'c', 'd', 'e']);
});

test('array: shift 2', () => {
    expect(shift(source, (v) => {
        expect(v).toBe('a');
    })).toEqual(['b', 'c', 'd', 'e']);
});

test('array: shift 3', () => {
    expect(shift([])).toEqual([]);
});

test('array: splice 1', () => {
    expect(splice(source, 1, 1, 'x', 'y')).toEqual({
        removed: ['b'],
        array: ['a', 'x', 'y', 'c', 'd', 'e']
    });
});

test('array: splice 2', () => {
    expect(splice(source, -1, 0, 'x', 'y')).toEqual({
        removed: [],
        array: ['x', 'y', 'a', 'b', 'c', 'd', 'e']
    });
});

test('array: unshift', () => {
    expect(unshift(source, 'x', 'y')).toEqual(['x', 'y', 'a', 'b', 'c', 'd', 'e']);
});

test('array: model comparison', () => {
    expect(source).toEqual(model);
});
