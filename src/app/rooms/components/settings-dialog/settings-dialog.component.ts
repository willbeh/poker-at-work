import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { Room } from '../../models/room';

@Component({
  selector: 'app-settings-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTooltipModule,
    FormsModule,
  ],
  templateUrl: './settings-dialog.component.html',
  styles: [`
    .mat-mdc-standard-chip {
      --mdc-chip-elevated-container-color: #e0e0e0;
    }
  `]
})
export class SettingsDialogComponent {
  private dialogRef = inject(MatDialogRef<SettingsDialogComponent>);

  options: number[] = [];
  allowUnsure = true;
  newOption: number | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Room) {
    this.options = [...(data.options || [])];
    this.allowUnsure = data.allowUnsure ?? true;
  }

  addOption() {
    if (this.newOption !== null && !this.options.includes(this.newOption)) {
      this.options.push(this.newOption);
      this.options.sort((a, b) => a - b);
      this.newOption = null;
    }
  }

  removeOption(option: number) {
    this.options = this.options.filter(o => o !== option);
  }

  save() {
    this.dialogRef.close({
      options: this.options,
      allowUnsure: this.allowUnsure
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
