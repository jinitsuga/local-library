const BookInstance = require("../models/bookInstance");

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

exports.bookinstance_details = (req, res) => {
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
