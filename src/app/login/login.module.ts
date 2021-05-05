import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    RouterModule,
  ],
  exports: [
    LoginComponent,
    MatFormFieldModule,
  ]
})
export class LoginModule { }
