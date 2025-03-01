import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DisplayComponent } from './components/display.component';
import { SearchComponent } from './components/search.component';
import { provideHttpClient } from '@angular/common/http';
import { GiphyService } from './giphy.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule
  ],
  providers: [provideHttpClient(), GiphyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
