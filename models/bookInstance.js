const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Model for a collection that'll keep track of each individual instance of a book (since there may be multiple books of the same title)

const BookInstanceSchema = new Schema({
  // Referencing the Book model
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    // enum indicates it's one of these possible values - with the initial value as the default prop
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance",
  },
  due_back: { type: Date, default: Date.now },
});

BookInstanceSchema.virtual("url").get(function () {
  return `/catalog/bookinstance/${this._id}`;
});

module.exports = mongoose.model("BookInstance", BookInstanceSchema);
