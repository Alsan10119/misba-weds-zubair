/**
 * ====================================================================
 * WEDDING INVITATION CONFIGURATION
 * ====================================================================
 * Single source of truth for the wedding invitation website.
 */

const WEDDING_CONFIG = {
  // Couple Information
  couple: {
    bride: {
      fullName: "Dr. Misba",
      title: "Dr.",
      fatherName: "Mr. Haji Zainul Abedin Kamaluddin",
      relationText: "D/o Mr. Haji Zainul Abedin Kamaluddin",
      bio: "Beloved daughter, physician, bringing grace and kindness into this new journey."
    },
    groom: {
      fullName: "Zubair",
      title: "Mr.",
      fatherName: "Haji Yahya Sahab",
      city: "Delhi",
      relationText: "S/o Haji Yahya Sahab (Delhi)",
      bio: "Beloved son, beginning a lifetime of love, faith, and companionship."
    },
    monogram: "MZ",
    tagline: "Celebrating Love & Happiness",
    islamicHeading: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
    islamicTranslation: "In the name of Allah, the Most Beneficent & the Most Merciful",
    quranicVerse: {
      arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
      english: "“And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts.”",
      surah: "Surah Ar-Rum (30:21)"
    }
  },

  // Main Wedding Event Date for Countdown & Scratch Reveal
  mainDate: {
    year: 2026,
    month: 12, // December (1-12)
    day: 16,
    hour: 18, // 6:00 PM
    minute: 0,
    timezone: "Asia/Kolkata",
    displayDate: "Wednesday, 16th December 2026",
    shortDisplay: "16 · DEC · 2026",
    targetTimeDisplay: "Wednesday, 16 Dec 2026 · 6:00 PM IST"
  },

  // Host & Family Information (Extracted from Invitation Card)
  host: {
    familyTitle: "ANGUR FAMILY",
    company: "ANGUR FOODS PVT. LTD.",
    headName: "MR. HAJI ZAINUL ABEDIN KAMALUDDIN",
    designation: "Ex - BJP General Secretary Minority Morcha, Gujarat Pradesh",
    headquarters: "Angur House, C-8/9, Bharat Small Industrial Estate, B/H Gujarat Offset, Vatva, Ahmedabad - 382445 (Gujarat) India",
    invitationWording: "Solicit your gracious presence & blessings on the auspicious ceremony of the Nikah of their beloved daughter",
    remembrance: "LATE HAJI SHAMIM AHMED KAMALUDDIN",
    rsvpLate: "Late Shamim Ahmed K.",
    welcomingFamily: [
      "Sadik Amin I",
      "Abu Bakar K.",
      "Mohd. Aarif",
      "Mohd. Shoaib S.",
      "Mohd. Arbaz A.",
      "Mohd Adnan A.",
      "Mohd. Alfez A.",
      "Hafiz Mohd. Sohem Z."
    ],
    damadList: [
      "Mohd. Asim",
      "Mohd. Sajid",
      "Mohd. Sarhan"
    ],
    compliments: "Angur Family & All Relatives & Friends"
  },

  // Contact Details
  contact: {
    primaryPhone: "+919824048963",
    secondaryPhone: "+919227868786",
    displayPrimaryPhone: "+91 98240 48963",
    displaySecondaryPhone: "+91 92278 68786",
    whatsappNumber: "919824048963",
    email: "zainul8963@yahoo.com"
  },

  // Wedding Events (Timeline) — Haldi removed as per request
  events: [
    {
      id: "nikah",
      title: "NIKAH CEREMONY",
      subtitle: "Insha Allah · Two Souls United in Love & Faith · Qubool Hai",
      dateText: "Wednesday, 16th December 2026",
      calendarDate: "2026-12-16",
      startIso: "2026-12-16T18:00:00+05:30",
      endIso: "2026-12-16T23:30:00+05:30",
      highlight: true,
      schedule: [
        { label: "Arrival of Barat", time: "6:00 PM" },
        { label: "Nikah Ceremony", time: "6:30 PM" },
        { label: "Dinner", time: "7:00 PM Onwards" }
      ],
      venue: "Palm Green Club & Resort",
      address: "NH. No. 08, Kheda Highway, Goblej, Gujarat",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Palm+Green+Club+and+Resort+Goblej+Gujarat",
      icon: "solar:rings-wedding-bold-duotone",
      dressCodeNote: "Royal Ethnic & Formal Elegance"
    }
  ],

  // Dress Code Suggestions
  dressCode: {
    heading: "Dress Code & Attire",
    title: "Ethnic & Elegant",
    description: "Traditional Indian & Ethnic Wear — wear what makes you feel joyous and comfortable. Your warm presence, gracious smiles, and prayers are our greatest blessings!"
  },

  // Photo Gallery (Palm Green Club & Resort Venue Photos)
  gallery: [
    {
      url: "assests/images/venue1.jpg",
      caption: "Grand Wedding Lawn & Banquet Decor · Palm Green Club & Resort",
      tag: "Wedding Venue"
    },
    {
      url: "assests/images/venue2.png",
      caption: "Royal Entrance & Palm Landscape · Palm Green Club & Resort",
      tag: "Resort Ambience"
    },
    {
      url: "assests/images/venue3.png",
      caption: "Grand Celebration Lawn & Night Illuminations · Palm Green Club & Resort",
      tag: "Night Decor"
    },
    {
      url: "assests/images/venue4.png",
      caption: "Poolside Luxury Wedding Setup · Palm Green Club & Resort",
      tag: "Poolside Lawn"
    }
  ],

  // Background Audio Settings
  audio: {
    src: "assests/audio/music1.mp3",
    defaultVolume: 0.4,
    autoPlayOnInteraction: true
  },

  // Video Background / Curtain Animation
  video: {
    src: "assests/videos/nadavd.mp4",
    poster: "assests/images/first.png"
  },

  // Features Visibility Switches
  features: {
    showEnvelopeAnimation: true,
    showScratchCard: true,
    showCountdown: true,
    showEvents: true,
    showDressCode: true,
    showGallery: true,
    showFamilyList: true,
    showRsvpWhatsApp: true,
    showRsvpLocalStore: true,
    showShareButtons: true
  }
};

// Export to window
if (typeof window !== "undefined") {
  window.WEDDING_CONFIG = WEDDING_CONFIG;
}
