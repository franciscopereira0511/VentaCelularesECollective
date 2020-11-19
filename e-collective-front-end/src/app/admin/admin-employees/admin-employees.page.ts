import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-admin-employees',
  templateUrl: './admin-employees.page.html',
  styleUrls: ['./admin-employees.page.scss'],
})
export class AdminEmployeesPage implements OnInit {
  user:Observable<User> = new Observable<User>();
  searching:boolean = false;
  users;
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

}
