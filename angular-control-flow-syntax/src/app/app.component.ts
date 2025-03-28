import { Component } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';

@Component({
  selector: 'app-root',
  imports: [ LoadingComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-control-flow-syntax';
}
