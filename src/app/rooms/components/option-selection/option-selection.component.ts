import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-option-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './option-selection.component.html',
  styles: [],
})
export class OptionSelectionComponent {
  @Input() options: number[] = [];
  @Output() selected = new EventEmitter<number>();

  selectedOption?: number;

  select(option: number) {
    console.log('select', option);
    this.selectedOption = option;
    this.selected.emit(option);
  }
}
