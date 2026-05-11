import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomService } from '../../services/room.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { avatarColor, initials } from 'src/app/shared/utils/avatar';
import { BehaviorSubject, EMPTY, combineLatest } from 'rxjs';
import {
  debounceTime,
  map,
  shareReplay,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { PresenceComponent } from '../../components/presence/presence.component';
import { OptionSelectionComponent } from '../../components/option-selection/option-selection.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { SettingsDialogComponent } from '../../components/settings-dialog/settings-dialog.component';
import { Story } from '../../models/story';
import { StoryListComponent } from '../../components/story-list/story-list.component';
import { Clipboard } from '@angular/cdk/clipboard';
import { ConfettiComponent } from 'src/app/shared/component/confetti/confetti.component';
import { CelebrationCardsComponent } from '../../components/celebration-cards/celebration-cards.component';

import { TopbarComponent } from 'src/app/shared/component/topbar/topbar.component';
import { RangeBadgeComponent } from '../../components/range-badge/range-badge.component';

@Component({
  selector: 'app-room',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule,
    MatMenuModule,
    PresenceComponent,
    OptionSelectionComponent,
    StoryListComponent,
    ConfettiComponent,
    CelebrationCardsComponent,
    TopbarComponent,
    RangeBadgeComponent,
  ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss',
})
export class RoomComponent {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private roomService = inject(RoomService);

  avatarColor = avatarColor;
  initials = initials;
  private clipboard = inject(Clipboard);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  focusRefresh = new BehaviorSubject<number>(0);
  copied = false;

  room$ = this.route.params.pipe(
    switchMap((params) => this.roomService.getRoom(params['id'])),
    shareReplay(1)
  );

  storyId = new BehaviorSubject<string>('');

  presence$ = this.room$.pipe(
    switchMap((room) => this.roomService.getPresence(room.id!)),
    shareReplay(1)
  );

  story$ = this.storyId.asObservable().pipe(
    switchMap((storyId) => {
      if (!storyId) {
        return EMPTY;
      }

      return this.roomService.getStory(storyId).pipe(
        map((story) => {
          const sameVoteResults = story.status !== 'active' && story.votes ?
            Object.values(story.votes).every((val, i, arr) => val === arr[0]) :
            false;

          return {
            ...story,
            sameVoteResults
          }
        })
      );
    }),
    shareReplay(1)
  );

  rounds$ = this.room$.pipe(
    switchMap((room) => this.roomService.getStories(room.id!)),
    shareReplay(1)
  );

  roundNumber$ = this.rounds$.pipe(map((stories) => stories.length || 1));

  voteStats$ = combineLatest([this.presence$, this.story$]).pipe(
    map(([presence, story]) => {
      const voters = presence.filter((p) => !p.isViewer);
      const voted = voters.filter((p) => story.votes?.[p.uid] !== undefined && story.votes?.[p.uid] !== null);
      return {
        voted: voted.length,
        total: voters.length,
        votedUids: Object.keys(story.votes ?? {}),
      };
    }),
    shareReplay(1)
  );

  updater$ = combineLatest([this.presence$, this.story$]).pipe(
    debounceTime(1000),
    shareReplay(1),
    tap(([presence, story]) => {
      const voters = presence.filter((p) => !p.isViewer);
      const notVoted = voters.filter((p) => story.votes?.[p.uid] === undefined);
      if (notVoted.length === 0 && voters.length > 0) {
        this.roomService.processStory(story);
      }
    })
  );

  isCurrentUserViewer$ = combineLatest([this.presence$, this.authService.user$]).pipe(
    map(([presence, user]) => {
      if (!user) return false;
      const currentUser = presence.find((p) => p.uid === user.uid);
      return currentUser?.isViewer ?? false;
    }),
    shareReplay(1)
  );

  vm$ = this.room$.pipe(
    withLatestFrom(this.authService.user$),
    map(([room, user]) => {
      if (!user) {
        return;
      }

      this.roomService.presence(room.id!, user);

      this.storyId.next(room.storyId);

      return {
        user,
        room,
      };
    })
  );

  winningVote(story: Story): number {
    return story.votes ? +Object.values(story.votes)[0] : 0;
  }

  voteRange(story: Story): { min: number; max: number } {
    const numeric = Object.values(story.votes ?? {}).filter(v => v > 0);
    return {
      min: numeric.length ? Math.min(...numeric) : 0,
      max: numeric.length ? Math.max(...numeric) : 0,
    };
  }

  updateStoryVote(storyId: string, uid: string, vote: number | null) {
    this.roomService.updateStoryVote(storyId, uid, vote);
  }

  newStory(roomId: string) {
    this.roomService.createStory(roomId);
  }

  manualComplete(story: Story) {
    this.roomService.processStory(story);
  }

  toggleViewerStatus(uid: string, currentStatus: boolean) {
    this.roomService.toggleViewerStatus(uid, !currentStatus);
  }

  copyLink() {
    this.copied = true;
    this.clipboard.copy(window.location.href);
    this.snackBar.open('Link copied to clipboard', 'Close', {
      duration: 2000,
    });

    setTimeout(() => {
      this.copied = false;
    }, 2000);
  }

  async signOut() {
    await this.authService.signOut();
    this.router.navigate(['/login']);
  }

  openSettings(room: any) {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      data: room,
      width: '400px',
      panelClass: 'settings-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.roomService.updateRoom(room.id, result);
      }
    });
  }

  shortRoomId(name: string): string {
    if (!name) return '';
    if (name.length <= 12) return name;
    return name.slice(-12).replace(/[^A-Za-z0-9]/g, '').slice(0, 8) || name.slice(-8);
  }

  pad2(n: number): string {
    return String(n).padStart(2, '0');
  }
}
