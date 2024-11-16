import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';

import cardsData from '../../data/math-101.json';

export default function Home() {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [timing, setTiming] = useState(Array(cardsData.length).fill(0));

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

    return (
        <div className={styles.app}>
            <Link href="/" className={styles.homeLink}>
                Home
            </Link>
            <div className={styles.timeProgressBars}>
                {cardsData.map((_, index) => (
                    <div key={index} className={`${styles.timeBar} ${index === currentCardIndex ? styles.active : ''}`}>
                        <span className={styles.timeLabel}>Card {index + 1}</span>
                        <div className={styles.timeProgressBar}>
                            <div className={styles.timeProgress} style={{ height: `${(timing[index] / 30) * 100}%` }}></div>
                        </div>
                        <span className={styles.timeSpent}>{timing[index].toFixed(2)}s</span>
                    </div>
                ))}
            </div>

            <div className={styles.cardContainer}>
                {cardsData.map((card, index) => (
                    <div key={index} className={styles.card} style={{ transform: `translateX(${(index - currentCardIndex) * 100}%)` }}>
                        <div className={styles.content}>
                            <h2>{card.title}</h2>
                            {card.content.map((text, i) => <p key={i}>{text}</p>)}
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