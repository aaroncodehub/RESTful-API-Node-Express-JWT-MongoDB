const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { registerValidation,loginValidation } = require("../validation");

router.post('/register', async(req, res) => {

  // Validate the data before creating a user
  const { error } = registerValidation(req.body);
  if (error) return res.json({msg:error.details[0].message});

  // Checking if the email is already in the database
  const emailExist = await User.findOne({ email: req.body.email })
  if(emailExist) return res.status(400).json({msg:'Email already exist'})

// Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  //Create a new user
  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    },
    (err, createdUser) => {
      if (err) {
        res.status(500).json({msg:err});
      }
      res.json({userId:createdUser._id});
    }
  );
});

// Login
router.post('/login', async(req, res) => {
   // Validate the data
   const { error } = loginValidation(req.body);
  if (error) return res.json({ msg: error.details[0].message });
  
    // Checking if the email exists
    const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).json({ msg: 'Email or password is wrong' })
  
  // checking if password is correct
  const validPss = await bcrypt.compare(req.body.password, user.password)
  if (!validPss) return res.status(400).json({ msg: 'Email or password is wrong' })

  // Create and assign a token with expiration
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET,{ expiresIn: '2h' })

  // Send to header
  res.header('auth-token', token).json({authToken: token})

})

module.exports = router;