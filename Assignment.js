const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/mydatabase';


// Connection:
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Schema:
const movieSchema = new mongoose.Schema({
    name: String,
    img: String,
    summary: String
});

const Movie = mongoose.model('Movie', movieSchema);

// Create Express app
const app = express();
app.use(express.json());

// Route to add movie:
app.post('/movies', async (req, res) => {
    try {
        // const { name, img, summary } = req.body;
        const newMovie = new Movie(req.body);
        console.log(newMovie);
        await newMovie.save();
        res.status(201).json({ message: 'Movie added!', newMovie });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(5000, () => {
    console.log(`Server is running on 5k`);
});
