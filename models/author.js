const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  birth_date: { type: Date },
  death_date: { type: Date },
});

// Establishing full name of the author by combining first and last names through virtual prop

AuthorSchema.virtual("name").get(function () {
  let fullName = "";
  if (this.first_name && this.family_name) {
    fullName = this.first_name + this.family_name;
  }
  if (!this.first_name || !this.family_name) {
    fullName = "";
  }
  return fullName;
});

// Getting the unique ID of the document

AuthorSchema.virtual("url").get(function () {
  return `/catalog/author/${this._id}`;
});

module.exports = mongoose.model("Author", AuthorSchema);
