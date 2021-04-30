import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SharedclassesModule } from '../sharedclasses/sharedclasses.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsRoutingModule } from './settings-routing.module';



@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SharedclassesModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule
  ],
  exports: [SettingsComponent]
})
export class SettingsModule { }
