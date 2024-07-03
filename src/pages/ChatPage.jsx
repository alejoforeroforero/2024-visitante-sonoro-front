import { useEffect, useState , useRef} from "react";
import { askQuestions } from "@/lib/langchain";

import styles from "./ChatPage.module.css";

const ChatPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const latestMessageRef = useRef(null);

  useEffect(() => {
    if (latestMessageRef.current) {
      latestMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyUp = async (e) => {
    if (e.key === "Enter") {
      const question = inputValue;
      setInputValue("wait a moment...");

      const HumanMessage = {
        content: inputValue,
      };

      const AiMessage = {
        content: "............",
      };

      setChatHistory((prevChat) => [...prevChat, HumanMessage]);
      setChatHistory((prevChat) => [...prevChat, AiMessage]);

      const response = await askQuestions(question);
      setChatHistory(response);
      console.log(chatHistory);
      setInputValue("");
    }
  };

  return (
    <div>
      <div className={styles.chat}>
        <div className={styles.chatContent}>
          {chatHistory.map((chatItem, index) => {
            return (
              <div
                key={index}
                ref={index === chatHistory.length - 1 ? latestMessageRef : null}
              >
                <p>{chatItem.content}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.chatInput}>
        <input
          type="text"
          id="inputField"
          placeholder="Ask me something"
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
        />
      </div>
    </div>
  );
};

export default ChatPage;
