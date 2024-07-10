const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/crud", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("Error connecting to MongoDB:", err);
});

app.get("/", (req, res) => {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});

app.get('/getUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findById(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(err => res.status(500).json(err));
});

app.put('/updateUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(id, {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  }, { new: true })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(err => res.status(500).json(err));
});

app.delete('/deleteUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete(id)
    .then(user => {
      if (user) {
        res.json({ message: "User deleted successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(err => res.status(500).json(err));
});

app.post('/createUser', (req, res) => {
  UserModel.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json(err));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
