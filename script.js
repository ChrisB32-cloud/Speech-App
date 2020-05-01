// 1 start
const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textArea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

// 2
const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty"
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry"
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired"
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt"
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy"
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry"
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad"
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared"
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside'
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home'
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School'
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas'
  }
];

// 3
data.forEach(createBox);

// 4 Create speech box
function createBox(item) {
  const box = document.createElement('div');

  const { image, text } = item;

  box.classList.add('box');

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  // 5 @todo speak event
  // 13
  box.addEventListener('click', () => {
    // 14 set text
    setTextMessage(text);
    // 15 speak it
    speakText();

    // 16 Add actice effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  // 6
  main.appendChild(box);
}

// 17 Init speech synth
const message = new SpeechSynthesisUtterance();

// 9 Store voices
let voices = [];

// 10
function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// 18 set text
function setTextMessage(text) {
  message.text = text;
}

// 19 Speak text
function speakText() {
  speechSynthesis.speak(message);
}

// 21 set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// 11 Vocies changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// 7 Toggle text box
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);

// 8 Close button
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

// 20 Change voice
voicesSelect.addEventListener('change', setVoice);

// 22 Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textArea.value);
  speakText();
});

// 12 calling get voices
getVoices();
