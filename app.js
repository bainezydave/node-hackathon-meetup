const express = require("express");
// path for css
const path = require("path");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

require("./models/user");
require("./models/story");
require("./config/passport")(passport);

//Load routes
const auth = require("./routes/auth");
const index = require("./routes/index");
const stories = require("./routes/stories");

// Load mongoose keys
const keys = require("./config/keys");

// Handlebars helpers
const {
    truncate,
    stripTags,
    formatDate,
    select,
    editIcon
} = require("./helpers/hbs");
// Map global promises
mongoose.Promise = global.Promise;
// mongoose connect
mongoose
  .connect(
    keys.mongoURI,
    {
      useNewUrlParser: true
    }
  ) // note connect returns promise
  .then(() => console.log("MongoDb connection"))
  .catch(err => console.log(err));

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method Override middleware
app.use(methodOverride("_method"));

// handlebars middleware
app.engine(
    "handlebars",
    exphbs({
        helpers: {
            truncate: truncate,
            stripTags: stripTags,
            formatDate: formatDate,
            select: select,
            editIcon: editIcon
        },
        defaultLayout: "main"
    })
);

app.set("view engine", "handlebars");

app.use(cookieParser());
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false
    })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global vars just like current_user if user logged in
app.use((req, res, next) =>
{
    res.locals.user = req.user || null;
    next();
});

// Set Static folder
app.use(express.static(path.join(__dirname, "public")));

// use auth Routes : anything that routes to /auth goes to auth.js
app.use("/auth", auth);
app.use("/", index);
app.use("/stories", stories);

var port = process.env.PORT || 3000;
app.listen(port, () =>
{
    console.log(`started server on port ${port}`);
});
