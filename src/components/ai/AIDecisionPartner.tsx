"use client";

import { useState } from "react";

export default function AIDecisionPartner() {
  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I am ARIA, your AI Decision Partner. Ask me about the current incident, mission brief, or recommended actions.",
    },
  ]);

  function askQuestion() {
    if (!question.trim()) return;

    setMessages([
      ...messages,
      {
        role: "user",
        content: question,
      },
      {
        role: "assistant",
        content:
          "AI integration is coming soon. This response is currently a prototype.",
      },
    ]);

    setQuestion("");
  }

  return (
    <div className="rounded-2xl border bg-white shadow-sm">

      <div className="border-b p-5">

        <h2 className="text-xl font-bold">
          AI Decision Partner
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Ask ARIA about this incident.
        </p>

      </div>

      <div className="h-96 space-y-4 overflow-y-auto p-5">

        {messages.map((message, index) => (

          <div
            key={index}
            className={
              message.role === "assistant"
                ? "rounded-xl bg-slate-100 p-4"
                : "ml-12 rounded-xl bg-blue-600 p-4 text-white"
            }
          >

            {message.content}

          </div>

        ))}

      </div>

      <div className="flex gap-3 border-t p-4">

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about the incident..."
          className="flex-1 rounded-lg border px-4 py-3 outline-none"
        />

        <button
          onClick={askQuestion}
          className="rounded-lg bg-slate-900 px-5 py-3 text-white"
        >
          Send
        </button>

      </div>

    </div>
  );
}