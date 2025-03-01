import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {

  //route internally
  private router = inject(Router)

  private currNum = '5'

  //for number dragdown
  numberChanged($event:any){
    this.currNum = $event.target.value
    this.router.navigate(['/number', this.currNum], {queryParams:{size: 'small'}})
    console.info('>>>>currNum: ', this.currNum)
  }

  //for number path variable
  showNumber(){
    this.router.navigate(['/number', this.currNum], {queryParams:{size: 'BIGNUM'}})
  }

  //for form button
  showHouse(){
    this.router.navigate(['/register']) //navigation path
  } 

}


// previously, we had multiple components on a single page, but what if we want to display component of our choice instead?
// lets use routerLink to show our chosen component
// 1. make the front page to offer choice of component to display + setup routeLink to match app.module.ts
// 2. setup app.module.ts appRoutes and imports, create path and attach associated components
// 2.5 path variable navgiation routes can be created in parent ts, params for path variable are created in app.module.ts
// 2.5 activated routes grab the path variables params
// 3. route guard for form