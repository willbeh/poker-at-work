import {
  Component,
  ContentChild,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RoomService } from '../../services/room.service';
import { Observable, tap } from 'rxjs';
import { Presence } from '../../models/presence';

@Component({
  selector: 'app-presence',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './presence.component.html',
  styles: []
})
export class PresenceComponent implements OnInit {
  private roomService = inject(RoomService);

  @Input() roomId: string = '';
  @Input() currentUserId: string = '';
  @Output() numberPresence = new EventEmitter<number>();
  @Output() toggleViewer = new EventEmitter<{ uid: string; isViewer: boolean }>();

  @ContentChild(TemplateRef) templateOutlet!: TemplateRef<unknown>;

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
}
