"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Paperclip, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  attachments?: File[];
  isMarkdown?: boolean;
}

interface FileData {
  name: string;
  type: string;
  content: string;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Predefined prompts
  const predefinedPrompts = [
    "What are the activities for this month?",
    "How much have we spent from the budget?",
    "Suggest activities to  help us reach our goal",
    "Are we on track to reach our goal?",
  ];

  // Scroll to the bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    handleSend(prompt);
  };

  const handleSend = async (promptText?: string) => {
    const messageText = promptText || input;
    if ((!messageText.trim() && attachments.length === 0) || isLoading) return;

    setIsLoading(true);

    try {
      // Create user message
      const userMessage: Message = {
        id: Date.now().toString(),
        content: messageText,
        role: "user",
        timestamp: new Date(),
        attachments: attachments.length > 0 ? [...attachments] : undefined,
      };

      // Add user message to state
      setMessages((prev) => [...prev, userMessage]);

      // Prepare file data if there are attachments
      let fileData: FileData[] = [];
      if (attachments.length > 0) {
        fileData = await Promise.all(
          attachments.map(async (file) => {
            const content = await readFileAsText(file);
            return {
              name: file.name,
              type: file.type,
              content,
            };
          })
        );
      }

      // Call the API
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          fileData,
        }),
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();

      // Add assistant message to state
      setMessages((prev) => [...prev, data.message]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: "Sorry, there was an error processing your request.",
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    } finally {
      // Reset input and attachments
      setInput("");
      setAttachments([]);
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  return (
    <div className="h-full bg-transparent">
      <Card className="h-full flex flex-col bg-transparent border-none shadow-none py-0">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold my-4 text-gray-600">
                  Hi 👋, I&apos;m Finn
                </h2>
                <h2 className="text-2xl font-semibold">
                  How may I help you today?
                </h2>
                <p className="text-muted-foreground">
                  Ask me anything or try one of these suggestions
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                {predefinedPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="p-4 h-auto text-left justify-start rounded-full cursor-pointer"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-full py-2 px-4 ${
                      message.role === "user"
                        ? "bg-gray-200 text-black"
                        : "bg-transparent"
                    }`}
                  >
                    {message.isMarkdown ? (
                      <div className="prose dark:prose-invert prose-sm max-w-none">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {message.attachments.map((file, index) => (
                          <div
                            key={index}
                            className="text-sm flex items-center gap-2"
                          >
                            <Paperclip className="w-4 h-4" />
                            <span>{file.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        <div className="p-8 border-1 rounded-xl">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading}
            />
            <label htmlFor="file-upload">
              <Button variant="outline" size="icon" asChild>
                <div>
                  <Paperclip className="w-4 h-4" />
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={isLoading}
                  />
                </div>
              </Button>
            </label>
            <Button onClick={() => handleSend()} disabled={isLoading}>
              {isLoading ? (
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              Send
            </Button>
          </div>
          {attachments.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {attachments.map((file, index) => (
                <div
                  key={index}
                  className="text-sm bg-muted px-2 py-1 rounded flex items-center gap-2"
                >
                  <Paperclip className="w-3 h-3" />
                  <span>{file.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
