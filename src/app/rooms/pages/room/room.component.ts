import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomService } from '../../services/room.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject, EMPTY, combineLatest, forkJoin } from 'rxjs';
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
import { ProfilePipe } from 'src/app/shared/pipes/profile.pipe';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PresenceComponent,
    OptionSelectionComponent,
    MatIconModule,
    MatButtonModule,
    ProfilePipe,
  ],
  templateUrl: './room.component.html',
  styles: [],
})
export class RoomComponent {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private roomService = inject(RoomService);

  focusRefresh = new BehaviorSubject<number>(0);

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
      return this.roomService.getStory(storyId);
    }),
    shareReplay(1)
  );

  updater$ = combineLatest(this.presence$, this.story$).pipe(
    debounceTime(2000),
    shareReplay(1),
    tap(([presence, story]) => {
      const notVoted = presence.filter(
        (p) => story.votes?.[p.uid] === undefined
      );
      console.log('notVoted', notVoted);

      if (notVoted.length === 0) {
        this.roomService.processStory(story);
      }
    })
  );

  /// TODO send selected vote to option selection component

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

  updateStoryVote(storyId: string, uid: string, vote: number) {
    this.roomService.updateStoryVote(storyId, uid, vote);
  }

  newStory(roomId: string) {
    this.roomService.createStory(roomId);
  }
}
