import type { Element, Weapon, Nation, Rarity } from './Attributes';

type Character = {
  id: number;
  name: string;
  vision: Element;
  weapon: Weapon;
  nation: Nation;
  affiliation: string;
  rarity: Rarity;

}

export default Character;
