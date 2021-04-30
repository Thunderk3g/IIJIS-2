import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './home/home.module';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { SharedModule } from './shared/shared.module';
import { config } from 'src/config/config';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { Urlnterceptor } from './interceptors/urlnterceptor.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { AdminModule } from './admin/admin.module';
import { SharedclassesModule } from './sharedclasses/sharedclasses.module';
import { SessionService } from './services/session.service';
import { AuthenticationService } from './services/authentication.service';
import { LogoutModule } from './logout/logout.module';
import { SubmissionModule } from './submission/submission.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { ReleasesModule } from './releases/releases.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    LoadingBarRouterModule,
    LoadingBarHttpClientModule,
    SharedModule,
    SharedclassesModule,
    NgxScrollTopModule,
    ToastrModule.forRoot(),
    LoginModule,
    RegisterModule,
    AdminModule,
    LogoutModule,
    SubmissionModule,
    SubmissionsModule,
    ReleasesModule
  ],
  providers: [
    config ,
    SessionService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: Urlnterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
