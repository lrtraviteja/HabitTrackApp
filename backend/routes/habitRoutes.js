import express from 'express';
import { getHabits, createHabit, updateHabit, deleteHabit, toggleHabit } from '../controllers/habitController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getHabits);
router.post('/', auth, createHabit);
router.put('/:id', auth, updateHabit);
router.delete('/:id', auth, deleteHabit);
router.post('/:id/toggle', auth, toggleHabit);

export default router;
