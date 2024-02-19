const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});


//   return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here

  res.send(JSON.stringify(books, null, 11))

  const myPromise = new Promise((resolve, reject) => {
    resolve(res.send(JSON.stringify({books}, null, 4)));
  });

  get_books.then(() => console.log("Promise is resolved"));

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here

//   const isbn = req.params.isbn
//   res.send(books[isbn])

  const isbn = req.params.isbn

  const myPromise = new Promise((resolve, reject) => {
    resolve(
        res.send(books[isbn]));
  });

  get_books.then(() => console.log("Promise is resolved"));

 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here

//   let temp_books = [];
//   let isbns = Object.keys(books);
//   isbns.forEach((isbn) => {
//     if (books[isbn]["author"] === req.params.author) {
//         temp_books.push({"isbn": isbn, "title": books[isbn]["title"], "reviews": books[isbn]["reviews"]});
//     };
//   });
//   res.send(JSON.stringify({temp_books}, null, 4));

let temp_books = [];
let isbns = Object.keys(books);
isbns.forEach((isbn) => {
  if (books[isbn]["author"] === req.params.author) {
      temp_books.push({"isbn": isbn, "title": books[isbn]["title"], "reviews": books[isbn]["reviews"]});
  };
});

const myPromise = new Promise((resolve, reject) => {
    resolve(
        res.send(JSON.stringify({temp_books}, null, 4)));
  });

  get_books.then(() => console.log("Promise is resolved"));

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here

//   let temp_books = [];
//   let isbns = Object.keys(books);
//   isbns.forEach((isbn) => {
//     if (books[isbn]["title"] === req.params.title) {
//         temp_books.push({"isbn": isbn, "author": books[isbn]["author"], "reviews": books[isbn]["reviews"]});
//     };


//   });
//   res.send(JSON.stringify({temp_books}, null, 4));


  let temp_books = [];
  let isbns = Object.keys(books);
  isbns.forEach((isbn) => {
    if (books[isbn]["title"] === req.params.title) {
        temp_books.push({"isbn": isbn, "author": books[isbn]["author"], "reviews": books[isbn]["reviews"]});
    };

  });

  const myPromise = new Promise((resolve, reject) => {
    resolve(
        res.send(JSON.stringify({temp_books}, null, 4)))

  });

  get_books.then(() => console.log("Promise is resolved"));

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here

  const isbn = req.params.isbn
  res.send(books[isbn]["reviews"]);

  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
