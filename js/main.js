'use strict';

const home = document.getElementById('home');
const survey = document.getElementById('survey');
const result = document.getElementById('result');
const questionContainer = document.querySelector('.survey__questionContainer');
const answerContainer = document.querySelector('.survey__answerContainer');
const startBtn = document.querySelector('.home__startBtn');
const replayBtn = document.querySelector('.result__replayBtn');
const cookie = document.querySelector('.result__cookie');
const script = document.querySelector('.result__script');
const progressBar = document.querySelector('.survey__progressBar');
const resultImage = document.querySelector('.result__image');

const loading = document.getElementById('loading');

let lastIndex = 9;
let choice = [0, 0, 0, 0, 0, 0, 0, 0];

const calculateResult = (choice) => {
  return choice.indexOf(Math.max(...choice));
};

const showResult = async (index) => {
  let response = await fetch('data/result.json');
  let { item } = await response.json();
  resultImage.src = `assets/images/answer/${index}.png`;
  cookie.innerHTML = `<p>${item[index].cookie}</p>`;
  script.innerHTML = `<p>"${item[index].script}"</p>`;
  setTimeout(() => {
    result.classList.remove('hidden');
    result.classList.add('fadeIn');
  }, 3000);
};

const getResult = () => {
  let finalIndex = calculateResult(choice);
  showResult(finalIndex);
};

const goNext = (index) => {
  if (index === lastIndex) {
    survey.classList.add('hidden');
    loading.classList.remove('hidden');
    loading.classList.add('fadeIn');
    getResult();
    setTimeout(() => {
      loading.classList.add('hidden');
    }, 3000);
  } else {
    getQuestion(index);
    progressBar.style.width = ((index + 1) / lastIndex) * 100 + '%';
  }
};

const handleStartBtnClick = () => {
  home.classList.add('fadeOut');
  setTimeout(() => {
    home.classList.add('hidden');
    survey.classList.remove('hidden');
    survey.classList.add('fadeIn');
  }, 450);
  setTimeout(() => {}, 1000);
  goNext(0);
};

startBtn.addEventListener('click', handleStartBtnClick);

async function getQuestion(index) {
  answerContainer.classList.remove('fadeOut');
  let response = await fetch('data/question.json');
  let { list } = await response.json();
  questionContainer.innerHTML = `<p class="survey__question">${list[index].question}</p>`;
  answerContainer.innerHTML = list[index].answer
    .map((a) => {
      return `<p data-index=${a.index} data-option=${a.option} class="survey__answer">${a.text}</p>`;
    })
    .join('');
}

const addType = async (index, option) => {
  let response = await fetch('data/question.json');
  let { list } = await response.json();
  let { type } = list[index].answer.filter((a) => a.option === option)[0];
  for (let i = 0; i < type.length; i++) {
    choice[type[i]] += 1;
  }
};

const handleAnswerClick = (event) => {
  answerContainer.classList.add('fadeOut');
  let { index, option } = event.target.dataset;
  if (index) {
    setTimeout(() => {
      goNext(parseInt(index) + 1);
    }, 1000);
    addType(parseInt(index), option);
  }
};

const handleReplayClick = () => {
  choice = [0, 0, 0, 0, 0, 0, 0, 0];
  survey.classList.remove('hidden');
  result.classList.add('hidden');
  goNext(0);
};

answerContainer.addEventListener('click', handleAnswerClick);
replayBtn.addEventListener('click', handleReplayClick);

const homeImage = document.querySelector('.home___image');
const loadingImage = document.querySelector('.loading___image');

function homeImgChange() {
  let start = 1;
  setInterval(() => {
    if (start > 6) {
      start = 0;
    }
    homeImage.src = `assets/images/main/${start++}.png`;
  }, 2000);
}

function loadingImgChange() {
  let start = 1;
  setInterval(() => {
    if (start > 6) {
      start = 0;
    }
    loadingImage.src = `assets/images/main/${start++}.png`;
  }, 1000);
}

function init() {
  homeImgChange();
  loadingImgChange();
}

init();
