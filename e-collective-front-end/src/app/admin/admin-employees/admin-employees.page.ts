import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { tap } from 'rxjs/operators';



@Component({
  selector: 'app-admin-employees',
  templateUrl: './admin-employees.page.html',
  styleUrls: ['./admin-employees.page.scss'],
})
export class AdminEmployeesPage implements OnInit {
  user:Observable<User> = new Observable<User>();
  searching:boolean = false;
  users;
  employeeForm: FormGroup;
  constructor(private auth: AuthService,private fb: FormBuilder, private toastCtrl: ToastController) { 
    
  }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    });

    this.auth.getUsers().subscribe(users=>{
      this.users=users;
    });
  }

  async showToast(msg: string, pColor: string) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: pColor,
      position: 'top'
    });
    (await toast).present();
  }

  searchUser(){
    if (!this.employeeForm.valid){
      this.showToast('Favor llenar los campos marcados con asterisco (*).', 'danger');
    }
    else {
      const credenciales = this.employeeForm.get('email').value;
      this.user = this.auth.getUserByEmail(credenciales).pipe(
        tap(user => {
          if (user) {
            console.log(user);
            console.log('success');
            this.searching = true;
          } else {
            console.log('nelson');
          }
        }));

    }
  }

}
