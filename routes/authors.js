const express = require("express");
const router = express.Router();
const Author = require('../models/author')

router.get("/", async (req, res) => {
  let searchValue = {}
  if(req.query.name !== null && req.query.name != '') {
    searchValue.name = new RegExp(req.query.name, 'i')
  }
  try {
    const authors = await Author.find(searchValue);
    res.render("authors/index", { authors: authors, searchValue: req.query});
  } catch (err) {
    res.redirect('/')
  }
});

router.get("/new", (req, res) => {
  res.render("authors/new");
});

router.post("/", async (req, res) => {
    const author = new Author({
        name: req.body.name
    })

    try {
      const newAuthor = await author.save();
      res.redirect("/authors");
    } catch {
      res.render("authors/new", {
        author: author,
        errorMessage: "Error creating Author",
      });
    }
});

module.exports = router;
