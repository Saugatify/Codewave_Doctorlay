import express from 'express';
import {
  createUserdata,
  getAllUserdata,
  getUserdata,
  updateUserdata,
  deleteUserdata,
} from '../controllers/userController.js';

const router = express.Router();

// Create Userdata
router.post('/create', createUserdata);

// Get All Userdata
router.get('/list', getAllUserdata);

// Get Single Userdata
router.get('/view/:id', getUserdata);

// Update Userdata
router.put('/update/:id', updateUserdata);

// Delete Userdata
router.delete('/delete/:id', deleteUserdata);

export default router;
