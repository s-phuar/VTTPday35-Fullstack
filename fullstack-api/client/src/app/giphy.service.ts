import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom, Subject } from "rxjs";
import { SearchCriteria } from "./models";

@Injectable()
export class GiphyService{

    private http = inject(HttpClient)

    searchResults = new Subject<string []>()

    clearResults(){
        this.searchResults.next([])
    }

    search(criteria: SearchCriteria): Promise<string[]>{
        const params = new HttpParams()
            .set('q', criteria.q.replace(' ', '+'))
            .set('limit', criteria.limit)
            .set('rating', criteria.rating)


        return firstValueFrom<string[]>(this.http.get<string[]>('http://localhost:8080/api/search', {params}))
            .then(result => {
                this.searchResults.next(result) //springboot returns [] of urls, result is already a string[] ** for subject **
                return result //search method returns promise<result[]>, while above line emits result to subject observable ** for method **
            })


    }



}