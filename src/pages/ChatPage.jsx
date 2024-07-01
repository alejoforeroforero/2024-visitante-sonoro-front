import { useState } from "react";
import { buscar, askQuestions } from "@/lib/langchain";

import styles from "./ChatPage.module.css";

const ChatPage = () => {
  const [answer, setAnswer] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyUp = async (e) => {
    if (e.key === "Enter") {
      setAnswer("wait a moment...");
      const question = inputValue;
      setInputValue("");

      const response = await askQuestions(question);
      setAnswer(response);
    }
  };

  return (
    <div>
      <div className={styles.chat}>
        <p>{answer}</p>
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
