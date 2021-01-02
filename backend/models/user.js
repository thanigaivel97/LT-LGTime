const mongoose = require('mongoose');

const schema = mongoose.Schema;

const User = new schema({
    name: {
        type: String,
        required: true
    },
    emailid: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    sessionToken: {
        type: String,
    },
    lat: {
        type: Number,
    },
    lon: {
        type: Number,
    },
    postRealted: [{
        type: schema.Types.ObjectId,
        ref: 'books'
    }],
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('users', User);