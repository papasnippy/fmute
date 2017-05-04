fmute
===
[![Build Status](https://travis-ci.org/papasnippy/fmute.svg?branch=master)](https://travis-ci.org/papasnippy/fmute)


**fmute** is a set of functions to mutate data without changing the source. The reason of this library is to have pure javascript objects, mutate it in functional way and do not waste memory for immutable object wrappers.

Library is written in TypeScript and provide it's own type definitions. `fmute/*` exports as **commonjs** module. **ES6** build also included.

Exports
===
The default export of library is `Chain` function. `chain`, `merge`, `remove`, `set` and `set-in` have default exports. You able to import everything from `'fmute'` or just only you need from `'fmute/*'`.

Functions
===

## Array/insert

```typescript
function insert<T>(source: T[], index: number, ...values: T[]): T[];
```
Adds one or more elements before provided index of an array.

```typescript
import { insert } from 'fmute/array';
const a = ['a', 'b', 'c'];
insert(a, 1, 'x'); // returns ['a', 'x', 'b', 'c']
```

## Array/pop

```typescript
function pop<T>(source: T[], f?: (v: T) => void): T[];
```
Removes the last element from an array, callback called with that element.

```typescript
import { pop } from 'fmute/array';
const a = ['a', 'b', 'c'];
pop(a); // returns ['a', 'b']
```

## Array/push

```typescript
function push<T>(source: T[], ...values: T[]): T[];
```

Adds one or more elements to the end of an array.

```typescript
import { push } from 'fmute/array';
const a = ['a', 'b', 'c'];
push(a, 'x', 'y'); // returns ['a', 'b', 'c', 'x', 'y']
```

## Array/reverse

```typescript
function reverse<T>(source: T[]): T[];
```

Reverses order of elements in an array.

```typescript
import { reverse } from 'fmute/array';
const a = ['a', 'b', 'c'];
reverse(a); // returns ['c', 'b', 'a']
```

## Array/shift

```typescript
function shift<T>(source: T[], f?: (v: T) => void): T[];
```

Removes the first element from an array, callback called with that element.

```typescript
import { shift } from 'fmute/array';
const a = ['a', 'b', 'c'];
shift(a); // returns ['b', 'c']
```

## Array/unshift

```typescript
function unshift<T>(source: T[], ...values: T[]): T[];
```

Adds one or more elements to the beginning of an array.

```typescript
import { unshift } from 'fmute/array';
const a = ['a', 'b', 'c'];
unshift(a, 'x', 'y'); // returns ['x', 'y', 'a', 'b', 'c']
```

## Array/splice

```typescript
function splice<T>(source: T[], start: number, deleteCount: number, ...items: T[]): {
    removed: T[];
    array: T[];
};
```

Removes existing elements and addes new. Returns object with removed elements and new result.

```typescript
import { splice } from 'fmute/array';
const a = ['a', 'b', 'c', 'd', 'e'];
splice(a, 1, 2, 'x', 'y');
// returns {
//     removed: ['b', 'c'],
//     array: ['a', 'x', 'y', 'd', 'e']
// }
```

## set

```typescript
function set(source: any, path: string | (string | number)[], value: any): any;
```

Returns copy of a source with new property set by provided path.

```typescript
import { set } from 'fmute/set'; // or import set from 'fmute/set';
const source = {
    a: {
        b: 1
    },
    c: {
        d: 2
    }
};
set(source, 'a.b', 3); // or set(source, ['a', 'b'], 3);
// returns {
//     a: {
//         b: 3
//     },
//     c: {
//         d: 2
//     }
// }

// also, works with arrays:
const table = [
    [1, 2],
    [3, 4]
];

set(table, [1, 1], 5);
// returns [
//     [1, 2],
//     [3, 5]
// ];
```

## setIn

```typescript
function setIn(source: any, path: string | (string | number)[], fn: (value: any) => any): any;
```

Returns copy of a source with new property set by provided path. Instead of new value expects a reducer.

```typescript
import { setIn } from 'fmute/set-in'; // or import set from 'fmute/set-in';
const source = {
    a: {
        b: {
            c: {
                d: 1
            }
        }
    }
};
setIn(source, 'a.b', (branch) => {  // or setIn(source, ['a', 'b']...
    // branch will be {
    //     c: {
    //         d: 1
    //     }
    // }
    return {
        ...branch,
        foo: 'bar'
    }
});
// returns {
//     a: {
//         b: {
//             c: {
//                 d: 1
//             },
//             foo: 'bar'
//         }
//     }
// }
```

## remove

```typescript
function remove(source: any, path: string | (string | number)[]): any;
```

Removes branch from object. Does not change array's length.

```typescript
import { remove } from 'fmute/remove'; // or import remove from 'fmute/remove';
const source = {
    a: {
        b: {
            c: {
                d: 1
            }
        }
    }
};
remove(source, 'a.b');  // or remove(source, ['a', 'b'])
// returns {
//     a: {
//     }
// }
```

## merge

```typescript
function function merge(to: any, from: any): any;
```

Merges second object into first. If you need to remove branch - use special type Delete.

```typescript
import { merge, Delete } from 'fmute/merge'; // or import merge, { Delete } from 'fmute/merge';
const source = {
    a: {
        b: 1
    },
    c: {
        d: 2
    }
};
merge(source, {
    a: {
        foo: 'bar'
    },
    c: {
        d: Delete,
        x: 'y'
    }
});
// returns {
//     a: {
//         b: 1,
//         foo: 'bar'
//     },
//     c: {
//         x: 'y'
//     }
// }
```

## chain

```typescript
function Chain(source?: any): ChainInstance;
```

Chains mutations and memorizes it. You able to apply this mutations to any object you want. Calling `Chain` creates new `ChainInstance` object, every method call creates new instance, exept `exec`, which returns a result.

Here is class definition:

```typescript
class ChainInstance {
    constructor(source?: any);
    set(path: string | (string | number)[], value: any): ChainInstance;
    remove(path: string | (string | number)[]): ChainInstance;
    merge(source: any): ChainInstance;
    apply(fn: (state: any) => any): ChainInstance;
    setIn(path: string | (string | number)[], fn: (value: any) => any): ChainInstance;
    exec(source?: any): any;
}
```

Example:

```typescript
import { Chain, Delete } from 'fmute';

const source = {
    a: {
        c: {
            v: 100,
            d: 300
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

let chain = Chain()
    .set('a.c.r', 100)
    .remove('b.d.u')
    .merge({ a: { c: { d: Delete } }, b: { d: { w: { q: 'a', p: 'b' } } } })
    .apply((state) => ({ ...state, p: { w: 100 } }))
    .set('p.e', 200)
    .setIn('b.d', s => ({ ...s, y: 'b' }))
    .set('a.x', 100);

chain.exec(source); // or Chain(source) and then just .exec();
// returns {
//     a: {
//         c: {
//             v: 100,
//             r: 100
//         },
//         e: [
//             100,
//             {
//                 x: 200
//             },
//             300
//         ],
//         x: 100
//     },
//     b: {
//         d: {
//             w: {
//                 q: 'a',
//                 p: 'b'
//             },
//             y: 'b'
//         }
//     },
//     p: {
//         w: 100,
//         e: 200
//     }
// }
```

