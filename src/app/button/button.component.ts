import { Component, OnInit } from '@angular/core';
import { RandomNumberService } from '../number-service/random-number.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  num: number | undefined;

  constructor(private numService: RandomNumberService) { }

  ngOnInit(): void {
  }

  getNumber() {
    this.num = this.numService.getNumberInstantly();
  }

  getNumberObservable() {
    this.numService.getNumberObservable().subscribe(newNum => {
      this.num = newNum;
    });
  }
}
