const myscheema = require('mongoose');

const admin = myscheema.Schema(
    {
        adminemail: { type: String },
        password: { type: String },
    },
    {
        timestamps: true
    }
)

module.exports = myscheema.model('admindata', admin);