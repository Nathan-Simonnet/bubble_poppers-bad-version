
// Bubble size / Screen size 
// ==========================================
let smollBubbles;
let mediumBubbles;
let grandeBubbles;

function handleResize() {
    let screenWidth = window.innerWidth;
    if (screenWidth < 568) {
        smollBubbles = true;
        mediumBubbles = false;
        grandeBubbles = false;
    } else if (screenWidth > 568 && screenWidth < 1024) {
        smollBubbles = false;
        mediumBubbles = true;
        grandeBubbles = false;
    } else {
        smollBubbles = false;
        mediumBubbles = false;
        grandeBubbles = true;
    }
}
window.addEventListener('resize', handleResize);
handleResize()

// Bubbles explosion handler (event, sounds, particles)
// ============================================================
const createParticle = (leftP, topP, golden) => {
    const particle = document.createElement("div");
    particle.classList.add('particle');

    if (golden) {
        particle.classList.add('golden');
    }

    document.body.appendChild(particle);

    particle.style.left = leftP + "px";
    particle.style.top = topP + "px";

    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;
    particle.style.setProperty('--x', `${randomX}px`);
    particle.style.setProperty('--y', `${randomY}px`);
    particle.style.animation = 'particleAnimation 0.5s ease-out';

    particle.addEventListener('animationend', () => {
        particle.remove();
    });
};

const pop = () => {
    const audio = new Audio();
    audio.src = "./bubble-docs/pop.m4a";
    audio.play();
};

const coin = () => {
    const audio = new Audio();
    audio.src = "./bubble-docs/coin.mp3";
    audio.play();
};

document.addEventListener('click', (event) => {
    const bubble = event.target.closest('.bubbles');
    const golden = event.target.closest('.golden');
    const layerX = event.clientX;
    const layerY = event.clientY;

    if (bubble && golden) {
        coin()
        counter += 5;
        golden.remove();
        //Quantity of particles 
        for (let i = 0; i < 10; i++) {
            createParticle(layerX, layerY, true);
        }
        document.querySelector('h1').textContent = counter;


    } else if (bubble) {
        pop();
        counter++;
        bubble.remove();
        //Quantity of particles 
        for (let i = 0; i < 10; i++) {
            createParticle(layerX, layerY);
        }
        document.querySelector('h1').textContent = counter;
    }


});

// Score storing and rewstoring
// ======================================================================
const bestScore = document.getElementById('best-score')

if (window.localStorage.previousBestScore) {
    bestScore.textContent = window.localStorage.previousBestScore;
}

// New message every time, took from this json
let pepTalk = [];
fetch('anti-pep-talk.json')
    .then((response) => response.json())
    .then((data) => pepTalk = data.pep)

// Range speed Handler
// =====================================================
const range = document.getElementById('range-speed')
const rangeInstructions = document.getElementById('range-instructions')
let rangeSettings;
// Default value
rangeSettings = range.value;

range.addEventListener('input', (e) => {
    if (range.value == 1) {
        rangeInstructions.textContent = "Slow"
    } else if (range.value == 2) {
        rangeInstructions.textContent = "Not that slow"
    } else if (range.value == 3) {
        rangeInstructions.textContent = "Quite fast"
    } else {
        rangeInstructions.textContent = "Sonic speed!!"
    }
    rangeSettings = range.value;
});

// Bubble explosion at the end
// ============================================================
const party = () => {
    const confettis = document.createElement("div");
    confettis.classList.add('confettis');
    document.body.appendChild(confettis);

    confettis.style.left = "50%";
    confettis.style.top = "50%";

    const randomX = Math.random() * 200;
    const randomPlusMinus = Math.random() > 0.5 ? randomX : -randomX
    const randomY = Math.random() * 600 - 100;
    const randomColor = Math.floor(Math.random() * 250);

    confettis.style.setProperty('--confettiColor', `${randomColor}`);
    confettis.style.setProperty('--x', `${randomPlusMinus}px`);
    confettis.style.setProperty('--y', `${randomY}px`);
    confettis.style.animation = 'particleAnimation 3s ease-out';

    confettis.addEventListener('animationend', () => {
        confettis.remove();
    });

};

// Create bubble, will be call later into a loop of 200ms
// And the event listener of those ones
// ============================================================
const main = document.querySelector('main');
const bubblesMaker = function (golden) {
    const bubble = document.createElement("span");
    document.body.appendChild(bubble);
    bubble.classList.add('bubbles');

    // Animation duration == bubbles speed
    if (rangeSettings == 1) {
        bubble.classList.add('slow');
        // It goes out of screen, so it's not necessary to keep theme alive...
        setTimeout(() => {
            bubble.remove();
        }, 8000);
    } else if (rangeSettings == 2) {
        bubble.classList.add('medium');
        setTimeout(() => {
            bubble.remove();
        }, 6000);

    } else if (rangeSettings == 3) {
        bubble.classList.add('fast');
        setTimeout(() => {
            bubble.remove();
        }, 5000);
    } else {
        bubble.classList.add('sonic');
        setTimeout(() => {
            bubble.remove();
        }, 4000);
    }

    if (golden) {
        bubble.classList.add('golden');
        bubbleAnim(bubble, true);

    } else {
        bubbleAnim(bubble, false);
    }
}

// Random direction, color, height, width
// ============================================================
const bubbleAnim = function (bubble, golden) {
    let randomHeightWidth;
    const randomHeighFromleft = (Math.floor(Math.random() * 100));

    if (golden) {
        if (smollBubbles) {
            randomHeightWidth = 140;
        } else if (mediumBubbles) {
            randomHeightWidth = 160;
        } else {
            randomHeightWidth = 200;
        }
        bubble.style.setProperty('--leftFromAnim', randomHeighFromleft + "%");
        bubble.style.setProperty('--leftToAnim', "50%");
        bubble.style.width = randomHeightWidth - 60 + "px";
        bubble.style.height = randomHeightWidth - 60 + "px";
        
    } else {
        if (smollBubbles) {
            randomHeightWidth = (Math.floor(Math.random() * 100) + 50);
        } else if (mediumBubbles) {
            randomHeightWidth = (Math.floor(Math.random() * 150) + 100);
        } else {
            randomHeightWidth = (Math.floor(Math.random() * 200) + 100);
        }
        const randomHeighToleft = (Math.floor(Math.random() * 100));
        const plusMinus = Math.random() > 0.5 ? randomHeighToleft : -randomHeighToleft;
        bubble.style.width = randomHeightWidth + "px";
        bubble.style.height = randomHeightWidth + "px";
        const randomHueRotate = Math.floor((Math.random() * 350) + 100);
        bubble.style.setProperty('--hueRotateAnim', randomHueRotate + "deg");
        bubble.style.setProperty('--leftFromAnim', randomHeighFromleft + "%");
        bubble.style.setProperty('--leftToAnim', plusMinus + "%");
    }
}

// End /start
// ============================================================

// Triggered at the end of the timer
const endGame = function () {

    const bubblesClass = document.querySelectorAll('.bubbles');
    bubblesClass.forEach((bubble) => {
        bubble.remove();
    });

    document.querySelectorAll('.to-hide').forEach((element) => {
        document.querySelector('label').textContent = "Recommencer";
        element.classList.remove('hidden')
    });

    if (bestScore.textContent < counter) {
        bestScore.textContent = counter;
        window.localStorage.previousBestScore = counter;

        const randomIndex = Math.floor(Math.random() * pepTalk.length)
        document.querySelector('label').textContent = pepTalk[randomIndex];
    }

    // easter egg
    // const victory = () => {
    //     const audio = new Audio();
    //     audio.src = "./bubble-docs/Party-horn.mp3";
    //     audio.play();
    // };

    // victory();

    // Quantity of particles at the end
    for (let i = 0; i < 60; i++) {
        party()
    }

    document.getElementById('encouragingDisplay').textContent = pepTalk[Math.floor(Math.random() * pepTalk.length)]
}

// Onclick button "go" event listener
let endGameTrigger;
let counter;
const startGame = function () {
    endGameTrigger = true;
    document.querySelectorAll('.to-hide').forEach((element) => {
        element.classList.add('hidden');
    });
    counter = 0;
    document.querySelector('h1').textContent = counter;

    setTimeout(() => {
        endGameTrigger = false;
    }, 30000)

    setTimeout(() => {
        bubblesMaker(true);
    }, Math.ceil(Math.random() * 30000))

    const loop = () => {
        if (endGameTrigger === true) {
            setTimeout(() => {
                bubblesMaker();
                loop();
            }, 200)
        } else {
            return endGame();
        }
    };
    loop();
}

// Trigger the beginning of the game
document.getElementById('go-btn').addEventListener('click', () => {
    startGame();
});