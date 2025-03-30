import { Component } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { SwitchComponent } from './switch/switch.component';
import { AdvancedDeferComponent } from './advanced-defer/advanced-defer.component';

@Component({
  selector: 'app-root',
  imports: [ AdvancedDeferComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-control-flow-syntax';
}
