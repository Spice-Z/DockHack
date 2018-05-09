const express = require("express");
const app = express();
const path = require("path");
const db = require("./pg-setting.js");
const bodyParser = require("body-parser");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/dist"));
});

// Run the app by serving the static files
// in the dist directory
app.use(express.static(path.join(__dirname, "/dist")));
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);

app.get("/api/general", function (req, res, next) {
  db
    .any(
      `select id,idea_text,date, mention_from_id.mentiond_id as is_mention_to, mentiond_id.mention_from_id as is_mentiond from ideas 
      LEFT JOIN ( select mention_from_id , mentiond_id from idea_relations ) as mention_from_id ON id = mention_from_id.mention_from_id 
      LEFT JOIN ( select mentiond_id , mention_from_id from idea_relations ) as mentiond_id ON id = mentiond_id.mentiond_id`
    )
    .then(function (data) {
      res.json(data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/api/mentiond", function (req, res, next) {
  let mainId = req.query.id;
  db
    .any(
      `select id,idea_text,date FROM ideas 
      WHERE id in 
      (SELECT mention_from_id FROM idea_relations WHERE mentiond_id = $1 )`, [mainId]
    )
    .then(function (data) {
      res.json(data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/api/getParentById", function (req, res, next) {
  let mainId = req.query.id;
  db
    .any(
      `SELECT id,idea_text,date FROM ideas 
      WHERE id = (SELECT mentiond_id FROM idea_relations WHERE mention_from_id = $1 LIMIT 1 OFFSET 0) `, [mainId]
    )
    .then(function (data) {
      res.json(data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.post("/api/tweetNewIdea", function (req, res) {
  let newId = "";
  let mentionToId = req.body[0].mentionTo;
  db
    .one("INSERT INTO ideas(idea_text, date) VALUES($1, now() ) RETURNING id", [
      req.body[0].ideaText
    ])
    .then(data => {
      newId = data.id;
    })
    .catch(error => {
      console.log("ERROR:", error);
    });

  if (!mentionToId || mentionToId == 0) {
    res.json(req.body);
    return;
  }
  setTimeout(() => {
    db
      .none(
        "INSERT INTO idea_relations(mention_from_id, mentiond_id) VALUES($1, $2 )", [newId, mentionToId]
      )
      .then(() => {
        console.log("insert is success");
        res.json(req.body);
      })
      .catch(error => {
        console.log("ERROR:", error);
      });
  }, 3000);
});

app.post("/api/deleteIdea", function (req, res) {
  let id = req.body.id;
  db
    .result("DELETE FROM ideas WHERE id = $1", id)
    .then(result => {
      console.log(result.rowCount);
      res.json(result.rowCount + "件削除しました");
    })
    .catch(error => {
      console.log("ERROR:", error);
    });
});
