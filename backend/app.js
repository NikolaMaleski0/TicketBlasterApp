const express = require("express");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const db = require("./pkg/db/index");
const auth = require("./services/auth/handlers/authHandler");
const ecommerce = require("./services/ecommerce/ecommerceHandler/ecommerceHandler");
const events = require("./services/events/eventHandler/eventHandler");
const users = require("./services/users/handlers/userHandler");
const upload = require("./services/upload/uploadHandler/uploadHandler");
const proxy = require("./services/proxy/index");

const app = express();
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.set("view engine", "ejs");

db.init();

app.post("/api/v1/auth/create-account", auth.signup);
app.post("/api/v1/auth/login", auth.login);

app.post("/forgotPassword", auth.forgotPassword);
app.patch("/resetPassword/:token", auth.resetPassword);

app.get("/events", eventHandler.getAll);
app.get("/events/:id", eventHandler.getOne);
app.post("/events", eventHandler.create);
app.patch("/events/:id", eventHandler.eventHandler.update);
app.patch("/events/:id", eventHandler.uploadEventPhoto, uploadHandler.update);
app.delete("/events/:id", eventHandler.delete);

app.listen(process.env.PORT, (err) => {
    if (err) {
      return console.log("Could not start service");
    }
    console.log("service started successfully on port 3000");
  });