const menuBtn = document.querySelector(".menu-icon");
const navList = document.querySelector("ul.nav-list");
const navCloseBtn = document.querySelector(".close");
const navBackBtn = document.querySelector(".back");
const levelOneLists = document.querySelectorAll(".level-one");
const levelTwoLists = document.querySelectorAll(".level-two");
const listsLevelTwoLi = document.getElementsByClassName("level-two-li");

let isMenuOpen = false;
var menuLeveLTracker = 0;

menuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  navList.classList.toggle("hidden");
  menuBtn.classList.toggle("menu-open");
  document.body.classList.toggle("no-scroll");
  if (menuLeveLTracker > 0) {
    // Close open menu
    navBackBtn.classList.remove("hidden"); // Hide navBack button

    levelTwoLists.forEach((levelTwo) => {
      const levelThree = levelTwo.querySelector("ul.level-three");
      if (levelThree) levelThree.hidden = true;
      levelTwo.hidden = true;
    });
    menuLeveLTracker = 0;
  } else {
    navBackBtn.classList.add("hidden");
  }
});

navBackBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (menuLeveLTracker === 1) {
    // Second level
    levelOneLists.forEach((levelOne) => {
      if (!levelOne.querySelector("ul.level-two").hidden)
        levelOne.querySelector("ul.level-two").hidden = true;
    });
    navBackBtn.classList.toggle("hidden"); // Hide navBack button
  } else if (menuLeveLTracker === 2) {
    // Third level
    Array.from(listsLevelTwoLi).forEach((list) => {
      const levelThree = list.querySelector("ul.level-three");
      if (levelThree) {
        levelThree.hidden = true;
      }
    });
  }

  menuLeveLTracker--;
  console.log(menuLeveLTracker);
});

levelOneLists.forEach((level) => {
  level.onclick = function (e) {
    e.preventDefault();
    console.log(menuLeveLTracker);
    const levelTwo = level.querySelector("ul.level-two");
    if (menuLeveLTracker < 1) {
      if (levelTwo) {
        levelTwo.hidden = false;
        menuLeveLTracker++;
        isInnerMenu = true;
      }
      navBackBtn.classList.remove("hidden"); // Make navBtn visible
    }
  };
});

Array.from(listsLevelTwoLi).forEach((levelTwoList) => {
  levelTwoList.onclick = function (e) {
    e.preventDefault();

    const levelThree = levelTwoList.querySelector("ul.level-three");
    console.log(levelThree);
    if (levelThree) {
      levelThree.hidden = false;
      menuLeveLTracker++;
      isInnerMenu = true;
    }
  };
});
