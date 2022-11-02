import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    user: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit(): void {

  }

  login(){
    this.accountService.login(this.form.controls.user.value || '', this.form.controls.password.value || '');
  }
}