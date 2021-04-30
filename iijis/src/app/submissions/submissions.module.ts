import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmissionsComponent } from './submissions.component';
import { SubmissionsRoutingModule } from './submissions-routing.module';
import { SharedclassesModule } from '../sharedclasses/sharedclasses.module';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubmissionDialogComponent } from './submission-dialog.component';
import { FeedbackDialogComponent } from './feedback-dialog.component';



@NgModule({
  declarations: [SubmissionsComponent, SubmissionDialogComponent, FeedbackDialogComponent],
  imports: [
    CommonModule,
    SubmissionsRoutingModule,
    SharedclassesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [SubmissionsComponent]
})
export class SubmissionsModule { }
