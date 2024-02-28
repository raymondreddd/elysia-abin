import { Schema, model } from "mongoose";

const threadSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    replies: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

// Middleware to update updatedAt field before saving the document
threadSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Thread = model('Thread', threadSchema);

module.exports = Thread;
