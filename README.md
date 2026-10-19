# 💍 Digital Wedding Invitation Website

A luxury, interactive digital wedding invitation website built with HTML5, CSS3, and JavaScript — inspired by the Hafsa & Anas wedding invitation card.

---

## ✨ Features Included

1. **Cinematic Curtain / Video Opener**
   - Elegant "Tap to Open Invitation" interactive overlay with animated hand icon.
   - Smooth opening curtain video transition with Arabic calligraphy / welcome phrase.
   - Double-click fallback to smoothly bypass the intro video if desired.

2. **Royal Floral Theme & Aesthetics**
   - Deep burgundy (`#610B14`) and rich cream ivory (`#e8dfcd`) color palette.
   - Animated swinging crystal chandelier fixture (`@keyframes sway-light`).
   - Vintage floral arches, Bismillah calligraphy (`بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ`), and family blessings.

3. **Background Music Player**
   - Gentle looping romantic background music (`assests/audio/music1.mp3`).
   - Fixed floating audio toggle button (with mute/unmute icon).
   - Smart pause/resume when switching browser tabs.

4. **Interactive Metallic Scratch Cards**
   - **Date Reveal Scratch Card**: Real-time scratch effect using HTML5 Canvas with metallic conic gold/burgundy gradients.
   - **Confetti Explosion**: Automatic colorful confetti burst upon revealing the date.
   - **Dress Code Scratch Card**: Hidden message revealed by scratching.

5. **Live Countdown Timer**
   - Real-time countdown clock (Days, Hours, Minutes, Seconds) ticking down to the wedding date.

6. **Event Timeline & Venue Details**
   - Structured cards for all celebrations:
     - Nikkah (*Qubool Hai*)
     - Dawat-e-Khas (Reception Dinner)
     - The Bonding Buffet (Gujarati Lunch)
     - Walima
   - Timings, Hijri dates, venue names, and Google Maps integration link.

7. **RSVP & Interactive Features**
   - "Yes, Joyfully Accepting" with celebration confetti popper.
   - "Regretfully Declining" with heartfelt message.
   - Floating heart particle trail on touch & cursor movements.

---

## 📁 Project Structure

```
wedding-invitation/
├── index.html               # Main webpage structure
├── style.css                # Royal styling, animations & responsive layout
├── script.js                # Scratch card, music, countdown & interaction logic
└── assests/
    ├── audio/
    │   └── music1.mp3       # Background song / instrumental
    ├── fonts/
    │   ├── Marquis.ttf      # Luxury title font
    │   └── avakine-regular.otf # Serif display font
    ├── images/
    │   ├── first.png        # Video poster placeholder
    │   ├── cover1.png       # OpenGraph / social share preview
    │   ├── topf.png         # Top floral garland
    │   ├── light.png        # Hanging chandelier
    │   ├── bg.png           # Ornate background lace border
    │   ├── fl.png           # Decorative motif
    │   ├── SAVE.png         # Save The Date calligraphy header
    │   ├── insha.png        # Insha Allah calligraphy
    │   └── bl-fl.png        # Bottom floral finish
    └── videos/
        └── nadavd.mp4       # Opening curtain video
```

---

## 🛠️ How to Customize

- **Names & Parents**: Edit lines 95–210 in [`index.html`](file:///C:/Users/Admin/.gemini/antigravity/scratch/wedding-invitation/index.html).
- **Wedding Date & Countdown**: Change `countdownDate = new Date("November 11, 2026 17:00:00")` on line 282 in [`script.js`](file:///C:/Users/Admin/.gemini/antigravity/scratch/wedding-invitation/script.js).
- **Events & Venues**: Update event cards starting at line 170 in [`index.html`](file:///C:/Users/Admin/.gemini/antigravity/scratch/wedding-invitation/index.html).
- **Background Music**: Replace `assests/audio/music1.mp3` with any favorite MP3 track.
