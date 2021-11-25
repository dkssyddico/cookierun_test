const shareBtn = document.querySelector('.result__shareBtn');

function kakaoShare() {
  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: 'Cookie test',
      description: 'Cookie test for fun!',
      imageUrl: 'https://cookietypetest.netlify.app/assets/images/meta/titleImg.png',
      link: {
        mobileWebUrl: 'https://cookietypetest.netlify.app',
        webUrl: 'https://cookietypetest.netlify.app',
      },
    },
    buttons: [
      {
        title: '게임해보기!',
        link: {
          mobileWebUrl: 'https://cookietypetest.netlify.app',
        },
      },
    ],
  });
}

shareBtn.addEventListener('click', kakaoShare);
