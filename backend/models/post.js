const mongoose = require('mongoose');

const schema = mongoose.Schema;

const Post = new schema({
    user_id: {
        type: schema.Types.ObjectId,
        ref: 'users'
    },
    postTitle: {
        type: String,
        required: true
    },
    postImage: {
        type: String,
    },
    lat: {
        type: Number,
    },
    lon: {
        type: Number,
    },
    isActive: { type: Number, default: 1 }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('books', Post);