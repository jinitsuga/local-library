const express = require("express");
const router = express.Router();

// controller modules

const author_controller = require("../controllers/authorController");
const book_controller = require("../controllers/bookController");
const book_instance_controller = require("../controllers/bookInstanceController");
const genre_controller = require("../controllers/genreController");

// index route

router.get("/", book_controller.index);

//  --- Book routes ---

// creation
router.get("/book/create", book_controller.book_create_get);
router.post("book/create", book_controller.book_create_post);

//deletion
router.get("/book/:id/delete", book_controller.book_delete_get);
router.post("/book/:id/delete", book_controller.book_delete_post);

// update
router.get("/book/:id/update", book_controller.book_update_get);
router.post("/book/:id/update", book_controller.book_update_post);

// book details and list of books
router.get("/book/:id", book_controller.book_details);

router.get("/books", book_controller.book_list);

// --- Author routes ---

// creation
router.get("/author/create", author_controller.author_create_get);
router.post("/author/create", author_controller.author_create_post);

// deletion
router.get("/author/:id/delete", author_controller.author_delete_get);
router.post("/author/:id/delete", author_controller.author_delete_post);

// update
router.get("/author/:id/update", author_controller.author_update_get);
router.post("/author/:id/update", author_controller.author_update_post);

// details and list of authors
router.get("/author/:id", author_controller.author_details);

router.get("/authors", author_controller.author_list);

// -- Genre routes --

// create genre
router.get("/genre/create", genre_controller.genre_create_get);
router.post("/genre/create", genre_controller.genre_create_post);

// delete genre
router.get("/genre/:id/delete", genre_controller.genre_delete_get);
router.post("genre/:id/delete", genre_controller.genre_delete_post);

// update genre
router.get("/genre/:id/update", genre_controller.genre_update_get);
router.post("/genre/:id/update", genre_controller.genre_update_post);

// details and list of genres
router.get("/genre/:id", genre_controller.genre_details);

router.get("/genres", genre_controller.genre_list);
