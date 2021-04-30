import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { initSubmissionModel } from '../models/submission.model';
import { user } from '../models/user.model';
import { SubmissionService } from '../services/submission.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {
  submissionForm : FormGroup;
  documentForm : FormGroup;
  metadataForm: FormGroup;
  confirmationForm: FormGroup;
  user: user;
  progress: number;
  incomplete: initSubmissionModel;
  filename: string;
  file: File;
  uploaded: boolean;
  nextSteps: boolean;
  constructor(private fb: FormBuilder, private toastr: ToastrService,private router: Router, private submissionService : SubmissionService) {
    this.user = JSON.parse(localStorage.getItem('userdata'));
    this.progress = 0;
    this.filename = "Upload your document here";
  }

  ngOnInit(): void {
    this.submissionService.incompletesubmission(this.user.id).subscribe((data) => {
      if(data.body[0] !== undefined){
        this.incomplete = data.body[0];
        if(data.body[0].file !== undefined){
          this.filename = data.body[0].file.originalname;
          this.uploaded = true;
        }
        if(data.body[0].stage === 1)
        {
          this.progress = 20 * data.body[0].stage;
          this.initDocumentForm();
        }
        if(data.body[0].stage === 2)
        {
          this.progress = 20 * data.body[0].stage;
          this.initMetadataForm();
        }
        if(data.body[0].stage === 3)
        {
          this.progress = 20 * data.body[0].stage;
          this.initConfirmationForm();
        }
        if(data.body[0].stage === 4)
        {
          this.progress = 20 * data.body[0].stage;
          this.initNextSteps();
        }
        if(data.body[0].stage === 5)
        {
          this.progress = 20 * data.body[0].stage;
          this.initNextSteps();
        }
      }
      else{
        console.log("refreshing");
        this.progress=0;
        this.filename = "Upload your document here";
        this.uploaded = false;
        this.nextSteps = false;
      }
    }, (err) => {
      this.toastr.error('Could not check previous submissions!', 'Server Error!');
    });
    this.initSubmissionForm();
  }

  initSubmissionForm(){
    this.submissionForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      commentsforeditor: new FormControl('', [Validators.required]),
      agree: new FormControl('', [Validators.required]),
      unique: new FormControl('', [Validators.required]),
      filetype: new FormControl('', [Validators.required]),
      urlprovided: new FormControl('', [Validators.required]),
      formatted: new FormControl('', [Validators.required]),
      followsguidelines: new FormControl('', [Validators.required])
    });
  }
  initDocumentForm(){
    this.documentForm = this.fb.group({
      articlecomponent: new FormControl('', [Validators.required]),
      description: new FormControl('', ),
      author: new FormControl('', ),
      publisher: new FormControl('', ),
      source: new FormControl('', ),
      subject: new FormControl('', ),
      contributor: new FormControl('', ),
      date: new FormControl('', ),
      language: new FormControl('', ),
    });
  }
  initMetadataForm(){
    this.metadataForm = this.fb.group({
      prefix: new FormControl('', ),
      title: new FormControl('', [Validators.required]),
      subtitle: new FormControl('', ),
      abstract: new FormControl('', )
    });
  }
  initConfirmationForm(){
    this.confirmationForm = this.fb.group({
      agree: new FormControl('', [Validators.required]),
    });
  }
  initNextSteps(){
    this.nextSteps = true;
  }
  validate(){
    if(this.submissionForm.controls['title'].invalid){
      this.toastr.error('Title must Be provided!', 'Validation Error!');
    }
    else if(this.submissionForm.controls['category'].invalid){
      this.toastr.error('Category must Be provided!', 'Validation Error!');
    }
    else if(this.submissionForm.controls['commentsforeditor'].invalid){
      this.toastr.error('Comments must Be provided!', 'Validation Error!');
    }
    else if(this.submissionForm.controls['agree'].invalid){
      this.toastr.error('You must agree to the privacy policy!', 'Validation Error!');
    }
    else if(this.submissionForm.controls['unique'].value === '' || this.submissionForm.controls['unique'].value === false){
      this.toastr.error('Verify if the submission has not been previously published!', 'Validation Error!');
    }
    else if(this.submissionForm.controls['filetype'].value === '' || this.submissionForm.controls['filetype'].value === false){
      this.toastr.error('Verify provided file type!', 'Validation Error!');
    }
    else if(this.submissionForm.controls['urlprovided'].value === '' || this.submissionForm.controls['urlprovided'].value === false){
      this.toastr.error('Verify is URLs for the references have been provided', 'Validation Error!');
    }
    else if(this.submissionForm.controls['formatted'].value === '' || this.submissionForm.controls['formatted'].value === false){
      this.toastr.error('Verify if the document is formatted!', 'Validation Error!');
    }
    else if(this.submissionForm.controls['followsguidelines'].value === '' || this.submissionForm.controls['followsguidelines'].value === false){
      this.toastr.error('Verify if the document follows our guidelines!', 'Validation Error!');
    }
    else{
      this.submissionService.initsubmission({
        title: this.submissionForm.controls['title'].value,
        category: this.submissionForm.controls['category'].value,
        commentsforeditor: this.submissionForm.controls['commentsforeditor'].value,
        agree: this.submissionForm.controls['agree'].value,
        unique: this.submissionForm.controls['unique'].value,
        filetype: this.submissionForm.controls['filetype'].value,
        urlprovided: this.submissionForm.controls['urlprovided'].value,
        formatted: this.submissionForm.controls['formatted'].value,
        followsguidelines: this.submissionForm.controls['followsguidelines'].value,
        user: this.user.id,
        stage : 1,
        confirm: false,
      }).subscribe((data) => {
        this.toastr.success('Article submission initialized!', 'Success!');
        this.incomplete = data.body.data;
        this.progress = 20;
        this.initDocumentForm();
      }, (err) => {
        this.toastr.error('Could not complete submission!', 'Server Error!');
      })
    }
  }
  validateDocument(){
    if(this.documentForm.controls['articlecomponent'].invalid){
      this.toastr.error('Article component must Be provided!', 'Validation Error!');
    }
    else{
      this.incomplete.articlecomponent = this.documentForm.controls['articlecomponent'].value,
      this.incomplete.description = this.documentForm.controls['description'].value,
      this.incomplete.author = this.documentForm.controls['author'].value,
      this.incomplete.publisher = this.documentForm.controls['publisher'].value,
      this.incomplete.source = this.documentForm.controls['source'].value,
      this.incomplete.subject = this.documentForm.controls['subject'].value,
      this.incomplete.contributor = this.documentForm.controls['contributor'].value,
      this.incomplete.date = this.documentForm.controls['date'].value,
      this.incomplete.language =this.documentForm.controls['language'].value,
      this.incomplete.stage = 2;
      this.submissionService.completedocumentation(this.incomplete).subscribe((data) => {
        this.progress = 40;
        this.incomplete = data.body.data;
        this.initMetadataForm();
      }, (err) => {
        this.toastr.error('Could not process documentation stage!', 'Server Error!');
      })
    }
  }
  validateMetadata(){
    if(this.metadataForm.controls['title'].invalid){
      this.toastr.error('Title must Be provided!', 'Validation Error!');
    }
    else{
      this.incomplete.metadata = new Object();
      this.incomplete.metadata.title = this.metadataForm.controls['title'].value,
      this.incomplete.metadata.prefix = this.metadataForm.controls['prefix'].value,
      this.incomplete.metadata.subtitle = this.metadataForm.controls['subtitle'].value,
      this.incomplete.metadata.abstract = this.metadataForm.controls['abstract'].value,
      this.incomplete.stage = 3;
      this.submissionService.completedocumentation(this.incomplete).subscribe((data) => {
        this.progress = 60;
        this.incomplete = data.body.data;
        this.initConfirmationForm();
      }, (err) => {
        this.toastr.error('Could not process metadata stage!', 'Server Error!');
      })
    }
  }
  confirm(){
    if(this.confirmationForm.controls['agree'].value === "" || this.confirmationForm.controls['agree'].value === false){
      this.toastr.error('You must agree with the privacy policy to continue!', 'Validation Error!');
    }
    else{
      this.incomplete.stage = 5;
      this.incomplete.confirm = true;
      this.submissionService.confirm(this.incomplete).subscribe((data) => {
        this.progress = 100;
        this.incomplete = data.body.data;
        this.initNextSteps();
      }, (err) => {
        this.toastr.error('Could not process article confirmation!', 'Server Error!');
      })
    }
  }
  uploadDocument(file : File) {
   this.file = file;
   this.filename = file.name;
   this.uploadFileToActivity();
  }
  uploadFileToActivity() {
    this.submissionService.uploadsubmissiondoc(this.file, this.incomplete.id).subscribe(data => {
      // do something, if upload success
      this.uploaded = true;
      }, error => {
        this.toastr.error(error + ' i.e doc docx rtf and pdf', 'Format Error!');
      });
  }
  refresh(){
    this.ngOnInit();
  }
}
