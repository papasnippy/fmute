import { cloneDeep } from 'lodash';
import { Chain, Delete } from '../src';

let source = {
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

let model = cloneDeep(source);

test('transaction', () => {
    let chain = Chain(source)
        .set('a.c.r', 100)
        .remove('b.d.u')
        .merge({ a: { c: { d: Delete } }, b: { d: { w: { q: 'a', p: 'b' } } } })
        .apply((state) => ({ ...state, p: { w: 100 } }))
        .set('p.e', 200)
        .setIn('b.d', s => ({ ...s, y: 'b' }))
        .set('a.x', 100);

    expect(chain.exec()).toEqual({
        a: {
            c: {
                v: 100,
                r: 100
            },
            e: [
                100,
                {
                    x: 200
                },
                300
            ],
            x: 100
        },
        b: {
            d: {
                w: {
                    q: 'a',
                    p: 'b'
                },
                y: 'b'
            }
        },
        p: {
            w: 100,
            e: 200
        }
    });
});

test('transaction: model comparison', () => {
    expect(source).toEqual(model);
});
