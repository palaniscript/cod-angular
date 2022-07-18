import {
  AbstractControl, ValidatorFn
} from '@angular/forms';

export function invalidQueryValidator(): ValidatorFn {
  const prohibited = ['DROP', 'ALTER', 'INSERT', 'UPDATE', 'TRUNCATE', 'DELETE'];
  return (control: AbstractControl): { [key: string]: any } | null =>
    prohibited.some(fruit => control.value.includes(fruit))
      ? { wrongQuery: control.value } : null;
}
