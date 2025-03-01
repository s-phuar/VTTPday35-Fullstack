import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-polar',
  standalone: false,
  templateUrl: './polar.component.html',
  styleUrl: './polar.component.css'
})
export class PolarComponent implements OnInit{

  private title = inject(Title)
  private metadata = inject(Meta) //no purpose except demonstration


  ngOnInit(): void {
    this.title.setTitle('Home')
    // this.metadata
  }


}
