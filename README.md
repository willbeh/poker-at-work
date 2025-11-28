# Poker at Work 🎴

A real-time planning poker application for agile teams to estimate story points collaboratively. Built with Angular and Firebase, this app enables distributed teams to conduct efficient estimation sessions with a modern, polished UI.

## ✨ Features

- **Real-time Collaboration**: Live updates as team members join and vote
- **Customizable Voting Options**: Configure your own estimation scales (Fibonacci, T-shirt sizes, etc.)
- **Room Management**: Create and manage multiple estimation rooms
- **User Presence**: See who's in the room with avatar indicators
- **Vote Reveal**: Simultaneous reveal of all votes for unbiased estimation
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Firebase Integration**: Real-time database and authentication
- **Modern UI**: Polished interface with smooth animations and glassmorphism effects

## 🚀 Live Demo

The application is deployed at: [https://poker-at-work.web.app](https://poker-at-work.web.app)

## 🛠️ Tech Stack

- **Framework**: Angular 20.x
- **UI Components**: Angular Material
- **Styling**: SCSS with Tailwind CSS
- **Backend**: Firebase Realtime Database
- **Authentication**: Firebase Auth
- **Hosting**: Firebase Hosting
- **Effects**: tsparticles-confetti for celebrations

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

## 🏃 Getting Started

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd poker-at-work

# Install dependencies
npm install
```

### Development Server

```bash
# Start the development server
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you make changes to the source files.

### Build

```bash
# Build for production
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🔥 Firebase Configuration

This project uses Firebase for real-time database and authentication. To set up your own Firebase project:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firebase Realtime Database
3. Enable Authentication (Email/Password or other providers)
4. Add your Firebase configuration to the environment files
5. Update `firebase.json` and `.firebaserc` with your project details

### Deploy to Firebase

```bash
# Build and deploy
ng build --configuration production
firebase deploy
```

## 📁 Project Structure

```
src/
├── app/
│   ├── home/              # Landing page
│   ├── login/             # Authentication
│   ├── profile/           # User profile management
│   ├── rooms/             # Planning poker rooms
│   │   ├── components/    # Room UI components
│   │   ├── models/        # Room data models
│   │   ├── pages/         # Room pages
│   │   └── services/      # Room services
│   └── shared/            # Shared components and services
├── styles.scss            # Global styles
└── environments/          # Environment configurations
```

## 🧪 Testing

```bash
# Run unit tests
npm test
```

Tests are executed via [Karma](https://karma-runner.github.io).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues, please open an issue in the repository.

---

Built with ❤️ using Angular and Firebase
