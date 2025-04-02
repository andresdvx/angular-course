import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterService } from './services/index';
import { Character } from './models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'angular-services';
  protected characterService = inject(CharacterService);
  protected characters: Signal<Character[] | undefined> = computed(() =>
    this.characterService.getFormatedCharacteres()
  );
}
