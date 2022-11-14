import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { SpinnerComponent } from 'src/app/shared/cmps/spinner/spinner.component';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, SpinnerComponent]
})
export class RegisterComponent implements OnInit {

  submit: boolean = false;
  showElements = new showElements();
  validateUsernameClass: string = '';

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
    user: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20), this.usernameValidator()]),
    email: new FormControl('', [Validators.required, Validators.email], this.emailValidator()),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    repeatPassword: new FormControl('', [Validators.required]),
    terms: new FormControl('', Validators.requiredTrue)
  }, [this.passwordValidator('password', 'repeatPassword')])
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  register(){
    this.submit = true;
    this.form.markAllAsTouched();
    if(!this.form.invalid){
      let requestBody: RegisterUser = {
        username: this.form.controls.user.value,
        password: this.form.controls.password.value,
        email: this.form.controls.email.value,
        name: this.form.controls.name.value,
      }
      this.accountService.register(requestBody).subscribe({
        next: (res) => {
          this.router.navigate(['account/login']);
          this.submit = false;
        },
        error: (err) => {
          console.error(err);
          this.submit = false;
        }
      })
    }else{
      this.submit = false;
    }
  }

  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.accountService.verifyEmail(control.value).pipe(map(check => {
        return !check ? {availableEmail: true} : null;
      }))
    }
  }

  passwordValidator(password: string, repetition: string): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordControl = control.get(password);
      const repetitionControl = control.get(repetition);
      if(passwordControl && repetitionControl && passwordControl.value !== repetitionControl.value){
        this.form.controls.repeatPassword.setErrors({ mismatch: true });
        return { mismatch: true }
      }else{
        return null;
      }
    }
  }

  usernameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value.includes(' ') ? {space: true} : null;
    }
  }

  verifyUsername(){
    if(this.form.controls.user.value){
      this.showElements.verifyUsernameShow = true;
      this.showElements.verifyUsernameString = '';
      this.showElements.verifyUsernameSpinner = true;
      if(this.form.controls.user.value){
        this.accountService.verifyUsername(this.form.controls.user.value).subscribe({
          next: (res) => {
            if(res){
              this.showElements.verifyUsernameSpinner = false;
              this.showElements.verifyUsernameStatusSuccess = true;
              this.showElements.verifyUsernameString = 'Nombre de usuario disponible';
              this.validateUsernameClass = 'validation-success';
            }else{
              this.showElements.verifyUsernameSpinner = false;
              this.showElements.verifyUsernameStatusSuccess = false;
              this.showElements.verifyUsernameString = 'Nombre de usuario no disponible';
              this.validateUsernameClass = 'validation-error';
            }
          },
          error: (err) => {
            this.showElements.verifyUsernameShow = false;
            console.error(err);
          }
        })
      }
    }else{
      this.showElements.verifyUsernameShow = true;
      this.showElements.verifyUsernameString = 'Rellene el campo de usuario';
      this.validateUsernameClass = 'validation-error';
      this.showElements.verifyUsernameStatusSuccess = false;
    }
  }
}

class showElements {
  verifyUsernameShow: boolean = true;
  verifyUsernameString: string = '';
  verifyUsernameSpinner: boolean = false;
  verifyUsernameStatusSuccess: boolean = true;
}

export interface RegisterUser {
  username: string | null;
  password: string | null;
  email: string | null;
  name: string | null;
}