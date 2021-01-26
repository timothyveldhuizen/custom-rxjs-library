import { Subscription } from './subscription';
import { Observable } from './observable';
import { IObserver } from './observer';

export function interval(period: number): Observable<number> {

  function intervalProducer(observer: IObserver): Subscription {
    let counter: number = 0;

    const id = setInterval(() => {
      observer.next(counter++);
    }, period);

    // Return subscription with the unsubscribe implementation
    // If unsubscribe not called but without implementation then interval will continue
    return <Subscription>{
      unsubscribe() {
        clearInterval(id);
        if(observer.complete) { observer.complete() };
      },
    }
  };

  // The Observable constructor has reference to the producer
  // Hence it is not calling the function with () but only referring to it like a const
  return new Observable<number>(intervalProducer);
};
