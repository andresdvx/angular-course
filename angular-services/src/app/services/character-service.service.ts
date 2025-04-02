import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { Character } from '../models/index';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl: string = 'https://rickandmortyapi.com/api/character';
  private http = inject(HttpClient);
  protected state = signal({
    characters: new Map<number, Character>(),
  });

  constructor() {
    this.getCharacteres();
  }

  getCharacterById(id: number) {
    return this.state().characters.get(id);
  }

  getFormatedCharacteres() {
    return Array.from(this.state().characters.values());
  }

  getCharacteres() {
    const mockedCharacters = [
      { id: 1, name: 'Rick', lastName: 'Sanchez', age: 70 },
      { id: 2, name: 'Morty', lastName: 'Smith', age: 14 },
      { id: 3, name: 'Summer', lastName: 'Smith', age: 17 },
      { id: 4, name: 'Beth', lastName: 'Smith', age: 34 },
      { id: 5, name: 'Jerry', lastName: 'Smith', age: 35 },
      { id: 6, name: 'Mr. Meeseeks', lastName: '', age: 0 },
    ];

    of(mockedCharacters).subscribe((result) => {
      result.forEach((character) =>
        this.state().characters.set(character.id, character)
      );
      this.state.set({ characters: this.state().characters });
    });
  }

  updateCharacter(character: Character) {
    const updatedCharacter = { ...character };
    of(updatedCharacter).subscribe((result) => {
      this.state.update((state) => {
        state.characters.set(character.id, character);
        return { characters: state.characters };
      });
    });
  }

  deleteCharacter(id: number): void {
    of({ status: 200 }).subscribe(() => {
      this.state.update((state) => {
        state.characters.delete(id);
        return { characters: state.characters };
      });
    });
  }
}
