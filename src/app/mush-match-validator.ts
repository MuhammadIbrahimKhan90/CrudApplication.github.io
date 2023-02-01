import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function mushmatch(password:string, confirmpassword:string):ValidatorFn {
      return (ctrl :AbstractControl): ValidationErrors | null=> {
        
        const passwordctrlvalue =ctrl.get(password);
        const confirmpasswordctrlvalue =ctrl.get(confirmpassword);
        
        if (confirmpasswordctrlvalue.errors && !confirmpasswordctrlvalue.errors['mushmatch']) {
          return null;
        }

        if (passwordctrlvalue.value !== confirmpasswordctrlvalue.value) {
          confirmpasswordctrlvalue.setErrors({mushmatch : true});
        } else {
          confirmpasswordctrlvalue.setErrors(null);

        }
          return null
      }
}