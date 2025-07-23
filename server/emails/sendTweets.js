const React = require('react');

function sendTweets({ tweets }) {
  return React.createElement(
    'html',
    null,
    React.createElement(
      'head',
      null,
      React.createElement('meta', { charSet: 'UTF-8' }),
      React.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }),
      React.createElement(
        'style',
        null,
        `
          body {
            background: #fff;
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            color: #222;
          }
          .container {
            max-width: 420px;
            margin: 40px auto;
            padding: 32px 20px;
          }
          .greeting {
            font-size: 1.1rem;
            margin-bottom: 18px;
          }
          .code-label {
            font-size: 1rem;
            margin-bottom: 8px;
          }
          .code {
            font-size: 1.5rem;
            font-weight: bold;
            background: #f5f5f5;
            color: #222;
            padding: 10px 28px;
            border-radius: 6px;
            letter-spacing: 2px;
            margin-bottom: 18px;
            display: inline-block;
          }
          .message {
            color: #555;
            font-size: 0.98rem;
            margin-top: 18px;
            line-height: 1.5;
          }
        `
      )
    ),
    React.createElement(
      'body',
      null,
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement('div', { className: 'greeting' }, 'Hello,'),
        React.createElement('div', { className: 'code-label' }, 'Thank you for creating an account with LoremApis. Here is your confirmation code:'),
        React.createElement('div', { className: 'code' }, code),
        React.createElement('div',{ className:'message'}, 'This verification code will be expired in 10 minutes!'),
        React.createElement(
          'div',
          { className: 'message' },
          'Please help us improve this website by joining our ',
          React.createElement(
            'a',
            { href: 'https://discord.gg/8qmrCPMkkj', target: '_blank', rel: 'noopener noreferrer', style: { color: '#2563eb', textDecoration: 'underline' } },
            'Discord server'
          ),
          '. Your feedback is valued.'
        )
      )
    )
  );
}

module.exports = sendTweets;