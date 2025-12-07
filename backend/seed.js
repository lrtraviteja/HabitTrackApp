import 'dotenv/config';
import mongoose from 'mongoose';
import User from './models/User.js';
import Habit from './models/Habit.js';

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Habit.deleteMany({});
    console.log('Cleared existing data');

    const user = await User.create({
      name: 'Demo User',
      email: 'demo@example.com',
      password: 'password123'
    });
    console.log('Created demo user');

    const habits = [
      { title: 'Morning Exercise', category: 'health', frequency: 'daily', priority: 'high' },
      { title: 'Read 30 Minutes', category: 'learning', frequency: 'daily', priority: 'medium' },
      { title: 'Meditation', category: 'mindfulness', frequency: 'daily', priority: 'high' },
      { title: 'Drink 8 Glasses Water', category: 'health', frequency: 'daily', priority: 'medium' },
      { title: 'Code Practice', category: 'productivity', frequency: 'daily', priority: 'high' },
      { title: 'Journal Writing', category: 'mindfulness', frequency: 'daily', priority: 'low' }
    ];

    const createdHabits = [];
    for (const habitData of habits) {
      const completedDates = [];
      for (let i = 14; i >= 0; i--) {
        if (Math.random() > 0.3) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          completedDates.push(date);
        }
      }

      const habit = await Habit.create({
        user: user._id,
        ...habitData,
        completedDates,
        streak: Math.floor(Math.random() * 10) + 1
      });
      createdHabits.push(habit);
    }

    console.log(`Created ${createdHabits.length} habits with completion history`);
    console.log('\nDemo credentials:');
    console.log('Email: demo@example.com');
    console.log('Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
