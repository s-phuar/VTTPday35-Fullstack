import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-house',
  standalone: false,
  templateUrl: './house.component.html',
  styleUrl: './house.component.css'
})
export class HouseComponent {

  private fb = inject(FormBuilder)
  private router = inject(Router)

  protected form!: FormGroup

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control<string>(''),
      email: this.fb.control<string>(''),
    })
  }

  shouldSaved(): boolean{
    return this.form.dirty //save if dirty
  }



  process() {
    const value = this.form.value
    console.info('>>> value: ', value)
    this.form.reset()
    this.router.navigate(['/'])
  }

}
