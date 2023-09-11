import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import { ServerServiceService } from '../services/server-service.service';


export class EmailValidator {
    static createValidator(serverServiceService: ServerServiceService): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return serverServiceService.emulateServer(control.value).pipe(
          map((result: boolean) => result ? null : {invalidAsync: true})
        );
      };
    }
  }