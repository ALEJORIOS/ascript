import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // State of user (logged or not)
  private isLoggedSubject: BehaviorSubject<boolean>;

  public get isLogged(): boolean {
    return this.isLoggedSubject.value;
  }

  public set isLogged(state: boolean) {
    this.isLoggedSubject.next(state);
  }

  constructor() { 
    this.isLoggedSubject = new BehaviorSubject(false);
  }
}