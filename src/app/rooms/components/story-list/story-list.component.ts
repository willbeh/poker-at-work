import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomService } from '../../services/room.service';
import { Observable } from 'rxjs';
import { Story } from '../../models/story';

@Component({
  selector: 'app-story-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './story-list.component.html',
  styles: [],
})
export class StoryListComponent implements OnInit {
  private roomService = inject(RoomService);

  @Input() roomId: string = '';

  stories$ = new Observable<Story[]>();

  ngOnInit(): void {
    this.stories$ = this.roomService.getStories(this.roomId);
  }
}
