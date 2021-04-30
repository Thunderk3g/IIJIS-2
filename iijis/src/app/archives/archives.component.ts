import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { config } from 'src/config/config';
import { SubmissionService } from '../services/submission.service';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})
export class ArchivesComponent implements OnInit {

  issues: any;
  imagesToShow: any;
  constructor(private submissionService : SubmissionService,
    private config: config,
    private sanitizer : DomSanitizer
    ) {
      this.issues = [];
      this.imagesToShow = [];
     }

  ngOnInit(): void {
    this.submissionService.releases().subscribe((data) => {
      if(data.body.data === null){
        this.issues = null;
      }
      else{
        this.issues = data.body.data;
        this.issues.forEach(element => {
          this.loadimage(element.id);
        });
      }

    });
  }
  loadimage(id){
    this.submissionService.getImage(id).subscribe((data)=>{
      let objectURL = URL.createObjectURL(data);
      let image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      this.imagesToShow.push({ id : id , image : image });
    }, (err) => {
      console.log(err)
    })
  }
  download(submission){
    window.open(this.config.apiPath + 'submission/file/' + submission.id , '_blank');
  }
  getimage(issue){
    let search =  this.imagesToShow.find(obj => obj.id === issue.id);
    return search.image;
  }

}
