import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HighLightDirective} from '@app/directives/HighLight.directive'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HighLightDirective,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-course';
}