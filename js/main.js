'use strict';

const main = document.getElementById('main');
const survey = document.getElementById('survey');
const result = document.getElementById('result');
const questionContainer = document.querySelector('.survey__questionContainer');
const answerContainer = document.querySelector('.survey__answerContainer');
const startBtn = document.querySelector('.main__startBtn');
const replayBtn = document.querySelector('.result__replayBtn');
const cookie = document.querySelector('.result__cookie');
const description = document.querySelector('.result__description');

let lastIndex = 3;
let choice = [0, 0, 0, 0, 0, 0];

const calculateResult = (choice) => {
  return choice.indexOf(Math.max(...choice));
};

const showResult = async (index) => {
  let response = await fetch('data/result.json');
  let { item } = await response.json();
  cookie.innerHTML = `<p>${item[index].cookie}</p>`;
  description.innerHTML = `<p>${item[index].description}</p>`;
};

const getResult = () => {
  let finalIndex = calculateResult(choice);
  showResult(finalIndex);
  result.classList.remove('hidden');
};

const goNext = (index) => {
  if (index === lastIndex) {
    survey.classList.add('hidden');
    setTimeout(() => getResult(), 2000);
  } else {
    getQuestion(index);
  }
};

const handleStartBtnClick = () => {
  main.classList.add('hidden');
  survey.classList.remove('hidden');
  goNext(0);
};

startBtn.addEventListener('click', handleStartBtnClick);

async function getQuestion(index) {
  let response = await fetch('data/question.json');
  let { list } = await response.json();
  questionContainer.innerHTML = `<p class="survey__question">${list[index].question}</p>`;
  answerContainer.innerHTML = list[index].answer
    .map((a) => {
      return `<p data-index=${a.index} data-option=${a.option} class="survey__answer">${a.option}</p>`;
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
  let { index, option } = event.target.dataset;
  if (index) {
    goNext(parseInt(index) + 1);
    addType(parseInt(index), option);
  }
};

const handleReplayClick = () => {
  console.log('replay!');
  choice = [0, 0, 0, 0, 0, 0];
  survey.classList.remove('hidden');
  result.classList.add('hidden');
  goNext(0);
};

answerContainer.addEventListener('click', handleAnswerClick);
replayBtn.addEventListener('click', handleReplayClick);
