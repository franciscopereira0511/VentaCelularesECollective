import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
  username: string;
  buyOrders: any = [];

  constructor(private auth: AuthService,private productsService: ProductsService) { }

  ngOnInit() {
    if(this.auth.getUsername) {
      this.username = this.auth.getUsername();
      console.log(this.username);

      this.productsService.getOrders(this.username).subscribe(orders => {
        this.buyOrders = orders;
        console.log(this.buyOrders);
      });
    }
    
    

  }

  onSubmit() {
    console.log('Facturar');
  }

}
