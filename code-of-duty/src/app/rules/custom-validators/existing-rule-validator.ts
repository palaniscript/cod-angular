import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Rule } from 'src/app/shared/model';
import { RulesService } from '../rules.service';

export function existingRuleValidator(
  rulesService: RulesService,
  rule: Rule | null
): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    let debounceTime = 500;
    return timer(debounceTime).pipe(
      switchMap(() => rulesService.getRules(control.value)),
      map((rules: Rule[]) => {
        if (rule && rule !== null) {
          if (rules && rules.length === 0) {
            return null;
          }
          return rules && rules.length === 1 && rules[0].id === rule.id
            ? null
            : { ruleExists: true };
        }
        return rules && rules.length > 0 ? { ruleExists: true } : null;
      })
    );
  };
}
