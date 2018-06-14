const express = require("express");
const morgan = require("morgan");
const client = require('./db/index.js');
const postList = require("./views/postList");
const postDetails = require("./views/postDetails");
// const userList = await client.query('SELECT * FROM users');
// const users = userList.rows;

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
  try{
    const data = await client.query('SELECT * FROM posts');
    const posts = data.rows;
    res.send(postList(posts));
  }
  catch(err){
    console.error("Failed to load!", err);
    res.status(500).send(`Something went wrong: ${err}`);
  }
});

app.get("/posts/:id", async (req, res) => {
  try{
    const data = await client.query(`SELECT * FROM posts JOIN users ON posts.userid = users.id WHERE posts.id = ${req.params.id}`);
    const post = data.rows[0];
    res.send(postDetails(post));
  }
  catch(err){
    console.error("Failed to load!", err);
    res.status(500).send(`Something went wrong: ${err}`);
  }
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});