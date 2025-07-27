import { Component, OnInit } from '@angular/core';
import { SuperHeroesService } from '../../services/super-heroes.service';
import { RegisterSuperHero } from '../../types/super-hero';
import { SuperPowersService } from '../../services/super-powers.service';
import { ISuperPower } from '../../types/super-power';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { format, isAfter, isValid } from 'date-fns';
import { Loading } from '../loading/loading';
import { SweetAlert } from '../../lib/swal';

@Component({
  selector: 'app-hero-form',
  imports: [NgSelectModule, FormsModule, Loading],
  templateUrl: './hero-form.html',
  styleUrl: './hero-form.css'
})
export class HeroForm implements OnInit {
  constructor(
    private superHeroesService: SuperHeroesService,
    private superPowersService: SuperPowersService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) { }

  superHero: RegisterSuperHero = {
    name: '',
    heroName: '',
    superPowerIds: [],
    birthDate: '',
    height: 0,
    weight: 0
  };

  heroId: number | null = null;
  superPowers: ISuperPower[] = [];
  loading: number = 0;
  submitting: boolean = false;

  ngOnInit(): void {
    this.getSuperPowers();

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.heroId = Number(id);
      this.getSuperHero(this.heroId);
    }
  }

  getSuperPowers() {
    this.loading++;
    this.superPowersService.getSuperPowers().subscribe({
      next: (response) => {
        if (response) {
          this.superPowers = response.superPowers;
        }
        this.loading--;
      },
      error: (_error) => {
        this.loading--;
        this.toastr.error('Falha ao carregar super poderes!');
      },
    });
  }

  getSuperHero(id: number) {
    this.loading++;
    this.superHeroesService.getSuperHero(id).subscribe({
      next: (response) => {
        this.superHero = {
          ...response,
          superPowerIds: response.superPowers.map(superPower => superPower.id),
          birthDate: format(new Date(response.birthDate), 'yyyy-MM-dd'),
        };
        this.loading--;
      },
      error: (error) => {
        this.loading--;
        
        if (error.error.errorMessages) {
          const html = error.error.errorMessages.join('<br>');
          this.toastr.error(html, 'Erro', { enableHtml: true });
          return;
        }

        this.toastr.error('Falha ao carregar super-herói');
      },
    })
  }

  postSuperHero() {
    this.submitting = true;
    this.superHeroesService.postSuperHero({
      ...this.superHero,
      birthDate: new Date(this.superHero.birthDate).toISOString(),
    }).subscribe({
      next: (_response) => {
        this.superHero = {
          name: '',
          heroName: '',
          superPowerIds: [],
          birthDate: '',
          height: 0,
          weight: 0
        };
        this.submitting = false;
        this.toastr.success('Super-herói cadastrado com sucesso!');
      },
      error: (error) => {
        this.submitting = false;

        if (error.error.errorMessages) {
          const html = error.error.errorMessages.join('<br>');
          this.toastr.error(html, 'Erro', { enableHtml: true });
          return;
        }

        this.toastr.error('Falha ao cadastrar super-herói');
      },
    });
  }

  putSuperHero(id: number) {
    this.submitting = true;
    this.superHeroesService.putSuperHero(id, {
      ...this.superHero,
      birthDate: new Date(this.superHero.birthDate).toISOString(),
    }).subscribe({
      next: (_response) => {
        this.submitting = false;
        this.toastr.success('Super-herói atualizado com sucesso!');
      },
      error: (error) => {
        this.submitting = false;

        if (error.error.errorMessages) {
          const html = error.error.errorMessages.join('<br>');
          this.toastr.error(html, 'Erro', { enableHtml: true });
          return;
        }

        this.toastr.error('Falha ao atualizar super-herói');
      },
    });
  }

  handleSubmit() {
    let errors: string[] = [];
    
    if (!this.superHero.name) {
      errors.push('O super-herói precisa de um nome.');
    }

    if (!this.superHero.heroName) {
      errors.push('O super-herói precisa de um nome de herói.');
    }

    if (!this.superHero.superPowerIds.length) {
      errors.push('O super-herói precisa de pelo menos um poder.');
    }

    if (
      !this.superHero.birthDate ||
      !isValid(new Date(this.superHero.birthDate)) ||
      isAfter(new Date(this.superHero.birthDate), new Date())
    ) {
      errors.push('O super-herói precisa de uma data de nascimento válida.');
    }

    if (this.superHero.height <= 0) {
      errors.push('O super-herói precisa de uma altura válida.');
    }

    if (this.superHero.weight <= 0) {
      errors.push('O super-herói precisa de um peso válido.');
    }

    if (errors.length) {
      SweetAlert({
        title: 'Falha ao cadastrar super-herói',
        html: errors.map(e => `• ${e}`).join('<br>'),
        icon: 'error',
      });
      return;
    }

    if (this.heroId) {
      this.putSuperHero(this.heroId);
    } else {
      this.postSuperHero();
    }
  }

  goBack() {
    window.history.back();
  }
}
