import { ISuperPower } from "./super-power";

export interface ISuperHeroShort {
  id: number;
  name: string;
  heroName: string;
  superPowers: ISuperPower[];
}

export interface RegisterSuperHero {
  name: string;
  heroName: string;
  superPowerIds: number[];
  birthDate: string;
  height: number;
  weight: number; 
}

export interface ISuperHero {
  id: number;
  name: string;
  heroName: string;
  birthDate: string;
  height: number;
  weight: number;
  superPowers: ISuperPower[];
}
