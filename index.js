// index.js
const express = require('express');
const mongoose = require('mongoose');
const apiRouter = require('./routes/api');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

mongoose.connect('mongodb://localhost:27017/educounseldb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
