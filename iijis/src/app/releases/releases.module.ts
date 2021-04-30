import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleasesComponent } from './releases.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedclassesModule } from '../sharedclasses/sharedclasses.module';

const routes: Routes = [
  { path: '',  component : ReleasesComponent },
];

@NgModule({
  declarations: [ReleasesComponent],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedclassesModule
  ],
  exports:[ReleasesComponent]
})
export class ReleasesModule { }
