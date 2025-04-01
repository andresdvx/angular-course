import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Character } from './models/character.model';
import { CharacterService } from './services/index';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-services';
  protected characters: Character[] = [];
  protected characterService = inject(CharacterService);

  constructor() {
    this.characterService
      .getCharacteres()
      .subscribe((character) => (this.characters = character));
  }
}
