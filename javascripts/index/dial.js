// Overall Dial Making Area
function makeOverallDial(target) {
  const DialToGo = document.querySelector('.' + target);
  const DialPhoneElement = document.createElement('div');
  const CenterCircleElement = document.createElement('div');
  const DialBlockerElement = document.createElement('img');

  DialPhoneElement.id = 'DialPhone';
  CenterCircleElement.id = 'CenterCircle';
  DialBlockerElement.id = 'DialBlocker';
  DialBlockerElement.src = '../../images/dialblocker.png';

  if (target === 'RegularDial') {
    CenterCircleElement.innerHTML = '정규<br>동아리';
    DialPhoneElement.style.backgroundColor = 'rgb(91, 63, 21)';
    CenterCircleElement.style.backgroundColor = 'rgb(145, 111, 91)';
  } else {
    CenterCircleElement.innerHTML = '자율<br>동아리';
    DialPhoneElement.style.backgroundColor = 'rgb(60, 91, 111)';
    CenterCircleElement.style.backgroundColor = 'rgb(74, 73, 71)';
  }

  DialToGo.append(DialPhoneElement, CenterCircleElement, DialBlockerElement);
}

makeOverallDial('RegularDial');
makeOverallDial('SelfDial');

const RegularDial = document.querySelector('.RegularDial');
const SelfDial = document.querySelector('.SelfDial');

// GLOBAL VARIABLES AREA
const contents = [
  ['메디컬', '과학', '사회', '공학', '융합', '수학'],
  ['스포츠', '퍼포먼스', '봉사', '특별활동', '창작'],
];
let currentAngle = 0;
let currentMouse = {
  x: 0,
  y: 0,
};
let pressedMouse = {
  x: 1,
  y: -1,
};
let standardMouse = {
  x: 0,
  y: 0,
};
let selected = '';
const locations = [[], []];
let letsgo = false;
let baricadeCrossingRecords = [];
let centerCircleBig = false;

// AUDIO AREA
const dialsound = new Audio('../sounds/dialsound.mp3');
const dialreleasesound = new Audio('../sounds/dialreleasesound.mp3');

// DIALPHONE SIZE AREA
const DialPhones = document.querySelectorAll('#DialPhone');
function changeDialPhoneSize() {
  for (let DialPhone of DialPhones) {
    const DialPhoneSize = Screen.min * 0.7;
    DialPhone.style.width = DialPhoneSize + 'px';
    DialPhone.style.height = DialPhoneSize + 'px';
  }
}
changeDialPhoneSize();

// CenterCircle SIZE AREA
const CenterCircles = document.querySelectorAll('#CenterCircle');
function changeCenterCircleSize() {
  for (let CenterCircle of CenterCircles) {
    const CenterCircleSize = Screen.min * 0.7 * 0.3;
    const CenterCircleFontSize = CenterCircleSize / 4;
    CenterCircle.style.width = CenterCircleSize + 'px';
    CenterCircle.style.height = CenterCircleSize + 'px';
    CenterCircle.style.fontSize = CenterCircleFontSize + 'px';
    if (centerCircleBig) {
      CenterCircle.style.transition = 'transform 0.2s';
    } else {
      if (CenterCircle.style.transition !== '') {
        setTimeout(() => {
          CenterCircle.style.transition = '';
        }, 200);
      }
    }

    CenterCircle.style.transform =
      `translate(-50%, -50%) rotate(${-(180 * currentAngle) / Math.PI}deg)` +
      (centerCircleBig ? 'scale(1.1)' : '');
  }
}
changeCenterCircleSize();

// CENTERCIRCLE HOVER AREA
CenterCircles.forEach((CenterCircle, index) => {
  CenterCircle.addEventListener('mouseover', () => {
    centerCircleBig = true;
  });
  CenterCircle.addEventListener('mouseout', () => {
    centerCircleBig = false;
  });
  CenterCircle.addEventListener('touched', () => {
    AllInvisibleAnimation(index === 0 ? '정규동아리' : '자율동아리');
  });
  CenterCircle.addEventListener('click', () => {
    AllInvisibleAnimation(index === 0 ? '정규동아리' : '자율동아리');
  });
});

// DIAL MAKING AREA
[RegularDial, SelfDial].forEach((Dial, index) => {
  contents[index].forEach((value) => {
    const DialElement = document.createElement('div');
    DialElement.classList.add('Dial');
    DialElement.textContent = value;
    DialElement.style.backgroundColor =
      index === 0 ? 'rgb(43, 34, 29)' : 'rgb(21, 52, 72)';
    Dial.append(DialElement);
  });
});

// DIAL LOCATION AREA
const RegularDial_Dials = document.querySelectorAll('.RegularDial .Dial');
const SelfDial_Dials = document.querySelectorAll('.SelfDial .Dial');
function changeDialLocation() {
  const distance = (Screen.min * 0.7 * ((1 + 0.3) / 2)) / 2;
  [RegularDial_Dials, SelfDial_Dials].forEach((Dials, indexKing) => {
    Dials.forEach((Dial, index) => {
      const [dialX, dialY] = [
        Math.cos(
          ((2 * Math.PI) / (contents[indexKing].length + 1.5)) * index +
            Math.PI / 2
        ) *
          distance +
          Screen.width / 2,
        Math.sin(
          ((2 * Math.PI) / (contents[indexKing].length + 1.5)) * index +
            Math.PI / 2
        ) *
          distance +
          Screen.height / 2,
      ];
      locations[indexKing].push([dialX, dialY]);
      Dial.style.top = dialY + 'px';
      Dial.style.left = dialX + 'px';
    });
  });
}
changeDialLocation();

// DIAL SIZE AREA
const Dials = document.querySelectorAll('.Dial');
function changeDialSize() {
  const DialSize = Screen.min * 0.7 * 0.23;
  const DialFontSize = DialSize / 4;
  for (const Dial of Dials) {
    Dial.style.width = DialSize + 'px';
    Dial.style.height = DialSize + 'px';
    Dial.style.fontSize = DialFontSize + 'px';
  }
}
changeDialSize();

// DENT MAKING AREA
[RegularDial, SelfDial].forEach((Dial, index) => {
  contents[index].forEach(() => {
    const DentElement = document.createElement('div');
    DentElement.classList.add('Dent');
    DentElement.style.borderColor =
      index === 0 ? 'rgb(57, 39, 12)' : 'rgb(33, 53, 85)';

    Dial.append(DentElement);
  });
});

// DENT LOCATION AREA
const RegularDial_Dents = document.querySelectorAll('.RegularDial .Dent');
const SelfDial_Dents = document.querySelectorAll('.SelfDial .Dent');
function changeDentLocation(angle) {
  const distance = (Screen.min * 0.7 * ((1 + 0.3) / 2)) / 2;
  [RegularDial_Dents, SelfDial_Dents].forEach((Dents, indexKing) => {
    Dents.forEach((Dent, index) => {
      const [dentX, dentY] = [
        Math.cos(
          ((2 * Math.PI) / (contents[indexKing].length + 1.5)) * index +
            Math.PI / 2 -
            angle
        ) *
          distance +
          Screen.width / 2,
        Math.sin(
          ((2 * Math.PI) / (contents[indexKing].length + 1.5)) * index +
            Math.PI / 2 -
            angle
        ) *
          distance +
          Screen.height / 2,
      ];
      Dent.style.top = dentY + 'px';
      Dent.style.left = dentX + 'px';
    });
  });
  changeCenterCircleSize();
}
changeDentLocation(currentAngle);

// Dent SIZE AREA
const Dents = document.querySelectorAll('.Dent');
function changeDentSize() {
  const DentSize = Screen.min * 0.7 * 0.23;
  const DentBorderWidth = Screen.min * 0.015;
  for (const Dent of Dents) {
    Dent.style.width = DentSize + 'px';
    Dent.style.height = DentSize + 'px';
    Dent.style.borderWidth = DentBorderWidth + 'px';
  }
}
changeDentSize();

// DIALBLOCKER SIZE & LOCATION AREA
const DialBlockers = document.querySelectorAll('#DialBlocker');
function changeDialBlocker() {
  for (let DialBlocker of DialBlockers) {
    const DialBlockerWidth = Screen.min * 0.7 * 0.1;
    const distance = (Screen.min * 0.7) / 2;
    const [DialBlockerX, DialBlockerY] = [
      Math.cos((Math.PI * 55) / 180) * distance + Screen.width / 2,
      Math.sin((Math.PI * 55) / 180) * distance + Screen.height / 2,
    ];
    DialBlocker.style.width = DialBlockerWidth + 'px';
    DialBlocker.style.left = DialBlockerX + 'px';
    DialBlocker.style.top = DialBlockerY + 'px';
  }
}
changeDialBlocker();

// EVENTLISTENER RUNNER AREA
window.addEventListener('resize', () => {
  changeDialPhoneSize();
  changeCenterCircleSize();
  changeDialLocation();
  changeDialSize();
  changeDentLocation(currentAngle);
  changeDentSize();
  changeDialBlocker();
});

// ANGLE CALCULATOR AREA!
function calcAngle(x, y) {
  const atanValue = Math.atan(y / x);
  if (x > 0 && y > 0) {
    return atanValue;
  }
  if (x < 0 && y > 0) {
    return Math.PI + atanValue;
  }
  if (x < 0 && y < 0) {
    return atanValue + Math.PI;
  }
  if (x > 0 && y < 0) {
    return 2 * Math.PI + atanValue;
  }
  if (y === 0) {
    if (x > 0) {
      return 0;
    } else {
      return Math.PI;
    }
  }
  if (x === 0) {
    if (y > 0) {
      return Math.PI / 2;
    } else {
      return Math.PI * 2 * (3 / 4);
    }
  }
}

// BARICADE CROSSING RECORDS
// 밑에서 위가 -1, 위에서 밑이 +1
function baricadeCrossingRecordsFunction() {
  if (standardMouse.x === 0 && standardMouse.y === 0) {
    standardMouse = { ...pressedMouse };
  }
  const RL = Screen.width / 2 - currentMouse.x < 0 ? 'R' : 'L';
  if (
    Screen.height / 2 - currentMouse.y > 0 &&
    Screen.height / 2 - standardMouse.y < 0
  ) {
    // -1
    if (baricadeCrossingRecords.length === 0) {
      baricadeCrossingRecords.push([RL, -1]);
      standardMouse = { x: Screen.width, y: 0 };
      return;
    }
    if (baricadeCrossingRecords[baricadeCrossingRecords.length - 1][0] === RL) {
      if (
        baricadeCrossingRecords[baricadeCrossingRecords.length - 1][1] === 1
      ) {
        baricadeCrossingRecords.pop();
        standardMouse = { x: Screen.width, y: 0 };
      }
    } else {
      baricadeCrossingRecords.push([RL, -1]);
      standardMouse = { x: Screen.width, y: 0 };
    }
  } else if (
    Screen.height / 2 - currentMouse.y < 0 &&
    Screen.height / 2 - standardMouse.y > 0
  ) {
    if (baricadeCrossingRecords.length === 0) {
      baricadeCrossingRecords.push([RL, 1]);
      standardMouse = { x: Screen.width, y: 10000 };
      return;
    }
    if (baricadeCrossingRecords[baricadeCrossingRecords.length - 1][0] === RL) {
      if (
        baricadeCrossingRecords[baricadeCrossingRecords.length - 1][1] === -1
      ) {
        baricadeCrossingRecords.pop();
        standardMouse = { x: Screen.width, y: 10000 };
      }
    } else {
      baricadeCrossingRecords.push([RL, 1]);
      standardMouse = { x: Screen.width, y: 10000 };
    }
  }
}

// DIAL MOVEMENT AREA!
setInterval(() => {
  if (pressedMouse.x * pressedMouse.y !== -1) {
    baricadeCrossingRecordsFunction();
    const maximumAngle =
      (Math.PI * 320) / 180 -
      calcAngle(
        pressedMouse.x - Screen.width / 2,
        Screen.height / 2 - pressedMouse.y
      );

    candidate =
      calcAngle(
        currentMouse.x - Screen.width / 2,
        Screen.height / 2 - currentMouse.y
      ) -
      calcAngle(
        pressedMouse.x - Screen.width / 2,
        Screen.height / 2 - pressedMouse.y
      );

    const bcrLast = baricadeCrossingRecords.length
      ? baricadeCrossingRecords[baricadeCrossingRecords.length - 1].toString()
      : [];
    if (bcrLast === ['R', 1].toString()) {
      if (candidate > maximumAngle) {
        currentAngle = candidate;
      } else {
        currentAngle = maximumAngle;
        letsgo = true;
      }
    } else {
      if (candidate > 0) {
        currentAngle = 0;
      } else currentAngle = candidate + 2 * Math.PI;
    }
  } else {
    baricadeCrossingRecords = [];
    standardMouse = { x: 0, y: 0 };
    if (currentAngle < 2 * Math.PI - 0.05 && currentAngle > 0.05) {
      if (sound === 'on') dialreleasesound.play();
      currentAngle = currentAngle + 0.02;
    } else {
      currentAngle = 0;
      dialreleasesound.currentTime = 0;
      dialreleasesound.pause();
      if (letsgo === true) {
        AllInvisibleAnimation();
        letsgo = false;
      }
    }
  }
  changeDentLocation(currentAngle);
});

// MOUSE POSITION DETECTION AREA

const DialsBox = document.querySelector('#DialsBox');

document.addEventListener('mousemove', (e) => {
  currentMouse.x = e.pageX;
  currentMouse.y = e.pageY;
});

document.addEventListener('touchmove', (e) => {
  const touch = e.changedTouches[0];

  currentMouse.x = touch.pageX;
  currentMouse.y = touch.pageY;
});

// MOUSE INITIAL LOCATION STORING AREA
function downAction() {
  if (
    Math.sqrt(
      Math.pow(currentMouse.x - Screen.width / 2, 2) +
        Math.pow(currentMouse.y - Screen.height / 2, 2)
    ) <=
    (Screen.min * 0.7) / 2
  ) {
    pressedMouse = { ...currentMouse };
    const lengths = locations[currentScroll].map((v) =>
      Math.sqrt(
        Math.pow(v[0] - pressedMouse.x, 2) + Math.pow(v[1] - pressedMouse.y, 2)
      )
    );
    selected =
      contents[currentScroll][
        lengths.findIndex((v) => v === Math.min(...lengths))
      ];

    if (DialsBox.style.overflowX !== 'hidden')
      DialsBox.style.overflowX = 'hidden';
  } else {
    if (DialsBox.style.overflowX !== 'scroll')
      DialsBox.style.overflowX = 'scroll';
  }
}

function upAction() {
  pressedMouse = { x: 1, y: -1 };
}
document.onmousedown = downAction;

document.onmouseup = upAction;

document.addEventListener('touchstart', (e) => {
  const touch = e.changedTouches[0];
  currentMouse.x = touch.pageX;
  currentMouse.y = touch.pageY;
  downAction();
});

document.addEventListener('touchend', upAction);

// AUDIO CONTROLLING AREA
setInterval(() => {
  const initMouse = { ...currentMouse };
  setTimeout(() => {
    if (
      currentMouse.x !== initMouse.x &&
      currentMouse.y !== initMouse.y &&
      pressedMouse.x * pressedMouse.y != -1
    ) {
      if (sound === 'on') dialsound.play();
    } else {
      dialsound.pause();
      dialsound.currentTime = 0;
    }
  }, 300);
});
