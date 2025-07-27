const { Resend } = require('resend');
const sendTweets = require("../emails/sendTweets");
const SuggestedTweetsEmail = require("../emails/SuggestedTweetsEmail");
const NoNewLogsEmail = require("../emails/NoNewLogsEmail");
const React = require('react');
const { render } = require('@react-email/render');
const ConfirmationEmail = require("../emails/sendConfirmationEmail");
const { DateTime } = require("luxon");

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);

function generateCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

async function sendJournalEmail(type,name,email, tweets, userTimezone = 'UTC') {
  try {
    // Use user's timezone for email timestamps
    const today = DateTime.now().setZone(userTimezone);
    const hh = today.toFormat('HH');
    const min = today.toFormat('mm');
    let time = `${hh}:${min}`;


    let emailHtml; 
    let subject;
    
         if (type == "suggest") {
       // Determine AM/PM based on the hour
       const hour = parseInt(hh);
       const period = hour < 12 ? 'AM' : 'PM';
       subject = `Your ${time} ${period} tweet ideas is ready`;
      emailHtml = await render(
          React.createElement(SuggestedTweetsEmail, {
            name,
            tweets,
            redirectBaseUrl: "https://yourapp.com/tweets"
          })
        ); 
    }

    if (type == "Nologs") {
      subject = "Your journal’s been quiet. Got something to share?"
      emailHtml = await render(
        React.createElement(NoNewLogsEmail,{
          name,
          journalUrl: "https://yourapp.com/journal"
        })
      );
    }

    const message = {
      from: process.env.RESEND_VERIFIEND_EMAIL || 'hello@fayazz.xyz',
      to: email,
      subject: subject,
      html: String(emailHtml)
    }

    let emailSent = await resend.emails.send(message);
    console.log("email sent is: ", emailSent);
  }
  catch(err) {
    console.log("error: ", err);
    return null;
  }
}

async function sendConfirmationEmail(email) {
  try {
    const code = generateCode();
    // Render the React component to HTML using React.createElement
    const html = await render(React.createElement(ConfirmationEmail, { code }));
    const message = {
      from: process.env.RESEND_VERIFIEND_EMAIL || 'hello@fayazz.xyz',
      to: email,
      subject: 'Your journaltotweet.com Confirmation Code',
      html // use the rendered HTML
    }

    let emailSent = await resend.emails.send(message);
    console.log("email sent is: ",emailSent);
    return code;
  }
  catch(err) {
    console.log("error: ",err);
    return null;
  }
}

module.exports = {
  sendJournalEmail,
  sendConfirmationEmail
};