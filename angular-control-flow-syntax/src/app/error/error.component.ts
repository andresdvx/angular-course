import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent implements OnInit{
  protected contentIsReady: boolean = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.contentIsReady = true;
    }, 10000)

  }
}
