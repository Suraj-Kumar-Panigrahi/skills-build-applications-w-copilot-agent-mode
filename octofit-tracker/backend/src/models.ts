import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, lowercase: true, trim: true, unique: true },
		grade: { type: Number, required: true, min: 6, max: 12 },
		teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
		points: { type: Number, required: true, min: 0, default: 0 },
	},
	{ timestamps: true },
);

const teamSchema = new Schema(
	{
		name: { type: String, required: true, trim: true, unique: true },
		coach: { type: String, required: true, trim: true },
		color: { type: String, required: true, trim: true },
		memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		totalPoints: { type: Number, required: true, min: 0, default: 0 },
	},
	{ timestamps: true },
);

const activitySchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		type: { type: String, required: true, enum: ['running', 'walking', 'strength', 'cycling'] },
		durationMinutes: { type: Number, required: true, min: 1 },
		distanceMiles: { type: Number, min: 0 },
		calories: { type: Number, required: true, min: 0 },
		points: { type: Number, required: true, min: 0 },
		completedAt: { type: Date, required: true },
	},
	{ timestamps: true },
);

const leaderboardSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
		rank: { type: Number, required: true, min: 1 },
		points: { type: Number, required: true, min: 0 },
		streakDays: { type: Number, required: true, min: 0 },
		period: { type: String, required: true, default: '2026-09' },
	},
	{ timestamps: true },
);

const workoutSchema = new Schema(
	{
		title: { type: String, required: true, trim: true },
		category: { type: String, required: true, enum: ['cardio', 'strength', 'mobility'] },
		difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
		durationMinutes: { type: Number, required: true, min: 1 },
		exercises: [{ type: String, required: true, trim: true }],
		recommendedFor: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	},
	{ timestamps: true },
);

export const User = mongoose.models.User || mongoose.model('User', userSchema, 'users');
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema, 'teams');
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema, 'activities');
export const Leaderboard = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema, 'leaderboard');
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema, 'workouts');