import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.page.html',
  styleUrls: ['./invoice-form.page.scss'],
})
export class InvoiceFormPage implements OnInit {
  invoiceForm: FormGroup;
  private fb: FormBuilder;
  constructor() { }

  ngOnInit() {
    this.invoiceForm = this.fb.group({
      nombreE: [null, [Validators.maxLength(30)]],
      nombreT: [null, Validators.maxLength(30)],
      llave: [null, Validators.maxLength(30)],
      numero: [null, Validators.maxLength(30)],
      detalle: [null, Validators.maxLength(30)],
    });
  }

}
