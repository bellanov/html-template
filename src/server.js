const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "html");
app.set("views", path.join(__dirname, "../views"));

// Custom view engine to render HTML files
app.engine("html", (filepath, options, callback) => {
  const fs = require("fs");
  fs.readFile(filepath, "utf8", (err, content) => {
    if (err) return callback(err);
    return callback(null, content);
  });
});

// Routes

// Home page
app.get("/", (req, res) => {
  res.render("index.html");
});

// Hello World
app.get("/hello", (req, res) => {
  res.render("hello.html");
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
