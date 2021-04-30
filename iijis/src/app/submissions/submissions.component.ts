import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { config } from 'src/config/config';
import { user } from '../models/user.model';
import { SubmissionService } from '../services/submission.service';
import { UserService } from '../services/user.service';
import { FeedbackDialogComponent } from './feedback-dialog.component';
import { SubmissionDialogComponent } from './submission-dialog.component';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css']
})
export class SubmissionsComponent implements OnInit {
  loggedin: boolean;
  userdata: user;
  submissionlist: any;
  count: number;
  offset: number;
  page: number;
  imageToShow: any;
  toggle:boolean;
  submission: any;
  image:any;
  constructor(private config : config, public dialog: MatDialog, private sanitizer : DomSanitizer,private userService : UserService,private toastr: ToastrService, private submissionService : SubmissionService) {
    this.init();
    this.offset = 0;
    this.page = 1;
    this.submissionlist = [];
  }

  ngOnInit(): void {
    this.load();
  }

  init() {
    if(localStorage.getItem('userdata') !== null) {
      this.loggedin = true;
      this.userdata = JSON.parse(localStorage.getItem('userdata'));
      if(this.userdata.file !== undefined){
        this.loadImage();
      }
    }
    else{
      this.loggedin = false;
      this.userdata = null;
    }
  }
  load(){
    this.submissionService.getsubmissionsbyid(this.userdata.id, this.offset).subscribe((data) => {
      this.submissionlist = data.body.data.data;
      this.count = data.body.data.count;
      console.log(this.submissionlist);
    }, (err) => {
      this.toastr.error('Coulkd not get submissions!', 'Server Error!');
    })
  }
  increaseoffset(){
    this.offset+=10;
    this.page++;
    this.load();
  }
  decreaseoffset(){
    this.offset-=10;
    this.page--;
    this.load();
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior:"smooth"});
  }
  loadImage(){
    if(this.userdata.file !== null && this.userdata.file !== undefined){
      this.userService.getImage(this.userdata.id).subscribe((data)=>{
        let objectURL = URL.createObjectURL(data);
        this.imageToShow = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      }, (err) => {
        console.log(err)
      })
    }
   }
  show(submission){
    let dialogRef = this.dialog.open(SubmissionDialogComponent, {
      width: '100%',
      data: submission
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  showdetails(submission){
    this.toggle = !this.toggle;
    this.submission = submission;
    if(this.submission.user.file !== undefined){
      this.userService.getImage(this.submission.user.id).subscribe((data)=>{
        let objectURL = URL.createObjectURL(data);
        this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      }, (err) => {
        console.log(err)
      })
    }
  }
  downloadfile(submission){
    window.open(this.config.apiPath + 'submission/file/' + submission.id , '_blank');
  }
  createImageFromBlob(blob: Blob) {
    let reader = new FileReader();
    let basedata;
    reader.readAsDataURL(blob);
    reader.onloadend = function() {
        var base64data = reader.result;
        console.log(base64data);
        basedata = base64data;
    }
    return basedata;
 }
 review(submission){

 }
 sendfeedback(submission){
  let dialogRef = this.dialog.open(FeedbackDialogComponent, {
    width: '100%',
    data: submission
  });
  dialogRef.afterClosed().subscribe(result => {
    this.toggle = !this.toggle;
    this.ngOnInit();
  });
 }
}
