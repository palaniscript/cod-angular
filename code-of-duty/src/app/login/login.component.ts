import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/notifications.service';
import { AuthService } from '../shared/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationsService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  getFormControl(field: string) {
    return this.loginForm.get(field);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe(
          (response: any) => {
            if (response.accessToken) {
              this.router.navigate(['dashboard']);
            } else {
              this.notificationService.error(response.message);
            }
          },
          (error) => {
            this.notificationService.error(error.error.message);
          }
        );
    }
  }
}
