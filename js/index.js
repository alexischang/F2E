let data = [];
const elementEvent = document.querySelector('#Event'),
  elementNav = document.querySelector('#Nav'),
  elementVideo = document.querySelector('#Video'),
  elementIframe = document.querySelector('#Youtube'),
  elementLesson = document.querySelector('#Lesson'),
  imgPath = '..imgs/',
  bannerArr = [
    `${imgPath}banr_ice.jpg`,
    `${imgPath}banr_mountain.jpg`,
    `${imgPath}banr_run.jpg`,
    `${imgPath}banr_snow.jpg`
  ];

const init = async () => {
  await getData();
  renderEventTime();
  setEvent();
}
const getData = async () => {
  try {
    const res = await fetch('./js/activity.json');
    data = await res.json();
  }
  catch (err) {
    console.log(err);
  }
}

const makeCountdown = () => {
  const time = new Date(data.endTime).getTime();
  const now = new Date().getTime();
  const ds = 1000 * 60 * 60 * 24;
  const hs = 1000 * 60 * 60;
  const ms = 1000 * 60;
  const res = time - now;
  const day = Math.floor(res / ds);
  const hours = Math.floor((res - day * ds) / hs);
  const min = Math.floor((res - day * ds - hours * hs) / ms);
  const sec = Math.floor((res - day * ds - hours * hs - min * ms) / 1000);
  const eventTime = data.personNum >= 100 ? 'full' : (time > now ? 'onGoing' : 'closed');
  switch (eventTime) {
    case 'full':
      return `<div class="event__countdown">
          <div class="event__countItem">
            <p class="event__info">贈送完畢</p>
            <p class="event__text">我們提早結束優惠</p>
          </div>
        </div>`
    case 'onGoing':
      return `<div class="event__countdown">
        <div class="event__countItem">
          <p class="event__info">優惠倒數</p>
          <p class="event__text">
            <span class="event__num">${day}</span>天
            <span class="event__num">${hours}</span>時
            <span class="event__num">${min}</span>分
            <span class="event__num">${sec}</span>秒
          </p>
          </div>
        </div>`
    case 'end':
    default:
      return `<div class="event__countdown">
          <p class="event__info">優惠活動結束</p>
          <p class="event__text">請再關注我們的優惠時間</p>
        </div>`
  }
}
const makeDetails = () => {
  return `
    <div class="event__details">
      <div class="event__ui">
        <div class="event__outer-line">
          <div class="event__inner-line" style="width: ${data.personNum}%"></div>
        </div>
        <div class="event__item event__zero">
          <div class="event__outer-circle ${data.personNum > 0 ? 'circle-ocean' : 'circle-gizzly'}">
            <div class="event__inner-circle"></div>
          </div>
          <span class="event__desc">預購開始</span>
        </div>
        <div class="event__item event__quarter">
          <div class="event__outer-circle ${data.personNum >= data.list[0].level ? 'circle-ocean' : 'circle-gizzly'}">
            <div class="event__inner-circle"></div>
          </div>
          <span class="event__studentCounts">達${data.list[0].level}人</span>
          <span class="event__desc">送 Sass </span>
        </div>
        <div class="event__item event__half">
          <div class="event__outer-circle ${data.personNum >= data.list[1].level ? 'circle-ocean' : 'circle-gizzly'}">
            <div class="event__inner-circle"></div>
          </div>
          <span class="event__studentCounts">達${data.list[1].level}人</span>
          <span class="event__desc">送 Webpack</span>
        </div>
        <div class="event__item event__full">
          <div class="event__outer-circle ${data.personNum >= data.list[2].level ? 'circle-ocean' : 'circle-gizzly'}">
            <div class="event__inner-circle"></div>
          </div>
          <span class="event__studentCounts">達${data.list[2].level}人</span>
          <span class="event__desc">送 資安課程</span>
        </div>
      </div>
    </div>`
}
const makeSignUp = () => {
  const time = new Date(data.endTime).getTime();
  const now = new Date().getTime();
  switch (time - now > 0) {
    case true:
      if (data.personNum >= data.list[data.list.length - 1].level) {
        return `
          <div class="event__signUp">
            <p class="event__info">已爆滿!</p>
          </div>`;
      }
      else {
        return `
          <div class="event__signUp">
            <p class="event__text">已有<span class="event__info">${data.personNum}</span>人報名</p>
            <button class="btn btn-taro">搶先報名</button>
          </div>`;
      }
    case false:
    default:
      if (data.personNum >= data.list[list.length - 1].level) {
        return `
          <div class="event__signUp">
            <p class="event__info">已額滿!</p>
          </div>`;
      }
      else {
        return `
          <div class="event__signUp">
            <p class="event__text">已有<span class="event__info">${data.personNum}</span>人報名</p>
            <button class="btn btn-taro">我要報名</button>
          </div>`;
      }
  }
}

const renderEventTime = () => {
  elementEvent.innerHTML = makeCountdown() + makeDetails() + makeSignUp();
}

const setEvent = () => {
  window.addEventListener('scroll', setScroll);
  elementVideo.addEventListener('click', setVideoClick)
}
const setScroll = () => {
  let height = document.documentElement.scrollTop;
  if (height > 0) {
    elementNav.classList.add('nav-active');
  }
  else {
    elementNav.classList.remove('nav-active');
  }
}
const setVideoClick = () => {
  elementIframe.style.display = 'flex';
  document.querySelector('html').style.overflow ='hidden';
  document.querySelector('body').addEventListener('keydown', setkeyboard, false);
}
const setkeyboard = (e) => {
  switch(e.keyCode) {
    case 27:
      elementIframe.style.display = 'none';
      document.querySelector('html').style.overflow ='visible';
      break;
    default:
      break;
  }
}

const lesson = () => {
  window.addEventListener('scroll', () => {
  })
  elementLesson.querySelector('.lesson__title').style.opacity = 1;
}

init();