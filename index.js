const menuBtn = document.querySelector(".menu-icon");
const nav = document.querySelector("nav");
const banner = document.querySelector("div[role='banner']");
const navList = document.querySelector("ul.nav-list--mobile");
const navCloseBtn = document.querySelector(".close");
const navBackBtn = document.querySelector(".back");
const levelOneLists = document.querySelectorAll(".level-one");
const levelTwoLists = document.querySelectorAll(".level-two");
const listsLevelTwoLi = document.getElementsByClassName("level-two-li");

let isMenuOpen = false;
var menuLeveLTracker = 0;

let currentPosition = window.scrollY;
window.onscroll = function (e) {
  e.preventDefault();
  if (window.scrollY > 100 && window.scrollY > currentPosition) {
    console.log(currentPosition);
    nav.classList.add("nav-hide");
  } else {
    nav.classList.remove("nav-hide");
  }
  currentPosition = window.scrollY;
};

menuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  navList.classList.toggle("hidden");
  banner.classList.toggle("hidden");
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
  if (menuLeveLTracker <= 1) {
    // Second level
    levelOneLists.forEach((levelOne) => {
      if (!levelOne.querySelector("ul.level-two").hidden)
        levelOne.querySelector("ul.level-two").hidden = true;
    });
    navBackBtn.classList.toggle("hidden"); // Hide navBack button
  } else if (menuLeveLTracker >= 2) {
    // Third level
    Array.from(listsLevelTwoLi).forEach((list) => {
      const levelThree = list.querySelector("ul.level-three");
      if (levelThree) {
        levelThree.hidden = true;
      }
    });
  }

  menuLeveLTracker--;
});

levelOneLists.forEach((level) => {
  level.onclick = function (e) {
    e.preventDefault();
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
    if (levelThree) {
      levelThree.hidden = false;
      menuLeveLTracker++;
      isInnerMenu = true;
    }
  };
});

/*
 * Drop down code
 */
/**
 * income, verification, deposit, linked-loans
 */
const previewInfo = {
  income: {
    dropCard: {
      color: "invert-primary",
      title: "simplify income and employment verification",
    },
    dropInfo: [
      {
        subtitle: "Payroll Income and Employment",
        text: "The data you need to make informed decisions",
      },
    ],
  },
  verification: {
    dropCard: {
      color: "invert-light-green",
      title: "automate home and auto insurance",
    },
    dropInfo: [
      {
        subtitle: "Home Insurance",
        text: "Reduce time to close by automating home insurance verification for mortgage loans",
      },
      {
        subtitle: "Auto Insurance",

        text: "Reduce time to close by automating auto insurance verification for auto loans",
      },
    ],
  },
  deposit: {
    dropCard: {
      color: "",
      title: "Grow deposits and cultivate engaged customers",
    },
    dropInfo: null,
  },
  linkedLoans: {
    dropCard: {
      color: "invert-light-green",
      title: "reduce link through pay-checked loans",
    },
    dropInfo: null,
  },
};
function passPreviewText(event, eventName) {
  const dropCard = document.querySelector(".drop-card");
  const sampleTitle = document.querySelector(".drop-card h3");
  const dropLevelFirst = document.querySelector(
    ".drop-level-one .list-display"
  );
  const dropInformationElem = document.querySelector(".drop-information");
  let displayInfo = {};
  switch (eventName) {
    case "income":
      displayInfo = previewInfo["income"];
      break;
    case "verification":
      displayInfo = previewInfo["verification"];
      break;
    case "deposit":
      displayInfo = previewInfo["deposit"];
      break;
    case "linked-loans":
      displayInfo = previewInfo["linkedLoans"];
      break;
    default:
      break;
  }
  if (event.target.tagName === "a") {
    // First elem should be focused
    dropLevelFirst.focus();
  }
  sampleTitle.innerHTML = displayInfo.dropCard.title;
  dropCard.classList.remove("invert-primary");
  dropCard.classList.remove("invert-light-green");
  dropCard.classList.add(displayInfo.dropCard.color); // Add color

  if (displayInfo.dropInfo) {
    // Clear
    dropInformationElem.hidden = false;
    dropInformationElem.innerHTML = null;

    let title = document.createElement("p");
    title.classList.add("title-item");
    title.innerHTML = `${
      displayInfo.dropInfo.length > 1 ? "Products" : "Product"
    }`;

    dropInformationElem.appendChild(title);

    displayInfo.dropInfo.forEach((info, index) => {
      let container = document.createElement("div");
      container.classList.add("information-card");
      let subtitle = document.createElement("h3");
      let text = document.createElement("p");

      subtitle.innerHTML = info.subtitle;
      text.innerHTML = info.text;

      container.appendChild(subtitle);
      container.appendChild(text);

      dropInformationElem.appendChild(container);
    });
  } else {
    dropInformationElem.hidden = true;
  }
}
