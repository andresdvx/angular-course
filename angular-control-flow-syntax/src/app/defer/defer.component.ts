import { Component } from '@angular/core';

@Component({
  selector: 'app-defer',
  imports: [],
  templateUrl: './defer.component.html',
  styleUrl: './defer.component.scss'
})
export class DeferComponent {
  protected isImageVisible: boolean = false;
  protected isImageVisibleWithDelay: boolean = false;
  protected isImageVisibleLoading: boolean = false;

  showImage(){
    this.isImageVisible = true;
  }

  showImageWithDelay(){
    setTimeout(() => {
      this.isImageVisibleWithDelay = true;
    }, 2000);
  }
}
