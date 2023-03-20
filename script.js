const infoBtn = document.getElementById("info-btn");
const sideBarRight = document.getElementById("side-bar-right");
const mainContainerGrid = document.getElementById("main-container");
const form = document.getElementById("book-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");
const bookContainer = document.getElementById("book-container");
const toggleBtn = document.getElementById("toggle-btn");
const bookForm = document.getElementById("book-form");

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function Library() {
  //We encapsulate all the functionalities within the same function to better manage it
  const myLibrary = [];

  function addBook(book) {
    myLibrary.push(book);
  }

  function removeBook(book) {
    const index = myLibrary.indexOf(book);
    if (index !== -1) {
      myLibrary.splice(index, 1);
    }
  }

  function toggleReadStatus(book) {
    book.isRead = !book.isRead;
  }

  function getBooks() {
    return myLibrary.slice(); // return a copy of the array to avoid direct access to the original array
  }

  function clearLibrary() {
    myLibrary.length = 0;
  }

  return {
    addBook,
    removeBook,
    toggleReadStatus,
    getBooks,
    clearLibrary,
  };
}

const library = new Library();

function addBookToLibrary(book) {
  const newBookCard = document.createElement("div");
  newBookCard.classList.add("book-card");
  newBookCard.setAttribute("id", "book-card");

  const bookCardInformation = document.createElement("div");
  bookCardInformation.classList.add("book-card-information");
  bookCardInformation.setAttribute("id", "book-card-information");

  const titleElement = document.createElement("div");
  titleElement.classList.add("book-title");
  titleElement.setAttribute("id", "book-title");
  const titleLink = document.createElement("a");
  titleLink.textContent = book.title;
  titleElement.appendChild(titleLink);
  bookCardInformation.appendChild(titleElement);

  const authorElement = document.createElement("div");
  authorElement.classList.add("book-author");
  authorElement.setAttribute("id", "book-author");
  const authorSpan = document.createElement("span");
  authorSpan.textContent = book.author;
  authorElement.appendChild(authorSpan);
  bookCardInformation.appendChild(authorElement);

  const pagesElement = document.createElement("div");
  pagesElement.classList.add("book-pages");
  pagesElement.setAttribute("id", "book-pages");
  const pagesSpan = document.createElement("span");
  pagesSpan.textContent = book.pages;
  pagesElement.appendChild(pagesSpan);
  bookCardInformation.appendChild(pagesElement);

  newBookCard.appendChild(bookCardInformation);

  const bookCardButtons = document.createElement("div");
  bookCardButtons.classList.add("book-card-buttons");
  bookCardButtons.setAttribute("id", "book-card-buttons");

  const readStatusDiv = document.createElement("div");
  readStatusDiv.classList.add("read-status");
  readStatusDiv.setAttribute("id", "read-status");

  const checkboxInput = document.createElement("input");
  checkboxInput.setAttribute("type", "checkbox");
  checkboxInput.setAttribute("id", "checkbox");
  checkboxInput.checked = book.isRead;
  readStatusDiv.appendChild(checkboxInput);

  const readLabel = document.createElement("label");
  readLabel.setAttribute("for", "checkbox");
  /* readLabel.textContent = book.isRead ? "Read" : "Not Read"; */
  readStatusDiv.appendChild(readLabel);

  bookCardButtons.appendChild(readStatusDiv);

  const deleteBtnDiv = document.createElement("div");
  deleteBtnDiv.classList.add("delete-btn-div");
  deleteBtnDiv.setAttribute("id", "delete-btn-div");

  const deleteBtnElement = document.createElement("button");
  /* deleteBtnElement.textContent = ""; */
  deleteBtnElement.classList.add("delete-btn");
  deleteBtnElement.setAttribute("id", "delete-btn");
  deleteBtnElement.addEventListener("click", () => {
    library.removeBook(book);
    bookContainer.removeChild(newBookCard);
  });

  deleteBtnDiv.appendChild(deleteBtnElement);
  bookCardButtons.appendChild(deleteBtnDiv);

  const editBtnDiv = document.createElement("div");
  editBtnDiv.classList.add("edit-btn-div");
  editBtnDiv.setAttribute("id", "edit-btn-div");

  const editBtnElement = document.createElement("button");
  /* editBtnElement.textContent = "Edit"; */
  editBtnElement.classList.add("edit-btn");
  editBtnElement.setAttribute("id", "edit-btn");
  editBtnDiv.appendChild(editBtnElement);
  bookCardButtons.appendChild(editBtnDiv);

  newBookCard.appendChild(bookCardButtons);

  return newBookCard;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const isRead = readInput.checked; //changed to checked (boolean)

  const book = new Book(title, author, pages, isRead);
  library.addBook(book);
  const newBookCard = addBookToLibrary(book);
  bookContainer.appendChild(newBookCard);

  bookForm.reset();

  bookForm.style.display = "none"; // This makes the book form disappear after adding a book
});

toggleBtn.addEventListener("click", function () {
  if (bookForm.style.display === "none") {
    bookForm.style.display = "block";
  } else {
    bookForm.style.display = "none";
  }
});

infoBtn.addEventListener("click", function () {
  if (sideBarRight.style.display === "block") {
    mainContainerGrid.style.gridTemplateColumns = "1fr 4fr ";
    sideBarRight.style.display = "none";
    sideBarRight.classList.remove("deployed");
  } else {
    sideBarRight.style.display = "block";
    mainContainerGrid.style.gridTemplateColumns = "1fr 4fr 1fr";
    sideBarRight.classList.add("deployed");
  }
});
