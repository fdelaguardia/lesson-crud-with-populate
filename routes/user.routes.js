const router = require("express").Router();

const User = require("../models/User.model");

// ****************************************************************************************
// GET route to display the form to "register" a user
// ****************************************************************************************

router.get("/user-create", (req, res) => res.render("users/create"));

// ****************************************************************************************
// POST route to submit the form to create a user
// ****************************************************************************************

router.post("/user-create", (req, res) => {
  const { username } = req.body;
  User.findOne({ username })
    .then((userDocFromDB) => {
      if (!userDocFromDB) {
        // prettier-ignore
        User.create({ username })
        .then(() => res.redirect('/post-create'));
      } else {
        res.render("users/create", { message: "It seems you are already registered. ☀️" });
        return;
      }
    })
    .catch((err) => console.log(`Error while creating a new user: ${err}`));
});

// ****************************************************************************************
// GET route to display all users from the DB
// ****************************************************************************************

router.get("/", (req, res) => {
  User.find() // <-- .find() method gives us always an ARRAY back
    .then((usersFromDB) => res.render("users/list", { users: usersFromDB }))
    .catch((err) => console.log(`Error while getting users from the DB: ${err}`));
});

router.get('/posts/:userId/', (req, res, next) => {

  User.findById(req.params.userId)
  .populate('posts')
  .then((foundUser) => {
   res.render('users/details.hbs', foundUser) 
  })
  .catch((err) => {
    console.log(err)
  })
  // ... your code here
});

// ****************************************************************************************
// GET details of a specific user (primarily their posts)
// ****************************************************************************************

// ... your code here

module.exports = router;