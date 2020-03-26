const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const fs = require('fs');
app.get('/api/dcjson', async(req, res) => {
  try {
    var data = JSON.parse(fs.readFileSync("doctrine-and-covenants.json", "utf-8"));
    res.send(data);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/doctrine-and-covenants', {
  useNewUrlParser: true
});

// Create a scheme for insights: author, insight, and date.
const insightSchema = new mongoose.Schema({
  sectionNum: String,
  author: String,
  insight: String,
  date: String,
});

// Create a model for insights
const Insight = mongoose.model('Insight', insightSchema);

// Create a insight: takes a author, insight, and date.
app.post('/api/insights/', async(req, res) => {
  // console.log("In post");
  const insight = new Insight({
    sectionNum: req.body.sectionNum,
    author: req.body.author,
    insight: req.body.insight,
    date: req.body.date,
  });
  try {
    // console.log("Post insight");
    // console.log(insight);
    await insight.save();
    res.send(insight);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/insights/:sectionNum', async(req, res) => {
  // console.log("In get");
  try {
    let insights = await Insight.find({sectionNum: req.params.sectionNum});
    // console.log(insights);
    res.send(insights);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3001, () => console.log('Server listening on port 3001!'));
