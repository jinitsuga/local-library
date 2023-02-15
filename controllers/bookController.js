const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookInstance");

const async = require("async");

// shows welcome/index page

exports.index = (req, res) => {
  async.parallel(
    {
      book_count(cb) {
        Book.countDocuments({}, cb);
      },
      author_count(cb) {
        Author.countDocuments({}, cb);
      },
      genre_count(cb) {
        Genre.countDocuments({}, cb);
      },
      book_instance_available_count(cb) {
        BookInstance.countDocuments({ status: "Available" }, cb);
      },
      book_instance_count(cb) {
        BookInstance.countDocuments({}, cb);
      },
    },
    (err, results) => {
      res.render("index", {
        title: "Local Library Home",
        error: err,
        data: results,
      });
    }
  );
};

// show list of all books
exports.book_list = (req, res) => {
  res.send("not implemented: list of books");
};

// show details of specific book
exports.book_details = (req, res) => {
  res.send(`not implemented: book details ${req.params.id}`);
};

// show book creation form
exports.book_create_get = (req, res) => {
  res.send("not implemented: book create form");
};

// post book created on DB
exports.book_create_post = (req, res) => {
  res.send("not implemented: book posted on DB");
};

// show book deletion form
exports.book_delete_get = (req, res) => {
  res.send("not implemented: book deletion form");
};

// post book deletion on DB
exports.book_delete_post = (req, res) => {
  res.send("not implemented: post book deletion on db");
};

// show update book form
exports.book_update_get = (req, res) => {
  res.send("not implemented: book update form");
};

// post update on DB
exports.book_update_post = (req, res) => {
  res.send("not implemented: posting book update on DB");
};
