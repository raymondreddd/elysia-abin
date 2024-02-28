import { Schema, model, Document } from "mongoose";

export interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    avatar?: string;
    bio?: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    bio: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Middleware to update updatedAt field before saving the document
userSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const User = model('User', userSchema);

module.exports = User;
