import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RouteService {
  private fromRoute = new BehaviorSubject<string>('/');

  fromRoute$ = this.fromRoute.asObservable();

  setFromRoute(route: string) {
    this.fromRoute.next(route);
  }
}
