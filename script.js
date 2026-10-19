document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('curtainVideo');
    const playOverlay = document.getElementById('playOverlay');
    const heroSection = document.getElementById('heroSection');
    const music = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicIcon = document.getElementById('musicIcon');
    const safarText = document.getElementById('safarText');

    let isMusicPlaying = false;
    let shouldResumeAfterFocus = false;

    // Set gentle background music volume
    if (music) {
        music.volume = 0.35;
    }

    // Music helper functions
    function setMusicButtonIcon(playing) {
        if (musicIcon) {
            musicIcon.setAttribute('icon', playing ? 'lucide:volume-2' : 'lucide:volume-x');
        }
    }

    function startMusic() {
        if (!music) return;
        music.play().then(() => {
            isMusicPlaying = true;
            setMusicButtonIcon(true);
        }).catch(() => {
            isMusicPlaying = false;
            setMusicButtonIcon(false);
        });
    }

    function pauseMusic() {
        if (!music || music.paused) return;
        music.pause();
        isMusicPlaying = false;
        setMusicButtonIcon(false);
    }

    // Music toggle button
    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            if (isMusicPlaying) {
                pauseMusic();
            } else {
                startMusic();
            }
        });
    }

    // Handle tab visibility change for audio
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (music && !music.paused && isMusicPlaying) {
                pauseMusic();
                shouldResumeAfterFocus = true;
            }
        } else if (shouldResumeAfterFocus) {
            shouldResumeAfterFocus = false;
            startMusic();
        }
    });

    // Opening Curtain / Video Trigger
    if (playOverlay) {
        playOverlay.addEventListener('click', async () => {
            const poster = document.getElementById('videoPoster');
            if (poster) {
                poster.style.opacity = '0';
                poster.style.transition = 'opacity 0.6s ease';
                setTimeout(() => {
                    poster.style.display = 'none';
                }, 600);
            }

            playOverlay.style.opacity = '0';
            playOverlay.style.pointerEvents = 'none';

            if (safarText) {
                safarText.classList.add('show');
            }

            setTimeout(() => {
                playOverlay.style.display = 'none';
            }, 600);

            if (video) {
                try {
                    await video.play();
                } catch (error) {
                    console.warn("Video playback was interrupted or restricted:", error);
                }
            }

            startMusic();
        });
    }

    // When opening curtain video ends, unlock scroll & fade hero
    if (video) {
        video.addEventListener('ended', () => {
            if (heroSection) {
                heroSection.style.opacity = '0';
                heroSection.style.visibility = 'hidden';

                setTimeout(() => {
                    heroSection.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    window.scrollTo(0, 0);
                }, 1500);
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Fallback if video is clicked or cannot play
    if (heroSection) {
        heroSection.addEventListener('dblclick', () => {
            heroSection.style.opacity = '0';
            setTimeout(() => {
                heroSection.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 600);
        });
    }

    // Scroll reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15
    });

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

    // Initialize Scratch Cards
    setupScratchCards();

    // Initialize Countdown Timer for Dec 16, 2026
    setupCountdown();

    // Initialize RSVP
    setupRSVP();
});

// Setup Interactive Metallic Scratch Cards
function setupScratchCards() {
    const canvases = document.querySelectorAll('.scratch-canvas');

    canvases.forEach(canvas => {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        let isDrawing = false;
        let isCompleted = false;
        let lastX = 0;
        let lastY = 0;

        // Apply Gold / Burgundy Metallic Conic Texture
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        let gradient;

        if (ctx.createConicGradient) {
            gradient = ctx.createConicGradient(0, cx, cy);
            gradient.addColorStop(0, "#610B14");
            gradient.addColorStop(0.15, "#efe3cf");
            gradient.addColorStop(0.3, "#b49a72");
            gradient.addColorStop(0.5, "#610B14");
            gradient.addColorStop(0.65, "#fff5df");
            gradient.addColorStop(0.8, "#d2c1a5");
            gradient.addColorStop(1, "#610B14");
        } else {
            gradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, cx);
            gradient.addColorStop(0, "#efe3cf");
            gradient.addColorStop(0.5, "#b49a72");
            gradient.addColorStop(1, "#610B14");
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Subtle glitter noise
        ctx.fillStyle = "rgba(255,255,255,0.06)";
        for (let i = 0; i < 300; i++) {
            ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
        }

        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 26;

        function getMousePos(e) {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            let clientX = e.clientX;
            let clientY = e.clientY;

            if (e.touches && e.touches.length > 0) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else if (e.changedTouches && e.changedTouches.length > 0) {
                clientX = e.changedTouches[0].clientX;
                clientY = e.changedTouches[0].clientY;
            }

            return {
                x: (clientX - rect.left) * scaleX,
                y: (clientY - rect.top) * scaleY
            };
        }

        function scratch(e) {
            if (!isDrawing || isCompleted) return;
            e.preventDefault();

            const pos = getMousePos(e);
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();

            lastX = pos.x;
            lastY = pos.y;

            checkCompletion();
        }

        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            const pos = getMousePos(e);
            lastX = pos.x;
            lastY = pos.y;
        });

        canvas.addEventListener('mousemove', scratch);
        window.addEventListener('mouseup', () => { isDrawing = false; });

        canvas.addEventListener('touchstart', (e) => {
            isDrawing = true;
            const pos = getMousePos(e);
            lastX = pos.x;
            lastY = pos.y;
        }, { passive: false });

        canvas.addEventListener('touchmove', scratch, { passive: false });
        window.addEventListener('touchend', () => { isDrawing = false; });

        function checkCompletion() {
            if (isCompleted) return;

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let transparentPixels = 0;
            const totalPixels = imageData.data.length / 4;

            for (let i = 3; i < imageData.data.length; i += 16) {
                if (imageData.data[i] < 50) {
                    transparentPixels++;
                }
            }

            const ratio = transparentPixels / (totalPixels / 4);
            if (ratio > 0.08) { // Once 8% is scratched, reveal smoothly
                isCompleted = true;
                canvas.style.transition = 'opacity 0.4s ease';
                canvas.style.opacity = '0';

                const base = canvas.parentElement.querySelector('.scratch-base');
                if (base) base.classList.add('scratched-pop');

                setTimeout(() => {
                    canvas.style.display = 'none';
                }, 400);

                triggerConfetti(canvas);
            }
        }
    });
}

// Celebration Confetti
function triggerConfetti(element) {
    let originY = 0.5;
    let originX = 0.5;

    if (element) {
        const rect = element.getBoundingClientRect();
        originY = (rect.top + rect.height / 2) / window.innerHeight;
        originX = (rect.left + rect.width / 2) / window.innerWidth;
    }

    if (typeof confetti === 'function') {
        confetti({
            particleCount: 130,
            spread: 110,
            origin: { x: originX, y: originY },
            colors: ['#610B14', '#b49a72', '#efe3cf', '#8a1320', '#f4e0c3'],
            shapes: ['circle', 'square'],
            scalar: 1.15,
            zIndex: 9999
        });
    }
}

// Countdown Timer for Nikah Ceremony (December 16, 2026 18:00:00)
function setupCountdown() {
    const countdownDate = new Date("December 16, 2026 18:00:00").getTime();

    const dEl = document.getElementById("days");
    const hEl = document.getElementById("hours");
    const mEl = document.getElementById("minutes");
    const sEl = document.getElementById("seconds");

    function update() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            if (dEl) dEl.innerText = "00";
            if (hEl) hEl.innerText = "00";
            if (mEl) mEl.innerText = "00";
            if (sEl) sEl.innerText = "00";
            return;
        }

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (dEl) dEl.innerText = days < 10 ? '0' + days : days;
        if (hEl) hEl.innerText = hours < 10 ? '0' + hours : hours;
        if (mEl) mEl.innerText = minutes < 10 ? '0' + minutes : minutes;
        if (sEl) sEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    }

    update();
    setInterval(update, 1000);
}

// RSVP Interaction
function setupRSVP() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const message = document.getElementById('rsvpMessage');

    if (yesBtn && message) {
        yesBtn.addEventListener('click', (e) => {
            message.innerText = "Alhamdulillah! Can't wait to celebrate with you 🎉";
            message.style.opacity = '1';

            yesBtn.classList.add('happy');
            setTimeout(() => yesBtn.classList.remove('happy'), 600);

            triggerConfetti(yesBtn);
        });
    }

    if (noBtn && message) {
        noBtn.addEventListener('click', () => {
            message.innerText = "You will be dearly missed & remembered in our prayers ❤️";
            message.style.opacity = '1';

            noBtn.classList.add('sad');
            setTimeout(() => noBtn.classList.remove('sad'), 500);
        });
    }
}

// Floating Heart Trail on Cursor / Touch
let lastHeartTime = 0;
function createHeart(e) {
    const now = Date.now();
    if (now - lastHeartTime < 180) return;
    lastHeartTime = now;

    let x = e.clientX;
    let y = e.clientY;

    if (e.touches && e.touches.length > 0) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
    }

    if (!x || !y) return;

    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = (x - 6) + "px";
    heart.style.top = (y - 6) + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1000);
}

document.addEventListener('mousemove', createHeart);
document.addEventListener('touchmove', createHeart, { passive: true });
