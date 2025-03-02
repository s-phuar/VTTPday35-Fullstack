import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../weather.service';
import { errorResults, SearchCriteria, successResult } from '../models';

@Component({
  selector: 'app-display',
  standalone: false,
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent implements OnInit{

  private weatherSvc = inject(WeatherService)

  //grab the url data using activated route
  private activatedRoute = inject(ActivatedRoute)

  country: string = ''
  weatherData: successResult | null= null
  errorData: errorResults | null = null

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( //params should refer to country in the module path
      params => {
        this.country = params['country'] //grab url query param
      }
    )
    
    //make searchcrteria object
    const searchTerm: SearchCriteria = {
      q: this.country
    }

    //{name: 'LONDON', description: 'overcast clouds', temp: 276, icon: '04n'}
    this.weatherSvc.search(searchTerm) //returns a promise<any> could be results or error
      .then(result =>{ //result is successResult
        if(this.isSuccessResult(result)){
          this.weatherData = result
          this.errorData = null
          console.info('API success in weather component: ', this.weatherData)
          console.info('API success in weather component: ', this.errorData)
        }else{
          this.weatherData = null
          this.errorData = result
          console.info('API error in weather component: ', this.weatherData)
          console.info('API error in weather component: ', this.errorData)
        }
      })

  }

  private isSuccessResult(result: any): result is successResult {
    return result && result.name && result.description && result.temp && result.icon;
  }

  private isErrorResult(result: any): result is errorResults {
    return result && result.status && result.message;
  }




}
