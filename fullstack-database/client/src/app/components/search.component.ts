import { Component, inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BGGService } from '../bgg.service';
import { SearchCriteria, SearchResults } from '../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  private fb = inject(FormBuilder)
  private bggSvc = inject(BGGService)

  protected form!: FormGroup
  // protected results: SearchResults[] = []
  
  // protected results$ !:Promise<SearchResults[]>
  //if var is promise or obseravble, put a $ sign
  protected results$ !:Observable<SearchResults[]>


  ngOnInit(): void {
    this.form = this.fb.group({
      q: this.fb.control<string>('', [ Validators.required ])
    })
  }

  search() {
    const q = this.form.value.q
    console.info('>>>> q: ', q)

    //results -> Promise or Observable
    // this.bggSvc.search({q, count: 10} as SearchCriteria) //hardcoded number of results

    // this.bggSvc.search({q, count: 10} as SearchCriteria) //hardcoded number of results
    //   .then(results =>{
    //     console.info('>>>results', results)
    //     this.results = results
    //   })

    this.results$ = this.bggSvc.searchAsObservable({q, count: 10} as SearchCriteria) //hardcoded number of results


  }

}
