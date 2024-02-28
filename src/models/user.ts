import { Schema, model, Document } from "mongoose";

export interface UserDocumentCreate extends Document {
    username: string;
    email: string;
    password: string;
    avatar?: string;
    bio?: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    threads: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thread",
        },
    ],
    bio: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

// Middleware to update updatedAt field before saving the document
userSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});

const User = model('User', userSchema);

export default User;
