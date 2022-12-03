import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor() { }
  rightClickSubject = new BehaviorSubject({name: "", coords: {x: 0, y: 0}, data: {}});

  prepareObject(inputObject: Array<any>): Array<any> {
    inputObject.forEach(obj => obj.thumbnail = {
      "background-image": `url(${obj.image.url})`,
      "background-repeat": "no-repeat",
      "background-size": "cover",
    });
    return inputObject;
  }

}

