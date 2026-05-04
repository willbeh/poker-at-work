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
    :host { display: block; }

    .dlg-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 20px 8px;
    }
    .dlg-header-meta { display: flex; align-items: center; gap: 8px; }
    .settings-badge {
      background: var(--accent);
      color: var(--accent-ink);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.1em;
      padding: 3px 8px;
      border-radius: 4px;
    }
    .room-name {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.08em;
      color: var(--ink-muted);
      text-transform: uppercase;
    }
    .close-btn { color: var(--ink-muted); }

    .dlg-title {
      font-size: 26px;
      font-weight: 700;
      color: var(--ink);
      padding: 0 20px 12px;
      line-height: 1.2;
    }
    .accent { color: var(--accent); }

    mat-dialog-content { padding: 0 20px !important; }

    .section { margin-bottom: 20px; }
    .section-head { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
    .section-label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: var(--ink-muted);
      display: block;
      margin-bottom: 12px;
    }
    .section-head .section-label { margin-bottom: 0; }
    .count-badge {
      background: var(--accent);
      color: var(--accent-ink);
      font-size: 10px;
      font-weight: 700;
      min-width: 20px;
      height: 20px;
      border-radius: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0 5px;
    }

    .cards-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
    .card-chip {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 5px 8px 5px 10px;
      font-size: 14px;
      font-weight: 600;
      color: var(--ink);
    }
    .chip-x {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--ink-muted);
      font-size: 17px;
      line-height: 1;
      padding: 0;
      display: inline-flex;
      align-items: center;
      transition: color 0.1s;
    }
    .chip-x:hover { color: var(--ink); }

    .add-card-input {
      border: 1px dashed var(--border);
      border-radius: 8px;
      padding: 5px 10px;
      font-size: 14px;
      width: 90px;
      background: transparent;
      color: var(--ink);
      outline: none;
    }
    .add-card-input:focus { border-color: var(--ink-muted); }
    .add-card-input::-webkit-outer-spin-button,
    .add-card-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
    .add-card-input[type=number] { -moz-appearance: textfield; }

    .add-card-btn {
      border: 1px solid var(--border);
      border-radius: 8px;
      background: var(--surface);
      cursor: pointer;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: var(--ink);
      padding: 5px 12px;
      transition: background 0.1s;
    }
    .add-card-btn:hover:not(:disabled) { background: var(--border); }
    .add-card-btn:disabled { opacity: 0.35; cursor: default; }

    .setting-rows {
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
      background: var(--surface);
      margin-top: 8px;
    }
    .setting-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
    }
    .setting-row + .setting-row { border-top: 1px solid var(--border); }
    .setting-text { display: flex; flex-direction: column; gap: 3px; }
    .setting-title { font-size: 15px; font-weight: 600; color: var(--ink); }
    .setting-desc {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.1em;
      color: var(--ink-muted);
    }

    .segment-control {
      display: flex;
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: hidden;
    }
    .segment-btn {
      padding: 6px 12px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.06em;
      background: transparent;
      border: none;
      cursor: pointer;
      color: var(--ink-muted);
      transition: background 0.15s, color 0.15s;
    }
    .segment-btn + .segment-btn { border-left: 1px solid var(--border); }
    .segment-btn.active { background: var(--ink); color: #fff; }

    mat-dialog-actions {
      display: flex !important;
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 10px !important;
      padding: 8px 20px 20px !important;
    }
    .footer-note {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: var(--accent);
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .footer-dot { font-size: 8px; }
    .footer-btns { display: flex; justify-content: flex-end; gap: 8px; }
    .save-btn {
      background: var(--ink);
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.15s;
    }
    .save-btn:hover { opacity: 0.85; }
  `]
})
export class SettingsDialogComponent {
  private dialogRef = inject(MatDialogRef<SettingsDialogComponent>);

  options: number[] = [];
  allowUnsure = true;
  whoCanReveal: 'anyone' | 'hostOnly' = 'hostOnly';
  newOption: number | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Room) {
    this.options = [...(data.options || [])];
    this.allowUnsure = data.allowUnsure ?? true;
    this.whoCanReveal = data.whoCanReveal ?? 'hostOnly';
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
      allowUnsure: this.allowUnsure,
      whoCanReveal: this.whoCanReveal,
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
