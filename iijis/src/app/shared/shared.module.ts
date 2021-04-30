import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { HeaderComponent } from './header/header.component';
import { SharedclassesModule } from '../sharedclasses/sharedclasses.module';
import { AsideComponent } from './aside/aside.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoaderComponent, AsideComponent],
  imports: [
    CommonModule,
    SharedclassesModule
  ],
  exports: [HeaderComponent, FooterComponent, LoaderComponent, AsideComponent],
})
export class SharedModule { }
