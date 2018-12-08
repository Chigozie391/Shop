import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes.routing';
import { AdminNavComponent } from './admin/admin-nav/admin-nav.component';
import { CategoryComponent } from './admin/category/category.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UserNavComponent } from './user/user-nav/user-nav.component';
import { UserPanelComponent } from './user/user-panel/user-panel.component';
import { HomeComponent } from './user/home/home.component';
import { AlertifyService } from './_services/gloabal/alertify.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    AdminPanelComponent,
    AdminNavComponent,
    CategoryComponent,
    HomeComponent,
    UserNavComponent,
    UserPanelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule
  ],
  providers: [AlertifyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
