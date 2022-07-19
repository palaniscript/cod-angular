import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/shared/model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  user: User;
  constructor(
    private readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.user = user;
    });
  }
}
