const path = require("path");
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const app = express();
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

//M E T H O D   O V E R R I D E
//used to make the delete function of forms work properly.
app.use(methodOverride((req, res) => {
    if (typeof req.body === "object" && req.body._method) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
  );
  
//C O O K I E S
app.use(cookieParser());

app.use((request, response, next) => {
    console.log("ðª Cookies:", request.cookies);
    const username = request.cookies.username;
    response.locals.username = "";
    if (username) {
      response.locals.username = username;
      console.log(`ð¤ Signed in as ${username}`);
    }
    next();
});

// -----------
// R O U T E S
// -----------

const signInRouter = require("./routes/signIn");
const clucksRouter = require("./routes/clucks");

app.use("/", signInRouter);
app.use("/clucks", clucksRouter);

// ------------------
// R U N  S E R V E R
// ------------------

const PORT = 1234;
const HOST = "localhost"; // 127.0.0.1
app.listen(PORT, HOST, () => {
  console.log(`ð» Server listening on http://${HOST}:${PORT}`);
});