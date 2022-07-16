import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, timer } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { User } from 'src/app/shared/model';
import { UsersService } from '../users.service';

export function existingUsernameValidator(usersService: UsersService, user: User | null): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        let debounceTime = 500;
        return timer(debounceTime).pipe(
            switchMap(() => usersService.getUsers(control.value)),
            map((users: User[]) => {
                if (user && user !== null) {
                    if (users && users.length === 0) {
                        return null;
                      }
                    return (users && users.length === 1 && users[0].id === user.id) ? null : { "usernameExists": true };
                }
                return (users && users.length > 0) ? { "usernameExists": true } : null;
            })
        );
    };
}
