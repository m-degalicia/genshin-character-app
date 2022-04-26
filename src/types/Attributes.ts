import { ElementsList, RarityList, NationsList, WeaponsList } from 'constants/index.js';

export type Element = typeof ElementsList[number];
export type Weapon = typeof WeaponsList[number];
export type Nation = typeof NationsList[number];
export type Rarity = typeof RarityList[number];
