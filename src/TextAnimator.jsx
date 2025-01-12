import React, { useState, useEffect, useRef } from "react";

const TextAnimator = ({
  text = "Your text here",
  speed = 40,
  justify = true,
  lineHeight = "loose",
  maxWidth = "full",
  className = "",
}) => {
  const [words, setWords] = useState([]);
  const [calculatedHeight, setCalculatedHeight] = useState(null);
  const containerRef = useRef(null);
  const hiddenRef = useRef(null);

  // Split text into paragraphs, then words, and add metadata
  const paragraphs = text
    .split("\n")
    .map((para) => para.trim())
    .filter(Boolean);
  const allWords = paragraphs
    .map((para, paraIndex) => {
      return para.split(" ").map((word, wordIndex) => ({
        text: word,
        key: `p${paraIndex}-w${wordIndex}`,
        isLastInParagraph: wordIndex === para.split(" ").length - 1,
        paragraphIndex: paraIndex,
      }));
    })
    .flat();

  // Pre-render the hidden content and calculate its height
  useEffect(() => {
    if (hiddenRef.current) {
      setCalculatedHeight(hiddenRef.current.offsetHeight);
    }
  }, [text]);

  // Incrementally display words at the given speed
  useEffect(() => {
    if (words.length < allWords.length) {
      const timer = setTimeout(() => {
        setWords((prev) => [...prev, allWords[prev.length]]);
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [words, allWords, speed]);

  // Group words by paragraph for rendering
  const wordsByParagraph = words.reduce((acc, word) => {
    if (!acc[word.paragraphIndex]) {
      acc[word.paragraphIndex] = [];
    }
    acc[word.paragraphIndex].push(word);
    return acc;
  }, {});

  const lineHeightClasses = {
    tight: "leading-tight",
    normal: "leading-normal",
    relaxed: "leading-relaxed",
    loose: "leading-loose",
  };

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    full: "max-w-full",
  };

  return (
    <>
      {/* Hidden container for calculating height */}
      <div
        ref={hiddenRef}
        className={`p-4 invisible absolute ${
          maxWidthClasses[maxWidth] || "max-w-2xl"
        }`}
      >
        {paragraphs.map((para, paraIndex) => (
          <p
            key={`hidden-para-${paraIndex}`}
            className={`text-lg ${justify ? "text-justify" : "text-left"} ${
              lineHeightClasses[lineHeight] || "leading-normal"
            } ${className}`}
          >
            {para}
          </p>
        ))}
      </div>

      {/* Visible container with fixed height */}
      <div
        ref={containerRef}
        style={{
          minHeight: calculatedHeight ? `${calculatedHeight}px` : "auto",
          overflow: "hidden",
        }}
        className={`p-4 rounded-lg ${
          maxWidthClasses[maxWidth] || "max-w-2xl"
        } mx-auto`}
      >
        {Object.entries(wordsByParagraph).map(([paraIndex, paraWords]) => (
          <p
            key={`para-${paraIndex}`}
            className={`text-lg ${justify ? "text-justify" : "text-left"} ${
              lineHeightClasses[lineHeight] || "leading-normal"
            } ${className} ${Number(paraIndex) > 0 ? "mt-4" : ""}`}
          >
            {paraWords.map((word, index) => (
              <React.Fragment key={word.key}>
                <span
                  className="inline-block opacity-0 animate-fadeIn"
                  style={{
                    animation: "fadeIn 0.5s ease-in forwards",
                  }}
                >
                  {word.text}
                </span>
                {!word.isLastInParagraph && " "}
              </React.Fragment>
            ))}
          </p>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in forwards;
        }
      `}</style>
    </>
  );
};

export default TextAnimator;
