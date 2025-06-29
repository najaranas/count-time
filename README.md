# ⏱️ Count Time

**Count Time** is a modern, feature-rich web application that provides a suite of time management tools, including a stopwatch, countdown timer, and alarm clock. With a clean interface, customizable themes, and persistent settings, it's perfect for productivity, workouts, study sessions, and more.

## 🌐 Live Demo

**Try it out:** [najar-counttime.netlify.app](https://najar-counttime.netlify.app)

## ✨ Features

### 🏃‍♂️ Stopwatch
- **Start, stop, reset, and record laps**
- **Millisecond accuracy** for precise timing
- **Automatic lap saving** - laps and time persist even after closing the browser
- **Keyboard shortcuts** for quick control (S/Space for start/stop, R for reset, L for lap)
- **Visual lap table** showing lap times and total time

### ⏰ Timer
- **Flexible countdown** - set hours, minutes, and seconds
- **Custom alarm sounds** with multiple options (Tone, Beep, Battleship, Birds, Rain, Thunder)
- **Custom messages** displayed when timer completes
- **Repeat sound option** for persistent alerts
- **Visual progress animation** with animated spans
- **Easy edit and reset** functionality

### 🔔 Alarm
- **Set alarms for specific times** with hour and minute precision
- **Multiple alarm sounds** to choose from
- **Custom alarm messages** for personalized notifications
- **Repeat sound functionality** for persistent alarms
- **Real-time countdown** showing time until alarm
- **Automatic date adjustment** for next-day alarms

### 🎨 Settings & Customization
- **Dark/Light theme toggle** with persistent storage
- **Color customization** with multiple theme options (Orange, Green, Blue, Purple, etc.)
- **Keyboard shortcuts configuration**
- **Settings persistence** across browser sessions

### 📝 Feedback System
- **Built-in feedback form** for user suggestions and bug reports
- **Rating system** with emoji-based experience feedback
- **Contact information collection** for follow-up

### 📱 Responsive Design
- **Mobile-friendly interface** that works on all devices
- **Touch-optimized controls** for mobile users
- **Responsive navigation** with collapsible menu

## 🚀 How to Use

### 🏃‍♂️ Stopwatch
1. Open the main page (`index.html`)
2. Click **Start** or press **S/Space** to begin timing
3. Click **Lap** or press **L** to record lap times
4. Click **Stop** or press **S/Space** to pause
5. Click **Reset** or press **R** to clear the timer

### ⏰ Timer
1. Navigate to the **Timer** page
2. Click **Edit** to set your desired countdown time
3. Choose alarm sound and optional message
4. Click **Start** to begin countdown
5. Timer will alert you when time is up

### 🔔 Alarm
1. Go to the **Alarm** page
2. Click **Edit** to set alarm time
3. Configure sound and optional message
4. Click **Turn-on** to activate the alarm
5. Alarm will trigger at the set time with sound and message

### ⚙️ Settings
1. Access **Settings** from the navigation menu
2. Choose your preferred color theme
3. Review keyboard shortcuts
4. Settings are automatically saved

## 📁 Project Structure

```
count-time/
├── 📁 alarm/           # Alarm clock feature
│   ├── alarm.html      # Alarm interface
│   ├── alarm.css       # Alarm styling
│   └── alarm.js        # Alarm functionality
├── 📁 audio/           # Sound files
│   ├── tone.wav        # Default alarm sound
│   ├── beep.wav        # Beep sound
│   ├── battleship.wav  # Battleship sound
│   ├── bird.wav        # Bird sounds
│   ├── rain.wav        # Rain sounds
│   └── thunder.wav     # Thunder sounds
├── 📁 feedback/        # Feedback system
│   ├── feedback.html   # Feedback form
│   ├── feedback.css    # Feedback styling
│   └── feedback.js     # Feedback functionality
├── 📁 images/          # Assets
│   ├── logo.png        # App logo
│   └── ae6cfac3ceb83ad22c9c6f906fea04e2.jpg
├── 📁 settings/        # User settings
│   ├── settings.html   # Settings interface
│   ├── settings.css    # Settings styling
│   └── settings.js     # Settings functionality
├── 📁 stopwatch/       # Stopwatch feature
│   ├── script.js       # Stopwatch functionality
│   └── style.css       # Stopwatch styling
├── 📁 timer/           # Countdown timer
│   ├── timer.html      # Timer interface
│   ├── timer.css       # Timer styling
│   └── timer.js        # Timer functionality
└── 📄 index.html       # Main entry point (Stopwatch)
```

## 🛠️ Installation & Usage

### 📋 Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### ⚡ Quick Start
1. **Clone or download** the repository
2. **Open `index.html`** in your web browser
3. **Start using** the stopwatch, timer, or alarm features

### 💻 Local Development
```bash
# Clone the repository
git clone https://github.com/your-username/count-time.git

# Navigate to the project directory
cd count-time

# Open in your preferred browser
# Or use a local server for development
python -m http.server 8000
# Then visit http://localhost:8000
```

## 🎯 Key Features

- **No Installation Required** - Works directly in any modern browser
- **Offline Capable** - Functions without internet connection
- **Data Persistence** - Settings and preferences saved locally
- **Cross-Platform** - Works on Windows, Mac, Linux, iOS, Android
- **Lightweight** - Fast loading and minimal resource usage
- **Accessible** - Keyboard shortcuts and screen reader friendly

## 🔧 Technical Details

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: Local Storage for settings persistence
- **Audio**: Web Audio API for sound playback
- **Icons**: Material Symbols (Google Fonts)
- **Fonts**: Ubuntu, Inter (Google Fonts)
- **Responsive**: CSS Grid and Flexbox

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Material Design Icons for the beautiful icon set
- Google Fonts for the typography
- The open-source community for inspiration and tools

---

## 🚀 Built with ❤️ By Najar Anas 