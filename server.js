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

app.get("/api/timestamp/:dateparam", (req, res) => {
  const date = new Date(req.params.dateparam);
  res.json({"unix" : date.valueOf(), "utc" : date.toUTCString()})
})

let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
