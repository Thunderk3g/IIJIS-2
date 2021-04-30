import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { config } from 'src/config/config';
import { SubmissionService } from '../services/submission.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  issue: any;
  imageToShow: any;
  imageToShow1: any;
  constructor(private submissionService : SubmissionService,
    private config: config,
    private sanitizer : DomSanitizer
    ) { }

  ngOnInit(): void {
    this.submissionService.current().subscribe((data) => {
      if(data.body.data === null){
        this.issue = null;
      }
      else{
        this.issue = data.body.data;
        this.loadimage(data.body.data.id);
        this.loadimage2(data.body.data.id);
      }

    });
  }
  loadimage(id){
    this.submissionService.getImage(id).subscribe((data)=>{
      let objectURL = URL.createObjectURL(data);
      this.imageToShow = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      console.log(this.imageToShow)
    }, (err) => {
      console.log(err)
    })
  }
  loadimage2(id){
    this.submissionService.getIntervieweeImage(id).subscribe((data)=>{
      let objectURL = URL.createObjectURL(data);
      this.imageToShow1 = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      console.log(this.imageToShow1)
    }, (err) => {
      console.log(err)
    })
  }
  download(submission){
    window.open(this.config.apiPath + 'submission/file/' + submission.id , '_blank');
  }

}
