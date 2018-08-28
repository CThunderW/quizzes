const express = require("express");
const router = express.Router();
const knex = require("../db/client");

router.get("/", (request, response) => {
    response.redirect("/clucks");
  });

  const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
  router.post("/sign_in", (request, response) => {
    const username = request.body.username;

    response.cookie("username", username, { maxAge: COOKIE_MAX_AGE });

    response.redirect("/clucks");
  });
  
  router.post("/sign_out", (request, response /*, next */) => {
    response.clearCookie("username");
    response.redirect("/");
  });




  module.exports = router;