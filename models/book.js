const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Book schema contains references to 2 other model types ( Author and Genre)

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
});

BookSchema.virtual("url").get(function () {
  return `/catalog/book/${this._id}`;
});

module.exports = mongoose.model("Book", BookSchema);

// export default mongoose.model("Book", BookSchema);
