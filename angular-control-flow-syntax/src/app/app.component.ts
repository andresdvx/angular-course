import { Component } from '@angular/core';
import { ErrorComponent } from './error/error.component';

@Component({
  selector: 'app-root',
  imports: [ ErrorComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-control-flow-syntax';
}
