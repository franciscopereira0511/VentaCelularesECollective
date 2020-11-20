import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.page.html',
  styleUrls: ['./admin-user.page.scss'],
})
export class AdminUserPage implements OnInit {

  constructor(private router:Router) {  }

  ngOnInit() {
  }

  toEmployees(){
    this.router.navigate(['/admin-employees'])
  }
  
  toProducts(){
    this.router.navigate(['/admin-products'])
  }

  toOffers(){
    this.router.navigate(['/admin-offers'])
  }
}
