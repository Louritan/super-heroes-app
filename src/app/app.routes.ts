import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home').then(m => m.Home)
  },
  {
    path: 'heroes',
    loadComponent: () => import('./components/hero-list/hero-list').then(m => m.HeroList)
  },
  {
    path: 'heroes/new',
    loadComponent: () => import('./components/new-hero/new-hero').then(m => m.NewHero)
  },
  {
    path: 'powers/new',
    loadComponent: () => import('./components/new-power/new-power').then(m => m.NewPower)
  },
  // {
  //   path: 'heroes/:id',
  //   loadComponent: () => import('./components/heroes/hero-detail.component').then(m => m.HeroDetailComponent)
  // },
  // {
  //   path: 'heroes/:id/edit',
  //   loadComponent: () => import('./components/heroes/hero-form.component').then(m => m.HeroFormComponent)
  // },
  {
    path: '**',
    redirectTo: '/home'
  }
];
