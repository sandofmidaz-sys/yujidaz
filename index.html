const gameContainer = document.getElementById("gameContainer");
const catchHeart = document.getElementById("catchHeart");
const envelopeContainer = document.getElementById("envelopeContainer");
const envelope = document.getElementById("envelope");
const mainCard = document.getElementById("mainCard");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const celebration = document.getElementById("celebration");
const floatingContainer = document.getElementById("floating-emojis");

const dodgeDistance = 150;

// ------------------ DRIFTING EMOJIS ------------------
const driftingEmojis = ['💖','✨','🌸','💌','🐱','🎀','🍬'];

function spawnDriftingEmoji() {
    const el = document.createElement('div');
    el.textContent = driftingEmojis[Math.floor(Math.random() * driftingEmojis.length)];
    el.style.left = Math.random() * window.innerWidth + 'px';
    el.style.top = Math.random() * window.innerHeight + 'px';
    el.style.fontSize = (Math.random() * 24 + 20) + 'px';
    el.style.opacity = Math.random() * 0.8 + 0.2;
    floatingContainer.appendChild(el);

    let posY = parseFloat(el.style.top);
    let sway = Math.random() * 2 - 1; // horizontal sway
    let swayDirection = Math.random() < 0.5 ? -1 : 1;

    function drift() {
        posY -= 0.5;
        let posX = parseFloat(el.style.left) + sway * swayDirection;
        el.style.top = posY + 'px';
        el.style.left = posX + 'px';

        sway += Math.random() * 0.2 - 0.1;
        if (posY < -50) el.remove();
        else requestAnimationFrame(drift);
    }

    drift();
}

// Spawn emojis continuously
setInterval(spawnDriftingEmoji, 500);

// ------------------ MINI-GAME: CATCH THE HEART ------------------
catchHeart.style.left = `${Math.random()*window.innerWidth/2 + window.innerWidth/4}px`;
catchHeart.style.top = `${Math.random()*window.innerHeight/2 + window.innerHeight/4}px`;

catchHeart.addEventListener('click', () => {
    gameContainer.classList.add('hidden');
    envelopeContainer.classList.remove('hidden');
});

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
