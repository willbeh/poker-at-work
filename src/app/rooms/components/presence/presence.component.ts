import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-presence',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './presence.component.html',
  styles: [],
})
export class PresenceComponent {
  @Input() roomId: string = '';
}
