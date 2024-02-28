import { Schema, model } from "mongoose";

const threadSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String
    },
    imageUrl: {
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
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    replies: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
});

// Middleware to update updatedAt field before saving the document
threadSchema.pre('save', function (next) {
    this.updated_at = new Date();
    next();
});

const Thread = model('Thread', threadSchema);

module.exports = Thread;
