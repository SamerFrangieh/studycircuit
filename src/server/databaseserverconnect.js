const express = require('express');
const cors = require('cors');
const { selectAllLanguages, selectAllMajors, selectAllInterests, selectAllCourses } = require('./database/db'); // Adjust the path as necessary

const app = express();
app.use(cors()); // Use CORS middleware to allow cross-origin requests

app.get('/api/languages', async (req, res) => {
    try {
        const languages = await selectAllLanguages();
        res.json(languages);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Repeat for other endpoints
app.get('/api/majors', async (req, res) => {
    try {
        const majors = await selectAllMajors();
        res.json(majors);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.get('/api/interests', async (req, res) => {
    try {
        const interests = await selectAllInterests();
        res.json(interests);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/api/courses', async (req, res) => {
    try {
        const courses = await selectAllCourses();
        res.json(courses);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
