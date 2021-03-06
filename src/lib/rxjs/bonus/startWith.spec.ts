import { Observable } from '../observable';
import { from } from '../from';
import { startWith } from './startWith';

describe('startWith :', () => {
    it('should start with on number sequence', (done) => {
        const source$: Observable<number> = from([1, 2, 3, 4, 5]).pipe(startWith(0));
        let result: number[] = [];
        const actual: number[] = [0, 1, 2, 3, 4, 5];
        const subscribe = source$.subscribe({
            next: (val) => (result = [...result, val]),
            error: () => { },
            complete: () => {
                expect(actual).toEqual(result);
                done();
            }
        }
        );
    });

    it('should start with multiple values', (done) => {
        const source$: Observable<number> = from([1, 2, 3, 4, 5]).pipe(startWith(-1, 0));
        let result: number[] = [];
        const actual: number[] = [-1, 0, 1, 2, 3, 4, 5];
        const subscribe = source$.subscribe({
            next: (val) => (result = [...result, val]),
            error: () => { },
            complete: () => {
                expect(actual).toEqual(result);
                done();
            }
        }
        );
    });
});
