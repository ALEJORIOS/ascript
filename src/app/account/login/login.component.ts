import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';

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
  constructor(private router: Router, private baseService: BaseService) { }

  ngOnInit(): void {

  }

  login(){

  }
}

