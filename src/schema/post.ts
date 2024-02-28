import { Schema, model } from "mongoose";

const postSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    thread: { type: Schema.Types.ObjectId, ref: 'Thread', required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

// Middleware to update updatedAt field before saving the document
postSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Post = model('Post', postSchema);

module.exports = Post;
