import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdComponent } from './ad/ad.component';

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
  },
  {
    path: 'admin-employees',
    loadChildren: () => import('./admin/admin-employees/admin-employees.module').then( m => m.AdminEmployeesPageModule)
  },  
  {
    path: 'product-details',
    loadChildren: () => import('./product-details/product-details.module').then( m => m.ProductDetailsPageModule)
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
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'order-history',
    loadChildren: () => import('./order-history/order-history.module').then( m => m.OrderHistoryPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'company-form',
    loadChildren: () => import('./company-form/company-form.module').then( m => m.CompanyFormPageModule)
  },  {
    path: 'store-form',
    loadChildren: () => import('./store-form/store-form.module').then( m => m.StoreFormPageModule)
  },
  {
    path: 'invoice-form',
    loadChildren: () => import('./invoice-form/invoice-form.module').then( m => m.InvoiceFormPageModule)
  },
  {
    path: 'soap',
    loadChildren: () => import('./soap/soap.module').then( m => m.SOAPPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
