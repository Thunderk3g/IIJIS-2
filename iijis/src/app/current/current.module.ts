import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentComponent } from './current.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '',  component : CurrentComponent },
];


@NgModule({
  declarations: [CurrentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [CurrentComponent]
})
export class CurrentModule { }
