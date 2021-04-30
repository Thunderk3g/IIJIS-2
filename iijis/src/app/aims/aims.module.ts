import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AimsComponent } from './aims.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '',  component : AimsComponent },
];


@NgModule({
  declarations: [AimsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AimsModule { }
