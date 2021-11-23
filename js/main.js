const main = document.getElementById('main');
const survey = document.getElementById('survey');

const startBtn = document.querySelector('.main__startBtn');

const handleStartBtnClick = () => {
  main.classList.add('hidden');
  survey.classList.remove('hidden');
};

startBtn.addEventListener('click', handleStartBtnClick);
