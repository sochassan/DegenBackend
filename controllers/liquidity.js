const Liquidity = require('../models/liquidity');

class LiquidityController {

    async saveLiquidity(req, res) {
        try {
            let data = req.body
            const newLiquidity = new Liquidity({ ...data });
            const response = await newLiquidity.save()
            return res.status(200).json({ success: true, data: response });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
    async getLiquidity(req, res) {
        try {
            let { public_key } = req.query;
            if (!public_key) {
                return res.status(400).json({ success: false, message: "Public key is required" });
            }
            const liquidityData = await Liquidity.find({ public_key });
            return res.status(200).json({ success: true, data: liquidityData });

        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    async deleteLiquidity(req, res) {
        try {
            let { id } = req.query;
            if (!public_key) {
                return res.status(400).json({ success: false, message: "Liquidity id is required" });
            }
            const deletedLiquidity = await Liquidity.findByIdAndDelete(id);
            if (!deletedLiquidity) {
                return res.status(404).json({ success: false, message: 'Liquidity not found' });
            }
            return res.status(200).json({ success: true, message: "Liquidity deleted" });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new LiquidityController();
