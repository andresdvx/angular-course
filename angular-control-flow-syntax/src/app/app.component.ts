import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IfComponent } from './if/if.component';
import { ForComponent } from './for/for.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, IfComponent, ForComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-control-flow-syntax';
}
