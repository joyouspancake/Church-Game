# ⛵ Genesis Race — Bible Trivia Sea Expedition

A fun, highly polished, and interactive Bible trivia web game centered around **Genesis Chapters 1 to 44** (covering Creation, Noah's Ark, Abraham, Isaac, Jacob, Esau, and Joseph inside Egypt). It features an animated two-vessel regatta sailing across the sea. The first team to dock at Canaan wins!

This game is designed to be **Projector & Mobile friendly** for youth groups, Sunday schools, family game nights, and church camps.

---

## 🗺️ Key Features

- **Double-Vessel Ocean Race Grid**: Live progress and position tracking of **Group 1 (Noah's Ark)** and **Group 2 (Eden Explorers)** side-by-side with animated waves, obstacles, splashing impact, and custom ship icons.
- **Seeded Trivia Bank**: Exactly **100 accurate, high-quality questions** ranging from Multiple Choice, True/False, Who-said-this, Finish-the-verse, and Character trivia.
- **Audio Sound FX Engine**: Retro, offline-synthesized chimes (success fanfare, buzzer honks, ship bell rings, and victory melodies) using the native **Web Audio API** (no bulky audio downloads needed).
- **Dual Local Synchronizer State**: Uses `localStorage` and `BroadcastChannel` APIs to automatically synchronize multiple browser tabs in real-time. Connect a laptop to a Projector as a visual display, and use tablets or phones as Admin controllers or Player buzzers!
- **Zero Configuration & No Password**: High performance client-side state without requiring secondary server setups. Easy to run and deploy anywhere!

---

## 📽️ Game Setup Guides

### 1. Single Screen Mode (Classroom Facilitator)
1. Open the website on your computer.
2. Select **Admin Arena** (Full Deck Split Screen) mode.
3. Share or duplicate the screen to the classroom projector.
4. Read questions to the children, click **Reveal Answer** as they respond, and grade them via the manual Controls panel on the right side.

### 2. Multi-Tab Synchronized Buzzers
1. Open the game link on the Laptop connected to the projector and set the view mode to **Projector View** (hides admin controls and displays a clean visual map with large, cinematic question texts).
2. Open the game link on the Leader's tablet/phone (or secondary window) and set it to **Admin Arena**. Use this to toggle questions, click reveal, and grade teams.
3. Have kids open the game link on their phones and click **Join Buzzer**. They enter their names, choose Team A or Team B, and can tap the giant **BUZZ!** button. When someone buzzes in, a real-time notification alerts the Admin remote automatically with live audio!

---

## 🛠️ Customization Deck
Inside the **Admin deck**, click the **Gear (⚙️)** button to:
- Rename both teams, assign sailboat icons, and brand theme colors.
- Expand or shrink the race track distance (from 5 up to 25 steps to win).
- Toggle retrograde penances (whether wrong answers dock the boat backward in the sea or just stay stationary).
- Enable or disable sound effects.

---

## 📦 Local Installation Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn

### Setup Commands
1. Clone or extract the folder archive:
```bash
cd genesis-race
```

2. Install pre-configured dependencies:
```bash
npm install
```

3. Spin up the development server:
```bash
npm run dev
```

4. Compile static optimized bundles for Vercel/Netlify/Vite static hostings:
```bash
npm run build
```

---

*Worthy is the crew that sails across Genesis safely to Canaan! May your youth groups enjoy this interactive trivia race!* ⛵📖⭐
