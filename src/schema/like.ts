import { Schema, model } from "mongoose";

// Like model
const likeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    thread: {
        type: Schema.Types.ObjectId,
        ref: 'Thread', // Reference to the main thread
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Like = model('Like', likeSchema);