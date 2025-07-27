import { Component } from '@angular/core';
import { LucideAngularModule, Users, Zap } from 'lucide-angular';

@Component({
  selector: 'app-home',
  imports: [LucideAngularModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  imagemSuperhero = 'assets/img/superhero.png';
  readonly Users = Users;
  readonly Zap = Zap;

  totalHeroes = 5;
  totalPowers = 10;
}
