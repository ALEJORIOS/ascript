import { Injectable } from '@angular/core';
import { map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor() { }

  prepareObject(inputObject: Array<any>): Array<any> {
    inputObject.forEach(obj => obj.thumbnail = {
      "background-image": `url(${obj.image.url})`,
      "background-repeat": "no-repeat",
      "background-size": "cover",
    });
    return inputObject;
  }
}