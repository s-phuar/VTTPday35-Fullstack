import { Component, inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegistrationDetails} from '../models';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  private fb = inject(FormBuilder)

  private resigsterSvc = inject(RegistrationService)
  private router = inject(Router)

  protected form!: FormGroup

  ngOnInit(): void {

    this.form = this.fb.group({
      name: this.fb.control<string>('', [ Validators.required ]),
      email: this.fb.control<string>('', [ Validators.required, Validators.email ]),
    })
  }

  protected register() {
    const details: RegistrationDetails = this.form.value
    console.info('>>> value: ', details)
    this.resigsterSvc.register(details)
      .then(result => {
        this.router.navigate(['/confirm', result.regId])  //send results of call to spring to registered component
      }

      )
  }

}
