import { Observable } from './observable';
import { IObserver } from './observer';
import { Subscription } from './subscription';

export function of<T>(...args: T[]): Observable<T> {

  function ofProducer(observer: IObserver): Subscription {
    args.forEach((arg: any) => observer.next(arg));
    observer.complete();

    return <Subscription>{
      unsubscribe() {}
    }
  }

  return new Observable<T>(ofProducer);
}
