import { Injectable } from '@angular/core';

import {Observable, of} from 'rxjs';
import {delay, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerServiceService {

  private emailList = ['test@test.test']

  constructor() { }

  send(data: any) {
    console.log(data);
    
  }

  emulateServer(value: string) {
    return of(!this.emailList.includes(value)).pipe(delay(2000))
  }
}
