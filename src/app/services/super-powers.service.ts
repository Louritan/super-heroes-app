import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISuperPower, RegisterSuperPower } from '../types/super-power';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuperPowersService {
  private endpoint = `${environment.API_URL}/superpowers`;

  constructor(private http: HttpClient) { }

  postSuperPower(superPower: RegisterSuperPower) {
    return this.http.post<{ id: number }>(`${this.endpoint}`, superPower);
  }

  getSuperPowers() {
    return this.http.get<{ superPowers: ISuperPower[] } | null>(`${this.endpoint}`);
  }
}
