# PomodoroTodo - React Productivity Application

A modern, responsive web application that seamlessly combines a to-do list with the Pomodoro time-management technique. Built with React, TypeScript, and Tailwind CSS.

## 🍅 Features

### Core Functionality
- **Interactive To-Do List**: Add, edit, delete, and reorder tasks with drag-and-drop
- **Pomodoro Timer**: Realistic tomato-styled timer with circular progress indicator
- **Automatic Break Management**: Seamless transition from work to break sessions
- **Progress Dashboard**: Real-time statistics and completion tracking
- **Local Storage Persistence**: All data saved automatically

### User Experience
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Smooth Animations**: Fade-in/out effects and micro-interactions
- **Keyboard Shortcuts**: Quick access to all major functions
- **Theme Customization**: Multiple color themes including dark mode
- **Sound Notifications**: Audio alerts for timer completion

### Keyboard Shortcuts
- `Space` - Start/pause timer
- `N` - Next task
- `S` - Open settings
- `Esc` - Close modals
- `R` - Reset timer (when timer is open)

## 🚀 Getting Started

### Prerequisites
- Node.js 16.0 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pomodoro-todo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard/      # Progress tracking components
│   ├── Layout/         # Layout and header components
│   ├── Settings/       # Settings modal
│   ├── Timer/          # Pomodoro timer components
│   └── TodoList/       # To-do list components
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── styles/             # CSS and theme definitions
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── App.tsx            # Main application component
```

## 🎨 Customization

### Themes
The app includes three built-in themes:
- **Tomato Red**: Classic warm red theme
- **Mint Green**: Refreshing green theme  
- **Midnight Dark**: Dark mode for night usage

### Timer Durations
- Work sessions: 1-60 minutes (default: 25 minutes)
- Break sessions: 1-30 minutes (default: 5 minutes)
- All settings are customizable via the Settings modal

## 🔧 Technical Details

### Built With
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library

### Key Features
- **Context API**: Global state management
- **Custom Hooks**: Reusable logic for timer, keyboard shortcuts, and drag-and-drop
- **Local Storage**: Automatic data persistence
- **Web Audio API**: Sound notifications
- **Notification API**: Browser notifications

### Browser Support
- Modern browsers with ES2020 support
- Chrome 80+, Firefox 72+, Safari 13.1+, Edge 80+

## 📱 Mobile Experience

The app is fully responsive and includes:
- Touch-friendly interface
- Optimized layouts for small screens
- Swipe gestures for task management
- Mobile-specific animations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Pomodoro Technique developed by Francesco Cirillo
- Icons provided by Lucide React
- Built with modern web technologies and best practices

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Happy productivity! 🍅✨**