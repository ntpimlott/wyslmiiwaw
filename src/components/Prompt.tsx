import React, { useEffect } from "react";
import TypeWriter from "./TypeWriter.tsx";
import "bootstrap-icons/font/bootstrap-icons.css";
import textInputs from "../data/textInputs.json";

interface TextInputs {
  [key: string]: string;
}

const typedTextInputs: TextInputs = textInputs;

const Prompt: React.FC = () => {
  const [prompt, setPrompt] = React.useState<string>("a worm");
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
  const [isTyping, setIsTyping] = React.useState<boolean>(true);
  const [isHoverPlay, setIsHoverPlay] = React.useState<boolean>(false);

  const playStyle:string = isHoverPlay ? "bi bi-play-circle-fill" : "bi bi-play-circle";

  useEffect(() => {
    localStorage.setItem("prompts", JSON.stringify([]));
  }, []);

  const textInputKeys:string[] = Object.keys(typedTextInputs);

  const cyclePrompt = () => {
    if (!isDeleting && !isTyping) {
      const currentItems = localStorage.getItem("prompts");
      const parsedItems = currentItems ? JSON.parse(currentItems) : [];

      const difference = textInputKeys.filter((x) => !parsedItems.includes(x));
      if (difference.length === 0) {
        localStorage.setItem("prompts", JSON.stringify([]));
        setPrompt("worm");
      } else {
        const randomIndex = Math.floor(Math.random() * (difference.length - 1));
        const newKey = difference[randomIndex];
        const newPrompt = typedTextInputs[newKey];
        setPrompt(newPrompt);
        localStorage.setItem(
          "prompts",
          JSON.stringify([...parsedItems, newKey])
        );
      }
    }
  };

  return (
    <div className="flex flex-col pb-20">
      <h1
        style={
          {
            fontSize: "2rem",
          }
        }
      >
        Would you still love me if I was{" "}
        <span style={{ color: "red", fontWeight: "bold" }}>
          <TypeWriter
            inputText={prompt}
            isDeleting={isDeleting}
            setIsDeleting={setIsDeleting}
            isTyping={isTyping}
            setIsTyping={setIsTyping}
          />
        </span>
      </h1>
      <button onClick={() => cyclePrompt()}>
        <i className={playStyle} onMouseOver={() => setIsHoverPlay(true)} onMouseLeave={()=> setIsHoverPlay(false)}></i>
      </button>
    </div>
  );
};

export default Prompt;
