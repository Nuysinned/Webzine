// GLOBAL VARIABLES AREA
const background2 = document.querySelector('#background2');
const Mom = document.querySelector('#Mom');

let initClubList;
let clubList;
let currentMouse = {
  x: 0,
  y: 0,
};
let pressedMouse = {
  x: -1,
  y: -1,
};
let difference = 0;

// URL AREA
const url = new URL(window.location.href);
const urlParams = {
  target: url.searchParams.get('target'),
  prevPage: url.searchParams.get('prevPage'),
};

if (urlParams.target === null) {
  location.replace('/error.html');
}
if (['regular', 'self'].filter((v) => v === urlParams.prevPage).length === 0) {
  location.replace('/error.html');
}

initClubList = clubs.filter((v) => {
  if (urlParams.target === '정규동아리') {
    if (v.time === '목7') {
      return true;
    }
  } else if (urlParams.target === '자율동아리') {
    if (v.time === '목8' || v.time === '토4') {
      return true;
    }
  } else if (urlParams.target === '모든동아리') {
    return true;
  } else {
    if (v.kind === urlParams.target) {
      return true;
    } else {
      return false;
    }
  }
  return false;
});

clubList = initClubList;

if (urlParams.prevPage === 'self') {
  background2.classList.add('opacity1');
}
if (urlParams.prevPage === 'regular') {
  background1.classList.add('opacity1');
}

// PAPER MAKING AREA
function makingPapers(original = true) {
  clubList.forEach((information, index) => {
    const PaperElement = document.createElement('div');
    const SortElement = document.createElement('div');
    const SortPart1 = document.createElement('div');
    const SortPart2 = document.createElement('div');
    const LogoElement = document.createElement('img');
    const NameElement = document.createElement('div');
    const KeywordElement = document.createElement('div');
    const SentenceElement = document.createElement('div');

    PaperElement.classList.add('Paper');
    SortElement.classList.add('Sort');
    SortPart1.classList.add('SortPart1');
    SortPart2.classList.add('SortPart2');
    LogoElement.classList.add('Logo');
    NameElement.classList.add('Name');
    KeywordElement.classList.add('Keyword');
    SentenceElement.classList.add('Sentence');

    if (original) PaperElement.classList.add('init');

    if (information.name === 'DIXIT' || information.name === 'Palette') {
      PaperElement.style.backgroundImage = "url('../images/paper2.png')";
    } else {
      PaperElement.style.backgroundImage = "url('../images/paper.png')";
    }

    SortPart1.textContent = ['정규', '주중자율', '주말자율'][
      ['목7', '목8', '토4'].findIndex((v) => v === clubList[index].time)
    ];
    SortPart2.textContent = information.kind;
    LogoElement.src = `../logos/${information.name}.png`;
    NameElement.textContent = information.name;
    KeywordElement.textContent = information.keyword;
    SentenceElement.textContent = information.sentence;

    if (
      information.name === 'BLUECROSS' ||
      information.name === 'Reason Party'
    ) {
      NameElement.style.transform = 'scale(0.6)';
    }
    if (
      [
        '매치포인트',
        'INTERPOL',
        '하늘바라기',
        'HCUtube',
        '강약중강약',
        'SYNAPSE',
      ].findIndex((v) => v === information.name) !== -1
    ) {
      NameElement.style.transform = 'scale(0.8)';
    }

    PaperElement.addEventListener('click', () => {
      window.open(`/clubs/${information.name}.html`, '_blank').focus();
    });

    PaperElement.addEventListener('mouseover', () => {
      clubList[index].big = true;
      homeOnScroll();
    });

    PaperElement.addEventListener('mouseout', () => {
      clubList[index].big = false;
      homeOnScroll();
    });

    SortElement.append(SortPart1, SortPart2);
    PaperElement.append(
      SortElement,
      LogoElement,
      NameElement,
      KeywordElement,
      SentenceElement
    );
    Home.append(PaperElement);

    if (original) {
      setTimeout(() => {
        PaperElement.classList.remove('init');
        PaperElement.classList.add('showing');
      }, index * 100);
    }
  });
}
makingPapers();

// PAPER SIZE & LOCATION AREA
function changePapers() {
  const Papers = document.querySelectorAll('.Paper');
  const benchMark = Screen.width / 2;
  Papers.forEach((Paper, index) => {
    Paper.style.height = Screen.height * 0.8 + 'px';
  });
}
changePapers();

// SORTS AREA
function changeSorts() {
  const Sorts = document.querySelectorAll('.Sort');
  const SortPart1s = document.querySelectorAll('.SortPart1');
  const SortPart2s = document.querySelectorAll('.SortPart2');
  Sorts.forEach((Sort, index) => {
    Sort.style.width = Screen.height * 0.19 + 'px';
    Sort.style.fontSize = Screen.height * 0.022 + 'px';
    SortPart1s[index].classList.add(
      ['RegularColor', 'SelfColor1', 'SelfColor2'][
        ['목7', '목8', '토4'].findIndex((v) => v === clubList[index].time)
      ]
    );
    SortPart2s[index].classList.add(
      [
        'MedicalColor',
        'ScienceColor',
        'SocialColor',
        'EngineerColor',
        'SportsColor',
        'PerformanceColor',
        'HelpColor',
        'SpecialColor',
        'CreateColor',
        'JoinColor',
        'MathColor',
      ][
        [
          '메디컬',
          '과학',
          '사회',
          '공학',
          '스포츠',
          '퍼포먼스',
          '봉사',
          '특별활동',
          '창작',
          '융합',
          '수학',
        ].findIndex((v) => v === clubList[index].kind)
      ]
    );
  });
}
changeSorts();

// NAME SIZE AREA
function changeNameSize() {
  const Names = document.querySelectorAll('.Name');
  Names.forEach((Name) => {
    Name.style.fontSize = Screen.height * 0.06 + 'px';
  });
}
changeNameSize();

// KEYWORD FONT SIZE AREA
function changeKeywordFontSize() {
  const Keywords = document.querySelectorAll('.Keyword');
  Keywords.forEach((Keyword) => {
    Keyword.style.fontSize = Screen.height * 0.02 + 'px';
  });
}
changeKeywordFontSize();

// SENTENCE FONT SIZE AREA
function changeSentenceFontSize() {
  const Sentences = document.querySelectorAll('.Sentence');
  Sentences.forEach((Sentence) => {
    Sentence.style.fontSize = Screen.height * 0.02 + 'px';
  });
}
changeSentenceFontSize();

// HOMEPADDING AREA
function changeHomePadding() {
  Home.style.padding = `0 ${
    Screen.width / 2 - (Screen.height * 0.8) / 1.77 / 2
  }px 0 ${Screen.width / 2 - (Screen.height * 0.8) / 1.77 / 2}px`;
}
changeHomePadding();

// SEARCH AREA
function changeSearch() {
  const Search = document.querySelector('#Search');
  Search.style.width = Screen.width * 0.4 + 'px';
  Search.style.fontSize = Screen.height * 0.02 + 'px';
}
changeSearch();

// SEARCHING AREA
Search.addEventListener('input', () => {
  const inputed = Search.value.replaceAll(' ', '').toUpperCase();
  clubList = initClubList.filter((v) => {
    if (
      v.name.replaceAll(' ', '').toUpperCase().indexOf(inputed) !== -1 ||
      ['정규동아리', '주중자율동아리', '주말자율동아리'][
        ['목7', '목8', '토4'].findIndex((vv) => vv === v.time)
      ].indexOf(inputed) !== -1 ||
      v.kind.replaceAll(' ', '').toUpperCase().indexOf(inputed) !== -1 ||
      v.keyword.replaceAll(' ', '').toUpperCase().indexOf(inputed) !== -1 ||
      v.sentence.replaceAll(' ', '').toUpperCase().indexOf(inputed) !== -1 ||
      v.nickname.replaceAll(' ', '').toUpperCase().indexOf(inputed) !== -1
    ) {
      return true;
    }
    return false;
  });
  console.log(clubList);
  document.querySelectorAll('.Paper').forEach((element) => {
    element.remove();
  });
  makingPapers(false);
  changePapers();
  changeSorts();
  changeNameSize();
  changeKeywordFontSize();
  changeSentenceFontSize();
});

window.addEventListener('resize', () => {
  changePapers();
  changeSorts();
  changeNameSize();
  changeKeywordFontSize();
  changeSentenceFontSize();
  changeHomePadding();
  changeSearch();
});

// WHEN SCROLLING AREA
function homeOnScroll() {
  const Papers = document.querySelectorAll('.Paper');
  Papers.forEach((Paper) => {
    const rect = Paper.getBoundingClientRect();
    Paper.style.filter = `brightness(${
      1 - Math.abs((rect.left + rect.right) / 2 - Screen.width / 2) / 1000
    }`;
  });
}
homeOnScroll();
Home.onscroll = homeOnScroll;

// WHEREISHERE AREA
const WhereIsHere = document.querySelector('#WhereIsHere');
WhereIsHere.textContent = urlParams.target;

// MOUSE POSITION DETECTION AREA
let interval;

document.addEventListener('mousemove', (e) => {
  clearInterval(interval);
  currentMouse = {
    x: e.pageX,
    y: e.pageY,
  };
  if (
    pressedMouse.x !== -1 &&
    currentMouse.y >= pressedMouse.y &&
    Math.abs(
      (currentMouse.y - pressedMouse.y) / (currentMouse.x - pressedMouse.x)
    ) > 2
  )
    difference = (currentMouse.y - pressedMouse.y) / 1.2;
  Mom.style.top = difference + 'px';
});

document.addEventListener('touchmove', (e) => {
  clearInterval(interval);
  const touch = e.changedTouches[0];
  currentMouse = {
    x: touch.pageX,
    y: touch.pageY,
  };
  if (
    currentMouse.y >= pressedMouse.y &&
    Math.abs(
      (currentMouse.y - pressedMouse.y) / (currentMouse.x - pressedMouse.x)
    ) > 2
  ) {
    difference = (currentMouse.y - pressedMouse.y) / 1.2;
  }
  Mom.style.top = difference + 'px';
});

function downAction() {
  pressedMouse = { ...currentMouse };
}

function upAction() {
  if (difference > Screen.height * 0.4) {
    interval = setInterval(() => {
      difference += (Screen.height * 0.9 - difference) / 20;
      Mom.style.top = difference + 'px';
      if (Screen.height * 0.9 - difference < 10) {
        // window.location.href = `/?return=true&where=${urlParams.prevPage}&sound=${urlParams.sound}`
        history.back();
        clearInterval(interval);
      }
    });
  } else {
    pressedMouse = { x: -1, y: -1 };
    interval = setInterval(() => {
      if (difference === 0) {
        clearInterval(interval);
      }
      if (difference !== 0) {
        difference *= 0.9;
      }
      if (difference <= 2) {
        difference = 0;
      }
      Mom.style.top = difference + 'px';
    });
  }
}

document.onmousedown = downAction;
document.onmouseup = upAction;

document.addEventListener('touchstart', (e) => {
  const touch = e.changedTouches[0];
  currentMouse = {
    x: touch.pageX,
    y: touch.pageY,
  };
  downAction();
});
document.addEventListener('touchend', upAction);

// 진입시 애니메이션
setTimeout(() => {
  WhereIsHere.classList.remove('opacity0');
  Search.classList.remove('opacity0');
});

// 제목 바꾸기
document.title = urlParams.target + ' | 2024 움직임';
