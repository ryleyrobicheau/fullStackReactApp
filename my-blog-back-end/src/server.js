import express from "express";

let articlesInfo = [
  {
    name: "learn-react",
    upvotes: 0,
    comments : [],
  },
  {
    name: "learn-node",
    upvotes: 0,
    comments : [],
  },
  {
    name: "mongodb",
    upvotes: 0,
    comments : [],
  },
];

const app = express();
app.use(express.json());

// get request example. Endpoint (http://localhost:8000/hello).found on postman (fullSackReactCourse) as "getty".
// app.get('/hello', (req, res) => {
//     res.send('Hello!');
// });

// post request example. Endpoint (http://localhost:8000/hello).found on postman (fullSackReactCourse) as "postmalone".
// app.post('/hello', (req, res) => {
//     console.log(req.body);
//     res.send(`Hello ${req.body.name}!`);
// });

// get request example displaying url parameters.
// app.get('/hello/:name', (req, res) => {
//     const { name } = req.params;
//     res.send(`Hello ${name}!`)
// });

app.put("/api/articles/:name/upvote", (req, res) => {
  const { name } = req.params;

  const article = articlesInfo.find((a) => a.name === name);
  
  if (article) {
    article.upvotes += 1;
    res.send(`The ${name} now has ${article.upvotes} upvotes!!!`);
  } else {
    res.send(`The article does not exist`);
    }
});

app.post("/api/articles/:name/comments", (req, res) => {
  const { name } = req.params;
  const { postedBy , text } = req.body;

  const article = articlesInfo.find(a => a.name === name);

  if (article) {
    article.comments.push({postedBy, text});
    res.send(article.comments);
  } else {
    res.send(`The article does not exist`);
  } 
});


app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
