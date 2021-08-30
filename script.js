// let bookLibrary = ["Meditations", "The Secret Life of Bees","Hell's Angels"];
let bookLibrary = [];
const bookListContainer = document.querySelector(".book-list-container");
const addBookBtn = document.querySelector(".add-book");
const bookInput = document.querySelector(".title-input");
const openFormBtn = document.querySelector(".open-form");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");

function Book(id, title, author, noOfPages, haveRead ){
    this.id = id;
    this.title = title;
    this.author = author;
    this.noOfPages = noOfPages;
    this.haveRead = haveRead;
    
}
closeBtn.addEventListener('click', function(){
    modal.style.display = "none";
})
openFormBtn.addEventListener('click', function () {
    modal.style.display = "flex";
    closeBtn.style.cursor = "pointer";
})

addBookBtn.addEventListener('click', addBook);


function addBook(e){
    e.preventDefault();
    //instantiate book
    let book = new Book(
        id = new Date().toLocaleString(),
        //Get input values
        document.getElementById("title").value,
        document.getElementById("author").value,
        document.getElementById("noOfPages").value,
        document.getElementById("haveRead").checked
    )
    bookLibrary.push(book);
    displayBooks(book);
    clearFields();
    modal.style.display = "none";
    saveData();
    console.log(book, bookLibrary);
}

function clearFields(){
    document.getElementById("title").value = '';
    document.getElementById("author").value = '';
    document.getElementById("noOfPages").value = '';
    document.getElementById("haveRead").checked = '';
}

function removeBook(el){
    if(el.classList.contains('remove-btn')){
        el.parentElement.remove();
    }
}

//TODO refactor display function to loop through books and display them
function displayBooks(book){
        //Create DOM elements to display in UI
        const bookItem = document.createElement("div");
        bookItem.classList.add('book-item');
        bookItem.setAttribute("id", book.id);
        const bookTitle = document.createElement("h3");
        bookTitle.classList.add('book-title');
        const bookAuthor = document.createElement("p");
        bookAuthor.classList.add('book-author');
        const bookPages = document.createElement("p");
        bookPages.classList.add('book-pages');
        const haveReadBook = document.createElement("p");
        haveReadBook.classList.add('have-read');
        const haveReadBtn = document.createElement("button");
        haveReadBtn.classList.add('have-read-btn');
        const removeBtn = document.createElement("button");
        removeBtn.classList.add('remove-btn');
        // removeBtn.addEventListener('click',);
        //Add text content to DOM elements
        bookTitle.textContent = book.title;
        bookAuthor.textContent = book.author;
        bookPages.textContent = `${book.noOfPages} pages`;
        haveReadBtn.innerHTML = book.haveRead === true ? "Have Read" : "Have Not Read";
        haveReadBtn.addEventListener('click', function(){
            if(haveReadBtn.innerHTML === "Have Read"){
                haveReadBtn.innerHTML = "Have Not Read";
                book.haveRead = false;
            } else {
                haveReadBtn.innerHTML = "Have Read";
                book.haveRead = true;
            }
            console.log(book.haveRead);
        });
        removeBtn.innerHTML = "Remove Book";
        bookListContainer.addEventListener('click', (e) => {
            removeBook(e.target);
            removeData();
        });
        //Append elements to the DOM
        bookListContainer.appendChild(bookItem);
        bookItem.appendChild(bookTitle);
        bookItem.appendChild(bookAuthor);
        bookItem.appendChild(bookPages);
        bookItem.appendChild(haveReadBook);
        bookItem.appendChild(haveReadBtn);
        bookItem.appendChild(removeBtn);
}


function saveData(){
    localStorage.setItem('bookLibrary', JSON.stringify(bookLibrary))
}

function retrieveData(){
    if(localStorage.getItem('bookLibrary') === null){
        bookLibrary = [];
    } else {
        JSON.parse(localStorage.getItem('bookLibrary'));
    }
    return bookLibrary;
}

function removeData(){
    bookLibrary.forEach((book, index) => {
        if(book.id === id){
            bookLibrary.slice(index, 1);
        }
    })
}

retrieveData();