require("dotenv").config();
require("./models/index");
require('./jobs/worker');

const path           = require("path");
const cors           = require("cors");
const express        = require("express");
const passport       = require('passport');
const jwt            = require('jsonwebtoken');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// Now add your body parsers for the rest of your app
app.use(cors({
    origin: [
        "http://localhost:5173"
    ]
}));

app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({extended: true}));

app.get('/api/healthcheck', (req,res) =>{
    res.json({ 
        status: 'API is running',
        timestamp: new Date().toISOString()
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === 'production' 
      ? "https://journaltotweet.com/auth/google/callback"
      : "http://localhost:8081/auth/google/callback",
  }, async (accessToken, refreshToken, profile, done) => {
    try {

      let userData = {
        email: profile.emails[0].value,
        name: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
      }
      
      return done(null, userData);
    } catch (error) {
      return done(error, null);
    }
}));

const userRoutes = require("./routes/user.route");
const tweetRoutes = require("./routes/tweet.router");
const journalRoutes = require("./routes/journal.route");
const preferencesRoutes = require("./routes/preferences.route");
const XAuthRoutes = require("./routes/XAuth.router");
const GoogleAuthRoutes = require("./routes/googleAuth.router");

app.use("/api/auth",userRoutes);
app.use('/api/tweets',tweetRoutes);
app.use("/auth/twitter",XAuthRoutes);
app.use("/auth/google", GoogleAuthRoutes);
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

