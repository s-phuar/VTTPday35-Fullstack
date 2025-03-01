import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GiphyService } from '../giphy.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display',
  standalone: false,
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent implements OnInit, OnDestroy{

  private giphySvc = inject(GiphyService)

  private sub !: Subscription

  images: string[] = []
   
  ngOnInit(): void {
    this.sub = this.giphySvc.searchResults.subscribe({
      next: (images) => this.images = images
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }



}
