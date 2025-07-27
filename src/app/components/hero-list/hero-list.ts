import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, Search, User, Eye, Edit, Trash } from 'lucide-angular';
import { SuperHeroesService } from '../../services/super-heroes.service';
import { ISuperHeroShort } from '../../types/super-hero';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SweetAlert } from '../../lib/swal';
import { Loading } from '../loading/loading';

@Component({
  selector: 'app-hero-list',
  imports: [LucideAngularModule, Loading],
  templateUrl: './hero-list.html',
  styleUrl: './hero-list.css'
})
export class HeroList implements OnInit {
  readonly Search = Search;
  readonly User = User;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash = Trash;

  constructor(
    private superHeroesService: SuperHeroesService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  heroes: ISuperHeroShort[] = [];
  filteredHeroes: ISuperHeroShort[] = [];
  search: string = '';
  totalHeroes: number = 0;
  loading: boolean = true;

  ngOnInit(): void {
    this.getSuperHeroes();
  }

  getSuperHeroes() {
    this.superHeroesService.getSuperHeroes().subscribe({
      next: (response) => {
        if (response) {
          this.heroes = response.superHeroes;
          this.filteredHeroes = this.heroes;
          this.totalHeroes = this.heroes.length;
        }
        this.loading = false;
      },
      error: (_error) => {
        this.loading = false;
        this.toastr.error('Falha ao carregar super-heróis!');
      }
    });
  }

  filterHeroes(event: any): void {
    const value = event.target.value;
    this.search = value;

    if (!value.trim()) {
      this.filteredHeroes = this.heroes;
      return;
    }

    this.filteredHeroes = this.heroes.filter(hero =>
      hero.name.toLowerCase().includes(value.toLowerCase()) ||
      hero.heroName.toLowerCase().includes(value.toLowerCase()) ||
      hero.superPowers.some(power =>
        power.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  openHeroDetails(id: number) {
    this.router.navigate(['/heroes', id, 'details']);
  }

  openHeroForm(id: number) {
    this.router.navigate(['/heroes', id]);
  }

  async openDeleteModal(superHero: ISuperHeroShort) {
    const { isConfirmed } = await SweetAlert({
      title: `Excluir ${superHero.heroName}`,
      text: 'Tem certeza que deseja excluir esse super-herói?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    });

    if (isConfirmed) {
      this.deleteSuperHero(superHero.id);
    }
  }

  deleteSuperHero(id: number) {
    this.loading = true;
    this.superHeroesService.deleteSuperHero(id).subscribe({
      next: () => {
        this.toastr.success('Super-herói excluído com sucesso!');
        this.getSuperHeroes();
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
}
