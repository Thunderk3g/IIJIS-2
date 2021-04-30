import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { user } from '../models/user.model';
import { SessionService } from '../services/session.service';
import { SubmissionService } from '../services/submission.service';
import { UserService } from '../services/user.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  loggedin: boolean;
  userdata: user;
  resetPasswordForm: FormGroup;
  updateDetailsForm: FormGroup;
  countries: any;
  file: File;
  uploaded: boolean;
  filename: string;
  imageToShow: any;
  constructor(private sanitizer: DomSanitizer, private userService: UserService, private toastr: ToastrService, private fb: FormBuilder, private utilsService: UtilsService, private sessionService: SessionService, private submissionService: SubmissionService) {
    this.filename = "Upload your photo here";
    this.init();
    this.initResetForm();
    this.initUpdateForm();
  }

  ngOnInit(): void {
  }

  init() {
    if (localStorage.getItem('userdata') !== null) {
      this.loggedin = true;
      this.userdata = JSON.parse(localStorage.getItem('userdata'));
      this.loadImage();
    }
    else {
      this.loggedin = false;
      this.userdata = null;
    }
  }

  initResetForm() {
    this.resetPasswordForm = this.fb.group({
      oldpassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }
  initUpdateForm() {
    this.updateDetailsForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      affiliation: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]),
    });
    this.utilsService.getCountries().subscribe((data) => { this.countries = data.body.countries });
  }
  update() {
    this.userService.update(this.userdata).subscribe((data) => {
      this.toastr.success('User updated!', 'Success');
      localStorage.setItem('userdata', JSON.stringify(data.body));
      this.sessionService.setuser(true);
    }, (err) => {
      this.toastr.error('Updating user failed!', 'Server Error!');
    })
  }
  changepassword() {
    if (this.resetPasswordForm.controls['oldpassword'].invalid || this.resetPasswordForm.controls['password'].invalid || this.resetPasswordForm.controls['confirmPassword'].invalid) {
      this.toastr.error('Please enter all form fields', 'Validation Error!');
    } else {
      this.userdata.oldPassword = this.resetPasswordForm.controls['oldpassword'].value;
      this.userdata.password = this.resetPasswordForm.controls['password'].value;
      this.userdata.confirmPassword = this.resetPasswordForm.controls['confirmPassword'].value;
      this.userService.changepassword(this.userdata).subscribe((data) => {
        this.toastr.success('Password updated!', 'Success');
        localStorage.setItem('userdata', JSON.stringify(data.body.data));
        this.sessionService.setuser(true);
      }, (err) => {
        if (err === 'Conflict')
          this.toastr.error('Password and Confirm Password do not match!', 'Server Error!');
        if (err === 'Bad Request')
          this.toastr.error('Incorrect Old Password!', 'Server Error!');
      })
    }
  }
  uploadDocument(file: File) {
    this.file = file;
    this.filename = file.name;
  }
  uploadFileToActivity() {
    this.submissionService.uploadsubmissionimage(this.file, this.userdata.id).subscribe(data => {
      // do something, if upload success
      this.toastr.success('Profile picture updated!', 'Success');
      localStorage.setItem('userdata', JSON.stringify(data.body.data));
      this.sessionService.setuser(true);
      this.loadImage();
      this.uploaded = true;
    }, error => {
      this.toastr.error('Updating image failed!', 'Server Error!');
    });
  }
  updateImage() {
    if (this.file === undefined)
      this.toastr.error('Please upload a picture!', 'Error!');
    else
      this.uploadFileToActivity();
  }
  loadImage() {
    if (this.userdata.file !== null && this.userdata.file !== undefined) {
      this.userService.getImage(this.userdata.id).subscribe((data) => {
        let objectURL = URL.createObjectURL(data);
        this.imageToShow = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      }, (err) => {
        console.log(err)
      })
    }
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
