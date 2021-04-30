import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SubmissionService } from '../services/submission.service';

@Component({
  selector: 'feedback-dialog',
  templateUrl: 'feedback-dialog.component.html',
})
export class FeedbackDialogComponent {
  choice:any;
  description:any;
  constructor(
    public dialogRef: MatDialogRef<FeedbackDialogComponent>,
    private toastr: ToastrService, private submissionService : SubmissionService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.choice = 1;
      this.description = '';
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  send(){
    this.data.choice = this.choice;
    this.data.feedbackdescription = this.description;
    this.data.user = this.data.user.id;
    this.submissionService.completedocumentation(this.data).subscribe((data) => {
      this.dialogRef.close();
      this.toastr.success('Sent feedback!', 'Success');
    }, (err) => {
      this.toastr.error('Could not send feedback!', 'Server Error!');
    })
  }

}
