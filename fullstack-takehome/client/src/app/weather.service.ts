import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { errorResults, SearchCriteria, SEARCHTERMS, successResult } from "./models";
import { firstValueFrom } from "rxjs";

@Injectable()

export class WeatherService{
    private http = inject(HttpClient)

    //for initial display
    starterList: SearchCriteria[] = SEARCHTERMS 



    search(criteria: SearchCriteria): Promise<any>{
        const params = new HttpParams()
            .set('q', criteria.q)


        return firstValueFrom(this.http.get<any>('/api/search', {params})) //returns either SearchResult or Error
            .then(result =>{
                //create successResult object to return
                const weatherData: successResult = {
                    name: result.name,
                    description: result.description,
                    temp: result.temp,
                    icon:result.icon
                }
                console.info('API success in weather service1: ', result)
                console.info('API success in weather service2: ', weatherData)
                return weatherData
            })
            .catch( err =>{ //rejects ALL non 2xx status types
                console.error('API error in weather service1: ', err)
                //when a http request fails, HttpClient throws an err object which includes the error json from controller
                //grab the actual response from backend
                if(err.error){
                    // return Promise.reject(err.error)
                    const errorData: errorResults = {
                        status: err.error.status,
                        message: err.error.message
                    }
                    console.error('API error in weather service2: ', errorData)
                    return errorData
                }
                //reject with httpclient standard error if backend messes up somehow
                return Promise.reject(err)
            })
    }



}
