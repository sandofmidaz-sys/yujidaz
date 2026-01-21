const noButton = document.getElementById("noButton");
const yesButton = document.getElementById("yesButton");
const celebration = document.getElementById("celebration");

const dodgeDistance = 150; // how far button moves away

// NO button dodges cursor
noButton.addEventListener('mousemove', (e) => {
    const rect = noButton.getBoundingClientRect();
    const cursorX = e.clientX;
    const cursorY = e.clientY;

    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    // Calculate distance from cursor to button center
    const dx = btnCenterX - cursorX;
    const dy = btnCenterY - cursorY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Only move if cursor is close
    if (distance < 100) {
        let newX = rect.left + dx / distance * dodgeDistance;
        let newY = rect.top + dy / distance * dodgeDistance;

        // Clamp to viewport
        newX = Math.max(10, Math.min(window.innerWidth - rect.width - 10, newX));
        newY = Math.max(10, Math.min(window.innerHeight - rect.height - 10, newY));

        noButton.style.position = 'fixed';
        noButton.style.left = newX + 'px';
        noButton.style.top = newY + 'px';
    }
});

// YES button action
yesButton.addEventListener('click', () => {
    celebration.classList.remove('hidden');
    spawnFloating('💖', 30);
    spawnFloating('✨', 25);
    spawnFloating('🎉', 20);
});

// Floating emoji function
function spawnFloating(emoji, count) {
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
