import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class RegisterComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    user: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    repeatPassword: new FormControl('', Validators.required),
    terms: new FormControl('', Validators.requiredTrue)
  })
  constructor() { }

  ngOnInit(): void {
  }

  register(){
    console.log(this.form);
    if(!this.form.invalid){
      
    }else{
      return;
    }
  }

}
