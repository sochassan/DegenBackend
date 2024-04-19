const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});


// controllers
const UserController = require('./controllers/user');
const LiquidityController = require('./controllers/liquidity');

// routes
app.get('/getuser', UserController.getUser);
app.get('/getallusers', UserController.getAllAddressesWithEntryCount);

app.post('/addreferral', UserController.addReferral);
app.post('/saveLiquidity', LiquidityController.saveLiquidity);
app.get('/getLiquidity', LiquidityController.getLiquidity);
app.delete('/deleteLiquidity', LiquidityController.deleteLiquidity);




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
