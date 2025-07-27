import { Component, OnInit } from '@angular/core';
import { SuperHeroesService } from '../../services/super-heroes.service';
import { RegisterSuperHero } from '../../types/super-hero';
import { SuperPowersService } from '../../services/super-powers.service';
import { ISuperPower } from '../../types/super-power';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-hero',
  imports: [NgSelectModule, FormsModule],
  templateUrl: './new-hero.html',
  styleUrl: './new-hero.css'
})
export class NewHero implements OnInit {
  constructor(
    private superHeroesService: SuperHeroesService,
    private superPowersService: SuperPowersService,
    private toastr: ToastrService,
  ) { }

  superHero: RegisterSuperHero = {
    name: '',
    heroName: '',
    superPowerIds: [],
    birthDate: '',
    height: 0,
    weight: 0
  };

  superPowers: ISuperPower[] = [];

  ngOnInit(): void {
    this.getSuperPowers();
  }

  getSuperPowers() {
    this.superPowersService.getSuperPowers().subscribe({
      next: (response) => {
        this.superPowers = response.superPowers;
      },
      error: (error) => {
        this.toastr.error('Falha ao carregar super poderes!');
      },
    });
  }

  postSuperHero() {
    this.superHeroesService.postSuperHero({
      ...this.superHero,
      birthDate: new Date(this.superHero.birthDate).toISOString(),
    }).subscribe({
      next: (_response) => {
        this.toastr.success('Super-herói cadastrado com sucesso!');
      },
      error: (error) => {
        this.toastr.error('Falha ao cadastrar super-herói');
      },
    });
  }

  goBack() {
    window.history.back();
  }
}
