import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Character } from '../models/index';
import { map, Observable } from 'rxjs';
import { characterAdapter } from '../adapters';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl: string = 'https://rickandmortyapi.com/api/character';
  private http = inject(HttpClient);

  getCharacteres(): Observable<Character[]> {
    return this.http
      .get<Character[]>(this.apiUrl)
      .pipe(map((characteres) => characterAdapter(characteres)));
  }

  updateCharacter(character: Character): Observable<Character> {
    return this.http.put<Character>(
      `${this.apiUrl}/${character.id}`,
      character
    );
  }

  deleteCharacter(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
