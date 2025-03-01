import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-number',
  standalone: false,
  templateUrl: './number.component.html',
  styleUrl: './number.component.css'
})
export class NumberComponent implements OnInit, OnDestroy{
  
  //path variables
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private title = inject(Title) //sets tab title

  protected numImg = ''
  protected num = ''
  protected subParams !:Subscription
  protected subQuery !:Subscription


  ngOnInit(): void {
    this.subParams = this.activatedRoute.params.subscribe(
      params => {
      console.info('>>> params: ', params)
      this.num = params['num'] //the var name 'num' is created in app.module.ts
      this.numImg = `/number/number${this.num}.jpg`
      console.info('>>> queryParams1: ', this.activatedRoute.snapshot.queryParams['size']) //snapshot
      this.title.setTitle(`Number: ${this.num}`)
    })
    this.subQuery = this.activatedRoute.queryParams.subscribe(
      params => {
        console.info('>>> queryParams2 ', params)
      }
    )
  }

  ngOnDestroy(): void {
    console.info('unsubscribing...')
    this.subParams.unsubscribe()
  }

}

