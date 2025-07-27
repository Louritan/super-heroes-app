import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { LucideAngularModule } from 'lucide-angular';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Header, LucideAngularModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { }
