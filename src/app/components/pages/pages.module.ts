import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { NavigationComponent } from './navigation/navigation.component';
import { ReusableModule } from '../reusable/reusable.module';
import { PagesComponent } from './pages.component';
import { PersonComponent } from './person/person.component';
import { DialogPersonComponent } from './modals/dialog-person/dialog-person.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from 'src/app/interceptors/interceptor.service';
import { DialogDeletePersonComponent } from './modals/dialog-delete-person/dialog-delete-person.component';


@NgModule({
  declarations: [
    PagesComponent,
    NavigationComponent,
    PersonComponent,
    DialogPersonComponent,
    DialogDeletePersonComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReusableModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: InterceptorService,
      multi: true
    }
  ]
  
})
export class PagesModule { }
