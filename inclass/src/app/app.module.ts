import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DogComponent } from './components/dog.component';
import { PolarComponent } from './components/polar.component';
import { RouterModule, Routes } from '@angular/router';
import { HouseComponent } from './components/house.component';
import { NumberComponent } from './components/number.component';
import { ReactiveFormsModule } from '@angular/forms';
import { checkIfRegistrationIsSave, confirmRegistration } from './guards';

//new, set any custom path name
const appRoutes: Routes = [
  {path: '', component: PolarComponent},
  {path: 'dog', component: DogComponent},
  {path: 'register', component: HouseComponent,
    canActivate:[confirmRegistration],
    canDeactivate:[checkIfRegistrationIsSave]},
  {path: 'number/:num', component: NumberComponent}, //path variables numbers
  {path: '**', redirectTo: '/', pathMatch:'full'} //wildcard
]

@NgModule({
  declarations: [AppComponent, DogComponent, PolarComponent, HouseComponent, NumberComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes) //new
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
