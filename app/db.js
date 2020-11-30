const mongoose = require('mongoose');
require('dotenv').config();

const dbUri = process.env.DB_URI;

mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', () => {
    console.error('MongoDB - Error');
});
db.once('open', () => {
    console.info('MongoDB - Connected');
});