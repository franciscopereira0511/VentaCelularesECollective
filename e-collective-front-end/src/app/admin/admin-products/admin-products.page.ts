import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product/product';
import { ProductsService } from 'src/app/services/products/products.service';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.page.html',
  styleUrls: ['./admin-products.page.scss'],
})
export class AdminProductsPage implements OnInit {
  productForm: FormGroup;
  searchForm: FormGroup;
  previewImage: any = 'assets/box.svg';
  productPicture: File = null;
  productos: Product[] = [];

  product:Observable<Product> = new Observable<Product>();
  producto:Product;
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
    this.searchForm = this.fb.group({
      idProduct:[null, Validators.required]
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
        imgUrl: this.productPicture,
        discount:0,
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

  searchProduct(){
    if (!this.searchForm.valid){
      this.showToast('Favor llenar los campos marcados con asterisco (*).', 'danger');
    }
    else {
      const identificador = this.searchForm.get('idProduct').value;
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
  updateProduct(product){
    this.productForm.get('codigo').setValue(product.id);
    this.productForm.get('marca').setValue(product.name);
    this.productForm.get('modelo').setValue(product.model);
    this.productForm.get('precio').setValue(product.price);
    //this.productPicture = product.imgUrl;
    this.previewImage = product.imgUrl
  }

  deleteProduct(product){
    this.productService.deleteProduct(product.id);
  }
}
