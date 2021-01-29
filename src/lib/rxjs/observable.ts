import { Subscription } from './subscription';
import { IObserver } from './observer';
import { Operator } from './operator';
export class Observable<T> {
  constructor(private producer) {}

  // You need the subscribe method that contains a observer
  // And it should return a Subscription that has unsubscribe
  // The Partial<> makes all properties optional
  subscribe(observer: Partial<IObserver>): Subscription {
    // the producer from constructor should return what the observer returns a subscription
    return this.producer(observer);
  }

  pipe(...operations: Operator<any, any>[]): Observable<any> {
    return operations.reduce((result: Observable<any>, currentOperator: Operator<any, any>) => currentOperator(result), this)
  }
}
