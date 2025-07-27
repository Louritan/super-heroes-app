import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISuperHero, ISuperHeroShort, RegisterSuperHero } from '../types/super-hero';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroesService {
  private endpoint = `${environment.API_URL}/superheroes`;

  constructor(private http: HttpClient) { }

  getSuperHeroes() {
    return this.http.get<{ superHeroes: ISuperHeroShort[] } | null>(`${this.endpoint}`);
  }

  getSuperHero(id: number) {
    return this.http.get<ISuperHero>(`${this.endpoint}/${id}`);
  }

  postSuperHero(superHero: RegisterSuperHero) {
    return this.http.post<{ id: number }>(`${this.endpoint}`, superHero);
  }

  putSuperHero(id: number, superHero: RegisterSuperHero) {
    return this.http.put(`${this.endpoint}/${id}`, superHero);
  }

  deleteSuperHero(id: number) {
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}
