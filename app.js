const cardsData = [
  {
    front: "Don’t apologize to these assholes, you fucking pussy!",
    back:  "Не извиняйся перед этими уродами, лошара!",
    audio: "https://www.dropbox.com/scl/fi/0ru…raw=1"
  },
  {
    front: "Did I screw up?",
    back:  "Я накосячил?",
    audio: "https://www.dropbox.com/scl/fi/lsa…raw=1"
  },
  {
    front: "We run this place. You need to slow down or we're going to have a problem.",
    back:  "Это наша территория. Тебе надо сбавить обороты, иначе будут проблемы.",
    audio: "https://www.dropbox.com/scl/fi/6li…raw=1"
  },
  {
    front: "The beginning was great but the end was a fiasco.",
    back:  "Начали за здравие, кончили за упокой.",
    audio: "https://www.dropbox.com/scl/fi/98j…raw=1"
  },
  {
    front: "No one can do a good job if they’re not relaxed.",
    back:  "Никто не может хорошо себя проявить, если он не расслаблен.",
    audio: "https://www.dropbox.com/scl/fi/2s9…raw=1"
  },
  {
    front: "Damn! I wish I hadn't done that.",
    back:  "Блин! Лучше бы я этого не делал.",
    audio: "https://www.dropbox.com/scl/fi/pzj…raw=1"
  }
];

let currentIndex = 0;
const cardContainer = document.getElementById('cardContainer');

function renderCard(i) {
  const { front, back, audio } = cardsData[i];
  cardContainer.innerHTML = `
    <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-face flip-card-front">
          <p class="card-text">${front}</p>
          <button class="play-button" aria-label="Play/Pause">
            <svg viewBox="0 0 100 100"><polygon points="35,25 35,75 75,50" /></svg>
          </button>
          <audio>
            <source src="${audio}" type="audio/mpeg"/>
          </audio>
        </div>
        <div class="flip-card-face flip-card-back">
          <p class="card-text">${back}</p>
        </div>
      </div>
    </div>
  `;
  setupCardEvents(cardContainer.querySelector('.flip-card'));
}

function setupCardEvents(card) {
  const btn = card.querySelector('.play-button');
  const svg = btn.querySelector('svg');
  const aud = card.querySelector('audio');

  const setPlay = () => svg.innerHTML = '<polygon points="35,25 35,75 75,50"/>';
  const setPause= () => svg.innerHTML = '<rect x="30" y="25" width="12" height="50"/><rect x="58" y="25" width="12" height="50"/>';

  card.addEventListener('click', e => {
    if (!btn.contains(e.target)) card.classList.toggle('flipped');
  });

  btn.addEventListener('click', e => {
    e.stopPropagation();
    document.querySelectorAll('audio').forEach(a => {
      if (a!==aud) { a.pause(); setPlay(); }
    });
    if (aud.paused) { aud.play(); setPause(); }
    else { aud.pause(); setPlay(); }
  });

  aud.addEventListener('ended', setPlay);
  setPlay();
}

document.getElementById('randomBtn').addEventListener('click', () => {
  let next;
  do { next = Math.floor(Math.random()*cardsData.length); }
  while (next===currentIndex && cardsData.length>1);
  currentIndex = next;
  renderCard(currentIndex);
});

document.getElementById('nextBtn').addEventListener('click', () => {
  currentIndex = (currentIndex+1)%cardsData.length;
  renderCard(currentIndex);
});

renderCard(currentIndex);
