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
  MatTabsModule
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
    MatTabsModule
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
    MatTabsModule
  ]
})
export class MaterialModule {}
