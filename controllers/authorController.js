const Author = require("../models/author");

// All authors
exports.author_list = (req, res) => {
  res.send("Not implemented: authors list");
};

// Specific author details
exports.author_details = (req, res) => {
  res.send(`NOt implemented: author details: ${req.params.id}`);
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
