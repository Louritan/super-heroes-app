export interface ISuperHeroShort {
  id: number;
  name: string;
  heroName: string;
  superPowers: {
    id: number;
    name: string;
  }[];
}

export interface RegisterSuperHero {
  name: string;
  heroName: string;
  superPowerIds: number[];
  birthDate: string;
  height: number;
  weight: number; 
}
