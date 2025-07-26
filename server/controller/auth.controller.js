const axios                     = require('axios');
const crypto                    = require('crypto');
const bcrypt                    = require("bcryptjs");
const querystring               = require('querystring');
const jwt                       = require("jsonwebtoken");
const User                      = require("../models/user.model");
const { sendConfirmationEmail } = require("../helpers/sendEmail.helper");

const { storeVerificationCode,validateVerificationCode } = require("../jobs/codeVerification");

// Access Env's
const SALT_ROUNDS = 10;
const SECRET      = process.env.SECRET;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.X_REDIRECT_URL;

const pkceStore = new Map();

// Generate PKCE challenge
function generatePKCE() {
    const codeVerifier = crypto.randomBytes(32).toString('base64url');
    const codeChallenge = crypto
      .createHash('sha256')
      .update(codeVerifier)
      .digest('base64url');
    
    return { codeVerifier, codeChallenge };
}

// Generate JWT token
function generateJWT(user) {
    return jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
}

const loginWithX = async (req, res) => {
    console.log("id: ",CLIENT_ID);
    console.log("secret: ",CLIENT_SECRET);
    const state = crypto.randomBytes(16).toString('hex');
    const { codeVerifier, codeChallenge } = generatePKCE();
    
    // Store PKCE verifier with state and action
    pkceStore.set(state, { codeVerifier, action: 'login' });
    
    const authUrl = 'https://twitter.com/i/oauth2/authorize?' + querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: 'tweet.read users.read offline.access',
      state: state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256'
    });
    
    res.json({ success: true, data: { authUrl } });
}

const XAuthCallback = async (req, res) => {
    const { code, state } = req.query;
    
    if (!code || !state) {
      return res.redirect('http://localhost:5173/login?status=false&message=invalid_callback');
    }
    
    const storedData = pkceStore.get(state);
    if (!storedData) {
      return res.redirect('http://localhost:5173/login?status=false&message=invalid_state');
    }
    
    const { codeVerifier, action } = storedData;
    
    try {
      // Exchange code for access token
      const tokenResponse = await axios.post('https://api.twitter.com/2/oauth2/token', 
        querystring.stringify({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: REDIRECT_URI,
          code_verifier: codeVerifier,
          client_id: CLIENT_ID
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
          }
        }
      );
      
      const { access_token } = tokenResponse.data;
      
      // Get user info
      const userResponse = await axios.get('https://api.twitter.com/2/users/me', {
        headers: {
          'Authorization': `Bearer ${access_token}`
        },
        params: {
          'user.fields': 'id,name,username,confirmed_email,profile_image_url,verified'
        }
      });
      
      const twitterUser = userResponse.data.data;
      console.log("twitter user: ",twitterUser);
      
      // Create user email (Twitter doesn't provide email in basic scope)
      const userEmail = `${twitterUser.username}@twitter.local`;
      
      let user;
      let token;
      
      if (action === 'signup') {
        // Check if user already exists
        let existingUser = await User.findOne({ email: userEmail });
        if (existingUser) {
          return res.redirect('http://localhost:5173/login?status=false&message=user_exists');
        }
        
        // Create new user
        user = {
          email: userEmail,
          username: twitterUser.username,
          password:''
        };
        
        let newUser = await User.create(user);

        let payload = { id: newUser._id };
        token = jwt.sign(payload, SECRET, {
            expiresIn: '24h'
        });
        
      } else if (action === 'login') {
        // Check if user exists
        let existingUser = await User.findOne({ email: userEmail });
        console.log("userEMail is: ",userEmail);
        if (!existingUser) {
          return res.redirect('http://localhost:5173/login?status=false&message=user_not_found');
        }
        
        let payload = { id: existingUser._id };
        token = jwt.sign(payload, SECRET, {
            expiresIn: '24h'
        });
      }
      
      // Clean up PKCE store
      pkceStore.delete(state);
      
      // Redirect to frontend with token
      res.redirect(`http://localhost:5173/login?token=${token}&success=true`);
      
    } catch (error) {
      console.error('OAuth error:', error.response?.data || error.message);
      pkceStore.delete(state);
      res.redirect('http://localhost:5173/login?status=false&message=oauth_failed');
    }
}

const signUp = async (req,res)=>{
    try{
        let { name, email, password, timeZone } = req.body;

        // Log the received timezone
        console.log('User signup - Detected timezone:', timeZone);
        console.log('User signup - Email:', email);
        console.log('User signup - Name:', name);

        // check if there is a user for this email
        let user = await User.findOne({email});
        if (user) {
            res.status(400).json({
                success: false,
                message:"User exists with this email"
            });
            return;
        }

        // Create User
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = await User.create({ 
            username: name, 
            email: email, 
            password: hashedPassword,
            timeZone: timeZone || 'UTC' // Store the detected timezone
        });

        // Create Token
        let payload = { id: newUser._id };
        let token   = jwt.sign(payload,SECRET,{
            expiresIn: '24h'
        });

        const code = await sendConfirmationEmail(email);
        await storeVerificationCode(email,code);

        res.status(201).json({
            token,
            id: newUser._id || "",
            success: true,
            email: newUser?.email || ""
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: false,
            message:"Something went wrong"
        })
    }
}

const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No user found for this email!"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Password is incorrect!"
            });
        }

        // Create Token
        let payload = { id: user._id };
        let token = jwt.sign(payload, SECRET, {
            expiresIn: '24h'
        });

        res.status(200).json({
            token,
            id: user._id || "",
            success: true,
            email: user.email || "",
        });
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

const emailVerification = async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) {
      return res.status(400).json({ success: false, message: "Email and code are required." });
  }
  try {
      const isValid = await validateVerificationCode(email, code);
      if (isValid) {
          let user = await User.findOneAndUpdate({email},{$set: {isEmailVerified: true }});
          return res.status(200).json({ success: true, message: "Email verified successfully." });
      } else {
          return res.status(400).json({ success: false, message: "Invalid or expired verification code." });
      }
  } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

const resendVerification = async (req, res) => {
  const { email } = req.body;
  if (!email) {
      return res.status(400).json({ 
          success: false, 
          message: "Email is required." 
      });
  }

  try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ 
              success: false, 
              message: "User not found." 
          });
      }

      // Check if email is already verified
      if (user.isEmailVerified) {
          return res.status(400).json({ 
              success: false, 
              message: "Email is already verified." 
          });
      }

      // Generate and send new verification code
      const code = await sendConfirmationEmail(email);
      await storeVerificationCode(email, code);

      res.status(200).json({ 
          success: true, 
          message: "Verification code resent successfully." 
      });
  } catch (err) {
      console.log("Error in resendVerification:", err);
      res.status(500).json({ 
          success: false, 
          message: "Failed to resend verification code." 
      });
  }
};

module.exports = {
    signUp,
    login,
    loginWithX,
    XAuthCallback,
    emailVerification,
    resendVerification
}