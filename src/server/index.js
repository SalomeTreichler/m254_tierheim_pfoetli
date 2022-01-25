const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json())

// Route to get all animals
app.get("/api/get", (req, res) => {
    db.query("SELECT * FROM animal", (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
        res.send(result)
    });
});

// Route to get an animal by id
app.get("/api/getById/:id", (req, res) => {
    db.query("SELECT * FROM animal WHERE id = ?", id,
        (err, result) => {
            if (err) {
                console.log(err)
            }
            console.log(result)
            res.send(result)
        });
});

// Route to get an animal by id
app.post("/api/create", (req, res) => {
    db.query("SELECT * FROM animal WHERE id = ?", id,
        (err, result) => {
            if (err) {
                console.log(err)
            }
            console.log(result)
            res.send(result)
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})