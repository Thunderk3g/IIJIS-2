import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout.component';
import { SharedclassesModule } from '../sharedclasses/sharedclasses.module';
import { AuthenticationService } from '../services/authentication.service';
import { LogoutRoutingModule } from './logout-routing.module';



@NgModule({
  declarations: [LogoutComponent],
  imports: [
    CommonModule,
    SharedclassesModule,
    LogoutRoutingModule
  ],
  exports: [LogoutComponent]
})
export class LogoutModule { }
