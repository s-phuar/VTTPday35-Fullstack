import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { SearchCriteria, SearchResults } from "./models";
import { firstValueFrom, Observable } from "rxjs";

@Injectable()

export class BGGService{
    private http = inject(HttpClient)

    //variation 1
    searchAsObservable(criteria: SearchCriteria): Observable<SearchResults[]>{
        const params = new HttpParams()
            .set('q', criteria.q)
            .set('count', criteria.count)

        return (this.http.get<SearchResults[]>('/api/search', {params})
        )
    }

    //variation 2
    search(criteria: SearchCriteria): Promise<SearchResults[]>{
        const params = new HttpParams()
            .set('q', criteria.q)
            .set('count', criteria.count)

        return firstValueFrom(
            this.http.get<SearchResults[]>('/api/search', {params})
        )
    }


}



