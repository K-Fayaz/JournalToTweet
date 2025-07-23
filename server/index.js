require("dotenv").config();
require("./models/index");
require('./jobs/worker');

const cors           = require("cors");
const express        = require("express");
const path           = require("path");

const app = express();

// Now add your body parsers for the rest of your app
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: [
        "http://localhost:5173"
    ]
}));

app.get('/api/healthcheck', (req,res) =>{
    res.json({ 
        status: 'API is running',
        timestamp: new Date().toISOString()
    });
});

const userRoutes = require("./routes/user.route");
const tweetRoutes = require("./routes/tweet.router");
const journalRoutes = require("./routes/journal.route");
const preferencesRoutes = require("./routes/preferences.route");
const XAuthRoutes = require("./routes/XAuth.router");

app.use("/api/auth",userRoutes);
app.use('/api/tweets',tweetRoutes);
app.use("/auth/twitter",XAuthRoutes);
app.use("/api/journal",journalRoutes);
app.use('/api/preferences',preferencesRoutes);

app.use(express.static(path.join(__dirname, 'public')));

// Handle React routing - send all non-API requests to React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 8081;

app.listen(PORT,()=>{
    console.log(`listening to the port http://localhost:${PORT}`)
});

