import { fromPromise } from './fromPromise';
import { Observable } from './observable';
import { IObserver } from './observer';
import { Subscription } from './subscription';

export function from<T>(args: any): Observable<T> {
  
  function fromProducer(observer: IObserver): Subscription {
    if(Array.isArray(args)) {
      args.forEach(item => observer.next(item))
    }
    else if(typeof args === 'string') {
      args.split('').forEach(item => observer.next(item))
    }
    else {
      for (const item of args) {
        observer.next(item)
      }
    }
    observer.complete();

    return <Subscription>{
      unsubscribe() {}
    }
  }

  return args instanceof Promise ? fromPromise(args) : new Observable<any>(fromProducer);
}
