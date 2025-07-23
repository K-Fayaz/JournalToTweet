const React = require("react");

function SuggestedTweetsEmail({ name, tweets = [], redirectBaseUrl = "https://yourapp.com/tweets" }) {
  return React.createElement(
    "html",
    null,
    React.createElement(
      "head",
      null,
      React.createElement("meta", { charSet: "UTF-8" }),
      React.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
      React.createElement(
        "style",
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
            max-width: 700px;
            margin: 40px auto;
            padding: 32px 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          }
          .greeting {
            font-size: 1.1rem;
            margin-bottom: 18px;
          }
          .tweet-list {
            padding-left: 0;
            margin-bottom: 24px;
          }
          .tweet-item {
            margin-bottom: 24px;
            list-style: none;
            display: flex;
            align-items: flex-start;
          }
          .tweet-number {
            font-weight: bold;
            margin-right: 16px;
            font-size: 1.1rem;
            color: #444;
            min-width: 24px;
            text-align: right;
          }
          .tweet-content {
            background: #f3f3f3;
            padding: 14px 18px;
            border-radius: 6px;
            font-size: 15px;
            margin-bottom: 6px;
            font-weight: 500;
            letter-spacing: 0.2px;
            flex: 1;
          }
          .tweet-link {
            color: #2563eb;
            text-decoration: underline;
            font-size: 14px;
            margin-left: 8px;
            background: none;
            border: none;
            padding: 0;
            cursor: pointer;
            display: inline;
          }
          .footer {
            font-size: 13px;
            color: #888;
            margin-top: 24px;
          }
        `
      )
    ),
    React.createElement(
      "body",
      null,
      React.createElement(
        "div",
        { className: "container" },
        React.createElement("div", { className: "greeting" }, name ? `Hello ${name},` : "Hello,"),
        React.createElement("div", { style: { fontSize: "16px", marginBottom: "24px" } }, "Here are your suggested tweets for today:"),
        React.createElement(
          "ul",
          { className: "tweet-list" },
          tweets.map((tweet, idx) =>
            React.createElement(
              "li",
              { key: idx, className: "tweet-item" },
              React.createElement("span", { className: "tweet-number" }, `${idx + 1}.`),
              React.createElement("div", { className: "tweet-content" }, tweet),
              React.createElement(
                "a",
                {
                  href: `${redirectBaseUrl}?tweet=${encodeURIComponent(tweet)}`,
                  className: "tweet-link",
                  target: "_blank",
                  rel: "noopener noreferrer"
                },
                "view tweet"
              )
            )
          )
        ),
        React.createElement("div", { className: "footer" }, "Thank you for using our service!")
      )
    )
  );
}

module.exports = SuggestedTweetsEmail;