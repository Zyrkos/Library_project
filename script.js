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
  // We create a separate function that adds new books to the library
  const newBookCard = document.createElement("div");
  newBookCard.classList.add("book-card");

  const titleElement = document.createElement("h2");
  titleElement.classList.add("book-title");
  titleElement.textContent = book.title;
  newBookCard.appendChild(titleElement);

  const authorElement = document.createElement("p");
  authorElement.classList.add("book-author");
  authorElement.textContent = book.author;
  newBookCard.appendChild(authorElement);

  const pagesElement = document.createElement("p");
  pagesElement.classList.add("book-pages");
  pagesElement.textContent = book.pages;
  newBookCard.appendChild(pagesElement);

  const divName = "card-btns-div";
  const newDiv = document.createElement("div");
  newDiv.setAttribute("id", divName);

  newBookCard.appendChild(newDiv);

  const isReadElement = document.createElement("button");
  if (book.isRead) {
    isReadElement.classList.add("read");
    isReadElement.textContent = "Read";
  } else {
    isReadElement.classList.add("unread");
    isReadElement.textContent = "Unread";
  }
  newDiv.appendChild(isReadElement);

  isReadElement.addEventListener("click", function () {
    book.isRead = !book.isRead;

    isReadElement.textContent = book.isRead ? "Read" : "Unread";

    if (book.isRead) {
      isReadElement.classList.add("read");
      isReadElement.classList.remove("unread");
    } else {
      isReadElement.classList.add("unread");
      isReadElement.classList.remove("read");
    }
  });

  const deleteBtnElement = document.createElement("button");
  deleteBtnElement.textContent = "Delete";
  deleteBtnElement.classList.add("delete-btn");
  deleteBtnElement.addEventListener("click", () => {
    library.removeBook(book);
    bookContainer.removeChild(newBookCard);
  });
  newDiv.appendChild(deleteBtnElement);

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

  bookForm.style.display = "none"; // This makes the book form dissapear after adding a book
});

toggleBtn.addEventListener("click", function () {
  if (bookForm.style.display === "none") {
    bookForm.style.display = "block";
  } else {
    bookForm.style.display = "none";
  }
});

infoBtn.addEventListener("click", function () {
  sideBarRight.classList.toggle("deployed");

  if (sideBarRight.classList.contains("deployed")) {
    mainContainerGrid.style.gridTemplateColumns = "1fr 4fr 1fr";
  } else {
    mainContainerGrid.style.gridTemplateColumns = "1fr 4fr";
  }
});
