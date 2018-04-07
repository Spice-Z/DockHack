const express = require("express");
const app = express();
const path = require("path");
const db = require("./pg-setting.js");

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "/dist"));
});

// Run the app by serving the static files
// in the dist directory
app.use(express.static(path.join(__dirname, "/dist")));
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);

app.get("/api/general", function(req, res, next) {
  db
    .any(
      `select id,idea_text,date, mention_from_id as is_mention_to, mentiond_id as is_mentiond from ideas 
  LEFT JOIN ( select mention_from_id from idea_relations ) as mention_from_id ON id = mention_from_id 
  LEFT JOIN ( select mentiond_id from idea_relations ) as mentiond_id ON id = mentiond_id`
    )
    .then(function(data) {
      res.json(data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.get("/api/mentiond", function(req, res, next) {
  let mainId = req.query.id;
  db
    .any(
      `select id,idea_text,date FROM ideas 
      WHERE id in 
      (SELECT mention_from_id FROM idea_relations WHERE mentiond_id = $1 )`,
      [mainId]
    )
    .then(function(data) {
      res.json(data);
    })
    .catch(function(error) {
      console.log(error);
    });
});
