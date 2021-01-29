import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.page.html',
  styleUrls: ['./company-form.page.scss'],
})
export class CompanyFormPage implements OnInit {
  companyForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.companyForm = this.fb.group({
      nombreE: [null, [Validators.maxLength(30)]],
      direccion: [null, Validators.maxLength(30)],
      nombreR: [null, Validators.maxLength(30)],
      correo: [null, Validators.maxLength(30)]
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
    const compania = {
      nombre: this.companyForm.get('nombreE').value,
      ubicacion: this.companyForm.get('direccion').value,
      representante: this.companyForm.get('nombreR').value,
      correo: this.companyForm.get('correo').value
    };

    console.log(compania);

    this.showToast('Se enviaron los datos al servicio de registro', 'success');

    this.http.post('http://localhost:3000/RegistrarEmpresa', compania)
    .subscribe(data => {
      console.log(data);
    });

  }

}
