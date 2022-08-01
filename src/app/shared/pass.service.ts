import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PassService {
  constructor() {}

  public invokeEvent: Subject<any> = new Subject();
}
