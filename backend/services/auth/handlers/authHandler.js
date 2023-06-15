const User = require("../../../pkg/user/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const token = jwt.sign(
      { id: newUser._id, name: newUser.name, email: newUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );

    res.status(201).json({
      status: "success",
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email);

    if (!email || !password) {
      return res.status(400).send("Please provide email and password!");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).send("this user doesn't exist");
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).send("Invalid email or password!");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    res.status(201).json({
      status: "success",
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};