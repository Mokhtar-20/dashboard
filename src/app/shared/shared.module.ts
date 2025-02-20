import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZorroModule } from './zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ModalComponent } from './modal/modal.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    SidenavComponent,
    ModalComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ZorroModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ], 
  exports: [
    ZorroModule,
    FormsModule,
    ReactiveFormsModule,
    SidenavComponent,
    ModalComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
