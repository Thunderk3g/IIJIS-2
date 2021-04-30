import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmissionComponent } from './submission.component';
import { SharedclassesModule } from '../sharedclasses/sharedclasses.module';
import { SubmissionRoutingModule } from './submission-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SubmissionComponent],
  imports: [
    CommonModule,
    SharedclassesModule,
    SubmissionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [SubmissionComponent]
})
export class SubmissionModule { }
