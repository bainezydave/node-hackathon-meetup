const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");

require("./models/user");
require("./models/event");
require("./models/group");
require("./config/passport")(passport);

const keys = require("./config/keys");

const { truncate, stripTags, formatDate, select, editIcon } = require("./helpers/hbs");

mongoose.Promise = global.Promise;

mongoose.connect(
    keys.mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("MongoDb connection"))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride("_method"));

app.engine("handlebars",
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
app.use(session({
        secret: "superSecretPassword",
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) =>
{
    res.locals.user = req.user || null;
    next();
});

app.use(express.static(path.join(__dirname, "public")));

app.use("/auth",   require("./routes/auth"));
app.use("/",       require("./routes/index"));
app.use("/events", require("./routes/events"));
app.use("/groups", require("./routes/groups"));


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`started server on port ${port}`));