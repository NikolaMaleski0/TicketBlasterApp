const User = require('../../../pkg/user/userSchema');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const signUp = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name ,
      email: req.body.email,
      password: req.body.password,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES
    });

    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true
    });

    res.status(201).json({
      status: 'Success',
      token,
      data: {
        user: newUser
      }
    });

  } catch(err) {
    console.log(err);
    return res.status(500).send(err)
  }
};

const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send('Please provide email and password.');

    const user = await User.findOne({ email });

    if (!user) return res.status(401).send('invalid email or password');

    const isPasswordValid = bcryptjs.compareSync(password, user.password);

    if(!isPasswordValid) return res.status(400).send('Invalid email or password');

    const token = jwt.sign({ 
      id: user._id,
      role: user.role,
     }, 
     process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES
    });

    console.log(token);

    res.cookie('jwt', token.toString(), {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true,
    });

    res.status(200).json({
      status: 'Success',
      token
    });

  } catch(err) {
    console.log(err);
    return res.status(500).send(err)
  }
};

const logOut = (req, res) =>  {
  console.log('logout');
  res.clearCookie('jwt');
  res.status(204).json({
    message: 'Logout Succesfull'
  });
};

module.exports = {
  signUp,
  login,
  logOut
}