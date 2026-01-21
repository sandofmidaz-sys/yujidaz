const envelope = document.getElementById("envelope");
const envelopeContainer = document.getElementById("envelopeContainer");
const mainCard = document.getElementById("mainCard");
const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");
const celebration = document.getElementById("celebration");
const floatingContainer = document.getElementById("floating-emojis");
const dodgeDistance = 150;

// Cute emojis for drifting
const driftingEmojis = ['💖','✨','🌸','💌','🐱','🎀','🍬'];

// ------------------ DRIFTING EMOJIS ------------------
function spawnDriftingEmoji() {
    const el = document.createElement('div');
    el.textContent = driftingEmojis[Math.floor(Math.random() * driftingEmojis.length)];
    el.style.left = Math.random() * window.innerWidth + 'px';
    el.style.top = window.innerHeight + 'px';
    el.style.fontSize = (Math.random() * 24 + 20) + 'px';
    el.style.opacity = Math.random() * 0.8 + 0.2;
    floatingContainer.appendChild(el);

    let posY = window.innerHeight;
    const speed = Math.random() * 1.5 + 0.5;

    const interval = setInterval(() => {
        posY -= speed;
        el.style.top = posY + 'px';
        if (posY < -50) {
            el.remove();
            clearInterval(interval);
        }
    }, 20);
}

// Spawn emojis continuously
setInterval(spawnDriftingEmoji, 300);

// ------------------ ENVELOPE OPEN ------------------
envelopeContainer.addEventListener('click', () => {
    envelope.classList.add('open');

    setTimeout(() => {
        envelopeContainer.style.display = 'none';
        mainCard.classList.remove('hidden');
    }, 600);
});

// ------------------ NO BUTTON DODGE ------------------
noButton.addEventListener('mousemove', (e) => {
    const rect = noButton.getBoundingClientRect();
    const cursorX = e.clientX;
    const cursorY = e.clientY;

    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const dx = btnCenterX - cursorX;
    const dy = btnCenterY - cursorY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) {
        let newX = rect.left + dx / distance * dodgeDistance;
        let newY = rect.top + dy / distance * dodgeDistance;

        newX = Math.max(10, Math.min(window.innerWidth - rect.width - 10, newX));
        newY = Math.max(10, Math.min(window.innerHeight - rect.height - 10, newY));

        noButton.style.left = newX + 'px';
        noButton.style.top = newY + 'px';
    }
});

// ------------------ YES BUTTON ------------------
yesButton.addEventListener('click', () => {
    celebration.classList.remove('hidden');
    spawnCelebration('💖', 30);
    spawnCelebration('✨', 25);
    spawnCelebration('🎉', 20);
});

// ------------------ CELEBRATION EMOJIS ------------------
function spawnCelebration(emoji, count) {
    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.textContent = emoji;
        el.style.position = 'fixed';
        el.style.left = Math.random() * window.innerWidth + 'px';
        el.style.top = Math.random() * window.innerHeight + 'px';
        el.style.fontSize = (Math.random() * 30 + 20) + 'px';
        el.style.pointerEvents = 'none';
        el.style.transition = 'all 3s linear';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3000);
    }
}
