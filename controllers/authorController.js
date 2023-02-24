const Author = require("../models/author");
const Book = require("../models/book");
const async = require("async");

// validator library for the form
const validator = require("express-validator");

const body = validator.body;
const validationResult = validator.validationResult;

// All authors
exports.author_list = (req, res, next) => {
  Author.find()
    .sort([["family_name", "ascending"]])
    .exec(function (err, listed_authors) {
      if (err) {
        next(err);
      }
      res.render("author_list", {
        title: "List of authors",
        author_list: listed_authors,
      });
    });
};

// Specific author details
exports.author_details = (req, res, next) => {
  async.parallel(
    {
      author(callback) {
        Author.findById(req.params.id).exec(callback);
      },
      author_books(callback) {
        Book.find({ author: req.params.id }, "title summary").exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.author == null) {
        const err = new Error("Author not found");
        err.status = 404;
        return next(err);
      }
      res.render("author_detail", {
        author: results.author,
        books_author: results.author_books,
      });
    }
  );
};

// Send form to create an author
exports.author_create_get = (req, res) => {
  res.render("author_form", { title: "Add an author" });
};

// Send POST data to create the author to the DB

exports.author_create_post = [
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Must include first name")
    .isAlphanumeric()
    .withMessage("first name contains non-alphanumeric values"),
  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Must include family name")
    .isAlphanumeric()
    .withMessage("family name contains non alphanumeric values"),
  body("birth_date", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body("death_date", "Invalid date of death")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("author_form", {
        title: "Add an author",
        errors: errors.array(),
        author: req.body,
      });
      return;
    }
    // Data is valid
    const author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      birth_date: req.body.birth_date,
      death_date: req.body.death_date,
    });
    author.save((err) => {
      if (err) {
        return next(err);
      }
    });
  },
];

// display author update form
exports.author_update_get = (req, res) => {
  res.send("not implemented: author update GET");
};

// Update author on DB
exports.author_update_post = (req, res) => {
  res.send("not implemented: author update POST");
};

// deleting form
exports.author_delete_get = (req, res, next) => {
  async.parallel(
    {
      author(callback) {
        Author.findById(req.params.id).exec(callback);
      },
      author_books(callback) {
        Book.find({ author: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.author == null) {
        res.redirect("/catalog/authors");
      }

      res.render("author_delete", {
        title: "Delete an author",
        author: results.author,
        author_books: results.author_books,
      });
    }
  );
};

// post deletion to db
exports.author_delete_post = (req, res, next) => {
  async.parallel(
    {
      author(callback) {
        Author.findById(req.body.authorid).exec(callback);
      },
      author_books(callback) {
        Book.find({ author: req.body.authorid }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.author_books.length > 0) {
        // If there are books with the selected author, can't delete, sends back to form.
        res.render("author_delete", {
          title: "Delete an author",
          author: results.author,
          author_books: results.author_books,
        });
        return;
      }
      // author has no books, find and remove
      Author.findByIdAndRemove(req.body.authorid, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/catalog/authors");
      });
    }
  );
};
