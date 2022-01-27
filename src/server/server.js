const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json())

// Route to get all animals
app.get("/api/animals", (req, res) => {
    db.query("SELECT * FROM animal", (err, result) => {
        if (err) {
            console.error(err)
        }
        res.send(result)
    });
});

// Route to get an animal by id
app.get("/api/animals/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM animal WHERE id = ?", id,
        (err, result) => {
            if (err) {
                console.error(err)
            }
            res.send(result)
        });
});

// Route to get animals which are up for adoption
app.get("/api/animals/adoption", (req, res) => {
    db.query("SELECT * FROM animal WHERE statusId = 12",
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