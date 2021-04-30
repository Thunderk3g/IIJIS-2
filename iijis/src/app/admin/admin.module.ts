import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { SharedclassesModule } from '../sharedclasses/sharedclasses.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '',  component : AdminComponent },
];


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    SharedclassesModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
