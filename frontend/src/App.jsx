import React, { useState } from "react";
import "./App.css";

function App() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!to) {
      errors.to = "Recipient email is required";
    } else if (!/\S+@\S+\.\S+/.test(to)) {
      errors.to = "Please enter a valid email address";
    }

    if (!subject) {
      errors.subject = "Subject is required";
    }

    if (!body) {
      errors.body = "Email body is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const sendEmail = async () => {
    if (!validateForm()) {
      return;
    }

    const res = await fetch("http://localhost:3000/api/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, subject, body }),
    });

    const data = await res.json();
    setResponse(data.message);
  };

  return (
    <div className="container">
      <div className="main">
        <h1 className="title">Email Sender</h1>
        <input
          className="input"
          type="email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Recipient"
        />
        {errors.to && <p className="error">{errors.to}</p>}

        <input
          className="input"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
        />
        {errors.subject && <p className="error">{errors.subject}</p>}

        <textarea
          className="textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
        />
        {errors.body && <p className="error">{errors.body}</p>}

        <button className="button" onClick={sendEmail}>
          Send Email
        </button>
        {response && <p className="response">{response}</p>}
      </div>
    </div>
  );
}

export default App;
