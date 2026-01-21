const gameContainer = document.getElementById("gameContainer");
const envelopeContainer = document.getElementById("envelopeContainer");
const envelope = document.getElementById("envelope");
const mainCard = document.getElementById("mainCard");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const celebration = document.getElementById("celebration");
const floatingContainer = document.getElementById("floating-emojis");

const dodgeDistance = 150;
const driftingEmojis = ['💖','✨','🌸','💌','🐱','🎀','🍬'];

// ------------------ DRIFTING EMOJIS ------------------
function spawnDriftingEmoji() {
    const el = document.createElement('div');
    el.textContent = driftingEmojis[Math.floor(Math.random() * driftingEmojis.length)];
    el.style.left = Math.random() * window.innerWidth + 'px';
    el.style.top = Math.random() * window.innerHeight + 'px';
    el.style.fontSize = (Math.random() * 24 + 20) + 'px';
    el.style.opacity = Math.random() * 0.8 + 0.2;
    floatingContainer.appendChild(el);

    let posY = parseFloat(el.style.top);
    let sway = Math.random() * 2 - 1;
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
setInterval(spawnDriftingEmoji, 500);

// ------------------ MINI-GAME: DRIFTING HEARTS ------------------
function spawnCatchHeart() {
    const heart = document.createElement('div');
    heart.textContent = '💖';
    heart.className = 'catch-heart';
    heart.style.left = Math.random() * (window.innerWidth - 80) + 'px';
    heart.style.top = Math.random() * (window.innerHeight - 80) + 'px';
    gameContainer.appendChild(heart);

    let dx = Math.random() * 2 - 1;
    let dy = Math.random() * 2 - 1;

    function move() {
        let x = parseFloat(heart.style.left) + dx*2;
        let y = parseFloat(heart.style.top) + dy*2;

        if (x < 0 || x > window.innerWidth-60) dx *= -1;
        if (y < 0 || y > window.innerHeight-60) dy *= -1;

        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        requestAnimationFrame(move);
    }
    move();

    heart.addEventListener('click', () => {
        gameContainer.classList.add('hidden');
        envelopeContainer.classList.remove('hidden');
        envelopeContainer.style.display = 'block';
    });
}

// spawn multiple drifting hearts
for (let i=0; i<5; i++) spawnCatchHeart();

// ------------------ ENVELOPE OPEN ------------------
envelopeContainer.addEventListener('click', () => {
    envelope.classList.add('open');
    envelopeContainer.style.pointerEvents = 'none';
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

// ------------------ YES BUTTON CELEBRATION ------------------
yesButton.addEventListener('click', () => {
    celebration.classList.remove('hidden');
    spawnCelebration('💖', 30);
    spawnCelebration('✨', 25);
    spawnCelebration('🎉', 20);
});

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
