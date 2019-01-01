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
import { NgxGalleryModule } from 'ngx-gallery';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { CategoryComponent } from './admin/category/category.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserNavComponent } from './user/user-nav/user-nav.component';
import { UserPanelComponent } from './user/user-panel/user-panel.component';
import { HomeComponent } from './user/home/home.component';
import { AlertifyService } from './_services/gloabal/alertify.service';
import { ViewProductsComponent } from './admin/products/view-products/view-products.component';
import { ProductListComponent } from './admin/products/product-list/product-list.component';
import { ProductViewResolver } from './_resolver/product-view.resolver';
import { ProductPhotosComponent } from './admin/products/product-photos/product-photos.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { ProductDetailComponent } from './admin/products/product-detail/product-detail.component';
import { CreateProductComponent } from './admin/products/create-product/create-product.component';
import { EditProductComponent } from './admin/products/edit-product/edit-product.component';
import { AuthComponent } from './user/auth/auth.component';
import { AdminGuard } from './_guards/admin.guard';
import { HasRoleDirective } from './_directives/has-role.directive';
import { ArchivesComponent } from './admin/products/archives/archives.component';
import { FooterComponent } from './user/footer/footer.component';
import { CarouselComponent } from './user/carousel/carousel.component';
import { ItemsComponent } from './user/items/items.component';
import { MoneyPipe } from './_utils/money.pipe';
import { DialogComponent } from './user/dialog/dialog.component';
import { CartComponent } from './user/cart/cart.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    AdminPanelComponent,
    AdminNavComponent,
    ViewProductsComponent,
    ProductListComponent,
    ProductPhotosComponent,
    ProductDetailComponent,
    ArchivesComponent,
    EditProductComponent,
    CreateProductComponent,
    CategoryComponent,
    HomeComponent,
    CarouselComponent,
    UserNavComponent,
    UserPanelComponent,
    DialogComponent,
    ItemsComponent,
    CartComponent,
    FooterComponent,
    AuthComponent,
    HasRoleDirective,
    MoneyPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    FileUploadModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/auth/']
      }
    })
  ],
  entryComponents: [DialogComponent],
  providers: [AlertifyService, ProductViewResolver, AdminGuard, DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
