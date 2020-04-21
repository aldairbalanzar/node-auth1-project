const bcrypt = require('bcryptjs');
const router = require('express').Router();
const Users = require("../users-model");

router.post('/register', (req, res) => {
    let user = req.body;

    const rounds = process.env.HASHING_ROUNDS || 8;
    const hash = bcrypt.hashSync(user.password, rounds);

    user.password = hash;

    Users.add(req.body)
    .then(user => res.status(201).json({ message: "successfuly registered!", user: user }))
    .catch(err => res.status(500).json({ message: "could not register user."}))
});

router.post('/login', (req, res) => {
    let {username, password} = req.body;
    console.log(username);
    Users.findBy({username})
    .then(([dbData]) => {
        if(dbData && bcrypt.compareSync(password, dbData.password)){
            req.session.loggedIn = true;
            res.status(200).json({ message: "logged in" })
        }else {
            res.status(401).json({ message: "invalid credentials."})
        }
    })
    .catch(err => res.status(500).json({ message: "error finding user."}))
});

router.get('/logout', (req, res) => {
    if(req.session) {
        req.session.destroy()
    }else {
        res.status(200).json({ message: "already logged out." })
    }
})

module.exports = router;