const Genre = require("../models/genre");
const Book = require("../models/book");
const async = require("async");

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
exports.genre_create_get = (req, res) => {
  res.send("not implemented: genre creation form");
};

// Create the genre on the DB from creation form (post)
exports.genre_create_post = (req, res) => {
  res.send("not implemented: genre creation on db");
};

// show genre delete form
exports.genre_delete_get = (req, res) => {
  res.send("not implemented: deletion form");
};

// send deletion post to DB
exports.genre_delete_post = (req, res) => {
  res.send("not implemented: post deletion to db");
};

// show update genre form
exports.genre_update_get = (req, res) => {
  res.send("not implemented: update genre form");
};

// post update genre to db
exports.genre_update_post = (req, res) => {
  res.send("not implemented: post update to db");
};
