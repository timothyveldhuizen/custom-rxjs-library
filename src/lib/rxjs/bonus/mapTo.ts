import { Observable } from '../observable';
import { Operator } from '../operator';
import { IObserver } from '../observer';
import { Subscription } from '../subscription';

export function mapTo<T, U>(value: U): Operator<T, U> {

    return function mapToOperator(source: Observable<any>): Observable<any> {

        function mapToProducer(observer: IObserver): Subscription {
            const sourceObserver: IObserver = {
                next: (val) => observer.next(value),
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

        return new Observable(mapToProducer);
    }
}
