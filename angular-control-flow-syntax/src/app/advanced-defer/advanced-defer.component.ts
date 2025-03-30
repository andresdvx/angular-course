import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-advanced-defer',
  imports: [NgFor],
  templateUrl: './advanced-defer.component.html',
  styleUrl: './advanced-defer.component.scss'
})
export class AdvancedDeferComponent {
  protected dataReady: boolean = false;
}
