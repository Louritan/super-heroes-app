import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  imports: [CommonModule],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.css',
  standalone: true,
})
export class Tooltip {
  @Input() text = '';
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  show = false;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.show = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.show = false;
  }
}
