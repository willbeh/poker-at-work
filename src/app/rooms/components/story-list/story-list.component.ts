import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomService } from '../../services/room.service';
import { map, Observable } from 'rxjs';
import { Story } from '../../models/story';
import { timeAgo } from '../../../shared/utils/time-ago';

interface RoundView {
  id: string;
  votes: number[];
  average: number;
  consensus: boolean;
  min: number;
  max: number;
  date: Date;
  ago: string;
}

@Component({
  selector: 'app-story-list',
  imports: [CommonModule],
  templateUrl: './story-list.component.html',
  styles: [`
    .history-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 14px 16px;
    }
    .history-card.consensus {
      background: #F1FAD9;
      border-color: #C8E27A;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 26px;
      height: 26px;
      padding: 0 6px;
      border: 1px solid var(--border);
      background: var(--surface);
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      color: var(--ink);
    }
    .tag {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 10px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 3px 8px;
      border-radius: 9999px;
      background: var(--bg);
      color: var(--ink-muted);
    }
    .tag.consensus {
      background: var(--accent);
      color: var(--accent-ink);
    }
    .result {
      font-size: 28px;
      font-weight: 700;
      line-height: 1;
    }
    .result.consensus {
      color: var(--accent-ink);
    }
  `]
})
export class StoryListComponent implements OnInit {
  private roomService = inject(RoomService);

  @Input() roomId: string = '';

  rounds$ = new Observable<RoundView[]>();

  ngOnInit(): void {
    this.rounds$ = this.roomService.getStories(this.roomId).pipe(
      map((stories) =>
        stories
          .filter((s) => s.status === 'completed' && s.votes)
          .map((s) => this.toView(s))
          .slice(0, 10)
      )
    );
  }

  private toView(s: Story): RoundView {
    const allVotes = Object.values(s.votes ?? {});
    const numeric = allVotes.filter((v) => v > 0);
    const min = numeric.length ? Math.min(...numeric) : 0;
    const max = numeric.length ? Math.max(...numeric) : 0;
    const consensus = numeric.length > 1 && min === max;
    const date = s.date instanceof Date ? s.date : new Date(s.date as any);
    return {
      id: s.id!,
      votes: allVotes,
      average: s.average ?? 0,
      consensus,
      min,
      max,
      date,
      ago: timeAgo(date),
    };
  }

  displayVote(v: number): string {
    return v === -1 ? '?' : String(v);
  }
}
