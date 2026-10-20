# 🕊️ Royal Wedding Invitation — Dr. Misba & Zubair

A cinematic, mobile-first, interactive Islamic luxury wedding invitation website inspired by the physical card aesthetics and interactions of high-end wedding invites.

---

## 🌟 Features & 7-Screen Interactive Flow

1. **Screen 1 — Animated Envelope Opening**
   - Portrait-first presentation featuring the royal sealed envelope with wax seal stamped with the monogram **MZ**.
   - Pulsing golden call-to-action: **"OPEN INVITATION"**.
   - When tapped, triggers a video flap unfolding animation, plays background music (`music1.mp3`), and bursts gold confetti.
   - Includes an accessible **"Skip to Invitation"** button for reduced motion and direct access.

2. **Screen 2 — Royal Invitation & Hero**
   - High-end floral header (`topf.png`) and glowing chandeliers (`light.png`).
   - "ANGUR FAMILY PRESENTS" title.
   - Couple announcement: **Dr. Misba & Zubair** with custom royal **MZ** crest.
   - Bismillah in Arabic calligraphy with English translation.
   - Quranic Verse: Surah Ar-Rum (30:21).
   - Auspicious parental solicitation wording from **Mr. Haji Zainul Abedin Kamaluddin** (Angur Group / Ex-BJP General Secretary Minority Morcha, Gujarat).
   - Respectful remembrance of **Late Haji Shamim Ahmed Kamaluddin**.

3. **Screen 3 — Scratch to Reveal Wedding Date**
   - Interactive gold foil canvas scratch card.
   - Responsive touch scratching on mobile and mouse cursor scratching on desktop.
   - Scratching reveals: **`16 · DEC · 2026 · WEDNESDAY`**.
   - Auto-reveals with celebratory confetti when cleared over 38%.
   - Accessible **"Reveal Date Instantly"** button.

4. **Screen 4 — Live Wedding Countdown**
   - "Save The Date" calligraphy banner (`SAVE.png`).
   - Live real-time countdown to **Wednesday, 16th December 2026, 6:00 PM IST (Asia/Kolkata)**.
   - Days, Hours, Minutes, Seconds display with gold borders.

5. **Screen 5 — Wedding Events & Programme (From PDF)**
   - **Event 1: Haldi Ceremony**
     - Date: Monday, 14th December 2026
     - Schedule: Haldi: 6:00 PM | Dinner: 7:00 PM
     - Venue: 10 Angur House, Golden Park, Taslim Soc Road, Vatva, Ahmedabad
     - Google Maps directions button & Add to Calendar button.
   - **Event 2: Nikah Ceremony & Reception (Main Programme)**
     - Date: Wednesday, 16th December 2026
     - Schedule: Arrival of Barat: 6:00 PM | Dinner & Reception: 7:00 PM Onwards
     - Venue: Palm Green Club & Resort, NH. No. 08, Kheda Highway, Goblej, Gujarat
     - Google Maps directions button & Add to Calendar button.

6. **Screen 6 — Dress Code & Photo Gallery**
   - **Dress Code**: "Ethnic & Elegant / Traditional Festive" attire note.
   - **Photo Gallery**: Featured large portrait + editorial grid of wedding moments.
   - **Interactive Lightbox Modal**: Tap any photo to view full-screen, with Next/Previous navigation, touch swipe on mobile, and Escape key close.

7. **Screen 7 — Family Honors, RSVP & Closing**
   - **With Respectful Remembrance**: Late Shamim Ahmed K.
   - **Cordially Welcoming You**: Sadik Amin I, Abu Bakar K., Mohd. Aarif, Mohd. Shoaib S., Mohd. Arbaz A., Mohd Adnan A., Mohd. Alfez A., Hafiz Mohd. Sohem Z.
   - **:: Damad ::**: Mohd. Asim, Mohd. Sajid, Mohd. Sarhan.
   - Direct Inquiry phone buttons: `+91 98240 48963` and `+91 92278 68786`.
   - **Interactive RSVP System**:
     - Mode 1: Send formatted RSVP directly to family WhatsApp (`+91 98240 48963`).
     - Mode 2: Save RSVP locally in browser storage with instant confirmation toast.
   - **WhatsApp Sharing**: 1-click button to share the invitation link on WhatsApp.
   - Insha Allah calligraphy & "With Best Compliments: Angur Family & All Relatives & Friends".

---

## 🛠️ How to Customize Wedding Details

All details are centralized in [`wedding-config.js`](./wedding-config.js). You can edit:
- Bride and groom names, titles, and bio
- Wedding date, time, and timezone
- Event venues, addresses, and Google Maps links
- Family host names, remembrance, and welcoming list
- Family WhatsApp number and inquiry phone numbers
- Background music volume and autoplay settings
- Gallery images and captions

---

## 🚀 How to Run Locally

You can run this project with any local HTTP server (Python, Node.js, VS Code Live Server, or PowerShell):

### Option 1: Using Python
```bash
python -m http.server 3000
```
Open `http://localhost:3000` in your browser.

### Option 2: Using Node `npx serve`
```bash
npx serve .
```

### Option 3: Direct File Opening
Double click `index.html` in your file explorer to open it in Chrome/Edge/Firefox.

---

## ☁️ Deployment to Vercel

1. Push this folder to your GitHub repository (or import directly in Vercel):
   ```bash
   git add .
   git commit -m "feat: complete luxury wedding invitation website"
   git push origin main
   ```
2. In [Vercel Dashboard](https://vercel.com/new), select your repository and click **Deploy**.
3. Zero build commands are needed (it's pure static HTML5, CSS3, ES6 JavaScript).
