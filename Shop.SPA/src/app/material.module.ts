import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatTableModule,
  MatTabsModule,
  MatProgressBarModule,
  MatSlideToggleModule,
  MatPaginatorModule,
  MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatTabsModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatTabsModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule {}
