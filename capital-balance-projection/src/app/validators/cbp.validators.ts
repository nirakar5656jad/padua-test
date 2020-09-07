/**
 * @description This is a Validator helper class that have different functions for fomatting.
 * @created 03 sep 2020
 * @author Nirakar Puri
 */

 /** Importing required modules. */
import { FormGroup, ValidatorFn } from '@angular/forms';

export class CBPValidators {

  /**
   * This is the withdrawalage validators.
   * @param withdrawalAge user entered withdrawal age
   * @param startingAge user entered starting age.
   */
  public withdrawalAgeValidator(withdrawalAge: string, startingAge: string): ValidatorFn {
    return (group: FormGroup) => {
      const withDrawalAgeControl = group.controls[withdrawalAge];
      const startingAgeControl = group.controls[startingAge];
      if (withDrawalAgeControl.value < startingAgeControl.value) {
        withDrawalAgeControl.setErrors({ withdrawalAgeError: true });
        return {withdrawalAgeError: true};
      }
      return null;
    };
  }

}


