import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GiphyService } from '../giphy.service';
import { SearchCriteria } from '../models';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  private fb = inject(FormBuilder)
  private giphySvc =  inject(GiphyService)

  protected searchForm !: FormGroup
  protected resultsCount = 5

  ngOnInit(): void {
    this.searchForm = this.createSearchForm()
  }

  //starts service search, url array emittedto serachResult, not here
  protected search(){ 
    const criteria: SearchCriteria = this.searchForm.value
    console.info('>>> criteria: ', criteria)
    this.giphySvc.search(criteria)
      .then( result => {
        console.info('>>> search result: ', result)
      })
  }


  protected clear(){
    this.searchForm = this.createSearchForm()
    this.giphySvc.clearResults()
  }

  limitUpdated($event:any){
    this.resultsCount = parseInt($event.target.value)
  }


  private createSearchForm():FormGroup{
    return this.fb.group({
      q: this.fb.control<string>('', [Validators.required, Validators.minLength(1)]),
      limit: this.fb.control<number>(5, [Validators.min(1), Validators.max(25)]),
      rating: this.fb.control<string>('pg', [Validators.required])
    })
  }



}
