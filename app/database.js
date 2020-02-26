const mongoose = require('mongoose');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('database connected');
})

//shape my database
    const Sequences = new mongoose.Schema({
        name: String
    });

    module.exports = mongoose.model('database', Sequences);


