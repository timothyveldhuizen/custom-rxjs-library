import { Observable } from './observable';
import { IObserver } from './observer';
import { Subscription } from './subscription';

export function fromPromise<T>(promise: Promise<T>): Observable<T> {

  function fromPromiseProducer(observer: IObserver): Subscription {
    promise
      .then(value => observer.next(value))
      .catch(reason => observer.error(reason))
      .finally(() => observer.complete())

    return <Subscription>{
      unsubscribe() {}
    }
  }

  return new Observable<any>(fromPromiseProducer);
}
