const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookInstance");

const validator = require("express-validator");
const body = validator.body;
const validationResult = validator.validationResult;

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
exports.book_list = (req, res, next) => {
  Book.find({}, "title author")
    .sort({ title: 1 })
    .populate("author")
    .exec(function (err, list_books) {
      if (err) {
        return next(err);
      }
      res.render("book_list", { title: "Book List", book_list: list_books });
    });
};

// show details of specific book
exports.book_details = (req, res, next) => {
  async.parallel(
    {
      book(callback) {
        Book.findById(req.params.id)
          .populate("author")
          .populate("genre")
          .exec(callback);
      },
      book_instance(callback) {
        BookInstance.find({ book: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        next(err);
      }
      if (results.book == null) {
        const err = new Error("book not found");
        err.status = 404;
        return next(err);
      }
      res.render("book_detail", {
        title: results.book.title,
        book: results.book,
        copies: results.book_instance,
      });
    }
  );
};
// show book creation form
exports.book_create_get = (req, res, next) => {
  // grab all authors and genres to add to our book
  async.parallel(
    {
      authors(callback) {
        Author.find(callback);
      },
      genres(callback) {
        Genre.find(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render("book_form", {
        title: "Add a book",
        genres: results.genres,
        authors: results.authors,
      });
    }
  );
};

// post book created on DB
exports.book_create_post = [
  (req, res, next) => {
    // turn genre(s) into an arrray, since a book can have multiple genres (only 1 author)
    if (!Array.isArray(req.body.genre)) {
      req.body.genre =
        typeof req.body.genre === "undefined" ? [] : [req.body.genre];
    }
    next();
  },
  // validating fields
  body("title", "Must enter a title").trim().isLength({ min: 1 }).escape(),
  body("author", "Must enter an author").trim().isLength({ min: 1 }).escape(),
  body("summary", "Must enter a summary").trim().isLength({ min: 1 }).escape(),
  body("isbn", "ISBN can't be empty").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),

  // After validation, process the request accordingly
  (req, res, next) => {
    const errors = validationResult(req);

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      isbn: req.body.isbn,
      genre: req.body.genre,
    });

    if (!errors.isEmpty()) {
      // if errors exist, render form again
      async.parallel(
        {
          authors(callback) {
            Author.find(callback);
          },
          genres(callback) {
            Genre.find(callback);
          },
        },
        (err, results) => {
          if (err) {
            return next(err);
          }
          for (const genre of results.genre) {
            if (book.genre.includes(genre._id)) {
              genre.checked = "true";
            }
          }
          res.render("book_form", {
            title: "Add a book",
            authors: results.authors,
            genres: results.genres,
            book,
            errors: errors.array(),
          });
        }
      );
      return;
    }
    // data from form is valid, save book
    book.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(book.url);
    });
  },
];

// show book deletion form
exports.book_delete_get = (req, res) => {};

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
