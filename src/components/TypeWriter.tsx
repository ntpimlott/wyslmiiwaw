import React, { useState, useEffect } from "react";

interface TypeWriterProps {
  inputText: string;
  isDeleting: boolean;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  isTyping: boolean;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
}

const TypeWriter: React.FC<TypeWriterProps> = ({
  inputText,
  isDeleting,
  setIsDeleting,
  isTyping,
  setIsTyping,
}) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [prevInputText, setPrevInputText] = useState(inputText);

  useEffect(() => {
    if (prevInputText !== inputText) {
      setIsDeleting(true);
      setPrevInputText(inputText);
      setIsTyping(true);
    }
  }, [inputText, prevInputText, isDeleting]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isDeleting) {
      timer = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
        setIndex((prev) => prev - 1);
      }, 50);
    } else if(isTyping) {
      timer = setTimeout(() => {
        setText((prev) => prev + inputText.charAt(index));
        setIndex((prev) => prev + 1);
        if (index === inputText.length) {
          setIsTyping(false);
        }
      }, 75);
    }
    if (isDeleting && text === "") {
      setIsDeleting(false);
      setIndex(0);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, index, inputText, setIsDeleting]);

  return <span>{text}?</span>;
};

export default TypeWriter;
