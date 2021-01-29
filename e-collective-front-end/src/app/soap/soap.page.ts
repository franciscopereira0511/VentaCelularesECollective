import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-soap',
  templateUrl: './soap.page.html',
  styleUrls: ['./soap.page.scss'],
})
export class SOAPPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  onClickRegistraEmpresa(){
    this.router.navigate(['/company-form']);
  }
  
  onClickRegistraTienda(){
    this.router.navigate(['/store-form']);
  }
  
  onClickRegistraFactura(){
    this.router.navigate(['/invoice-form']);
  }
}
