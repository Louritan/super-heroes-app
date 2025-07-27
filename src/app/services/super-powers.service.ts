import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISuperPower, RegisterSuperPower } from '../types/super-power';

@Injectable({
  providedIn: 'root'
})
export class SuperPowersService {
  private endpoint = 'https://localhost:7209/api/superpowers';

  constructor(private http: HttpClient) { }

  postSuperPower(superPower: RegisterSuperPower) {
    return this.http.post<{ id: number }>(`${this.endpoint}`, superPower);
  }

  getSuperPowers() {
    return this.http.get<{ superPowers: ISuperPower[] }>(`${this.endpoint}`);
  }
}
