import { Component } from '@angular/core';
import { DeferComponent } from './defer/defer.component';
import { LoadingComponent } from './loading/loading.component';

@Component({
  selector: 'app-root',
  imports: [DeferComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-control-flow-syntax';
}
