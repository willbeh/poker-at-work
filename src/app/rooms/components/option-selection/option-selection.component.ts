import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-option-selection',
  imports: [CommonModule],
  templateUrl: './option-selection.component.html',
  styles: [`
    .vote-card {
      border-color: var(--border);
      cursor: pointer;
    }
    .vote-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(14, 15, 12, 0.06);
    }
    .vote-card.is-selected {
      border-color: var(--ink);
      border-width: 2px;
      transform: translateY(-4px);
      box-shadow: 0 10px 24px rgba(14, 15, 12, 0.12);
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
