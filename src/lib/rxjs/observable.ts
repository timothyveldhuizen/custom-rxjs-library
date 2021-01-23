import { Subscription } from './subscription';
import { IObserver } from './observer';

export class Observable<T = any> {
  constructor(private producer) {}
  subscribe(observer: Partial<IObserver>): Subscription {
    return this.producer(observer);
  }
}
