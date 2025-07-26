const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

const callBack = async (req,res) => {
  let userDetails = req.user;
  let state = req.query.state;

  let client_url = process.env.CLIENT_REDIRECT_URL || 'https://journaltotweet.com';

  if (state === 'login') {
    const result = await loginUser(userDetails);
    if (result.success) {
      return res.redirect(`${CLIENT_REDIRECT_URL}/login?status=true&token=${result.token}&id=${result.id}&email=${result.email}&success=true`);
    } else {
      return res.redirect(`${CLIENT_REDIRECT_URL}/login?status=false&message=${result.message}`);
    } 
  }
  else {
    const result = await signupUser(userDetails,state);
    if (result.success) {
      return res.redirect(`${CLIENT_REDIRECT_URL}/login?status=true&token=${result.token}&id=${result.id}&email=${result.email}&success=true`);
    } else {
      return res.redirect(`${CLIENT_REDIRECT_URL}/login?status=false&message=${result.message}`);
    }
  }
}

const loginUser = async (userDetails) => { 
  try {
    // Check if user exists
    let user = await User.findOne({ email: userDetails.email });
    if (!user) {
      return {
        success: false,
        message: 'user_not_found'
      };
    }

    // Create Token
    let payload = { id: user._id };
    let token = jwt.sign(payload, SECRET, {
      expiresIn: '24h'
    });

    return {
      success: true,
      token,
      id: user._id,
      email: user.email
    };
  } catch (error) {
    console.error('Google login error:', error);
    return {
      success: false,
      message: 'login_failed'
    };
  }
}

const signupUser = async (userDetails,timezone) => { 
  try {
    // Check if user already exists
    let existingUser = await User.findOne({ email: userDetails.email });
    if (existingUser) {
      return {
        success: false,
        message: 'user_exists'
      };
    }

    // Create new user
    const newUser = await User.create({
      username: userDetails.name,
      email: userDetails.email,
      password: '', 
      timeZone: timezone || 'UTC'
    });

    // Create Token
    let payload = { id: newUser._id };
    let token = jwt.sign(payload, SECRET, {
      expiresIn: '24h'
    });

    return {
      success: true,
      token,
      id: newUser._id,
      email: newUser.email
    };
  } catch (error) {
    console.error('Google signup error:', error);
    return {
      success: false,
      message: 'signup_failed'
    };
  }
}

module.exports = {
  callBack
}
