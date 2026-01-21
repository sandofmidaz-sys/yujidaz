// ELEMENTS
const gameContainer = document.getElementById("gameContainer");
const envelopeContainer = document.getElementById("envelopeContainer");
const envelope = document.getElementById("envelope");
const mainCard = document.getElementById("mainCard");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const celebration = document.getElementById("celebration");
const floatingContainer = document.getElementById("floating-emojis");

// ------------------ FLOATING EMOJIS ------------------
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

// ------------------ DRAG HEART MINI-GAME ------------------
const heartsCount = 10;
let heartsCollected = 0;

for(let i=0; i<heartsCount; i++){
    const heart = document.createElement('div');
    heart.textContent = '💖';
    heart.className = 'heart-drag';
    heart.style.left = Math.random()*(window.innerWidth-50)+'px';
    heart.style.top = Math.random()*(window.innerHeight/2)+'px';
    gameContainer.appendChild(heart);

    heart.onmousedown = function(e){
        let shiftX = e.clientX - heart.getBoundingClientRect().left;
        let shiftY = e.clientY - heart.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            heart.style.left = pageX - shiftX + 'px';
            heart.style.top = pageY - shiftY + 'px';
        }
        moveAt(e.pageX, e.pageY);

        function onMouseMove(e){
            moveAt(e.pageX, e.pageY);
        }
        document.addEventListener('mousemove', onMouseMove);

        heart.onmouseup = function(){
            document.removeEventListener('mousemove', onMouseMove);
            heart.onmouseup = null;

            // CHECK IF OVER ENVELOPE
            const heartRect = heart.getBoundingClientRect();
            const envRect = envelope.getBoundingClientRect();
            if (!(heartRect.right < envRect.left || 
                heartRect.left > envRect.right || 
                heartRect.bottom < envRect.top || 
                heartRect.top > envRect.bottom)){
                heart.remove();
                heartsCollected++;
                if(heartsCollected >= heartsCount){
                    // unlock envelope
                    envelopeContainer.classList.remove('hidden');
                }
            }
        }
    }
    heart.ondragstart = () => false;
}

// ------------------ ENVELOPE OPEN ------------------
envelope.addEventListener('click', () => {
    envelope.classList.add('open');
    envelopeContainer.style.pointerEvents = 'none';
    setTimeout(()=>{
        gameContainer.classList.add('hidden');
        envelopeContainer.style.display = 'none';
        mainCard.classList.remove('hidden');
    }, 600);
});

// ------------------ NO BUTTON DODGE ------------------
const dodgeDistance = 150;
noButton.addEventListener('mousemove', (e) => {
    const rect = noButton.getBoundingClientRect();
    const cursorX = e.clientX;
    const cursorY = e.clientY;

    const btnCenterX = rect.left + rect.width/2;
    const btnCenterY = rect.top + rect.height/2;

    const dx = btnCenterX - cursorX;
    const dy = btnCenterY - cursorY;
    const distance = Math.sqrt(dx*dx + dy*dy);

    if(distance < 100){
        let newX = rect.left + dx/distance*dodgeDistance;
        let newY = rect.top + dy/distance*dodgeDistance;
        newX = Math.max(10, Math.min(window.innerWidth - rect.width - 10, newX));
        newY = Math.max(10, Math.min(window.innerHeight - rect.height - 10, newY));
        noButton.style.left = newX+'px';
        noButton.style.top = newY+'px';
    }
});

// ------------------ YES BUTTON CELEBRATION ------------------
yesButton.addEventListener('click', () => {
    document.getElementById('celebration').classList.remove('hidden');
    spawnCelebration('💖', 30);
    spawnCelebration('✨', 25);
    spawnCelebration('🎉', 20);
});

function spawnCelebration(emoji,count){
    for(let i=0;i<count;i++){
        const el=document.createElement('div');
        el.textContent=emoji;
        el.style.position='fixed';
        el.style.left=Math.random()*window.innerWidth+'px';
        el.style.top=Math.random()*window.innerHeight+'px';
        el.style.fontSize=(Math.random()*30+20)+'px';
        el.style.pointerEvents='none';
        el.style.transition='all 3s linear';
        document.body.appendChild(el);
        setTimeout(()=>el.remove(),3000);
    }
}
