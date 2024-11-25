import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Chat = () => {
  const [userMessage, setUserMessage] = useState("");
  const [tempUserMessage, setTempUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [responseMessage, setResponseMessage] = useState("");

  const handleSendMessage = async () => {
    const sysPrompt = `
    Okok. The game is called. I Am Pedro. Pedro is Pepe the frog's cousin from rural Mexico. Pepe as in Matt Furie pepe. The game is about you being Pedro and going to the US to fulfill your dream of working at McDonald's for $14 USD per hour (that's like more than Pedro makes in a day).
So the game focuses on You being able to Chat with Pedro and guide him in his journey. And you have a secret weapon - Solana Meme Tokens.
Using pure meme power, Pedro will face the harsh journey of iligally crossing the border into the US.
The Antagonist is Trumpepe, a hard liner US president.
He has the border militarized, complete with moats with sharks. All of which pedro will face.
My idea is make it sort of like a board game. where players get a Pedro NFT and can buy dice rolls with $Pedro currency. The cost of rolling the dice starts at 0 each day and grows exponentially each roll, and resets at 0 each day.
The board contains prize tiles where you earn $PEDRO or NFT updgrades and punishment tiles, such as jails and being kidnaped by cartels or getting lost in a Tijuana Stip Club for days.
I want to for example, to get the first NFT to start, you need to navigate a conversation with Pedro to convince him to do it and give him his first 0.1 SOL so he can start his journey (this would be the cost of the starter NFT).
The NFT will record it's position in the board and other status effects or ailements.
The NFT's themselves are AI Agents and instead of just "Rolling the dice" players need to chat with their Pedro and help them along the way.
Like this:
Before rolling dice or making a move, players must chat with Pedro.
Pedro’s responses are generated by an LLM, reflecting his current state, position, and any ailments from the board.
Example: If Pedro is stuck in a Tijuana strip club, players might have to convince him to leave by bribing him with $PEDRO or persuading him with memes.
Challenge: These conversations require logical choices or "correct" answers to progress, turning the chat into a game itself.
Or if Pedro is Drunk we need to get him to sober up and continue
    `;
    const modelName = "LLaMa3 8B";
    const newTokens = 256;
    const text = chatHistory.join(", "); // Combine chat history into a single string

    try {
      const tempMsg = userMessage;
      setTempUserMessage(tempMsg);
      setUserMessage("");
      setIsLoading(true);
      // setResponseMessage(""); // Reset the response message

      // // Use Fetch with ReadableStream for streaming
      // const response = await fetch("http://localhost:5000/api/chat", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     modelName,
      //     newTokens,
      //     sysPrompt,
      //     text,
      //     userMessage,
      //   }),
      // });

      // // Check if the response is OK
      // if (!response.ok) {
      //   throw new Error("Failed to connect to the server");
      // }

      // // Process the streamed response
      // const reader = response.body.getReader();
      // const decoder = new TextDecoder("utf-8");

      // // Read the stream chunk by chunk
      // let done = false;
      // while (!done) {
      //   const { value, done: streamDone } = await reader.read();
      //   done = streamDone;

      //   // Decode and append the chunk to the response message
      //   if (value) {
      //     const chunk = decoder.decode(value);
      //     console.log(chunk);
      //     setResponseMessage((prev) => prev + chunk);
      //   }
      // }

      // // Update chat history after the stream is done
      // const newHistory = [
      //   ...chatHistory,
      //   {
      //     user: tempUserMessage,
      //     assistant: responseMessage,
      //     create_at: new Date(),
      //   },
      // ];

      const response = await axios.post("http://localhost:5000/api/chat", {
        modelName,
        newTokens,
        sysPrompt,
        text,
        userMessage,
      });

      const newHistory = [
        ...chatHistory,
        {
          user: tempMsg,
          assistant: response.data.response,
          create_at: new Date(),
        },
      ];

      setChatHistory(newHistory);
      setTempUserMessage("");
    } catch (error) {
      console.error("Error communicating with backend:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="w-7/12 h-screen m-auto flex flex-col">
        <div className="py-3 px-3 border-b border-[#3D485E]">
          <NavLink to={"/"}>
            <h1 className="text-lg font-bold text-[#a2c0fd]">Pedro</h1>
          </NavLink>
        </div>
        <div className="flex-1 py-3 px-2">
          <div>
            {chatHistory.map((msg, index) => (
              <div className="mb-2" key={index}>
                <div>
                  <div className="flex justify-end">
                    <p className="bg-[#3D485E] px-2 py-1">{msg.user}</p>
                  </div>
                  <div className="flex justify-end gap-1">
                    <small className="text-xs text-right">
                      {new Date(msg.create_at).toLocaleString()}
                    </small>
                  </div>
                </div>
                <p className="py-1">{msg.assistant}</p>
              </div>
            ))}
            {isLoading && (
              <div>
                <div className="flex justify-end">
                  <p className="bg-[#3D485E] px-2 py-1">{tempUserMessage}</p>
                </div>
                <div className="flex justify-end gap-1">
                  <small className="text-xs text-right">
                    {new Date().toLocaleString()}
                  </small>
                </div>

                <div>...</div>

                {/* {responseMessage && <p className="py-1">{responseMessage}</p>} */}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center py-3 border-t border-[#3D485E] gap-2">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type your message here..."
            className="bg-black text-white border border-[#3D485E] w-full py-2 px-2 focus:border-[#6e83ac] outline-none rounded-lg"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
