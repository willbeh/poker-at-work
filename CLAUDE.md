# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm start          # Start development server at http://localhost:4200
npm run build      # Production build (outputs to dist/poker-at-work)
npm test           # Run unit tests via Karma
```

For deployment:
```bash
ng build --configuration production
firebase deploy
```

## Architecture Overview

This is an Angular 20 planning poker application using Firebase for real-time data and authentication.

### Core Data Flow

The app uses Firebase Realtime Database with three main data collections:
- **rooms** - Planning poker sessions with configurable voting options
- **stories** - Individual estimation items within rooms (one active story per room at a time)
- **presence** - Real-time user presence tracking per room

### Key Services

- **RoomService** (`src/app/rooms/services/room.service.ts`) - Central service for all Firebase operations: room CRUD, story management, vote recording, and presence tracking. Uses `onDisconnect` to handle user presence cleanup.

- **AuthService** (`src/app/shared/services/auth.service.ts`) - Handles Firebase authentication. Auto-creates anonymous users when not logged in, syncs with ProfileService.

### Data Models

Located in `src/app/rooms/models/`:
- **Room** - Contains voting options array, current storyId, and owner
- **Story** - Tracks votes as `{uid: number}` map, status (active/completed), and calculated average
- **Presence** - User online state with `isViewer` flag for non-voting observers

### Component Architecture

Uses standalone components with lazy loading. Main routes:
- `/` - Home (room creation)
- `/room/:id` - Planning session (requires display name via auth guard)
- `/login` - Authentication
- `/update-name` - Profile setup (redirected to if no displayName)

The `RoomComponent` orchestrates the main poker session, combining room data, presence, and story observables with `combineLatest` to auto-reveal votes when all participants have voted.

### Styling

- Angular Material for UI components
- Tailwind CSS for utility classes
- SCSS files (configured in angular.json)

### Component File Convention

Always use separate files for templates and styles — never inline `template`/`styles` in the decorator:

```
component-name/
  component-name.component.ts       ← uses templateUrl + styleUrl
  component-name.component.html
  component-name.component.scss
```
