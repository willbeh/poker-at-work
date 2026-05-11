import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RoomService } from '../../services/room.service';
import { Observable, tap } from 'rxjs';
import { Presence } from '../../models/presence';
import { avatarColor, initials } from '../../../shared/utils/avatar';

@Component({
  selector: 'app-presence',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './presence.component.html',
  styles: [`
    .presence-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 10px 12px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .presence-card.is-self {
      border-color: var(--ink);
    }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 0.02em;
      flex-shrink: 0;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 9999px;
      background: var(--ink-muted);
      opacity: 0.4;
    }
    .voted-check {
      font-size: 22px;
      width: 22px;
      height: 22px;
      color: var(--accent);
      display: block;
    }
    .vote-badge {
      min-width: 32px;
      height: 32px;
      border-radius: 8px;
      background: var(--ink);
      color: var(--bg);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
      padding: 0 8px;
    }
    .seg-toggle {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 4px;
    }
    .seg-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 10px;
      border-radius: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink-muted);
      background: transparent;
      border: 1px solid transparent;
      cursor: pointer;
    }
    .seg-btn.active {
      color: var(--ink);
      background: var(--bg);
      border-color: var(--ink);
      box-shadow: 0 1px 0 rgba(0,0,0,0.04);
    }
    .seg-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }
  `]
})
export class PresenceComponent implements OnInit {
  private roomService = inject(RoomService);

  @Input() roomId: string = '';
  @Input() currentUserId: string = '';
  @Input() votedUids: string[] = [];
  @Input() votes: { [uid: string]: number } | undefined = undefined;
  @Output() numberPresence = new EventEmitter<number>();
  @Output() toggleViewer = new EventEmitter<{ uid: string; isViewer: boolean }>();

  people$ = new Observable<Presence[]>();
  isCurrentUserViewer = false;

  ngOnInit(): void {
    this.people$ = this.roomService
      .getPresence(this.roomId)
      .pipe(
        tap((presence) => {
          this.numberPresence.emit(presence.length);
          const currentUser = presence.find((p) => p.uid === this.currentUserId);
          this.isCurrentUserViewer = currentUser?.isViewer ?? false;
        })
      );
  }

  onToggleSelfViewer() {
    this.toggleViewer.emit({ uid: this.currentUserId, isViewer: this.isCurrentUserViewer });
  }

  setViewer(v: boolean) {
    if (this.isCurrentUserViewer !== v) this.onToggleSelfViewer();
  }

  initials(name?: string | null) {
    return initials(name);
  }

  avatarStyle(uid?: string | null) {
    const c = avatarColor(uid);
    return { 'background-color': c.bg, color: c.fg };
  }

  hasVoted(uid: string) {
    return this.votedUids.includes(uid);
  }

  voteDisplay(uid: string): string | null {
    if (!this.votes) return null;
    const v = this.votes[uid];
    if (v === undefined || v === null) return null;
    return v === -1 ? '?' : String(v);
  }
}
