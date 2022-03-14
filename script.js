const field = document.querySelector('.field');
let move = 0;
let result = '';
let moves = '';
let crossRes = '';
let toeRes = '';
const numberOfMoves = document.querySelector('.moves');
const contentWrapper = document.querySelector('.content');
const modalResult = document.querySelector('.modal-result-wrapper');
const overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('.btn-close');
const crosses = document.querySelector('.crosses ');
const toe = document.querySelector('.toe');

field.addEventListener('click', e => {
    if(e.target.className == 'box') {
        move % 2 === 0 ? e.target.style.backgroundImage = 'url("./assets/png/x.png")': e.target.style.backgroundImage = 'url("./assets/png/0.png")';
        move++;
        check();
        moves++;
        movesResult(moves);
    }
});

const check = () => {
    const boxes = document.getElementsByClassName('box');
    const arr = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for(let i = 0; i < arr.length; i++) {
        if(
            boxes[arr[i][0]].style.backgroundImage == 'url("./assets/png/x.png")' && boxes[arr[i][1]].style.backgroundImage == 'url("./assets/png/x.png")' && boxes[arr[i][2]].style.backgroundImage == 'url("./assets/png/x.png")'
        ) {
            result = 'Crosses';
            prepeaResult(result);
            crossRes++;
            scoreCrossResult(crossRes);
        } else if (
            boxes[arr[i][0]].style.backgroundImage == 'url("./assets/png/0.png")' && boxes[arr[i][1]].style.backgroundImage == 'url("./assets/png/0.png")' && boxes[arr[i][2]].style.backgroundImage == 'url("./assets/png/0.png")'
        ) {
            result = 'Toe';
            prepeaResult(result);
            toeRes++;
            scoreToeResult(toeRes);
        }
    }
};

const prepeaResult = winner => {
    contentWrapper.innerHTML = `WON: ${winner} !`;
    modalResult.style.display = 'block';
    playAudio();
};

const movesResult = s => {
    numberOfMoves.innerHTML = `Number of moves: ${s}`;
};

const scoreCrossResult = j => {
    crosses.innerHTML = `Crosses: ${j}`;
};

const scoreToeResult = k => {
    toe.innerHTML = `Toe: ${k}`;
};

const closeModal = () => {
    modalResult.style.display = 'none';
    location.reload();
};

overlay.addEventListener('click', closeModal);
btnClose.addEventListener('click', closeModal);

//===== Sound =====//
const audio = new Audio('./assets/audio/zvuk.mp3');

    function playAudio() {
        audio.currentTime = 0;
        audio.play();
    }


//===== Language =====//
const i18Obj = {
    'en': {
        'score': 'Score',
        'h1': 'Tic-Tac-Toe',
        'close': 'Start New GAME',
        'crosses': 'Crosses: ',
        'toe': 'Toe: '
    },
    'ru': {
        'score': 'Счет',
        'h1': 'Крестики нолики',
        'close': 'Новая игра',
        'crosses': 'Крестики: ',
        'toe': 'Нолики: '
    }
};

const en = document.querySelector('.en'),
      ru = document.querySelector('.ru');


const swithLng = document.querySelector('.swith-lng');

swithLng.onclick=function(e){
    for(let i = 0;i<swithLng.children.length;i++){
        swithLng.children[i].classList.remove('active');
    }
    e.target.classList.add('active');
};


//===== localStorage =====//
const language = document.querySelectorAll('.language');
const currentLanguage = localStorage.getItem('lang');
    if (currentLanguage == 'en') {
        en.classList.add('active');
        ru.classList.remove('active');
    }
    if (currentLanguage == 'ru') {
        ru.classList.add('active');
        en.classList.remove('active');
    }

    localStorage.setItem('lang', currentLanguage);


en.addEventListener('click', getTranslate.bind(null, 'en'));
ru.addEventListener('click', getTranslate.bind(null, 'ru'));

    function getTranslate(lang) {
        if (!i18Obj.hasOwnProperty(lang)) {
            return;
        }
        if (window.hasOwnProperty('localStorage')) {
            window.localStorage.setItem('lang', lang);
        }
        for (let key in i18Obj[lang]) {
            let elem = document.querySelector('.lng-' + key);
                if (elem) {
                elem.innerHTML = i18Obj[lang][key];
                }
        }
    }
let lang = localStorage.getItem('lang');
    getTranslate(lang);

    
//===== Score =====//
const btnScore = document.querySelector('.btn-score');
const scoreResult = document.querySelector('.score-result');

    btnScore.addEventListener('click', () => {
        scoreResult.classList.toggle('open');
    });