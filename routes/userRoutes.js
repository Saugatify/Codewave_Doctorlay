import express from 'express';
import {
  createUserdata,
  getUserdata,
  updateUserdata,
  deleteUserdata,
  getAllUserdata,
} from '../controllers/userController.js';

const router = express.Router();

// Create Userdata
router.post('/', createUserdata);

// Get All Userdata
router.get('/', getAllUserdata);

// Get Single Userdata
router.get('/:id', getUserdata);

// Update Userdata
router.put('/:id', updateUserdata);

// Delete Userdata
router.delete('/:id', deleteUserdata);

export default router;
