import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'submission-dialog',
  templateUrl: 'submission-dialog.component.html',
})
export class SubmissionDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SubmissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ok(){

  }

}
