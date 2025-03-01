import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, CanDeactivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { HouseComponent } from "./components/house.component";

// control navigation with route guards, canActivate and CanDeactiacte
//ActivatedRouteSnapshot: provides information about the route being activated or deactivated
//RouterStateSnapshot: provides information about the current route state
// form: Housecomponent lets the deactivate guard interact directly with the associated component(can access methods)

//check if we can even navigate to the form
export const confirmRegistration: CanActivateFn =
(activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router)
    //returns true or false based on user choice
    //boolean, Promise<boolean>, Observable<boolean>
    if(confirm('Are you sure you want to register?'))
        return true

    //can return UrlTree, Promise<UrlTree>, Observable<UrlTree>
    //else, display number 8
    return router.parseUrl('/number/8')
}

//check if we can navigate AWAY from the form
//must say which component we are using this on
export const checkIfRegistrationIsSave: CanDeactivateFn<HouseComponent> =
(form: HouseComponent, activatedRoute:ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    if(!form.shouldSaved())
        return true //return true if form is still clean, we can navigate away from form

    //user choice true -> navigate away, else stay
    return confirm("You have not saved your form. Your data will be discarded if you navigate away from this page. Proceed?")


}