import Habit from '../models/Habit.js';

const calculateStreak = (completedDates) => {
  if (!completedDates.length) return 0;
  
  const sorted = completedDates.map(d => new Date(d).setHours(0, 0, 0, 0)).sort((a, b) => b - a);
  const today = new Date().setHours(0, 0, 0, 0);
  const yesterday = today - 86400000;
  
  if (sorted[0] !== today && sorted[0] !== yesterday) return 0;
  
  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i - 1] - sorted[i] === 86400000) streak++;
    else break;
  }
  return streak;
};

export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.userId });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createHabit = async (req, res) => {
  try {
    const { title, category, frequency } = req.body;
    const habit = new Habit({ user: req.userId, title, category, frequency });
    await habit.save();
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    res.json({ message: 'Habit deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const toggleHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, user: req.userId });
    if (!habit) return res.status(404).json({ message: 'Habit not found' });
    
    const today = new Date().setHours(0, 0, 0, 0);
    const completedToday = habit.completedDates.some(d => new Date(d).setHours(0, 0, 0, 0) === today);
    
    if (completedToday) {
      habit.completedDates = habit.completedDates.filter(d => new Date(d).setHours(0, 0, 0, 0) !== today);
    } else {
      habit.completedDates.push(new Date());
    }
    
    habit.streak = calculateStreak(habit.completedDates);
    await habit.save();
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
