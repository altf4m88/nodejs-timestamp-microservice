const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/", (req, res) => {
  let date = new Date(Date.now());
  res.json({"unix" : date.valueOf(), "utc" : date.toUTCString()})
})

app.get("/api/timestamp/:dateparam", (req, res) => {
  let dateParam = req.params.dateparam;
  let unixRegex = /\d{5,}/;

  if(unixRegex.test(dateParam)){
    let dateInt = parseInt(dateParam);
    let date = new Date(dateInt);

    res.json({"unix" : dateInt, "utc" : date.toUTCString()})
  } else {
    let date = new Date(dateParam);
    if(date.toString() == "Invalid Date") res.json({error : "Invalid Date"});

    res.json({"unix" : date.valueOf(), "utc" : date.toUTCString()})
  }
});

let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
