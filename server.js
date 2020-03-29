const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

var numSections = 138;

function validSectionNum(sectionNum) {
  if (isNaN(sectionNum)) {
    return false;
  }

  return (sectionNum >= 0 && sectionNum < numSections);
}

const fs = require('fs');
app.get('/api/dc/:sectionNum', async(req, res) => {
  try {
    var verses = "";
    var sectionNum = req.params.sectionNum - 1;
    if (validSectionNum(sectionNum)) {
      var dcjson = JSON.parse(fs.readFileSync("doctrine-and-covenants.json", "utf-8"));
      for (var verse of dcjson.sections[sectionNum].verses) {
        verses += verse.verse + ": " + verse.text + "\n\n";
      }
    }


    res.send(verses);
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

// Create an insight: takes a author, insight, and date.
app.post('/api/insights/', async(req, res) => {
  const insight = new Insight({
    sectionNum: req.body.sectionNum,
    author: req.body.author,
    insight: req.body.insight,
    date: req.body.date,
  });
  try {
    await insight.save();
    res.send(insight);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/insights/:sectionNum', async(req, res) => {
  try {
    let insights = await Insight.find({ sectionNum: req.params.sectionNum });
    res.send(insights);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3001, () => console.log('Server listening on port 3001!'));
