import {
  Component,
  ContentChild,
  inject,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomService } from '../../services/room.service';
import { Observable } from 'rxjs';
import { Presence } from '../../models/presence';

@Component({
  selector: 'app-presence',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './presence.component.html',
  styles: [],
})
export class PresenceComponent implements OnInit {
  private roomService = inject(RoomService);

  @Input() roomId: string = '';

  @ContentChild(TemplateRef) templateOutlet!: TemplateRef<unknown>;

  people$ = new Observable<Presence[]>();

  ngOnInit(): void {
    this.people$ = this.roomService.getPresence(this.roomId);
  }
}
