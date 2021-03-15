import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { debounceTime, filter, scan, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading = new BehaviorSubject<boolean>(true);
  
  loading$ = this.loading.asObservable();

  private requests$ = new Subject();
  private responses$ = new Subject();

  constructor() {
    combineLatest([
        this.requests$.pipe(
          tap(() => this.loading.next(true)),
          scan(acc => {
            return acc + 1;
          }, 0)
        ),
        this.responses$.pipe(
          scan(acc => {
            return acc + 1;
          }, 0)
        )
      ])
      .pipe(
        filter(([requisicoesCount, respostasCount]) => requisicoesCount === respostasCount)
      )
      .subscribe(() => {
        this.loading.next(false);
      });
  }

  registerRequest() {
    this.requests$.next();
  }

  registerResponseOrFailure() {
    this.responses$.next();
  }
}
