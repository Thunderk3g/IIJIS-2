import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { user } from 'src/app/models/user.model';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedin: boolean;
  userdata: user;
  imageToShow: any;

  constructor(private sessionservice : SessionService, private userService : UserService, private sanitizer : DomSanitizer) {
    this.init();
  }

  ngOnInit() {
    this.sessionservice.setuserevent$.forEach((event) => {
      this.init();
    })
  }

  init() {
    if(localStorage.getItem('userdata') !== null) {
      this.loggedin = true;
      this.userdata = JSON.parse(localStorage.getItem('userdata'));
      if(this.userdata.file !== null && this.userdata.file !== undefined){
      this.userService.getImage(this.userdata.id).subscribe((data)=>{
        let objectURL = URL.createObjectURL(data);
        this.imageToShow = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      }, (err) => {
        console.log(err)
      })
    }
    }
    else{
      this.loggedin = false;
      this.userdata = null;
    }
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
}
