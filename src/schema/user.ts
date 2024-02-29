import { Schema, model, Document } from "mongoose";

export interface UserDocument extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
    avatar?: string;
    bio?: string;
}

export interface SignupData {
    name: string;
    username: string;
    email: string;
    password: string;
    avatar?: string;
    bio?: string;
}

export interface SigninData {
    username: string;
    password: string;
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
}, {
    timestamps: true
});

const User = model<UserDocument>('User', userSchema);

export default User;
