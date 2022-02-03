import { Injectable } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomNumberService {

  constructor() { }

  getNumberInstantly() {
    return Math.floor(Math.random() * 1000);
  }

  getNumberObservable(): Observable<number> {
    let msToWait = Math.floor(Math.random() * 1000);
    let returnSubject = new Subject<number>();

    setTimeout(() => {
      returnSubject.next(msToWait);
    }, msToWait)
    
    return returnSubject;
  }
}
