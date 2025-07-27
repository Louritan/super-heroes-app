import { Component } from '@angular/core';
import { LucideAngularModule, Shield, House, Users, Plus } from 'lucide-angular';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  constructor(public router: Router) {}

  readonly Shield = Shield;
  readonly House = House;
  readonly Users = Users;
  readonly Plus = Plus;

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  navItems = [
    { path: '/home', icon: House, label: 'Home' },
    { path: '/heroes', icon: Users, label: 'Heróis' },
    { path: '/heroes/new', icon: Plus, label: 'Novo Herói' },
    { path: '/powers/new', icon: Plus, label: 'Novo Poder' },
  ];

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}
