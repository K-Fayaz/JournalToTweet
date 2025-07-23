const React = require("react");

function NoNewLogsEmail({ name, journalUrl = "https://yourapp.com/journal" }) {
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
            .no-logs-message {
              background: #f3f3f3;
              padding: 18px 22px;
              border-radius: 6px;
              font-size: 16px;
              font-weight: 500;
              margin-bottom: 24px;
              letter-spacing: 0.2px;
              color: #444;
            }
            .journal-link {
              display: inline-block;
              margin-top: 18px;
              padding: 12px 28px;
              background: #2563eb;
              color: #fff;
              border-radius: 5px;
              text-decoration: none;
              font-size: 16px;
              font-weight: bold;
              transition: background 0.2s;
            }
            .journal-link:hover {
              background: #1741a6;
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
          React.createElement(
            "div",
            { className: "no-logs-message" },
            "Nothing new logged since your last check-in. Been building, learning, or thinking? Drop a quick note — we'll turn it into tweet magic."
          ),
          React.createElement(
            "a",
            {
              href: journalUrl,
              className: "journal-link",
              target: "_blank",
              rel: "noopener noreferrer"
            },
            "Log your thoughts now"
          ),
          React.createElement("div", { className: "footer" }, "Thank you for using our service!")
        )
      )
    );
}

module.exports = NoNewLogsEmail;