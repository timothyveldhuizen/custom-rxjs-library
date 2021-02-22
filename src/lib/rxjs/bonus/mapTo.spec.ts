import { Observable } from '../observable';
import { from } from '../from';
import { mapTo } from './mapTo';
import { of } from '../of';

describe('mapTo :', () => {
    it('should map every emission to "a" ', (done) => {
        const source$: Observable<number[]> = from([1, 2, 3, 4, 5]).pipe(mapTo('a'));
        let result: string[] = [];
        const actual: string[] = ['a', 'a', 'a', 'a', 'a'];
        const subscribe = source$.subscribe({
            next: val => result = [...result, val],
            error: err => console.log(err),
            complete: () => {
                expect(actual).toEqual(result);
                done();
            }
        });
    });

    it('should map every emission to 100 ', (done) => {
        const source$: Observable<number[]> = from([1, 2, 3, 4, 5]).pipe(mapTo(100));
        let result: number[] = [];
        const actual: number[] = [100, 100, 100, 100, 100];
        const subscribe = source$.subscribe({
            next: val => result = [...result, val],
            error: err => console.log(err),
            complete: () => {
                expect(actual).toEqual(result);
                done();
            }
        });
    });

    it('should map every emission to true ', (done) => {
        const source$: Observable<number[]> = from([1, 2, 3, 4, 5]).pipe(mapTo(true));
        let result: boolean[] = [];
        const actual: boolean[] = [true, true, true, true, true];
        const subscribe = source$.subscribe({
            next: val => result = [...result, val],
            error: err => console.log(err),
            complete: () => {
                expect(actual).toEqual(result);
                done();
            }
        });
    });

    xit('should map every emission to of(1) ', (done) => {
        const source$: Observable<number[]> = from([1, 2, 3, 4, 5]).pipe(mapTo(of(1)));
        let result: Observable<number>[] = [];
        const actual: Observable<number>[] = [of(1), of(1), of(1), of(1), of(1)];
        const subscribe = source$.subscribe({
            next: val => result = [...result, val],
            error: err => console.log(err),
            complete: () => {
                expect(actual).toEqual(result);
                done();
            }
        });
    });
});
