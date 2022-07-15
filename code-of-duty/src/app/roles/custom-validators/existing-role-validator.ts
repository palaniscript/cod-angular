import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, timer } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { Role } from 'src/app/shared/model';
import { RolesService } from '../roles/roles.service';

export function existingRoleValidator(rolesService: RolesService, role: Role | null): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        let debounceTime = 500;
        return timer(debounceTime).pipe(
            switchMap(() => rolesService.getRoles(control.value)),
            map((roles: Role[]) => {
                if (role && role !== null) {
                    if (roles && roles.length === 0) {
                        return null;
                      }
                    return (roles && roles.length === 1 && roles[0].id === role.id) ? null : { "roleExists": true };
                }
                return (roles && roles.length > 0) ? { "roleExists": true } : null;
            })
        );
    };
}
