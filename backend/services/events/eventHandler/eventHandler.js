const Event = require('../../../pkg/events/eventSchema');

const getAllEvents = async (req, res) => {
  try {
    const event = await Event.find().populate('relatedActs');
    event.sort((a, b) => new Date(a.date) - new Date(b.date));
    console.log(new Date());
    res.status(200).json({
      status: 'success',
      data: {
        event
      }
    });

  } catch(err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message
    });
  }
};

const getOneEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('relatedActs');
    res.status(200).json({
      status: 'Success',
      data: {
        event
      }
    });

  } catch(err) {
      res.status(404).json({
      status: 'Fail',
      message: err
    });
  }
};

const createEvent = async (req, res) => {
  try {
    let newImage = '';
    if(req.file) {
      newImage = req.file.filename;
    };
    
    const relatedActs = req.body.relatedActs.split(',');

    const newEvent = await Event.create({
      ...req.body,
      image: newImage,
      relatedActs: relatedActs
    });

    res.status(200).json({
      status: 'Success',
      data: {
        newEvent
      }
    });

  } catch(err) {
    res.status(404).json({
      status: 'Fail',
      message: err.message
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body.image);
    if(req.file) {
      req.body.image = req.file.filename;
    };
    const update = await Event.findByIdAndUpdate(req.params.id, req.body, {
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

const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'Success',
      data: null
    });

  } catch(err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

module.exports = {
  getAllEvents,
  getOneEvent,
  createEvent,
  updateEvent,
  deleteEvent
}