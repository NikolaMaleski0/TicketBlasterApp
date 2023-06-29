const User = require('../../../pkg/user/userSchema');

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

module.exports = {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser
}