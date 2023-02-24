const BookInstance = require("../models/bookInstance");
const Book = require("../models/book");
const validator = require("express-validator");

const body = validator.body;
const validationResult = validator.validationResult;

// all book instances

// "exec() method executes the provided function, taking error as the first argument and the query's result as the second"
exports.bookinstance_list = (req, res, next) => {
  BookInstance.find()
    .populate("book")
    .exec(function (err, list_instances) {
      if (err) {
        next(err);
      }
      res.render("bookinstance_list", {
        title: "Book copies list",
        book_instances_list: list_instances,
      });
    });
};

// specific book instance

exports.bookinstance_details = (req, res, next) => {
  BookInstance.findById(req.params.id)
    .populate("book")
    .exec((err, bookinstance) => {
      if (err) {
        return next(err);
      }
      if (bookinstance == null) {
        const err = new Error("copy not found");
        err.status = 404;
        return next(err);
      }
      res.render("bookinstance_detail", {
        title: `Copy: ${bookinstance.book.title}`,
        bookinstance,
      });
    });
};

// display bookinstance creation form

exports.bookinstance_create_get = (req, res, next) => {
  Book.find({}, "title").exec((err, books) => {
    if (err) {
      return next(err);
    }
    // Successful, so render.
    res.render("bookinstance_form", {
      title: "Add a book",
      book_list: books,
    });
  });
};

// Post bookinstance in the DB

exports.bookinstance_create_post = [
  body("book", "Must specifiy book").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Must specify imprint").trim().isLength({ min: 1 }).escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // process request after validating
  (req, res, next) => {
    const errors = validationResult(req);

    const bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });

    if (!errors.isEmpty()) {
      Book.find({}, "title").exec((err, books) => {
        if (err) {
          return next(err);
        }
        res.render("bookinstance_form", {
          title: "Add a book",
          book_list: books,
          errors: errors.array(),
          bookInstance,
        });
      });
      return;
    }
    // data is valid, save copy to db and redirect to book copy page
    bookInstance.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(bookInstance.url);
    });
  },
];

// book instance deletion form

exports.bookinstance_delete_get = (req, res) => {
  res.send("not implemented: book instance deletion form");
};

// book instance deletion POST to DB

exports.bookinstance_delete_post = (req, res) => {
  res.send("not implemented: book instance deletion POST");
};

// book instance UPDATE get form

exports.bookinstance_update_get = (req, res) => {
  res.send("not implemented, book instance updating form");
};

// book instance update POST on db

exports.bookinstance_update_post = (req, res) => {
  res.send("bookinstance update POST");
};
