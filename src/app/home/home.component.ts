import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RoomService } from '../rooms/services/room.service';
import { AuthService } from '../shared/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [CommonModule, MatButtonModule, RouterModule],
    templateUrl: './home.component.html',
    styles: [`
      :host { display: block; min-height: 100vh; background: var(--bg); }
      .topbar {
        display: flex; align-items: center; justify-content: space-between;
        padding: 20px 32px; border-bottom: 1px solid var(--border);
      }
      .brand { display: flex; align-items: center; gap: 12px; }
      .brand-tile {
        width: 36px; height: 36px; border-radius: 10px;
        background: var(--accent); color: var(--accent-ink);
        display: flex; align-items: center; justify-content: center;
        font-weight: 800; font-size: 18px;
      }
      .brand-title { font-size: 16px; font-weight: 700; line-height: 1; }
      .brand-sub {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 10px; letter-spacing: 0.08em; color: var(--ink-muted);
        text-transform: uppercase; margin-top: 4px;
      }
      .hero {
        display: flex; flex-direction: column; align-items: center;
        justify-content: center; min-height: calc(100vh - 77px);
        gap: 32px; padding: 40px 24px; text-align: center;
      }
      .hero-eyebrow {
        font-family: 'JetBrains Mono', ui-monospace, monospace;
        font-size: 11px; letter-spacing: 0.1em; color: var(--ink-muted);
        text-transform: uppercase; border: 1px solid var(--border);
        border-radius: 9999px; padding: 6px 14px; background: var(--surface);
      }
      .hero-title {
        font-size: clamp(40px, 7vw, 80px); font-weight: 800;
        line-height: 1.05; letter-spacing: -0.03em; color: var(--ink);
        max-width: 640px;
      }
      .hero-title span { color: var(--accent); }
      .hero-desc { color: var(--ink-muted); font-size: 18px; max-width: 440px; line-height: 1.6; }
      .cta {
        background: var(--ink); color: var(--bg);
        border-radius: 9999px; padding: 14px 28px;
        font-size: 16px; font-weight: 600; border: none; cursor: pointer;
        display: inline-flex; align-items: center; gap: 10px;
        transition: opacity 100ms;
      }
      .cta:hover { opacity: 0.85; }
      .cta-login {
        background: var(--surface); color: var(--ink);
        border: 1px solid var(--border); border-radius: 9999px;
        padding: 14px 28px; font-size: 16px; font-weight: 600;
        display: inline-flex; align-items: center; gap: 10px; cursor: pointer;
        text-decoration: none; transition: border-color 100ms;
      }
      .cta-login:hover { border-color: var(--ink); }
    `]
})
export class HomeComponent {
  private roomService = inject(RoomService);
  private authService = inject(AuthService);
  private router = inject(Router);

  authUser$ = this.authService.authUser$;

  createNewRoom(uid: string) {
    this.roomService.createRoom(uid).then((room) => {
      this.router.navigate(['/room', room.key]);
    });
  }
}
