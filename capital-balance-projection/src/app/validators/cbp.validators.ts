import { FormGroup, ValidatorFn } from '@angular/forms';

/**
 * This is the withdrawalage validators.
 * @param withdrawalAge user entered withdrawal age
 * @param startingAge user entered starting age.
 */
export function withdrawalAgeValidator(withdrawalAge: string, startingAge: string): ValidatorFn {
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
