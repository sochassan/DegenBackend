const User = require('../models/user');

class UserController {
    async getUser(req, res) {
      try {
        const walletAddress = req.query.walletAddress;
        const user = await User.findOne({ walletAddress });

        // const user = await User.findOne({ walletAddress });
    
        if (!user) {
          return res.json({ success: false, message: 'User does not exist' });
        }
  
        const totelReferral = await User.countDocuments({ walletAddress });
    
        return res.json({ success: true, user, totelReferral });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    }
  

    async addReferral(req, res) {
      try {
        const { walletAddress, referralAddress } = req.body;
        const existingUser = await User.findOne({ referralAddress, walletAddress });
    
        if (existingUser) {
          return res.json({ success: false, message: 'Referral address is already associated with this wallet address' });
        }
        const newUser = new User({ walletAddress, referralAddress });
        await newUser.save();
    
        return res.json({ success: true, message: 'Referral address added successfully to the wallet address' });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    }
    async getAllAddressesWithEntryCount(req, res) {
      try {
        const addressCounts = await User.aggregate([
          { $group: { _id: "$walletAddress", count: { $sum: 1 } } }
        ]);
    
        // Return the result
        return res.json({ success: true, addressCounts });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    }
    

 
}

module.exports = new UserController();
