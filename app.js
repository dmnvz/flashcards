var cardsData = [
  {
    front: "Don’t apologize to these assholes, you fucking pussy!",
    back:  "Не извиняйся перед этими уродами, лошара!",
    audio: "https://www.dropbox.com/scl/fi/0ru89x8pr6v6jkdkjp2jq/Don-t-apologize-to-these-assholes.-Bryan-Cranston.mp3?raw=1"
  },
  {
    front: "Did I screw up?",
    back:  "Я накосячил?",
    audio: "https://www.dropbox.com/scl/fi/lsap6y5xae6ih3xghhlx5/Did-I-screw-up.-Bryan-Cranston.mp3?raw=1"
  },
  {
    front: "We run this place. You need to slow down or we're going to have a problem.",
    back:  "Это наша территория. Тебе надо сбавить обороты, иначе будут проблемы.",
    audio: "https://www.dropbox.com/scl/fi/6lixj9h2aaw84fo9qy42a/We-run-this-place.-You-need-to-slow-down.-Bryan-Cranston.mp3?raw=1"
  },
  {
    front: "The beginning was great but the end was a fiasco.",
    back:  "Начали за здравие, кончили за упокой.",
    audio: "https://www.dropbox.com/scl/fi/98jom6198oy6cvrcx6jv7/The-beginning-was-great.-Bryan-Cranston.mp3?raw=1"
  },
  {
    front: "No one can do a good job if they’re not relaxed.",
    back:  "Никто не может хорошо себя проявить, если он не расслаблен.",
    audio: "https://www.dropbox.com/scl/fi/2s9qfj8iswoq43n44i1ev/No_one_can_do_-_good_job_if-they-re_not_relaxed_Bryan_Cranston.mp3?raw=1"
  },
  {
    front: "Damn! I wish I hadn't done that.",
    back:  "Блин! Лучше бы я этого не делал.",
    audio: "https://www.dropbox.com/scl/fi/pzj49ri50etlfe2yngc7z/Damn-I-wish-I-hadn-t-done-that.-Bryan-Cranston.mp3?raw=1"
  }
];

var currentIndex = 0;
var cardContainer = document.getElementById('cardContainer');

function renderCard(i) {
  var front = cardsData[i].front;
  var back  = cardsData[i].back;
  var audio = cardsData[i].audio;

  cardContainer.innerHTML =
    '<div class="flip-card">' +
      '<div class="flip-card-inner">' +
        '<div class="flip-card-face flip-card-front">' +
          '<p class="card-text">' + front + '</p>' +
          '<button class="play-button" aria-label="Play/Pause">' +
            '<svg viewBox="0 0 100 100">' +
              '<polygon points="35,25 35,75 75,50"/>' +
            '</svg>' +
          '</button>' +
          '<audio><source src="' + audio + '" type="audio/mpeg"/></audio>' +
        '</div>' +
        '<div class="flip-card-face flip-card-back">' +
          '<p class="card-text">' + back + '</p>' +
        '</div>' +
      '</div>' +
    '</div>';

  setupCardEvents();
}

function setupCardEvents() {
  var card = cardContainer.querySelector('.flip-card');
  var btn  = card.querySelector('.play-button');
  var icon = btn.querySelector('svg');
  var aud  = card.querySelector('audio');

  function setPlay() {
    icon.innerHTML = '<polygon points="35,25 35,75 75,50"/>';
  }
  function setPause() {
    icon.innerHTML =
      '<rect x="30" y="25" width="12" height="50"/>' +
      '<rect x="58" y="25" width="12" height="50"/>';
  }

  card.addEventListener('click', function(e) {
    if (!btn.contains(e.target)) {
      card.classList.toggle('flipped');
    }
  });

  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    var audios = document.querySelectorAll('audio');
    Array.prototype.forEach.call(audios, function(a) {
      if (a !== aud) {
        a.pause();
        setPlay();
      }
    });
    if (aud.paused) {
      aud.play();
      setPause();
    } else {
      aud.pause();
      setPlay();
    }
  });

  aud.addEventListener('ended', setPlay);
  setPlay();
}

document.getElementById('randomBtn').addEventListener('click', function() {
  var next;
  do {
    next = Math.floor(Math.random() * cardsData.length);
  } while (next === currentIndex && cardsData.length > 1);
  currentIndex = next;
  renderCard(currentIndex);
});

document.getElementById('nextBtn').addEventListener('click', function() {
  currentIndex = (currentIndex + 1) % cardsData.length;
  renderCard(currentIndex);
});

// Инициализируем первую карточку
renderCard(currentIndex);
