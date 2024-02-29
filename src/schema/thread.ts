import { Schema, model } from "mongoose";

/**
 * @context
 * `kind` is either post or comment
 * 
 * `parentId` will be same as id for post, and for comment it will contains either 
 * the id of post or the id of comment it is replying to
 */
const threadSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String
    },
    mediaUrl: {
        type: String
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'Thread'
    },
    kind: {
        type: String,
        enum: ['post', 'comment'],
        default: 'post'
    },
}, {
    timestamps: true
});

const Thread = model('Thread', threadSchema);

module.exports = Thread;
