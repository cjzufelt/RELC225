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
    const data = fs.readFileSync('D&C.json', 'utf8')
    res.send(data);
  }
  catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3001, () => console.log('Server listening on port 3001!'));
