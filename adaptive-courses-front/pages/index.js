import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'; // Assuming you use CSS modules

const cardsData = [
  {
    title: "Introduction to Algebra",
    content: [
      "Algebra is a branch of mathematics dealing with symbols and the rules for manipulating those symbols.",
      "It is a unifying thread of almost all of mathematics."
    ]
  },
  {
    title: "Basic Algebraic Operations",
    content: [
      "In algebra, we use four main operations:",
      "Addition (+), Subtraction (-), Multiplication (×), and Division (÷)",
      "When we combine these with variables like x and y, we can create expressions like:",
      "2x + 3y = 10"
    ]
  },
  {
    title: "Order of Operations",
    content: [
      "Remember the acronym PEMDAS:",
      "Parentheses, Exponents, Multiplication and Division (left to right), Addition and Subtraction (left to right)"
    ]
  },
  {
    title: "Solving Linear Equations",
    content: [
      "A linear equation is an equation where variables are raised to the first power only.",
      "Example: 2x + 5 = 13",
      "To solve, we:",
      "1. Isolate the variable term on one side",
      "2. Isolate the variable itself"
    ]
  },
  {
    title: "Introduction to Quadratic Equations",
    content: [
      "A quadratic equation contains variables raised to the second power.",
      "The standard form is: ax² + bx + c = 0",
      "Where: a ≠ 0, b and c can be any real number"
    ]
  },
  // Add more cards here
  {
    title: "Graphing Linear Equations",
    content: [
      "Graphing linear equations involves plotting points on a graph.",
      "The equation y = mx + b is the slope-intercept form.",
      "m is the slope, and b is the y-intercept."
    ]
  },
  {
    title: "Polynomials",
    content: [
      "A polynomial is an expression consisting of variables and coefficients.",
      "It involves operations of addition, subtraction, multiplication, and non-negative integer exponents."
    ]
  },
  {
    title: "Factoring Polynomials",
    content: [
      "Factoring involves writing a polynomial as a product of its factors.",
      "Common methods include factoring by grouping and using the quadratic formula."
    ]
  }
];

export default function Home() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [timing, setTiming] = useState(Array(cardsData.length).fill(0));
  const [adhdMode, setAdhdMode] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setTiming(prev => {
        const newTiming = [...prev];
        newTiming[currentCardIndex] = (Date.now() - startTime) / 1000;
        return newTiming;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentCardIndex]);

  const handleEmojiClick = () => {
    if (currentCardIndex < cardsData.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      alert('You have completed the course!');
    }
  };

  const toggleAdhdMode = () => {
    setAdhdMode(!adhdMode);
  };

  const applyBionicText = (text) => {
    return text.split(' ').map(word => {
      if (word.length > 2) {
        return `<span>${word.slice(0, 2)}</span>${word.slice(2)}`;
      }
      return word;
    }).join(' ');
  };

  return (
    <div className={styles.app}>
      <div className={styles.toggleSwitch}>
        <input
          type="checkbox"
          id="adhdModeToggle"
          checked={adhdMode}
          onChange={toggleAdhdMode}
        />
        <label htmlFor="adhdModeToggle" className={styles.switchLabel}>
          <span className={styles.switchButton}></span>
        </label>
      </div>
      <div className={styles.timeProgressBars}>
        {cardsData.map((_, index) => (
          <div key={index} className={`${styles.timeBar} ${index === currentCardIndex ? styles.active : ''}`}>
            <span className={styles.timeLabel}>Card {index + 1}</span>
            <div className={styles.timeProgressBar}>
              <div className={styles.timeProgress} style={{ width: `${(timing[index] / 30) * 100}%` }}></div>
            </div>
            <span className={styles.timeSpent}>{timing[index].toFixed(2)}s</span>
          </div>
        ))}
      </div>

      <div className={styles.cardContainer}>
        {cardsData.map((card, index) => (
          <div key={index} className={styles.card} style={{ transform: `translateX(${(index - currentCardIndex) * 100}%)` }}>
            <div className={`${styles.content} ${adhdMode ? styles.adhdBionicText : ''}`}>
              <h2>{card.title}</h2>
              {card.content.map((text, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: adhdMode ? applyBionicText(text) : text }}></p>
              ))}
            </div>
            <div className={styles.buttons}>
              <button className={styles.emojiButton} onClick={handleEmojiClick}>😊</button>
              <button className={styles.emojiButton} onClick={handleEmojiClick}>😐</button>
              <button className={styles.emojiButton} onClick={handleEmojiClick}>😕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}