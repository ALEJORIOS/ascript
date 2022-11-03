import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { alertMethods, AlertsComponent } from 'src/app/shared/cmps/alerts/alerts.component';
import { SpinnerComponent } from 'src/app/shared/cmps/spinner/spinner.component';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule, AlertsComponent, SpinnerComponent]
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    user: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  submit: boolean = false;
  alert = new alertMethods();
  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit(): void {
  }

  login(){
    this.submit = true;
    this.form.markAllAsTouched();
    this.alert.hide()
    if(!this.form.invalid){
      this.accountService.login(this.form.controls.user.value || '', this.form.controls.password.value || '')
      .subscribe({
        next: (res) => {
          console.log(res);
          console.log(typeof res);
          if(typeof res === 'number'){
            this.defineStatus(res);
          }else{

          }
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.submit = false;
        }
      })
    }else{
      this.submit = false;
    }
  }

  defineStatus(res: number){
    if(res === 2){
      this.alert.set('error', 'Este usuario se encuentra bloqueado');
      return;
    }else if(res === 0){
      this.alert.set('warning', 'Contraseña incorrecta, verifique nuevamente los datos');
      return;
    }else if(res === -1){
      this.alert.set('error', 'Este usuario no existe, verifique nuevamente los datos');
      return;
    }
  }
}