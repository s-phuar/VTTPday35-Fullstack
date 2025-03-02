import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form.component';
import { DisplayComponent } from './components/display.component';
import { provideHttpClient } from '@angular/common/http';
import { WeatherService } from './weather.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {path:'', component: FormComponent},
  {path:'weather/:country', component:DisplayComponent},
  {path:'**', redirectTo: '/', pathMatch:'full'}
] 


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [provideHttpClient(), WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
