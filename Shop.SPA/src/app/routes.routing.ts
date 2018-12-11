import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { CategoryComponent } from './admin/category/category.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { UserPanelComponent } from './user/user-panel/user-panel.component';
import { UserNavComponent } from './user/user-nav/user-nav.component';
import { HomeComponent } from './user/home/home.component';
import { ProductListComponent } from './admin/products/product-list/product-list.component';
import { ViewProductsComponent } from './admin/products/view-products/view-products.component';
import { ProductViewResolver } from './_resolver/product-view.resolver';

export const appRoutes: Routes = [
  {
    path: 'admin',
    component: AdminPanelComponent,
    children: [
      {
        path: '',
        outlet: 'admin',
        component: AdminNavComponent
      },
      {
        path: '',
        component: AdminDashboardComponent
      },
      { path: 'category', component: CategoryComponent },
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        component: ViewProductsComponent,
        resolve: { product: ProductViewResolver }
      }
    ]
  },
  {
    path: '',
    component: UserPanelComponent,
    children: [
      {
        path: '',
        outlet: 'user',
        component: UserNavComponent
      },
      {
        path: '',
        component: HomeComponent
      }
    ]
  }
];
