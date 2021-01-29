import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.page.html',
  styleUrls: ['./company-form.page.scss'],
})
export class CompanyFormPage implements OnInit {
  companyForm: FormGroup;
  private fb: FormBuilder;

  constructor() { }

  ngOnInit() {
    this.companyForm = this.fb.group({
      nombreE: [null, [Validators.maxLength(30)]],
      direccion: [null, Validators.maxLength(30)],
      nombreR: [null, Validators.maxLength(30)],
      correo: [null, Validators.maxLength(30)]
    });
  }

}
