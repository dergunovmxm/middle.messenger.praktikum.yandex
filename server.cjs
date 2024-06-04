const express = require('express');

const app = express();
const PORT = 3000;

app.get('/sign-in', (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
})

app.get('/sign-up', (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
})

app.get('/messenger', (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
})

app.get('/settings', (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
})

app.use(express.static(`${__dirname}/dist`));

app.listen(PORT, () => {
    console.log(`Port: ${PORT}!`);
});