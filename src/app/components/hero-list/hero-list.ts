import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, Search, User, Eye, Edit, Trash } from 'lucide-angular';
import { SuperHeroesService } from '../../services/super-heroes.service';
import { ISuperHeroShort } from '../../types/super-hero';
import { differenceInYears } from 'date-fns';

@Component({
  selector: 'app-hero-list',
  imports: [LucideAngularModule],
  templateUrl: './hero-list.html',
  styleUrl: './hero-list.css'
})
export class HeroList implements OnInit {
  readonly Search = Search;
  readonly User = User;
  readonly Eye = Eye;
  readonly Edit = Edit;
  readonly Trash = Trash;

  heroes: ISuperHeroShort[] = [];
  filteredHeroes: ISuperHeroShort[] = [];
  search: string = '';
  totalHeroes: number = 0;

  constructor(
    private superHeroesService: SuperHeroesService,
  ) { }

  ngOnInit(): void {
    this.getSuperHeroes();
  }

  getSuperHeroes() {
    this.superHeroesService.getSuperHeroes().subscribe({
      next: (response) => {
        this.heroes = response.superHeroes;
        this.filteredHeroes = this.heroes;
        this.totalHeroes = this.heroes.length;
      },
      error: (error) => {
        console.error('Erro ao carregar super-heróis:', error);
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

  getAge(birthDate: Date): number {
    return differenceInYears(new Date(), birthDate);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }
}
