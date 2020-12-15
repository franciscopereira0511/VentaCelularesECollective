import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user/user';
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import * as _ from 'lodash';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  observableUser = new Observable<User>()
  usuarioActual: User = null;
  userForm: FormGroup;
  
  previewImage: any = 'assets/avatar.svg';
  profilePicture: File = null;
  emailUsuario: string = "Correo";
  nombre: string = "Nombre";
  birthdate: string = "Fecha Nacimiento";
  rolUser: number = 1;
  id: any = 0;
 
  

  constructor( 
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    ) {  }

      ngOnInit() {
        this.userForm = this.fb.group({
          contrasena: [null, [Validators.required, Validators.minLength(8)]],
        });
        const state = this.router.getCurrentNavigation().extras.state;
        if (state) {
          this.usuarioActual = state.usuario;
          this.nombre = this.usuarioActual.name;
          this.previewImage = this.usuarioActual.imageData;
          this.emailUsuario = this.usuarioActual.email;
          this.birthdate = this.usuarioActual.birthdate.substring(0,10);
          this.rolUser = this.usuarioActual.rol;
          this.id = this.usuarioActual.uid;
          // console.log(this.usuario);
        }else{console.log("Nelson")}
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

      onProfilePictureSelected(event){
        if (event.target.files){
          this.profilePicture = (event.target.files[0] as File);
          const reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (e: any) => {
            this.previewImage = e.target.result;
          };
        }
      }

    editInfo(){
      if (!this.userForm.valid){
        this.showToast('Porfavor, ingrese datos validos.', 'danger');
      }else{
        const usuario: User = {
          email: this.emailUsuario,
          name: this.nombre,
          rol: this.rolUser,
          birthdate: this.birthdate,
          imageData: this.profilePicture,
          uid: this.id
        };

        const navigationExtras: NavigationExtras = {
          state: {
            email: this.emailUsuario
          }
        };

        const credenciales = this.userForm.get('contrasena').value;

        var user = firebase.auth().currentUser;
        user.updatePassword(credenciales)
       .then( e => {
         usuario.uid = user.uid;
         console.log(usuario.uid)
         if(usuario.imageData != null){
          this.auth.uploadImage(usuario,this.profilePicture); 
         }
        else{
          usuario.imageData = 'assets/avatar.svg'
          this.firestore.collection('users').doc(usuario.email).set(usuario);
        }
        
        this.showToast('Se hizo el cambio de manera exitosa.', 'success');
        this.router.navigate(['login'], navigationExtras);

       });


      }

  }

}
