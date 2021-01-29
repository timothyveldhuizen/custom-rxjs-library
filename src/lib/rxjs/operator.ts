import { Observable } from './observable';

export interface Operator<T, U> {
    (source: Observable<T>): Observable<U>
  }