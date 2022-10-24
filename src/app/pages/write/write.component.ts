import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss'],
  imports: [
    CommonModule,
    FormsModule
  ],
  encapsulation: ViewEncapsulation.None
})
export class WriteComponent implements OnInit {

  constructor() { }

  comandos: any = {
    title: {
      regex: new RegExp('(?<=[^-_]|^)\@[^-_](.*?)\@', 'gim'),
      class: ["title"],
      size: 1
    },
    subtitle: {
      regex: new RegExp('(?<=[^-_]|^)\@-(.*?)-\@', 'gim'),
      class: ["subtitle"],
      size: 2
    },
    subtitle2: {
      regex: new RegExp('(?<=[^-_]|^)\@_(.*?)_\@', 'gim'),
      class: ["subtitle2"],
      size: 2
    }
  }

  textContent: string = "";
  
  ngOnInit(): void {
  }

  compiler(): string {
    let compilado: string = this.textContent;
    compilado = this.removeHTML();
    compilado = this.replaceChar();
    compilado = this.insertBreakline(compilado);
    console.log(compilado);
    return compilado;
  }

  removeHTML(){
    return this.textContent.replaceAll('<','&#60').replaceAll('>','&#62');
  }

  replaceChar(){
    let processed = this.textContent;
    Object.keys(this.comandos).forEach(cmd => {
      let coincidences = this.textContent.match(this.comandos[cmd].regex);
      coincidences?.forEach(match => {
        processed = processed.replace(match,`<span class="${this.comandos[cmd].class}">${match.substring(this.comandos[cmd].size, match.length-this.comandos[cmd].size)}</span>`)
      })
    });
    return processed;
  }

  insertBreakline(compiled: string){
    return compiled.replaceAll(/\n/gim,'<br>');
  }

  count(array: Array<any>, elem: any){
    return array.filter(x => x===elem).length;
  }
}