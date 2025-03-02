import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../weather.service';
import { SearchCriteria } from '../models';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{

  private fb = inject(FormBuilder)
  private weatherSvc = inject(WeatherService)

  protected form !: FormGroup
  
  //for display purposes
  starterList: SearchCriteria[] = []

  ngOnInit(): void {
    this.form = this.fb.group({
      q: this.fb.control<string>('', [Validators.required, Validators.minLength(1)])
    })
    this.starterList = this.weatherSvc.starterList
  }

  add(){
    //add to list, regardless if valid country or not
    const query: SearchCriteria = {q: this.form.value.q}

    console.info('query: ', query)
    this.weatherSvc.starterList.push(query)
  }




}
