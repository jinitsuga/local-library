const Author = require("../models/author");
const Book = require("../models/book");

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
  res.send("Not implemented: Author create GET");
};

// Send POST data to create the author to the DB

exports.author_create_post = (req, res) => {
  res.send("Not implemented: author create POST");
};

// display author update form
exports.author_update_get = (req, res) => {
  res.send("not implemented: author update GET");
};

// Update author on DB
exports.author_update_post = (req, res) => {
  res.send("not implemented: author update POST");
};

// deleting form
exports.author_delete_get = (req, res) => {
  res.send("not implemented: author deletion form");
};

// post deletion to db
exports.author_delete_post = (req, res) => {
  res.send("not implemented: author deletion post");
};
