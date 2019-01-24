import { Routes } from '@angular/router';
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
import { CreateProductComponent } from './admin/products/create-product/create-product.component';
import { AuthGuard } from './_guards/auth.guard';
import { ArchivesComponent } from './admin/products/archives/archives.component';
import { CartComponent } from './user/cart/cart.component';
import { RegisterComponent } from './user/register/register.component';
import { ItemDetailComponent } from './user/item-detail/item-detail.component';
import { ThankyouComponent } from './user/thankyou/thankyou.component';
import { ThankYouResolver } from './_resolver/thankyou.resolver';
import { OrderListComponent } from './admin/orders/order-list/order-list.component';
import { OrderViewComponent } from './admin/orders/order-view/order-view.component';
import { OrderViewResolver } from './_resolver/order-view.resolver';
import { ViewCategoriesComponent } from './user/view-categories/view-categories.component';
import { ViewCategoryResolver } from './_resolver/view-category.resolver';
import { UserOrdersComponent } from './user/user-orders/user-orders.component';
import { AccountComponent } from './user/account/account.component';
import { LowProductsComponent } from './admin/products/low-products/low-products.component';
import { UserListComponent } from './admin/users/user-list/user-list.component';
import { UserViewResolver } from './_resolver/user-view.resolver';
import { UserPanelAdminComponent } from './admin/users/user-panel-admin/user-panel-admin.component';
import { ChangepasswordComponent } from './user/changepassword/changepassword.component';

export const appRoutes: Routes = [
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
      },
      {
        path: 'changepassword',
        component: ChangepasswordComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Customer'] },
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'categories/:id',
        component: ViewCategoriesComponent,
        resolve: { product: ViewCategoryResolver }
      },
      {
        path: 'detail/:id',
        component: ItemDetailComponent,
        resolve: { product: ProductViewResolver }
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'account',
        component: AccountComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Customer'] },
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'myorders',
        component: UserOrdersComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Customer'] },
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'thankyou/:userid/:reference',
        component: ThankyouComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Customer'] },
        runGuardsAndResolvers: 'always',
        resolve: { order: ThankYouResolver }
      }
    ]
  },
  {
    path: 'admin',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    component: AdminPanelComponent,
    data: { roles: ['Admin', 'Moderator'] },
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
      { path: 'users', component: UserListComponent },
      { path: 'users/:id', component: UserPanelAdminComponent, resolve: { user: UserViewResolver } },
      { path: 'archives', component: ArchivesComponent },
      { path: 'lowinventory', component: LowProductsComponent },
      { path: 'orders', component: OrderListComponent },
      { path: 'orders/:id', component: OrderViewComponent, resolve: { order: OrderViewResolver } },
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        component: ViewProductsComponent,
        resolve: { product: ProductViewResolver }
      },
      { path: 'product/create', component: CreateProductComponent }
    ]
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];
