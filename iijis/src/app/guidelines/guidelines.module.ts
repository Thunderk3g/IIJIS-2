import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuidelinesComponent } from './guidelines.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  { path: '',  component : GuidelinesComponent },
];


@NgModule({
  declarations: [GuidelinesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class GuidelinesModule { }
