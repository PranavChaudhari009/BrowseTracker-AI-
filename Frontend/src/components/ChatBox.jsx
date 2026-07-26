import { useState } from "react";
import { sendMessage } from "../services/api";
import ReactMarkdown from "react-markdown";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";

function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const data = await sendMessage(input);

      // Force raw string formatting into proper multiline markdown structures
      let rawText = data.response || "No response received.";

      const formattedText = rawText
        .replace(/##/g, "\n\n##") // Ensure headers start on a new line
        .replace(/ - /g, "\n- "); // Convert inline " - " into true bullet line breaks

      const botMessage = {
        role: "assistant",
        text: formattedText,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Something went wrong. Check backend connection.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm p-6 transition-colors duration-200">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-xs">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Browser Memory AI Chatbot
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Ask anything about your past browsing history
            </p>
          </div>
        </div>

        {/* New Tagline Badge */}
        <div className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          SEARCH THE WAY YOU LIKE
        </div>
      </div>

      {/* Messages Area */}
      <div className="h-[480px] overflow-y-auto space-y-4 p-4 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/40 border border-zinc-200/80 dark:border-zinc-800/80">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-zinc-400 dark:text-zinc-500">
            <Bot className="w-12 h-12 mb-2 opacity-50 text-indigo-500" />
            <p className="text-sm font-medium">No messages yet.</p>
            <p className="text-xs mt-1">Try asking: "What did I search for yesterday?"</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.role === "user" ? "flex justify-end" : "flex justify-start"
              }
            >
              <div
                className={
                  msg.role === "user"
                    ? "bg-indigo-600 text-white p-4 rounded-2xl rounded-tr-xs max-w-xl shadow-xs"
                    : "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 p-4 rounded-2xl rounded-tl-xs max-w-xl w-full border border-zinc-200 dark:border-zinc-700/60 shadow-xs"
                }
              >
                <div className="flex items-center gap-2 mb-1.5 font-bold text-xs opacity-90">
                  {msg.role === "user" ? (
                    <>
                      <span>You</span>
                      <User className="w-3.5 h-3.5" />
                    </>
                  ) : (
                    <>
                      <Bot className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                      <span className="text-indigo-600 dark:text-indigo-400">AI Assistant</span>
                    </>
                  )}
                </div>

                <div className="text-sm leading-relaxed whitespace-pre-wrap [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:my-2 [&>h2]:text-base [&>h2]:font-bold [&>h2]:mt-3 [&>h2]:mb-1">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 p-4 rounded-2xl rounded-tl-xs max-w-xl border border-zinc-200 dark:border-zinc-700/60 flex items-center gap-2 text-sm font-medium">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
              AI is searching your history...
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="flex gap-3 mt-5">
        <input
          className="flex-1 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/50 transition text-sm font-medium"
          placeholder="Ask about your browser history..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 font-semibold rounded-xl transition shadow-xs flex items-center gap-2 cursor-pointer text-sm"
        >
          <Send className="w-4 h-4" /> Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;