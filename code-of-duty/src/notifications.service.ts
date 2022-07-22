import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessage } from './app/shared/model';
import { SnackbarComponent } from './app/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private readonly snackBar: MatSnackBar,
  ) { }

  default(message: string | ErrorMessage[]): void {
    if (typeof message === "string") {
      this.show(message, 'default');
    }
  }

  info(message: string | ErrorMessage[]): void {
    if (typeof message === "string") {
      this.show(message, 'info');
    }
  }

  success(message: string | ErrorMessage[]): void {
    if (typeof message === "string") {
      this.show(message, 'success');
    }
  }

  warn(message: string | ErrorMessage[]): void {
    if (typeof message === "string") {
      this.show(message, 'warn');
    }
  }

  error(message: string | ErrorMessage[]): void {
    if (typeof message === "string") {
      this.show(message, 'error');
    }
  }

  private show(message: string, type: string): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      data: { message: message, snackType: type, snackBar: this.snackBar }
    });
  }
}
