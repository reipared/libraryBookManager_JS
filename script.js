// This is an array that will hold all the books in our library
let myLibrary = [];

// This function creates a book object with the given properties
function Book(title, author, pages, read) {
	// Add properties for the book object
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

// This function toggles the read status of a book object
Book.prototype.toggleRead = function () {
	this.read = !this.read;
};

// This function adds a book object to the library array
function addBookToLibrary(book) {
	myLibrary.push(book);
}

// This function removes a book object from the library array
function removeBookFromLibrary(index) {
	myLibrary.splice(index, 1);
}

// This function displays all the books in the library
function displayBooks() {
	// Get the container element where the books will be displayed
	const booContainer = document.getElementById("book-container");
	bookContainer.innerHTML = "";

	// Loop through all the books in the library
	for (let i = 0; i < myLibrary.length; i++) {
		// Get the book at the current index
		const book = myLibrary[i];

		// Create a new div element for the book card
		const bookCard = document.createElement("div");
		bookCard.classList.add("book-card");
		bookCard.setAttribute("data-index", i);

		// Create a new h3 element for the book title
		const title = document.createElement("h3");
		title.textContent = book.title;
		bookCard.appendChild(title);

		// Create a new p element for the book author
		const author = document.createElement("p");
		author.textContent = "By " + book.author;
		bookCard.appendChild(author);

		// Create a new p element for the book pages
		const pages = document.createElement("p");
		pages.textContent = book.pages + " pages";
		bookCard.appendChild(pages);

		// Create a new p element for the book read status
		const readStatus = document.createElement("p");
		readStatus.textContent = book.read ? "Read" : "Undread";
		bookCard.appendChild(readStatus);

		// Create a new button element for removing a book
		const removeButton = document.createElement("button");
		removeButton.textContent = "Remove";
		removeButton.addEventListener("click", (event) => {
			const index = event.target.parentNode.getAttribute("data-index");
			removeBookFromLibrary(index);
			displayBooks();
		});

		// Create a new button element for the toggling the read status of a book
		const toggleReadButton = document.createElement("button");
		toggleReadButton.textContent = "Toggle Read";
		toggleReadButton.addEventListener("click", (event) => {
			const index = event.target.parentNode.getAttribute("data-index");
			const book = myLibrary[index];
			book.toggleRead();
			displayBooks();
		});
		bookCard.appendChild(toggleReadButton);

		// Add the book card to the container element
		bookContainer.appendChild(bookCard);
	}
}

// Get the button element for adding a new book and add a click event listener to it
const newBookButton = document.getElementById("new-book-button");
newBookButton.addEventListener("click", () => {
	const formContainer = document.getElementById("form-container");
	formContainer.classList.remove("hidden");
});

// Get the form element for adding a new book and add a submit event listener to it
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
	// Prevent the form from submitting a refreshing the page
	event.preventDefault();
	const titleInput = document.getElementById("title-input");
	const authorInput = document.getElementById("author-input");
	const pagesInput = document.getElementById("pages-input");
	const readInput = document.getElementById("read-input");
	const newBook = new Book(
		titleInput.value,
		authorInput.value,
		pagesInput.value,
		readInput.checked
	);
	addBookToLibrary(newBook);
	displayBooks();
	titleInput.value = "";
	authorInput.value = "";
	pagesInput.value = "";
	readInput.checked = false;
	const formContainer = document.getElementById("form-container");
	formContainer.classList.add("hidden");
});

const cancelButton = document.getElementById("cancel-button");
cancelButton.addEventListener("click", () => {
	const formContainer = document.getElementById("form-container");
	formContainer.classList.add("hidden");
});

// Sample books
const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 310, false);
addBookToLibrary(book1);

const book2 = new Book("1984", "George Orwell", 328, true);
addBookToLibrary(book2);

const book3 = new Book("To kill a mockingbird", "Harper Lee", 281, true);
addBookToLibrary(book3);

displayBooks(); // Display the books in the library initially
