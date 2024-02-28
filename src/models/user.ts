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

const User = model('User', userSchema);

export default User;
