import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  private endpoint = `${environment.API_URL}/metrics`;

  constructor(private http: HttpClient) { }

  getMetrics() {
    return this.http.get<{ totalHeroes: number; totalPowers: number; }>(`${this.endpoint}`);
  }
}
