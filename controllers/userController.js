import Userdata from '../models/Userdata.js';

// @desc    Create new userdata
// @route   POST /api/userdata
export const createUserdata = async (req, res) => {
  try {
    const userdata = await Userdata.create(req.body);
    res.status(201).json(userdata);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all userdata
// @route   GET /api/userdata
export const getAllUserdata = async (req, res) => {
  try {
    const userdata = await Userdata.find();
    res.status(200).json(userdata);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get single userdata
// @route   GET /api/userdata/:id
export const getUserdata = async (req, res) => {
  try {
    const userdata = await Userdata.findById(req.params.id);
    if (!userdata) {
      return res.status(404).json({ message: 'Userdata not found' });
    }
    res.status(200).json(userdata);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update userdata
// @route   PUT /api/userdata/:id
export const updateUserdata = async (req, res) => {
  try {
    const userdata = await Userdata.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!userdata) {
      return res.status(404).json({ message: 'Userdata not found' });
    }
    res.status(200).json(userdata);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete userdata
// @route   DELETE /api/userdata/:id
export const deleteUserdata = async (req, res) => {
  try {
    const userdata = await Userdata.findByIdAndDelete(req.params.id);
    if (!userdata) {
      return res.status(404).json({ message: 'Userdata not found' });
    }
    res.status(200).json({ message: 'Userdata deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
