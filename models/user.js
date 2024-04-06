const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    walletAddress: { type: String, require: true },
    referralAddress: { type: String }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
