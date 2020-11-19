import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product/product';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.page.html',
  styleUrls: ['./admin-products.page.scss'],
})
export class AdminProductsPage implements OnInit {
  productForm: FormGroup;
  previewImage: any = 'assets/box.svg';
  productPicture: File = null;
  productos: Product[] = [];

  product:Observable<Product> = new Observable<Product>();
  searching:boolean = false;

  constructor(private fb: FormBuilder,private toastCtrl: ToastController,
              private productService: ProductsService) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      codigo: [null, Validators.required],
      marca: [null, Validators.required],
      modelo: [null, [Validators.required]],
      precio: [null, [Validators.required]],
    });
    this.productService.getProducts().subscribe(products=>{
      this.productos=products;
    });
    
  }

  onProfilePictureSelected(event){

    if (event.target.files){
      this.productPicture = (event.target.files[0] as File);

      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };

    }
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

  onClickCreateProduct(){
    if (!this.productForm.valid){
      this.showToast('Favor llenar los campos marcados con asterisco (*).', 'danger');
    }
    else {
      const product: Product = {
        id: this.productForm.get('codigo').value,
        name: this.productForm.get('marca').value,
        model: this.productForm.get('modelo').value,
        price: this.productForm.get('precio').value,
        quantity: 1,
        imgUrl: this.productPicture
      }; 

      if(product.imgUrl != null){
        this.productService.uploadImage(product,this.productPicture); 
       }
      else{
        product.imgUrl = 'assets/box.svg'
        this.productService.insertProduct(product);
      }
    }
  }

  getProduct(){
    this.product = this.productService.getProduct('H1234');
    console.log(this.product);
    this.searching = true;
  }

}
