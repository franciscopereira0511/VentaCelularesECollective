import { ToastController } from '@ionic/angular';
import { ScreensizeService } from './../services/screensize.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private toastCtrl: ToastController, private contact: ContactService) {

  }

  ngOnInit() {
    this.contactForm = this.fb.group({
      nombre: [null, Validators.required],
      correo: [null, [Validators.required, Validators.email]],
      asunto: [null, [Validators.required]],
      mensaje: [null, [Validators.required]]
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

  onClickSend(contactForm) {
    if (!this.contactForm.valid){
      this.showToast('Favor llenar los campos marcados con asterisco (*).', 'danger');
    }
    else {
      console.log('entró aquí');
      console.log(contactForm);
      this.contact.PostMessage(contactForm)
      .subscribe(response => {
        location.href = 'https://mailthis.to/confirm';
        console.log(response);
        }, error => {
        console.warn(error.responseText);
        console.log({ error });
        });

    }

  }

}
