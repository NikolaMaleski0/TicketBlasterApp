const User = require('../../../pkg/user/userSchema');
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
  try {
    const findAllUsers = await User.find();
    res.status(200).json({
      status: 'Success',
      data: {
        findAllUsers
      }
    });

  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

const getOneUser = async (req, res) => {
  try {
    const oneUser = await User.findById(req.params.id);
    console.log(oneUser);
    res.status(200).json({
      status: 'Success',
      data: {
        oneUser
      }
    });
  } catch(err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

const updateUser = async (req, res) => {
  try {
    
    if(req.file) {
      req.body.image = req.file.filename;
    };

    const update = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'Success',
      data: {
        update
      }
    });

  } catch(err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'Success',
      data: null
    });

  } catch(err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

const promoteDemote = async (req, res) =>  {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        status: 'Fail',
        message: 'User not found'
      });
    }

    const newRole = user.role === 'admin' ? 'user' : 'admin';

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role: newRole },
      { new: true }
    );

    res.status(200).json({
      status: 'Success',
      data: {
        updatedUser
      }
    });

  } catch(err) {
    res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

const userChangePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    console.log(id);
    console.log(password);

    const hashedPassword = await bcrypt.hash(password, 12);

    const updatePassword = await User.findByIdAndUpdate(
      id, 
        { password: hashedPassword },
        { new: true, runValidators: true},
      );
    console.log(updatePassword);
    res.status(200).json({
      status: 'Success',
      data: {
        updatePassword
      }
    });
    
  } catch(err) {
    res.status(400).json({
      status: 'Fail',
      message: err.message
    });
  }
};



module.exports = {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  promoteDemote,
  userChangePassword
}