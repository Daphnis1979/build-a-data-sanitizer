import express from 'express'
import {inputCleaner, inputValidator } from "./middleware.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(express.urlencoded({ extended: true }))
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    res.redirect(302, '/form');
})

app.get('/form', (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, 'public') });
});
app.post('/submit', inputCleaner, inputValidator, (req, res) => {
    res.send(`
        <h1>Submitted Data</h1>
        <p>Username: ${req.body.username}</p>
        <p>Comment: ${req.body.comment}</p>
        `)
})


app.use(express.static(path.join(__dirname, 'public')))


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})