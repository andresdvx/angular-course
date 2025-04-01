import { Character } from '../models';

export const characterAdapter = (characteres: Character[]) =>
  characteres.map((c) => ({ ...c, name: c.name.toUpperCase() }));
