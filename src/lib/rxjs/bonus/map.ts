import { Observable } from '../observable';
import { Operator } from '../operator';
import { IObserver } from '../observer';
import { Subscription } from '../subscription';

export function map<T, U>(projectFn: (value: T) => U): Operator<T, U> {

    return function mapOperator(source: Observable<any>): Observable<any> {

        function mapProducer(observer: IObserver): Subscription {
            const sourceObserver: IObserver = {
                next: (val) => observer.next(projectFn(val)),
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

        return new Observable(mapProducer);
    }
}
