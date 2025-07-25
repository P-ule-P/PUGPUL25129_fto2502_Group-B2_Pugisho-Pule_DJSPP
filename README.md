# 🎧 BingePodcast

A modern, responsive React application that allows users to browse, search, filter, and listen to podcasts with full audio playback and listening progress tracking.
Visit:
podcastpugisho.vercel.app

## 📦 Features

### ✅ Core Features

- **Browse Podcasts**
  View a grid of podcasts showing:

  - Cover image
  - Title
  - Number of seasons
  - Genres
  - Last updated date

- **Detailed Show View**

  - Full show description and metadata
  - Dropdown to select seasons
  - Season and episode info
  - Resume playback and view finished episodes

- **Global Audio Player**

  - Persistent player fixed at the bottom of the screen
  - Continues playback across route changes
  - Shows episode title and playback progress
  - Allows pause/resume and seek controls
  - Warns user if closing page while audio is playing

- **Favourites System**

  - Users can mark episodes as favourites
  - View favourites grouped by show
  - ↕Sort favourites by title/date
  - Remove or reset all favourites

---

### 🔍 Search, Filter & Sort

- **Live Search**
- **Filter by Genre**
- **Sort Options**:

  - 🆕 Newest
  - 🕰️ Oldest
  - 🔤 Title A-Z
  - 🔠 Title Z-A

---

### 🎚️ Listening Progress

- 💾 Automatically saves progress per episode
- ▶️ Resumes playback from last listened position
- ✅ Marks episodes as finished when near end
- 🔄 Clear/reset all listening history
- 👤 Listening progress tied to mock user ID

---

### 📱 Responsive Design

- 💻🖥️📱 Optimized for desktop, tablet, and mobile

---

## 🔧 Tech Stack

- ⚛️ **React**
- 🔁 **React Router DOM**
- ⚡ **Vite**
- 💛 **JavaScript (ES6+)**
- 🌐 **HTML & CSS**

---

## 🚀 Getting Started

### 🛠️ Installation

> 📦 Requirements:
>
> - Node.js (18+)
> - npm (or yarn)

1. **Clone the repository**

```bash
git clone https://github.com/your-username/PodcastApp.git
cd PodcastApp
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev
```

Open your browser at: `http://localhost:5173`

---

## 📋 How to Use

### 🎧 Browse & Listen

- Browse podcast shows from homepage
- Click a podcast card to view detailed show info
- Select a season to explore episodes
- Click play to begin listening

### 🔊 Use the Audio Player

- Player stays at bottom of screen
- Pause/resume or ⏩ seek with slider
- See real-time progress updates

### 🧠 Save Listening Progress

- Episode position is saved automatically
- When revisiting, playback resumes from last point
- Finished episodes marked

### 🧹 Manage Progress & Favourites

- ❤️ Mark/unmark favourites from ShowDetail or Favourites page
- ↕️ Sort favourites or 🗑️ clear all
- 🔄 Reset listening history with one button

---

## 👤 User-Specific Features

- 👤 All listening progress is tied to a mock user ID (e.g., `mockUser123`)
- 🛠️ Future updates can include switching users and loading their respective data

---

## 🙌 Author

Pugisho Pule — Final Project (DJS05)
For academic use. All design, logic, and UI authored by student.
