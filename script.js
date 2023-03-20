const infoBtn = document.getElementById("info-btn");
const sideBarRight = document.getElementById("side-bar-right");
const mainContainerGrid = document.getElementById("main-container");

infoBtn.addEventListener("click", function () {
    if (sideBarRight.style.display === "none") {
      sideBarRight.style.display = "block";
      mainContainerGrid.style.gridTemplateColumns = "1fr 4fr 1fr";
    } else {
      sideBarRight.style.display = "none";
      mainContainerGrid.style.gridTemplateColumns = "1fr 4fr";
    }
  });

  /* function deploySidebar() {
    var sidebar = document.querySelector('.side-bar-right');
    sidebar.classList.toggle('deployed');
  } */