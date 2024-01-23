const menuBtn = document.querySelector(".menu-icon");
const navList = document.querySelector("ul.nav-list");
const navCloseBtn = document.querySelector(".close");
const navBackBtn = document.querySelector(".back");
const levelOneLists = document.querySelectorAll(".level-one");
const levelTwoLists = document.querySelectorAll(".level-two");

let isInnerMenu = false;
let menuLeveLTracker = 0;

menuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  navList.classList.toggle("hidden");
  //   Close any open menu
  levelOneLists.forEach((levelOne) => {
    levelOne.querySelector("ul.level-two").hidden = true;
  });
});

navCloseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  isInnerMenu = false; // back to original page
  navList.classList.add("hidden");
});

navBackBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(isInnerMenu, menuLeveLTracker);
  if (isInnerMenu) {
    if (menuLeveLTracker >= 2) {
      // Third level
      levelTwoLists.forEach((levelTwo) => {
        if (levelTwo.querySelector("ul.level-three"))
          levelTwo.querySelector("ul.level-three").hidden = true;
      });
      menuLeveLTracker--;
      return;
    }
    levelOneLists.forEach((levelOne) => {
      if (!levelOne.querySelector("ul.level-two").hidden)
        levelOne.querySelector("ul.level-two").hidden = true;
    });
    navBackBtn.classList.toggle("hidden");
  }
});

levelOneLists.forEach((level) => {
  level.onclick = function (e) {
    e.preventDefault();
    const levelTwo = level.querySelector("ul.level-two");
    if (levelTwo) {
      levelTwo.hidden = false;
      menuLeveLTracker++;
      isInnerMenu = true;
    }
    if (menuLeveLTracker > 0) {
      navBackBtn.classList.remove("hidden");
    }
  };
});
