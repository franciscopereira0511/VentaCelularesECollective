import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.page.html',
  styleUrls: ['./store-form.page.scss'],
})
export class StoreFormPage implements OnInit {
  storeForm: FormGroup;
  private fb: FormBuilder;

  constructor() { }

  ngOnInit() {
    this.storeForm = this.fb.group({
      nombreT: [null, [Validators.maxLength(30)]],
      nombreE: [null, Validators.maxLength(30)],
      llave: [null, Validators.maxLength(30)],
      direccion: [null, Validators.maxLength(30)]
    });
  }

}
