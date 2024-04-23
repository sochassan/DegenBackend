const mongoose = require('mongoose');

const liquiditySchema = new mongoose.Schema({
    public_key: { type: String, },
    fromToken: { type: String, },
    fromTokenName: { type: String, },
    fromTokenValue: { type: Number },
    ToToken: { type: String },
    ToTokenName: { type: String, },
    ToTokenValue: { type: Number },
    type: { type: String },
});

const liquidity = mongoose.model('liquidity', liquiditySchema);

module.exports = liquidity;
