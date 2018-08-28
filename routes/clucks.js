const express = require("express");
const router = express.Router();
const knex = require("../db/client");

router.get("/newCluck", (req, res) => {
    res.render("clucks/newCluck");
});

router.post("/", (req, res) => {
    const { image_url, content} = req.body;
    const username = req.cookies.username;
    knex("clucks")
      .insert({
        username,
        image_url,
        content
        
      })
      .returning("id")
      .then(([id]) => {
        res.redirect(`/clucks`);
      });
  });

router.get("/", (req, res) => {
    knex("clucks")
      .orderBy("createdAt", "desc")
      .then(clucks => {
        res.render("clucks/clucksIndex", { clucks });
      });
  });

router.get("/clucksIndex", (request, response) => {
    response.render("clucks/clucksIndex")
}) 
  
//   // Posts#show -> Get /posts/:id
router.get("/:id", (req, res) => {
    const { id } = req.params;
    knex("clucks")
      .where("id", id)
      .first()
      .then(cluck => {
        res.render("clucks/singleCluck", { cluck });
      });
  });

  // Posts#destroy -> DELETE /posts/:id
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
  
    knex("clucks")
      .where("id", id)
      .del()
      .then(() => {
        res.redirect("/clucks");
      });
  });

module.exports = router;