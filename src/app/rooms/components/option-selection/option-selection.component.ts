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
  @Output() selected = new EventEmitter<number>();

  selectedOption?: number;

  select(option: number) {
    this.selectedOption = option;
    this.selected.emit(option);
  }
}
