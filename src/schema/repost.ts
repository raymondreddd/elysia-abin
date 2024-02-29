import { Schema } from "mongoose";
import { model } from "mongoose";

// Repost model
const repostSchema = new Schema({
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

const Repost = model('Repost', repostSchema);