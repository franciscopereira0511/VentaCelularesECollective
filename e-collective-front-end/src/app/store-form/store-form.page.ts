import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.page.html',
  styleUrls: ['./store-form.page.scss'],
})
export class StoreFormPage implements OnInit {
  storeForm: FormGroup;
  

  constructor(private http: HttpClient,private fb: FormBuilder, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.storeForm = this.fb.group({
      nombreT: [null, [Validators.maxLength(30)]],
      nombreE: [null, Validators.maxLength(30)],
      llave: [null, Validators.maxLength(30)],
      direccion: [null, Validators.maxLength(30)]
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

  onSubmit() {
    const tienda = {
      empresa: this.storeForm.get('nombreE').value,
      llave: this.storeForm.get('llave').value,
      tienda: this.storeForm.get('nombreT').value,
      ubicacion: this.storeForm.get('direccion').value
    };

    console.log(tienda);

    this.showToast('Se enviaron los datos al servicio de registro', 'success');

    this.http.post('http://localhost:3000/RegistrarTienda', tienda)
    .subscribe(data => {
      console.log(data);
    });

  }



}
