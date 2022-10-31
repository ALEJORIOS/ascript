import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, finalize } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showLayout: boolean = false;
  exceptLayouts = ['/account/login', '/account/register', 'account/forgot']
  currentRoute: string = '/';
  constructor(private router: Router){
    this.getCurrentPage();
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

  getCurrentPage(){
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe({
      next: (event: any) =>{
        this.currentRoute = event.url;
        if(!this.exceptLayouts.includes(this.currentRoute)){
          this.showLayout = true;
        } else {
          this.showLayout = false;
        };
      },
      error: (err: any) => console.error(err)
    })
  }
}
