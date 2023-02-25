const Genre = require("../models/genre");
const Book = require("../models/book");
const async = require("async");

// Importing form validation library
const validator = require("express-validator");
const { restart } = require("nodemon");

const body = validator.body;
const validationResult = validator.validationResult;

// Shows list of all genres
exports.genre_list = (req, res, next) => {
  Genre.find().exec(function (err, listed_genres) {
    if (err) {
      next(err);
    }
    res.render("genre_list", {
      title: "List of genres",
      genre_list: listed_genres,
    });
  });
};

// Display specific details of a genre
exports.genre_details = (req, res, next) => {
  async.parallel(
    {
      genre(callback) {
        Genre.findById(req.params.id).exec(callback);
      },
      genre_books(callback) {
        Book.find({ genre: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.genre == null) {
        // no results
        const err = new Error("Genre not found");
        err.status = 404;
        return next(err);
      }
      // success, then render
      res.render("genre_detail", {
        title: "Genre details",
        genre: results.genre,
        genre_books: results.genre_books,
      });
    }
  );
};

// Show genre creation form
exports.genre_create_get = (req, res, next) => {
  res.render("genre_form", { title: "Add a genre" });
};

// Create the genre on the DB from creation form (post)

// Passing an array of middleware that will be executed in order on the request.
// This is necessary since the validators are middleware functions

exports.genre_create_post = [
  body("name", "Genre name required").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    const genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("genre_form", {
        title: "Add a genre",
        genre,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid, so check if genre exists in db
      Genre.findOne({ name: req.body.name }).exec((err, found_genre) => {
        if (err) {
          return next(err);
        }
        if (found_genre) {
          // Found a genre with the name, so there's already one in db
          res.redirect(found_genre.url);
        } else {
          genre.save((err) => {
            if (err) {
              return next(err);
            }
            res.redirect(genre.url);
          });
        }
      });
    }
  },
];

// show genre delete form
exports.genre_delete_get = (req, res, next) => {
  async.parallel(
    {
      genre(callback) {
        Genre.findById(req.params.id).exec(callback);
      },
      genre_books(callback) {
        Book.find({ genre: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.genre == null) {
        res.redirect("/catalog/genres");
      }

      res.render("genre_delete", {
        title: "Delete a genre",
        genre: results.genre,
        genre_books: results.genre_books,
      });
    }
  );
};

// send deletion post to DB
exports.genre_delete_post = (req, res, next) => {
  async.parallel(
    {
      genre(callback) {
        Genre.findById(req.params.genreid).exec(callback);
      },
      genre_books(callback) {
        Book.find({ genre: req.params.genreid }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.genre_books.length > 0) {
        res.render("genre_delete", {
          title: "Delete a genre",
          genre: results.genre,
          genre_books: results.genre_books,
        });
        return;
      }
      Genre.findByIdAndRemove(req.params.genreid, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/catalog/genres");
      });
    }
  );
};

// show update genre form
exports.genre_update_get = (req, res) => {
  res.send("not implemented: update genre form");
};

// post update genre to db
exports.genre_update_post = (req, res) => {
  res.send("not implemented: post update to db");
};
