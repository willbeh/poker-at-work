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
import { RoomService } from '../../services/room.service';
import { Observable, tap } from 'rxjs';
import { Presence } from '../../models/presence';

@Component({
    selector: 'app-presence',
    imports: [CommonModule],
    templateUrl: './presence.component.html',
    styles: []
})
export class PresenceComponent implements OnInit {
  private roomService = inject(RoomService);

  @Input() roomId: string = '';
  @Output() numberPresence = new EventEmitter<number>();

  @ContentChild(TemplateRef) templateOutlet!: TemplateRef<unknown>;

  people$ = new Observable<Presence[]>();

  ngOnInit(): void {
    this.people$ = this.roomService
      .getPresence(this.roomId)
      .pipe(tap((presence) => this.numberPresence.emit(presence.length)));
  }
}
