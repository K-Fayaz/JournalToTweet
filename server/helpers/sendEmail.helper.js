const { Resend } = require('resend');
const sendTweets = require("../emails/sendTweets");
const SuggestedTweetsEmail = require("../emails/SuggestedTweetsEmail");
const NoNewLogsEmail = require("../emails/NoNewLogsEmail");
const React = require('react');
const { render } = require('@react-email/render');
const ConfirmationEmail = require("../emails/sendConfirmationEmail");

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);

function generateCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

async function sendJournalEmail(type,name,email, tweets) {
  try {
    const today = new Date();
    const hh = String(today.getHours()).padStart(2,'0');
    const min = String(today.getMinutes()).padStart(2,'0');
    let time = `${hh}:${min}`;


    let emailHtml; 
    let subject;
    
    if (type == "suggest") {
      subject = `Your ${time} AM tweet ideas is ready`;
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
      subject: 'Your loremapis.com Confirmation Code',
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