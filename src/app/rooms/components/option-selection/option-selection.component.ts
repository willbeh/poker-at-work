import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayingCardComponent } from '../playing-card/playing-card.component';

@Component({
  selector: 'app-option-selection',
  imports: [CommonModule, PlayingCardComponent],
  templateUrl: './option-selection.component.html',
  styles: [`
    .card-btn {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
    }
  `]
})
export class OptionSelectionComponent {
  @Input() options: number[] = [];
  @Input() allowUnsure: boolean = true;
  @Output() selected = new EventEmitter<number | null>();

  selectedOption?: number;

  select(option: number) {
    if (this.selectedOption === option) {
      this.selectedOption = undefined;
      this.selected.emit(null);
    } else {
      this.selectedOption = option;
      this.selected.emit(option);
    }
  }
}
