import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-option-selection',
  imports: [CommonModule],
  templateUrl: './option-selection.component.html',
  styles: []
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
