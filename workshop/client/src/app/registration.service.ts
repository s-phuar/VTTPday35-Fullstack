import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ConfirmRegistration, RegistrationDetails } from "./models";
import { firstValueFrom } from "rxjs";

//@Service
@Injectable()
export class RegistrationService{
    //HTTP client
    private http = inject(HttpClient)

    register(details: RegistrationDetails): Promise<ConfirmRegistration>{
        //post
        return firstValueFrom(
            // register path will attempt to go to lcalhost:4200
            // during development we want to ridirect all angular requests to springboot (8080)
            // setup a proxy file -> only for development and restcalls to springboot api (not calls to external api)
            // also update angular.json and add options below 'serve:builder'
            this.http.post<ConfirmRegistration>('/api/register', details) //'' is our path, 

        )

    }


}