import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[validateEmail]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EmailValidatorDirective),
      multi: true
    }
  ]
})
export class EmailValidatorDirective implements Validator {
  
  validate(control: AbstractControl): ValidationErrors | null {
    const emailRegexp = /^([a-zA-Z]{1})([a-zA-Z0-9\-\.\_]{5,})@gmail\.(com)$/;
    return (emailRegexp.test(control.value) || !control.value) ? null :{ emailInvalid: 
      {
        message:'Email Id is invalid {Eg: abc_b10@gmail.com}'
      }
     };
  }
}
