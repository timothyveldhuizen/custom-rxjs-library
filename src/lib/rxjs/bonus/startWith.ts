import { Observable } from '../observable';
import { Operator } from '../operator';
import { IObserver } from '../observer';
import { Subscription } from '../subscription';

export function startWith<T, U>(...args: U[]): Operator<T, U> {

    return function startWithOperator(source: Observable<any>): Observable<any> {

        function startWithProducer(observer: IObserver): Subscription {
            args.forEach(arg => observer.next(arg));
            
            const sourceObserver: IObserver = {
                next: (val) => {
                    observer.next(val);
                },
                error: (e) => observer.error(e),
                complete: () => observer.complete(),
            }

            source.subscribe(sourceObserver)

            return <Subscription>{
                unsubscribe() {
                    observer.complete();
                }
            }
        }

        return new Observable(startWithProducer);
    }
}
