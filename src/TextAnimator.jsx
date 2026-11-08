import { Fragment, useEffect, useMemo, useRef, useState } from "react";

// Even a long summary should finish animating quickly; the effect is a
// decoration, not something readers should wait for.
const MAX_ANIMATION_MS = 2500;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const TextAnimator = ({
  text = "Your text here",
  speed = 40,
  justify = true,
  lineHeight = "loose",
  maxWidth = "full",
  className = "",
}) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [calculatedHeight, setCalculatedHeight] = useState(null);
  const hiddenRef = useRef(null);

  // Split text into paragraphs, then words, and add metadata
  const paragraphs = useMemo(
    () =>
      String(text || "")
        .split("\n")
        .map((para) => para.trim())
        .filter(Boolean),
    [text]
  );

  const allWords = useMemo(
    () =>
      paragraphs
        .map((para, paraIndex) => {
          const words = para.split(" ");
          return words.map((word, wordIndex) => ({
            text: word,
            key: `p${paraIndex}-w${wordIndex}`,
            isLastInParagraph: wordIndex === words.length - 1,
            paragraphIndex: paraIndex,
          }));
        })
        .flat(),
    [paragraphs]
  );

  // Pre-render the hidden content and calculate its height, so the visible
  // block does not jump while words fade in.
  useEffect(() => {
    if (hiddenRef.current) {
      setCalculatedHeight(hiddenRef.current.offsetHeight);
    }
  }, [text, maxWidth, lineHeight, justify, className]);

  // Restart when the text changes
  useEffect(() => {
    setVisibleCount(0);
  }, [text]);

  // Step through the words at the given speed, never exceeding MAX_ANIMATION_MS
  useEffect(() => {
    if (visibleCount >= allWords.length) return undefined;

    if (prefersReducedMotion()) {
      setVisibleCount(allWords.length);
      return undefined;
    }

    const step =
      allWords.length === 0
        ? speed
        : Math.max(4, Math.min(speed, MAX_ANIMATION_MS / allWords.length));

    const timer = setTimeout(() => {
      setVisibleCount((count) => count + 1);
    }, step);

    return () => clearTimeout(timer);
  }, [allWords.length, speed, visibleCount]);

  // Group visible words by paragraph for rendering
  const wordsByParagraph = useMemo(
    () =>
      allWords.slice(0, visibleCount).reduce((acc, word) => {
        if (!acc[word.paragraphIndex]) {
          acc[word.paragraphIndex] = [];
        }
        acc[word.paragraphIndex].push(word);
        return acc;
      }, {}),
    [allWords, visibleCount]
  );

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

  const widthClass = maxWidthClasses[maxWidth] || "max-w-2xl";
  const bodyClass = `text-lg ${justify ? "text-justify" : "text-left"} ${
    lineHeightClasses[lineHeight] || "leading-normal"
  } ${className}`;

  return (
    <div className="relative">
      {/* Hidden container for calculating height */}
      <div
        ref={hiddenRef}
        aria-hidden="true"
        className={`invisible absolute inset-x-0 top-0 p-4 ${widthClass}`}
      >
        {paragraphs.map((para, paraIndex) => (
          <p key={`hidden-para-${paraIndex}`} className={bodyClass}>
            {para}
          </p>
        ))}
      </div>

      {/* Visible container with reserved height */}
      <div
        style={{ minHeight: calculatedHeight ? `${calculatedHeight}px` : "auto" }}
        className={`p-4 rounded-lg ${widthClass} mx-auto`}
      >
        {Object.entries(wordsByParagraph).map(([paraIndex, paraWords]) => (
          <p
            key={`para-${paraIndex}`}
            className={`${bodyClass} ${Number(paraIndex) > 0 ? "mt-4" : ""}`}
          >
            {paraWords.map((word) => (
              <Fragment key={word.key}>
                <span className="inline-block animate-fadeIn">{word.text}</span>
                {!word.isLastInParagraph && " "}
              </Fragment>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TextAnimator;
