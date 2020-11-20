import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product/product';
import { ProductsService } from 'src/app/services/products/products.service';
import { tap } from 'rxjs/operators';
import { Promos } from 'src/app/models/promos/promos';

@Component({
  selector: 'app-admin-offers',
  templateUrl: './admin-offers.page.html',
  styleUrls: ['./admin-offers.page.scss'],
})
export class AdminOffersPage implements OnInit {
  promoForm: FormGroup;
  searchPForm: FormGroup;
  promos:Product[] = [];

  product:Observable<Product> = new Observable<Product>();
  producto:Product;
  searching:boolean = false;

  constructor(private fb: FormBuilder,private toastCtrl: ToastController,
    private productService: ProductsService) { }

  ngOnInit() {
    this.promoForm = this.fb.group({
      idPromo: [null, Validators.required],
      discount: [null, Validators.required]
    });
    this.searchPForm = this.fb.group({
      idProduct:[null, Validators.required]
    });
    this.productService.getPromos().subscribe(promos=>{
      this.promos=promos;
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

  onClickCreatePromo(){
      if (!this.promoForm.valid){
        this.showToast('Favor llenar los campos marcados con asterisco (*).', 'danger');
      }
      else {
        const promo:Promos= {
          id: this.promoForm.get('idPromo').value,
          discount: this.promoForm.get('discount').value
        }; 
        this.product = this.productService.getProduct(promo.id).pipe(
          tap(product => {
            if (product) {
              this.producto = product;
              this.producto.discount = promo.discount;
              this.productService.insertProduct(this.producto);
              console.log('success');
            } else {
              console.log('nelson');
            }
          }));
  
      }
    }

  
  searchProduct(){
    if (!this.searchPForm.valid){
      this.showToast('Favor llenar los campos marcados con asterisco (*).', 'danger');
    }
    else {
      const identificador = this.searchPForm.get('idProduct').value;
      this.product = this.productService.getProduct(identificador).pipe(
        tap(product => {
          if (product) {
            this.producto = product;
            console.log('success');
            this.searching = true;
          } else {
            this.searching = false;
            console.log('nelson');
          }
        }));

    }
  }

  updatePromo(promo){
    this.promoForm.get('idPromo').setValue(promo.id);
    this.promoForm.get('discount').setValue(promo.discount);

  }

  
  deletePromo(promo){
    this.productService.deleteProduct(promo.id);
  }

}
