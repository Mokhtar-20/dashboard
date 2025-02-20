import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private subject = new Subject<string>();
  addSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }
  sendValueSelect(valueSelect: any) {
    this.subject.next(valueSelect);
  }
  getValueSelect() {
    return this.subject.asObservable();
  }
}
