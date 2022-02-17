const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3001 } = process.env;
const { NODE_ENV, MONGO_URL } = process.env;
const app = express();
require('dotenv').config();

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/floridb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
