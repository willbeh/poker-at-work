import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

const SUITS = ['♠', '♥', '♦', '♣'] as const;
const RED_SUITS = new Set(['♥', '♦']);

@Component({
  selector: 'app-playing-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playing-card.component.html',
  styleUrl: './playing-card.component.scss'
})
export class PlayingCardComponent implements OnChanges {
  @Input() value: number | string = 0;
  @Input() index: number = 0;
  @Input() isSelected: boolean = false;

  suit: string = '♠';
  isRed: boolean = false;
  label: string = '';

  ngOnChanges() {
    this.suit = SUITS[this.index % SUITS.length];
    this.isRed = RED_SUITS.has(this.suit as any);
    this.label = this.value === -1 ? '?' : String(this.value);
  }
}
