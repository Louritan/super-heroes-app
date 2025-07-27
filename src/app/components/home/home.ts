import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, Users, Zap } from 'lucide-angular';
import { MetricsService } from '../../services/metrics.service';
import { ToastrService } from 'ngx-toastr';
import { Loading } from '../loading/loading';

@Component({
  selector: 'app-home',
  imports: [LucideAngularModule, Loading],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  readonly Users = Users;
  readonly Zap = Zap;

  constructor(
    private metricsService: MetricsService,
    private toastr: ToastrService,
  ) { }

  totalHeroes: number = 0;
  totalPowers: number = 0;
  loading: boolean = true;

  ngOnInit(): void {
    this.getMetrics();
  }

  getMetrics() {
    this.metricsService.getMetrics().subscribe({
      next: (response) => {
        this.totalHeroes = response.totalHeroes;
        this.totalPowers = response.totalPowers;
        this.loading = false;
      },
      error: (_error) => {
        this.loading = false;
        this.toastr.error('Falha ao carregar métricas!');
      }
    });
  }
}
