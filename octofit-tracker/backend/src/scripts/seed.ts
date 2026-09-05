import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Maya Chen', email: 'maya.chen@mergington.edu', grade: 10, points: 420 },
      { name: 'Jordan Ellis', email: 'jordan.ellis@mergington.edu', grade: 11, points: 365 },
      { name: 'Sofia Martinez', email: 'sofia.martinez@mergington.edu', grade: 9, points: 310 },
    ]);

    const teams = await Team.create([
      { name: 'Peak Performers', coach: 'Paul Octo', color: '#0f766e', memberIds: [users[0]._id, users[1]._id], totalPoints: 785 },
      { name: 'Trail Blazers', coach: 'Jessica Cat', color: '#ea580c', memberIds: [users[2]._id], totalPoints: 310 },
    ]);

    await User.bulkWrite([
      { updateOne: { filter: { _id: users[0]._id }, update: { $set: { teamId: teams[0]._id } } } },
      { updateOne: { filter: { _id: users[1]._id }, update: { $set: { teamId: teams[0]._id } } } },
      { updateOne: { filter: { _id: users[2]._id }, update: { $set: { teamId: teams[1]._id } } } },
    ]);

    await Activity.create([
      { userId: users[0]._id, type: 'running', durationMinutes: 32, distanceMiles: 3.1, calories: 290, points: 180, completedAt: new Date('2026-09-03T16:30:00Z') },
      { userId: users[1]._id, type: 'strength', durationMinutes: 40, calories: 240, points: 155, completedAt: new Date('2026-09-04T15:45:00Z') },
      { userId: users[2]._id, type: 'walking', durationMinutes: 45, distanceMiles: 2.2, calories: 180, points: 120, completedAt: new Date('2026-09-04T17:00:00Z') },
    ]);

    await Leaderboard.create([
      { userId: users[0]._id, rank: 1, points: 420, streakDays: 8 },
      { userId: users[1]._id, rank: 2, points: 365, streakDays: 6 },
      { userId: users[2]._id, rank: 3, points: 310, streakDays: 4 },
    ]);

    await Workout.create([
      { title: 'Steady State Run', category: 'cardio', difficulty: 'beginner', durationMinutes: 30, exercises: ['5-minute warmup', '20-minute easy run', '5-minute cooldown'], recommendedFor: [users[0]._id] },
      { title: 'Full Body Foundations', category: 'strength', difficulty: 'intermediate', durationMinutes: 25, exercises: ['Squats', 'Push-ups', 'Reverse lunges', 'Plank'], recommendedFor: [users[1]._id, users[2]._id] },
    ]);

    console.log('Database seeding complete: users, teams, activities, leaderboard, and workouts populated');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
