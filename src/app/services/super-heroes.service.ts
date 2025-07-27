import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISuperHeroShort, RegisterSuperHero } from '../types/super-hero';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroesService {
  private endpoint = 'https://localhost:7209/api/superheroes';

  constructor(private http: HttpClient) { }

  getSuperHeroes() {
    return this.http.get<{ superHeroes: ISuperHeroShort[] }>(`${this.endpoint}`);
  }

  postSuperHero(superHero: RegisterSuperHero) {
    return this.http.post<{ id: number }>(`${this.endpoint}`, superHero);
  }
}
