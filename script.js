/**
 * ====================================================================
 * LUXURY WEDDING INVITATION — INTERACTIVE ENGINE
 * Dr. Misba & Zubair · 16th December 2026
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // Global Elements
    const heroSection = document.getElementById('heroSection');
    const safarText = document.getElementById('safarText');
    const music = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const scrollDownTrigger = document.getElementById('scrollDownTrigger');
    const toastNotification = document.getElementById('toastNotification');

    let isMusicPlaying = false;
    let shouldResumeAfterFocus = false;
    let hasEnvelopeOpened = false;

    // Set gentle background music volume
    if (music) {
        music.volume = (window.WEDDING_CONFIG && window.WEDDING_CONFIG.audio) ? window.WEDDING_CONFIG.audio.defaultVolume : 0.35;
    }

    // ====================================================================
    // 1. BACKGROUND MUSIC CONTROLLER
    // ====================================================================
    function updateMusicButtonUI(playing) {
        if (!musicToggle) return;
        if (playing) {
            musicToggle.classList.add('playing');
            musicToggle.setAttribute('title', 'Pause Music');
        } else {
            musicToggle.classList.remove('playing');
            musicToggle.setAttribute('title', 'Play Music');
        }
    }

    function playMusic() {
        if (!music) return;
        const playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isMusicPlaying = true;
                updateMusicButtonUI(true);
            }).catch(err => {
                console.warn("Autoplay was prevented by browser policy:", err);
                isMusicPlaying = false;
                updateMusicButtonUI(false);
            });
        }
    }

    function pauseMusic() {
        if (!music || music.paused) return;
        music.pause();
        isMusicPlaying = false;
        updateMusicButtonUI(false);
    }

    if (musicToggle) {
        musicToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isMusicPlaying) {
                pauseMusic();
                showToast("Music paused");
            } else {
                playMusic();
                showToast("Music playing");
            }
        });
    }

    // Tab visibility handling (pause on tab switch, resume on focus)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (music && !music.paused && isMusicPlaying) {
                pauseMusic();
                shouldResumeAfterFocus = true;
            }
        } else if (shouldResumeAfterFocus) {
            shouldResumeAfterFocus = false;
            playMusic();
        }
    });

    // ====================================================================
    // 2. HERO VIDEO & ENVELOPE OPENING (Exact Match to Reference Site)
    // ====================================================================
    const curtainVideo = document.getElementById('curtainVideo');
    const playOverlay = document.getElementById('playOverlay');
    const videoPoster = document.getElementById('videoPoster');
    const videoSealOverlay = document.getElementById('videoSealOverlay');

    async function triggerEnvelopeOpen() {
        if (hasEnvelopeOpened) return;
        hasEnvelopeOpened = true;

        // Start background music immediately
        playMusic();

        // 1. Fade out the video poster and tap overlay
        if (videoPoster) {
            videoPoster.style.opacity = '0';
            videoPoster.style.transition = 'opacity 0.4s ease';
            setTimeout(() => {
                videoPoster.style.display = 'none';
            }, 400);
        }

        if (playOverlay) {
            playOverlay.style.opacity = '0';
            playOverlay.style.pointerEvents = 'none';
            setTimeout(() => {
                playOverlay.style.display = 'none';
            }, 500);
        }

        // 2. Show the "A Beautiful Safar Unfolds..." cursive text
        if (safarText) {
            safarText.classList.add('show');
        }

        // 3. Play the envelope opening video
        if (curtainVideo) {
            try {
                await curtainVideo.play();
            } catch (err) {
                console.warn("Video playback error:", err);
            }
        }

        // 4. Smoothly lift the MZ seal overlay as flap unfolds open in video (~320ms)
        setTimeout(() => {
            if (videoSealOverlay) {
                videoSealOverlay.classList.add('opened');
            }
        }, 320);

        // Confetti celebratory burst
        if (typeof confetti === 'function') {
            try {
                confetti({
                    particleCount: 50,
                    spread: 60,
                    origin: { y: 0.7 },
                    colors: ['#c59b27', '#f1df9c', '#7e121e', '#ffffff']
                });
            } catch (e) {}
        }

        // Safety fallback timer if video ended event is delayed on mobile
        setTimeout(() => {
            dismissHeroSection();
        }, 3200);
    }

    if (playOverlay) {
        playOverlay.addEventListener('click', triggerEnvelopeOpen);
        playOverlay.addEventListener('touchstart', (e) => {
            e.preventDefault();
            triggerEnvelopeOpen();
        }, { passive: false });
    }

    if (curtainVideo) {
        curtainVideo.addEventListener('timeupdate', () => {
            if (curtainVideo.currentTime > 0.3 && videoSealOverlay && !videoSealOverlay.classList.contains('opened')) {
                videoSealOverlay.classList.add('opened');
            }
        });

        curtainVideo.addEventListener('ended', () => {
            dismissHeroSection();
        });
    }

    let hasDismissed = false;
    function dismissHeroSection() {
        if (!heroSection || hasDismissed) return;
        hasDismissed = true;
        heroSection.style.opacity = '0';
        heroSection.style.visibility = 'hidden';
        heroSection.style.transition = 'opacity 1.5s ease-in-out, visibility 1.5s ease-in-out';

        setTimeout(() => {
            heroSection.style.display = 'none';
            document.body.style.overflowY = 'auto';
            document.body.style.overflow = 'auto';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
    }


    // Smooth Scroll Down Indicator
    if (scrollDownTrigger) {
        scrollDownTrigger.addEventListener('click', () => {
            const nextSection = document.getElementById('scratchSection') || document.getElementById('eventsSection');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ====================================================================
    // 3. SCROLL REVEAL ANIMATIONS (Intersection Observer)
    // ====================================================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });

    document.querySelectorAll('.scroll-animate').forEach(el => revealObserver.observe(el));

    // ====================================================================
    // 4. INTERACTIVE SCRATCH CARD (DATE REVEAL)
    // ====================================================================
    setupScratchCard();

    // ====================================================================
    // 5. LIVE COUNTDOWN TIMER (16 DEC 2026 · ASIA/KOLKATA)
    // ====================================================================
    setupCountdownTimer();

    // ====================================================================
    // 6. AMBIENT PETALS & GOLD SPARKLES CANVAS
    // ====================================================================
    setupAmbientPetals();

    // ====================================================================
    // 7. QUICK SHARE & RSVPS
    // ====================================================================
    const quickShareBtn = document.getElementById('quickShareBtn');
    if (quickShareBtn) {
        quickShareBtn.addEventListener('click', shareOnWhatsApp);
    }
});

/**
 * ====================================================================
 * SCRATCH CARD ENGINE (Canvas Touch + Mouse)
 * ====================================================================
 */
function setupScratchCard() {
    const canvas = document.getElementById('scratchCanvas');
    const instantRevealBtn = document.getElementById('instantRevealBtn');
    const celebrationText = document.getElementById('scratchCelebrationText');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let isRevealed = false;
    let totalPixels = 0;

    function initCanvas() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width || 380;
        canvas.height = rect.height || 150;
        totalPixels = canvas.width * canvas.height;

        // Draw Metallic Gold / Burgundy Foil Coating
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, '#5a0a12');
        grad.addColorStop(0.35, '#911b27');
        grad.addColorStop(0.65, '#c59b27');
        grad.addColorStop(1, '#610b14');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add subtle gold shimmer specks
        ctx.fillStyle = 'rgba(255, 235, 170, 0.45)';
        for (let i = 0; i < 90; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const r = Math.random() * 2 + 1;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }

        // Add instruction text on the scratch surface
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px Cinzel, Montserrat, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('✦ SCRATCH HERE TO REVEAL DATE ✦', canvas.width / 2, canvas.height / 2);
    }

    // Call after fonts load or brief delay
    setTimeout(initCanvas, 150);
    window.addEventListener('resize', () => {
        if (!isRevealed) initCanvas();
    });

    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    function scratch(e) {
        if (!isDrawing || isRevealed) return;
        const pos = getPosition(e);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
        ctx.fill();
        checkScratchPercentage();
    }

    function checkScratchPercentage() {
        if (isRevealed) return;
        try {
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let clearedCount = 0;
            // Sample every 16th pixel for high performance
            for (let i = 3; i < imgData.data.length; i += 16) {
                if (imgData.data[i] === 0) {
                    clearedCount++;
                }
            }
            const sampleTotal = totalPixels / 4;
            const percentage = (clearedCount / sampleTotal) * 100;

            if (percentage > 38) {
                revealEntireDate();
            }
        } catch (err) {
            // Fallback for security restriction
        }
    }

    function revealEntireDate() {
        if (isRevealed) return;
        isRevealed = true;
        canvas.style.transition = 'opacity 0.6s ease';
        canvas.style.opacity = '0';
        setTimeout(() => {
            canvas.style.display = 'none';
        }, 600);

        if (celebrationText) {
            celebrationText.style.display = 'block';
        }

        triggerConfetti(0.6);
        showToast("Wedding Date Revealed: 16th December 2026!");
    }

    // Mouse Listeners
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        scratch(e);
    });
    window.addEventListener('mousemove', (e) => {
        if (isDrawing) scratch(e);
    });
    window.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    // Touch Listeners
    canvas.addEventListener('touchstart', (e) => {
        isDrawing = true;
        scratch(e);
    }, { passive: true });
    canvas.addEventListener('touchmove', (e) => {
        if (isDrawing) scratch(e);
    }, { passive: true });
    canvas.addEventListener('touchend', () => {
        isDrawing = false;
    });

    // Instant Accessible Reveal Button
    if (instantRevealBtn) {
        instantRevealBtn.addEventListener('click', revealEntireDate);
    }
}

/**
 * ====================================================================
 * LIVE WEDDING COUNTDOWN TIMER (Asia/Kolkata)
 * Target: 16th December 2026, 6:00 PM IST
 * ====================================================================
 */
function setupCountdownTimer() {
    const daysEl = document.getElementById('daysCount');
    const hoursEl = document.getElementById('hoursCount');
    const minutesEl = document.getElementById('minutesCount');
    const secondsEl = document.getElementById('secondsCount');
    const statusEl = document.getElementById('countdownStatusText');
    if (!daysEl) return;

    // Wedding Target: 2026-12-16T18:00:00+05:30
    const targetDate = new Date("2026-12-16T18:00:00+05:30").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minutesEl.innerText = "00";
            secondsEl.innerText = "00";
            if (statusEl) {
                statusEl.innerText = "Alhamdulillah! The auspicious celebrations have begun! 🎉";
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerText = String(days).padStart(2, '0');
        hoursEl.innerText = String(hours).padStart(2, '0');
        minutesEl.innerText = String(minutes).padStart(2, '0');
        secondsEl.innerText = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/**
 * ====================================================================
 * CELEBRATORY CONFETTI & FLOWER SHOWER
 * ====================================================================
 */
function triggerConfetti(yOrigin = 0.5) {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 75,
            spread: 70,
            origin: { y: yOrigin },
            colors: ['#c59b27', '#f1df9c', '#7e121e', '#e8dfcd', '#ffffff']
        });
    }
}

/**
 * ====================================================================
 * AMBIENT FLOATING PETALS & PARTICLES
 * ====================================================================
 */
function setupAmbientPetals() {
    const canvas = document.getElementById('ambientPetalsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 3 + 2,
            speedY: Math.random() * 0.8 + 0.4,
            speedX: Math.sin(Math.random()) * 0.5,
            angle: Math.random() * 360,
            spin: Math.random() * 0.02 - 0.01,
            color: Math.random() > 0.4 ? 'rgba(197, 155, 39, 0.45)' : 'rgba(126, 18, 30, 0.35)'
        });
    }

    function renderPetals() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.y += p.speedY;
            p.x += Math.sin(p.angle) * 0.4;
            p.angle += p.spin;

            if (p.y > height + 10) {
                p.y = -10;
                p.x = Math.random() * width;
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.ellipse(0, 0, p.radius * 1.5, p.radius, Math.PI / 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        requestAnimationFrame(renderPetals);
    }

    renderPetals();
}

/**
 * ====================================================================
 * GOOGLE CALENDAR & ADD TO CALENDAR
 * ====================================================================
 */
function addToGoogleCalendar(eventId) {
    let title = "";
    let details = "";
    let location = "";
    let dates = "";

    if (eventId === 'haldi') {
        title = encodeURIComponent("Haldi Ceremony — Dr. Misba & Zubair");
        details = encodeURIComponent("Haldi Ceremony (6:00 PM) followed by Dinner (7:00 PM). Hosted by Mr. Haji Zainul Abedin Kamaluddin & Angur Family.");
        location = encodeURIComponent("10 Angur House, Golden Park, Taslim Soc Road, Vatva, Ahmedabad, Gujarat");
        // 20261214T123000Z to 20261214T163000Z (18:00 - 22:00 IST)
        dates = "20261214T123000Z/20261214T163000Z";
    } else {
        title = encodeURIComponent("Nikah Ceremony & Reception — Dr. Misba & Zubair");
        details = encodeURIComponent("Nikah Ceremony & Wedding Programme. Arrival of Barat at 6:00 PM, Dinner & Reception at 7:00 PM. Hosted by Angur Family.");
        location = encodeURIComponent("Palm Green Club & Resort, NH. No. 08, Kheda Highway, Goblej, Gujarat");
        // 20261216T123000Z to 20261216T180000Z (18:00 - 23:30 IST)
        dates = "20261216T123000Z/20261216T180000Z";
    }

    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
    window.open(gCalUrl, '_blank');
}

/**
 * ====================================================================
 * PHOTO GALLERY LIGHTBOX SYSTEM
 * ====================================================================
 */
const galleryImages = [
    { src: 'assests/images/venue1.jpg', caption: 'Grand Wedding Lawn & Banquet Decor · Palm Green Club & Resort' },
    { src: 'assests/images/venue2.png', caption: 'Royal Resort Architecture & Palm Landscape · Palm Green Club & Resort' },
    { src: 'assests/images/venue3.png', caption: 'Grand Celebration Lawn & Night Illuminations · Palm Green Club & Resort' },
    { src: 'assests/images/venue4.png', caption: 'Poolside Luxury Wedding Ambience · Palm Green Club & Resort' }
];

let activeLightboxIndex = 0;

function openLightbox(index) {
    const lightbox = document.getElementById('galleryLightbox');
    const activeImg = document.getElementById('lightboxActiveImg');
    const captionEl = document.getElementById('lightboxCaption');
    const counterEl = document.getElementById('lightboxCounter');

    if (!lightbox || !activeImg) return;

    activeLightboxIndex = (index + galleryImages.length) % galleryImages.length;
    const item = galleryImages[activeLightboxIndex];

    activeImg.src = item.src;
    if (captionEl) captionEl.innerText = item.caption;
    if (counterEl) counterEl.innerText = `${activeLightboxIndex + 1} / ${galleryImages.length}`;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('galleryLightbox');
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function navigateLightbox(dir) {
    openLightbox(activeLightboxIndex + dir);
}

// Keyboard navigation
window.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('galleryLightbox');
    if (!lightbox || !lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

// Mobile touch swipe for lightbox
let touchStartX = 0;
let touchEndX = 0;

const lightboxEl = document.getElementById('galleryLightbox');
if (lightboxEl) {
    lightboxEl.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxEl.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
        if (diff > 0) {
            navigateLightbox(-1); // Swipe right -> Previous
        } else {
            navigateLightbox(1);  // Swipe left -> Next
        }
    }
}

/**
 * ====================================================================
 * RSVP SYSTEM (WhatsApp Submission + Local Storage)
 * ====================================================================
 */
function handleRsvpSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitter = e.submitter ? e.submitter.value : 'whatsapp';

    const guestName = document.getElementById('guestName').value.trim();
    const attendanceStatus = form.elements['attendanceStatus'].value;
    const guestCount = document.getElementById('guestCount').value;
    const attendingEvents = document.getElementById('attendingEvents').value;
    const guestDua = document.getElementById('guestDua').value.trim();

    if (!guestName) {
        showToast("Please enter your name");
        return;
    }

    const familyWaNumber = (window.WEDDING_CONFIG && window.WEDDING_CONFIG.contact) ? window.WEDDING_CONFIG.contact.whatsappNumber : "919824048963";

    if (submitter === 'whatsapp') {
        let msg = `*WEDDING RSVP — Dr. Misba & Zubair*\n\n`;
        msg += `Assalamu Alaikum / Greetings,\n`;
        msg += `• *Guest Name:* ${guestName}\n`;
        msg += `• *Attendance:* ${attendanceStatus === 'Accept' ? '✅ Joyfully Accepting' : '❌ Regretfully Declining'}\n`;
        if (attendanceStatus === 'Accept') {
            msg += `• *Total Guests:* ${guestCount}\n`;
            msg += `• *Attending Events:* ${attendingEvents}\n`;
        }
        if (guestDua) {
            msg += `• *Dua / Wishes:* ${guestDua}\n`;
        }
        msg += `\nThank you for the warm invitation!`;

        const waUrl = `https://wa.me/${familyWaNumber}?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank');
        showToast("Opening WhatsApp to send your RSVP...");
    } else {
        // Save locally to browser
        const rsvpData = {
            name: guestName,
            status: attendanceStatus,
            guests: guestCount,
            events: attendingEvents,
            message: guestDua,
            submittedAt: new Date().toISOString()
        };

        try {
            const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
            existing.push(rsvpData);
            localStorage.setItem('wedding_rsvps', JSON.stringify(existing));
        } catch (err) {
            console.warn("Could not save to localStorage:", err);
        }

        const feedbackBox = document.getElementById('rsvpSuccessFeedback');
        if (feedbackBox) {
            feedbackBox.className = "rsvp-feedback-box success";
            feedbackBox.innerHTML = `Alhamdulillah! Jazakallah Khair <strong>${guestName}</strong>.<br>Your RSVP has been saved. We eagerly await celebrating together!`;
        }
        showToast("RSVP saved successfully! ✨");
    }
}

/**
 * ====================================================================
 * SHARING & CLIPBOARD UTILITIES
 * ====================================================================
 */
function shareOnWhatsApp() {
    const pageUrl = window.location.href;
    const text = `*Wedding Invitation — Dr. Misba & Zubair*\n\nIn the name of Allah, the Most Beneficent & Merciful.\nYou are cordially invited to celebrate the Nikah of Dr. Misba & Zubair on 16th December 2026.\n\nView the interactive digital invitation card:\n${pageUrl}`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
}

function copyInvitationLink() {
    const pageUrl = window.location.href;
    const copyTextEl = document.getElementById('copyLinkText');

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(pageUrl).then(() => {
            if (copyTextEl) copyTextEl.innerText = "Link Copied! ✓";
            showToast("Invitation link copied to clipboard! 📋");
            setTimeout(() => {
                if (copyTextEl) copyTextEl.innerText = "Copy Link";
            }, 2500);
        }).catch(() => {
            fallbackCopyText(pageUrl);
        });
    } else {
        fallbackCopyText(pageUrl);
    }
}

function fallbackCopyText(text) {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast("Invitation link copied! 📋");
}

/**
 * Toast Notification Helper
 */
function showToast(message) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;
    toast.innerText = message;
    toast.classList.add('active');

    setTimeout(() => {
        toast.classList.remove('active');
    }, 2800);
}

/**
 * ====================================================================
 * ❤️ FLOATING RED HEARTS TRAIL EFFECT (Touch & Mouse Cursor)
 * Inspired by hafsa-weds-anas.vercel.app
 * ====================================================================
 */
(function setupHeartTrail() {
    let lastHeartSpawnTime = 0;

    function spawnHeartAt(x, y) {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.style.left = (x - 6) + "px";
        heart.style.top = (y - 6) + "px";
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 1000);
    }

    function createHeart(e) {
        const now = Date.now();
        if (now - lastHeartSpawnTime < 35) return; // 35ms throttle for silky smooth 60fps performance
        lastHeartSpawnTime = now;

        if (e.touches && e.touches.length > 0) {
            for (let i = 0; i < e.touches.length; i++) {
                spawnHeartAt(e.touches[i].clientX, e.touches[i].clientY);
            }
        } else {
            spawnHeartAt(e.clientX, e.clientY);
        }
    }

    document.addEventListener('mousemove', createHeart, { passive: true });
    document.addEventListener('touchstart', createHeart, { passive: true });
    document.addEventListener('touchmove', createHeart, { passive: true });
})();
