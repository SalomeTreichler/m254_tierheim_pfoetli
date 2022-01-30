const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json())

// Route to get all animals
app.get("/api/animals", (req, res) => {
    db.query("SELECT a.id, a.name, a.species, a.breed, a.arrival, a.comment, s.status FROM animal a LEFT JOIN status s on a.statusId = s.id", (err, result) => {
        if (err) {
            console.error(err)
        }
        res.send(result)
    });
});

// Route to get an animal by id
app.get("/api/animals/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT a.id, a.name, a.species, a.breed, a.arrival, a.comment, s.status FROM animal a LEFT JOIN status s on a.statusId = s.id WHERE a.id = ?", id,
        (err, result) => {
            if (err) {
                console.error(err)
            }
            res.send(result)
        });
});

// Route to insert a new animal
app.post("/api/animal", (req, res) => {
    const data = req.body;
    db.query("INSERT INTO animal (name, species, breed, comment, statusId) VALUES (?,?,?,?, (SELECT id from status WHERE status = ?))", [data.name, data.species, data.breed, data.comment, data.status], (err, result) => {
        if (err) {
            console.error(err)
        }
        res.send(result)
    });
});

// Route to update an animal
app.post("/api/animal/:id", (req, res) => {
    const id = req.params.id;
    const data = req.body;

    db.query("UPDATE animal SET name = ?, species = ?, breed = ?, comment = ?, statusId = (SELECT id from status WHERE status = ?) WHERE id = ?", [data.name, data.species, data.breed, data.comment, data.status, id], (err, result) => {
        if (err) {
            console.error(err)
        }
        res.send(result)
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})