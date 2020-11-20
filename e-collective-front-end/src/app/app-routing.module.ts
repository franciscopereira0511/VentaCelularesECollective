import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'locations',
    loadChildren: () => import('./locations/locations.module').then( m => m.LocationsPageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then( m => m.FAQPageModule)
  },
  {
    path: 'cart-modal',
    loadChildren: () => import('./cart-modal/cart-modal.module').then( m => m.CartModalPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'admin-user',
    loadChildren: () => import('./admin/admin-user/admin-user.module').then( m => m.AdminUserPageModule)
  },  {
    path: 'admin-employees',
    loadChildren: () => import('./admin/admin-employees/admin-employees.module').then( m => m.AdminEmployeesPageModule)
  },
  {
    path: 'admin-employees',
    loadChildren: () => import('./admin/admin-employees/admin-employees.module').then( m => m.AdminEmployeesPageModule)
  },
  {
    path: 'admin-products',
    loadChildren: () => import('./admin/admin-products/admin-products.module').then( m => m.AdminProductsPageModule)
  },
  {
    path: 'admin-offers',
    loadChildren: () => import('./admin/admin-offers/admin-offers.module').then( m => m.AdminOffersPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
