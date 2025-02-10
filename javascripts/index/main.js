// GLOBAL VARIABLES AREA
let sound = 'off';
let currentScroll = 0;

const Title = document.querySelector('#Title');
const MainMessage = document.querySelector('#MainMessage');
const BottomText = document.querySelector('#BottomText');
const SoundOnOff = document.querySelector('#SoundOnOff');
const background2 = document.querySelector('#background2');
const webzine = document.querySelector('#webzine');
const AllClubs = document.querySelector('#AllClubs');
const dots = document.querySelectorAll('.dot');

// URL AREA
const url = new URL(window.location.href);
const urlParams = {
  return: url.searchParams.get('return'),
  where: url.searchParams.get('where'),
  sound: url.searchParams.get('sound'),
};
if (
  [null, 'false', 'true'].filter((v) => v === urlParams.return).length === 0
) {
  location.replace('/');
}
if (
  [null, 'regular', 'self'].filter((v) => v === urlParams.where).length === 0
) {
  location.replace('/');
}
if ([null, 'on', 'off'].filter((v) => v === urlParams.sound).length === 0) {
  location.replace('/');
}

if (urlParams.where === 'regular' || urlParams.where === null) {
  currentScroll = 0;
  webzine.classList.add('skin');
} else {
  currentScroll = 1;
  webzine.classList.add('blue');
  DialsBox.scrollLeft = Screen.width;
  background2.classList.remove('opacity0');
  background2.classList.add('opacity1');
  AllClubs.classList.remove('brown');
  AllClubs.classList.add('green');
}

if (urlParams.return === 'true') {
  Title.classList.add('goaway');
  BottomText.classList.add('goaway');
  SoundOnOff.classList.add('goaway');
  DialsBox.classList.add('goawayForDialsBox');

  setTimeout(() => {
    Title.style.transition = 'opacity 0.3s, filter 0.3s';
    BottomText.style.transition = 'opacity 0.3s, filter 0.3s';
    SoundOnOff.style.transition = 'transform 0.2s, opacity 0.3s, filter 0.3s';
    DialsBox.style.transition = 'top 0.5s';
    background2.style.transition = 'opacity 0.3s';

    setTimeout(() => {
      Title.classList.remove('goaway');
      BottomText.classList.remove('goaway');
      SoundOnOff.classList.remove('goaway');
      DialsBox.classList.remove('goawayForDialsBox');
    });
  });
} else {
  Title.style.transition = 'opacity 0.3s, filter 0.3s';
  BottomText.style.transition = 'opacity 0.3s, filter 0.3s';
  SoundOnOff.style.transition = 'transform 0.2s, opacity 0.3s, filter 0.3s';
  DialsBox.style.transition = 'top 0.5s';
  background2.style.transition = 'opacity 0.3s';
}

if (urlParams.sound === 'on') {
  SoundOnOff.src = './images/soundon.png';
  sound = 'on';
}

// TITLE SIZE & LOCATION AREA
function changeTitle() {
  const TitleY = (Screen.height - Screen.min * 0.7) / 4;
  const MainMessageSize = Screen.min * 0.05;
  MainMessage.style.fontSize = MainMessageSize + 'px';
  Title.style.top = TitleY + 'px';
}
changeTitle();

// BottomText SIZE & LOCATION AREA
function changeBottom() {
  const BottomTextSize = Screen.min * 0.03;
  const BottomTextY = Screen.height - (Screen.height - Screen.min * 0.7) / 4;
  BottomText.style.fontSize = BottomTextSize + 'px';
  BottomText.style.top = BottomTextY + 'px';
}
changeBottom();

// EVENTLISTENER RUNNER AREA
window.addEventListener('resize', () => {
  changeTitle();
  changeBottom();
});

// SOUNDONOFF AREA
SoundOnOff.addEventListener('click', () => {
  if (sound === 'off') {
    sound = 'on';
    SoundOnOff.src = './images/soundon.png';
  } else if (sound === 'on') {
    sound = 'off';
    SoundOnOff.src = './images/soundoff.png';
  }
});

// SCROLL AREA

dots[1].style.transform = `scale(${DialsBox.scrollLeft / Screen.width + 1.2})`;
dots[0].style.transform = `scale(${
  1 - DialsBox.scrollLeft / Screen.width + 1.2
})`;

DialsBox.addEventListener('scroll', () => {
  const preScroll = DialsBox.scrollLeft < Screen.width / 2 ? 0 : 1;
  if (preScroll !== currentScroll) {
    if (preScroll === 0) {
      background2.classList.remove('opacity1');
      background2.classList.add('opacity0');
      webzine.classList.remove('blue');
      webzine.classList.add('skin');
      AllClubs.classList.remove('green');
      AllClubs.classList.add('brown');
    } else {
      background2.classList.remove('opacity0');
      background2.classList.add('opacity1');
      webzine.classList.remove('skin');
      webzine.classList.add('blue');
      AllClubs.classList.remove('brown');
      AllClubs.classList.add('green');
    }
  }
  currentScroll = preScroll;

  dots[1].style.transform = `scale(${
    DialsBox.scrollLeft / Screen.width + 1.2
  })`;
  dots[0].style.transform = `scale(${
    1 - DialsBox.scrollLeft / Screen.width + 1.2
  })`;
});

function AllInvisibleAnimation(special) {
  Title.classList.add('goaway');
  BottomText.classList.add('goaway');
  SoundOnOff.classList.add('goaway');
  DialsBox.classList.add('goawayForDialsBox');
  setTimeout(() => {
    history.pushState(
      null,
      null,
      `/?return=true&where=${
        currentScroll === 0 ? 'regular' : 'self'
      }&sound=${sound}`
    );
    window.location.href = `/select.html?target=${
      special !== '자율동아리' &&
      special !== '정규동아리' &&
      special !== '모든동아리'
        ? selected
        : special
    }&prevPage=${currentScroll === 0 ? 'regular' : 'self'}&sound=${sound}`;
  }, 300);
}

AllClubs.addEventListener('click', () => {
  AllInvisibleAnimation('모든동아리');
});
