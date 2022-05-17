# Cookie test

쿠키런 킹덤 게임에 있는 쿠키 캐릭터들을 가지고 만든 심리 검사 테스트 토이 프로젝트입니다.

쿠키런 킹덤 관련 이미지들은 모두 데브시스터즈에서 제공한 쿠키런 킹덤 팬키트를 사용했습니다.

**🍪 👉 [Demo Link](https://cookietypetest.netlify.app/)**

# Preview

![쿠키런테스트](https://user-images.githubusercontent.com/72083761/168723583-575e9837-8440-4863-9ffb-b4aa0f0f7fc8.gif)


# 사용 기술

`html`,`css`,`JavaScript`

# 핵심 기능

- 심리 테스트 시작 및 선택지 선택
- Progress bar를 통한 진행 단계 파악
- 테스트 재시작
- 사이트 카카오톡 공유
- 웹, 모바일 환경에 대응하는 반응형 웹사이트

# 프로젝트를 통해 배우고 실천한 것

## 1. HTML

- script 태그에 defer 속성을 넣어 HTML이 파싱된 후에 자바스크립트를 불러올 수 있도록 만들었습니다.
- 최대한 sematic tag를 이용하려고 노력했습니다.
- 웹사이트 공유를 위해 meta OG(Open Graph) tag에 대해 학습하고 적용했습니다.

```html
<!-- sns share -->
<meta property="og:title" content="Cookie test" />
<meta property="og:description" content="Cookie test for fun!" />
<meta
  property="og:image"
  content="https://cookietypetest.netlify.app/assets/images/meta/titleImg.png"
/>
<meta property="og:type" content="website" />
<meta property="og:url" content="https://cookietypetest.netlify.app" />
```

- 질문 선택지 태그에 data-set 속성을 사용해 자바스크립트에서 선택지 관련 속성을 쉽게 받을 수 있도록 했습니다.

```JavaScript
<p data-index=${a.index} data-option=${a.option} class="survey__answer">${a.text}</p>
```

## 2. CSS

- BEM 방식을 통해 클래스 네임을 정해 사용했습니다.
- root 클래스를 가지고 중복으로 사용할 CSS 변수들을 정리해서 사용했습니다.

```css
:root {
  /* color */
  --color-brown: #815854;
  --color-light-brown: rosybrown;
  --color-yellow: #dda94b;
  --color-light-white: #fcf6f5;
}
```

- Flex를 이용했습니다.
- media query를 이용해 반응형 웹사이트를 만들었습니다.
- 폰트 사이즈를 통일하기위해 body에 기본 사이즈를 정하고 rem 단위를 사용했습니다.

## 3. JavaScript

- ES6 문법을 사용했습니다.
- 이벤트 위임을 통해 선택지 부모 컨테이너에서 질문 선택지 클릭 이벤트를 처리했습니다.

```JavaScript
const answerContainer = document.querySelector('.survey__answerContainer');

const handleAnswerClick = (event) => {
  let { index, option } = event.target.dataset;
  if (index) {
    setTimeout(() => {
      goNext(parseInt(index) + 1);
    }, 1000);
    addType(parseInt(index), option);
  }
};

answerContainer.addEventListener('click', handleAnswerClick);
```
