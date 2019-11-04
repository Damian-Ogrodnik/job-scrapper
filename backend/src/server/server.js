const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const route = require('./routes/route');

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use('/', route);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/scrapper', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

app.listen(PORT, () => {
    console.log('Server is listening...');
});