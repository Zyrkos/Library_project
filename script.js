const infoBtn = document.getElementById("info-btn");
const sideBarRight = document.getElementById("side-bar-right");
const mainContainerGrid = document.getElementById("main-container");

infoBtn.addEventListener("click", function () {
  sideBarRight.classList.toggle("deployed");

  if (sideBarRight.classList.contains("deployed")) {
    mainContainerGrid.style.gridTemplateColumns = "1fr 4fr 1fr";
  } else {
    mainContainerGrid.style.gridTemplateColumns = "1fr 4fr";
  }
});