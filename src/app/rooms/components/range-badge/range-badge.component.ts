import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-range-badge',
  imports: [CommonModule],
  templateUrl: './range-badge.component.html',
  styles: [
    `
      .badge {
        display: inline-flex;
        align-items: center;
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 10px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        padding: 3px 8px;
        border-radius: 9999px;
        background: var(--bg);
        color: var(--ink-muted);
      }
      .badge.consensus {
        background: var(--accent);
        color: var(--accent-ink);
      }
      .badge.wide {
        background: #ffe4e4;
        color: #c0392b;
      }
    `,
  ],
})
export class RangeBadgeComponent {
  @Input() min = 0;
  @Input() max = 0;
  @Input() consensus = false;
  @Input() options: number[] = [];

  get wide(): boolean {
    if (this.consensus) return false;
    if (this.options.length) {
      const iMin = this.options.indexOf(this.min);
      const iMax = this.options.indexOf(this.max);
      return iMin !== -1 && iMax !== -1 && iMax - iMin >= 3;
    }
    return this.max - this.min > 3;
  }
}
