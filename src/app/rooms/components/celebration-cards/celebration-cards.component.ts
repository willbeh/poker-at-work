import { Component, Input, OnInit } from '@angular/core';
import { PlayingCardComponent } from '../playing-card/playing-card.component';

@Component({
  selector: 'app-celebration-cards',
  standalone: true,
  imports: [PlayingCardComponent],
  templateUrl: './celebration-cards.component.html',
  styleUrl: './celebration-cards.component.scss'
})
export class CelebrationCardsComponent implements OnInit {
  @Input() options: number[] = [];
  @Input() allowUnsure: boolean = true;
  @Input() winningValue: number = 0;

  animated = false;

  get allOptions(): number[] {
    return this.allowUnsure ? [...this.options, -1] : [...this.options];
  }

  ngOnInit() {
    setTimeout(() => { this.animated = true; }, 80);
  }
}
