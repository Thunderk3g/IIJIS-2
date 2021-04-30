import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedclassesModule } from '../sharedclasses/sharedclasses.module';
import { SharedModule } from '../shared/shared.module';
import { CurrentModule } from '../current/current.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    HomeRoutingModule,
    SharedclassesModule,
    SharedModule,
    CurrentModule
  ]
})
export class HomeModule { }
