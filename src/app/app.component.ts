import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  
  constructor(){
    this.changeTheme();
    if(!localStorage.getItem('theme')){
      let currentTheme: string;
      if(!window.matchMedia){
        localStorage.setItem('theme', 'light');
      }else{
        currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
      }
    }

  }

  changeTheme(){
    window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => { 
      localStorage.getItem('theme') === "dark" ? localStorage.setItem('theme','light') : localStorage.setItem('theme','dark') 
    })
  }
}
