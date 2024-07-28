const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: "books_database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 HW1 Template" });
});

//Home.
app.get("/", (req, res) => {
  res.send("Welcome to books database...");
});

//Question 1 Fetch All Books.
async function fetchAllBooks(){
  let query = "SELECT * FROM books";
  let response = await db.all(query, []);
  return { books : response };
};

app.get("/books", async(req, res) => {
  let result = await fetchAllBooks();
  res.status(200).json(result);
});

//Question 2 Fetch Books by Author.
async function fetchBooksByAuthor(author){
  let query = "SELECT * FROM books Where author = ?";
  let response = await db.all(query, [author]);
  return { books : response };
};

app.get("/books/author/:author", async(req, res) => {
  let author = req.params.author;
  let result = await fetchBooksByAuthor(author);
  res.status(200).json(result);
});

//Question 3 Fetch Books by Genre.
async function fetchBooksByGenre(genre){
  let query = "SELECT * FROM books Where genre = ?";
  let response = await db.all(query, [genre]);
  return { books : response };
};

app.get("/books/genre/:genre", async(req, res) => {
  let genre = req.params.genre;
  let result = await fetchBooksByGenre(genre);
  res.status(200).json(result);
});

//Question 4 Fetch Books by Publication Year.
async function fetchBooksByYear(year){
  let query = "SELECT * FROM books Where publication_year = ?";
  let response = await db.all(query, [year]);
  return { books : response };
};

app.get("/books/publication_year/:year", async(req, res) => {
  let year = req.params.year;
  let result = await fetchBooksByYear(year);
  res.status(200).json(result);
});



app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
