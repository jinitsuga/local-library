const BookInstance = require("../models/bookInstance");

// all book instances

exports.bookinstance_list = (req, res) => {
  res.send("not implemented: list of all books instances");
};

// specific book instance

exports.bookinstance_detail = (req, res) => {
  res.send(`not implemented: details of specific book ${req.params.id}`);
};

// display bookinstance creation form

exports.bookinstance_create_get = (req, res) => {
  res.send("Not yet implemented book instance creation form");
};

// Post bookinstance in the DB

exports.bookinstance_create_post = (req, res) => {
  res.send("not implemented, book instance POST on DB");
};

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
