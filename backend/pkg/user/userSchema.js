const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Must have a full name']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters']
  },
  image: {
    type: String, 
    default: 'user-default.jpg'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.pre('findByIdAndUpdate', async function(next) {
  const update = this.setUpdate();
  if(update.password) {
    const passwordHash = await bcrypt.hash(update.password, 12);
    this.setUpdate({
      $set: {
        password: passwordHash,
      }
    });
  }
  next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;