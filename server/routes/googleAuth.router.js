const router = require('express').Router();
const passport = require('passport');
const controller = require('../controller/googleAuth.controller');

router.get('/login',
    passport.authenticate('google', { 
    scope: ['profile', 'email'],
    session: false,
    prompt: 'select_account',
    state:'login'
}));

router.get('/signup',(req,res,next) => {
    const timezone = req.query.timezone || 'UTC';

    passport.authenticate('google', { 
        scope: ['profile', 'email'],
        session: false,
        prompt: 'select_account',
        state: timezone
    })(req,res,next);
});

router.get('/callback',passport.authenticate('google', { failureRedirect: '/login',session: false }),controller.callBack);

module.exports = router;