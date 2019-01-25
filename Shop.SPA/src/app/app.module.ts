import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes.routing';
import { JwtModule } from '@auth0/angular-jwt';
import { Angular4PaystackModule } from 'angular4-paystack';
import { SlideshowModule } from 'ng-simple-slideshow';
import { NgxGalleryModule } from 'ngx-gallery';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { CategoryComponent } from './admin/category/category.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserNavComponent } from './user/user-nav/user-nav.component';
import { UserPanelComponent } from './user/user-panel/user-panel.component';
import { HomeComponent } from './user/home/home.component';
import { ViewProductsComponent } from './admin/products/view-products/view-products.component';
import { ProductListComponent } from './admin/products/product-list/product-list.component';
import { ProductViewResolver } from './_resolver/product-view.resolver';
import { ProductPhotosComponent } from './admin/products/product-photos/product-photos.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { ProductDetailComponent } from './admin/products/product-detail/product-detail.component';
import { CreateProductComponent } from './admin/products/create-product/create-product.component';
import { EditProductComponent } from './admin/products/edit-product/edit-product.component';
import { AuthGuard } from './_guards/auth.guard';
import { HasRoleDirective } from './_directives/has-role.directive';
import { ArchivesComponent } from './admin/products/archives/archives.component';
import { FooterComponent } from './user/footer/footer.component';
import { CarouselComponent } from './user/carousel/carousel.component';
import { MoneyPipe } from './_utils/money.pipe';
import { CartComponent } from './user/cart/cart.component';
import { RegisterComponent } from './user/register/register.component';
import { MatDialogRef } from '@angular/material';
import { CartDialogComponent } from './user/dialogs/cart-dialog/cart-dialog.component';
import { ItemDetailComponent } from './user/item-detail/item-detail.component';
import { ShippingAddressDialogComponent } from './user/dialogs/shipping-address-dialog/shipping-address-dialog.component';
import { LoginDialogComponent } from './user/dialogs/login-dialog/login-dialog.component';
import { ThankyouComponent } from './user/thankyou/thankyou.component';
import { ThankYouResolver } from './_resolver/thankyou.resolver';
import { OrderListComponent } from './admin/orders/order-list/order-list.component';
import { OrderViewComponent } from './admin/orders/order-view/order-view.component';
import { OrderViewResolver } from './_resolver/order-view.resolver';
import { ViewCategoriesComponent } from './user/view-categories/view-categories.component';
import { ViewCategoryResolver } from './_resolver/view-category.resolver';
import { UserOrdersComponent } from './user/user-orders/user-orders.component';
import { UIService } from './_services/ui.service';
import { AccountComponent } from './user/account/account.component';
import { LowProductsComponent } from './admin/products/low-products/low-products.component';
import { UserListComponent } from './admin/users/user-list/user-list.component';
import { UserViewComponent } from './admin/users/user-view/user-view.component';
import { UserSidenavComponent } from './user/user-sidenav/user-sidenav.component';
import { UserViewResolver } from './_resolver/user-view.resolver';
import { UserOrderAdminComponent } from './admin/users/user-order-admin/user-order-admin.component';
import { UserPanelAdminComponent } from './admin/users/user-panel-admin/user-panel-admin.component';
import { ChangepasswordComponent } from './user/changepassword/changepassword.component';
import { SlidesComponent } from './admin/slides/slides.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    AdminPanelComponent,
    AdminNavComponent,
    LowProductsComponent,
    ViewProductsComponent,
    ProductListComponent,
    ProductPhotosComponent,
    ProductDetailComponent,
    ArchivesComponent,
    EditProductComponent,
    CreateProductComponent,
    CategoryComponent,
    OrderListComponent,
    OrderViewComponent,
    UserSidenavComponent,
    HomeComponent,
    CarouselComponent,
    UserNavComponent,
    UserPanelComponent,
    CartDialogComponent,
    ItemDetailComponent,
    CartComponent,
    UserOrdersComponent,
    UserPanelAdminComponent,
    UserListComponent,
    UserViewComponent,
    UserOrderAdminComponent,
    AccountComponent,
    ViewCategoriesComponent,
    ThankyouComponent,
    RegisterComponent,
    FooterComponent,
    SlidesComponent,
    LoginDialogComponent,
    ShippingAddressDialogComponent,
    ChangepasswordComponent,
    HasRoleDirective,
    MoneyPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SlideshowModule,
    NgxGalleryModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    FileUploadModule,
    Angular4PaystackModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/auth/']
      }
    })
  ],
  entryComponents: [CartDialogComponent, LoginDialogComponent, ShippingAddressDialogComponent],
  providers: [
    UIService,
    ProductViewResolver,
    ThankYouResolver,
    OrderViewResolver,
    ViewCategoryResolver,
    UserViewResolver,
    AuthGuard,
    CartDialogComponent,
    LoginDialogComponent,
    ShippingAddressDialogComponent,
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
