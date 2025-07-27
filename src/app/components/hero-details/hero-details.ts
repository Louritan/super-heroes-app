import { Component } from '@angular/core';
import { SuperHeroesService } from '../../services/super-heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ISuperHero } from '../../types/super-hero';
import { ToastrService } from 'ngx-toastr';
import { Loading } from '../loading/loading';
import { Tooltip } from '../tooltip/tooltip';
import { differenceInYears, format } from 'date-fns';
import { LucideAngularModule, Shield, Users, Ruler, Weight, Calendar, Edit, Trash2 } from 'lucide-angular';
import { SweetAlert } from '../../lib/swal';

@Component({
  selector: 'app-hero-details',
  imports: [Loading, Tooltip, LucideAngularModule],
  templateUrl: './hero-details.html',
  styleUrl: './hero-details.css'
})
export class HeroDetails {
  readonly Shield = Shield;
  readonly Users = Users;
  readonly Ruler = Ruler;
  readonly Weight = Weight;
  readonly Calendar = Calendar;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;

  constructor(
    private superHeroesService: SuperHeroesService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  superHero: ISuperHero = {
    id: 0,
    name: '',
    heroName: '',
    birthDate: '',
    height: 0,
    weight: 0,
    superPowers: []
  };

  loading: boolean = true;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.getSuperHero(Number(id));
    }
  }

  getSuperHero(id: number) {
    this.superHeroesService.getSuperHero(id).subscribe({
      next: (response) => {
        this.superHero = response;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;

        if (error.error.errorMessages) {
          const html = error.error.errorMessages.join('<br>');
          this.toastr.error(html, 'Erro', { enableHtml: true });
          return;
        }

        this.toastr.error('Falha ao carregar super-herói');
      },
    })
  }

  getBirthDate() {
    if (!this.superHero.birthDate) {
      return '';
    }

    return format(new Date(this.superHero.birthDate), 'dd/MM/yyyy');
  }

  getAge() {
    if (!this.superHero.birthDate) {
      return '';
    }

    return differenceInYears(new Date(), new Date(this.superHero.birthDate));
  }

  openHeroForm() {
    this.router.navigate(['/heroes', this.superHero.id]);
  }

  deleteSuperHero() {
    this.loading = true;
    this.superHeroesService.deleteSuperHero(this.superHero.id).subscribe({
      next: () => {
        this.toastr.success('Super-herói excluído com sucesso!');
        this.router.navigate(['/heroes']);
      },
      error: (error) => {
        this.loading = false;
        
        if (error.error.errorMessages) {
          const html = error.error.errorMessages.join('<br>');
          this.toastr.error(html, 'Erro', { enableHtml: true });
          return;
        }

        this.toastr.error('Falha ao excluir super-herói!');
      },
    });
  }

  async openDeleteModal() {
    const { isConfirmed } = await SweetAlert({
      title: `Excluir ${this.superHero.heroName}`,
      text: 'Tem certeza que deseja excluir esse super-herói?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    });

    if (isConfirmed) {
      this.deleteSuperHero();
    }
  }

  goBack() {
    window.history.back();
  }
}
