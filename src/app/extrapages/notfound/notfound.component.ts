import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';

@Component({
  standalone: true,
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
  imports: [RouterModule]
})
export class NotfoundComponent implements OnInit {

  randomNumber: number = 0;

  constructor(
    private baseService: BaseService,
    private router: Router) { }

  ngOnInit(): void {
    this.getRandomSequence();
  }

  getRandomSequence() {
    this.baseService.getCurrentSeq().subscribe({
      next: (seq) => {
        this.randomNumber = this.getRandomInt(seq);
      }
    })
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

}
